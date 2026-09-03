import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import {
  postConversationMessageCreate,
  postProjectConversationCreate,
  useConversationMessageListQuery,
} from '@/api/chat';
import { pollAgentTask, postAgentTaskInput, SETTLED_AGENT_TASK_STATUSES } from '@/api/agent';
import {
  getProjectApprovalList,
  postApprovalApprove,
  postApprovalReject,
  useApprovalDetailQuery,
} from '@/api/approvals';
import { composeApiErrorMessage, dispatchApiErrorAction } from '@/lib/apiErrorGuide';
import { refreshUserInfoInBackground } from '@/api/user';
import AppAlertDialog from '@/components/common/AppAlertDialog';
import AgentApprovalCard from '@/components/layout/project/AgentApprovalCard';
import type { GetAgentTaskResType } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';
import {
  AGENT_CHAT_QUERY_KEY,
  clearHomeAgentPromptSendGuard,
  createLocalMessage,
  mergeConversationMessages,
  migrateSessionMessages,
  readConversationTaskId,
  readSessionMessages,
  rememberConversationTaskId,
  shouldSendHomeAgentPromptOnce,
  writeSessionMessages,
} from '@/components/layout/project/agentChat.utils';

const suggestedPrompts = [
  {
    label: '포트폴리오 만들기',
    prompt: 'React + Vite로 포트폴리오 사이트를 만들어줘.',
  },
  {
    label: '기존 레포 수정',
    prompt: '현재 프로젝트에서 수정하고 싶은 부분을 알려줄게.',
  },
] as const;

type AgentConversationPanelProps = {
  projectId: number;
  projectName: string;
  conversationId: number | null;
  isNewConversation: boolean;
  initialPrompt?: string | null;
  onConversationCreated: (conversationId: number) => void;
  onConversationActivity?: (conversationId: number) => void;
  /** Agent 태스크가 도는 중인지 알린다. 프리뷰 세션 폴링을 열어 두는 데 쓰인다 */
  onAgentTaskActiveChange?: (isActive: boolean) => void;
  /** 배포 중이면 서버가 완료 안내를 나중에 덧붙이므로 메시지를 계속 다시 읽는다 */
  isDeployInFlight?: boolean;
  /** 배포 제안(약 2~3분) 수락 시 파이프라인 실행 */
  onDeployPipelineStart?: () => Promise<void>;
};

// 태스크 상태를 사람이 읽을 문구로 옮기던 formatAgentTaskReply 는 없앴다.
// 서버가 모든 종료 상태를 chat_messages 에 남기므로 FE 가 같은 사건을 다시 서술하면
// 문구만 다른 두 벌이 된다. 서술은 서버 하나가 소유한다.

const APPROVAL_WAIT_STATUSES = new Set(['WAITING_APPROVAL', 'WAITING_RESULT_APPROVAL']);

/**
 * 진행 중 상태 문구.
 *
 * 빌드는 몇 분 걸리는데 그동안 화면에는 글자 없는 스켈레톤만 있었다. 사용자는 멈춘
 * 줄 알고 새로고침하거나 같은 요청을 다시 보낸다. 이미 2초마다 받고 있는 status 를
 * 한 줄로 보여주면 그 오해가 사라진다.
 *
 * 종료 상태(DONE·FAILED·CANCELLED)는 여기 없다 — 그때는 스켈레톤 자체가 사라지고
 * 서버가 적은 결과 메시지가 자리를 대신한다.
 */
const TASK_PROGRESS_LABEL: Record<string, string> = {
  PENDING: '요청을 접수했습니다',
  QUEUED: '작업을 기다리는 중',
  RUNNING: '작업 중',
  RETRY_WAIT: '재시도를 기다리는 중',
  WAITING_APPROVAL: '승인을 기다리는 중',
  WAITING_RESULT_APPROVAL: '결과 확인을 기다리는 중',
  WAITING_INPUT: '질문에 답해 주세요',
};

/**
 * 스켈레톤 옆에 붙일 한 줄. 모르는 상태가 와도 "작업 중"으로 떨어진다 —
 * status 는 열린 문자열이라 서버가 단계를 늘리면 여기 없는 값이 온다.
 */
function describeTaskProgress(task: GetAgentTaskResType | null): string {
  if (!task) return '작업 중';

  const label = TASK_PROGRESS_LABEL[task.status] ?? '작업 중';
  // 재시도는 몇 번째인지가 정보다. "재시도를 기다리는 중"만 있으면 언제 끝날지 모른다
  if (task.status === 'RETRY_WAIT' && task.attempt != null && task.maxAttempts != null) {
    return `${label} (${task.attempt}/${task.maxAttempts})`;
  }
  return label;
}

async function resolvePendingApprovalId(
  task: GetAgentTaskResType,
  projectId: number,
  conversationId: number | null,
) {
  if (task.pendingApprovalId != null) return task.pendingApprovalId;
  if (!APPROVAL_WAIT_STATUSES.has(task.status)) return null;

  const approvals = await getProjectApprovalList(projectId);
  const pending = approvals.find((approval) => {
    if (approval.status !== 'PENDING') return false;
    if (approval.taskId && approval.taskId === task.taskId) return true;
    if (conversationId != null && approval.conversationId === conversationId) return true;
    return false;
  });

  // 이 태스크·대화에 속한 승인만 쓴다. 예전에는 매칭이 실패하면 프로젝트 안 아무 PENDING이나
  // 집어왔는데, 스캐폴딩 승인이 WAITING_APPROVAL로 남아 쌓이는 구조라 다른 대화의 승인 카드가
  // 뜰 수 있었다. 승인은 되돌리기 어려우므로 엉뚱한 것을 띄우느니 아무것도 안 띄운다.
  return pending?.approvalId ?? null;
}

/**
 * 오류 문구. 서버가 코드를 붙여 보냈으면 다음 행동을 한 줄 덧붙인다 —
 * "다른 AI 제공자를 골라 다시 보내보세요" 같은 것. 코드가 없거나 모르는
 * 코드면 서버 문장만 그대로 나간다.
 */
function formatApiErrorMessage(error: unknown) {
  return composeApiErrorMessage(error);
}

function AgentConversationPanel({
  projectId,
  projectName,
  conversationId,
  isNewConversation,
  initialPrompt,
  onConversationCreated,
  onConversationActivity,
  onAgentTaskActiveChange,
  isDeployInFlight = false,
}: AgentConversationPanelProps) {
  const [input, setInput] = useState('');
  const [overlayMessages, setOverlayMessages] = useState<ConversationMessage[]>([]);
  const [isAssistantReplying, setIsAssistantReplying] = useState(false);
  // 폴링이 읽어오는 태스크. 진행 문구를 만드는 데만 쓴다
  const [progressTask, setProgressTask] = useState<GetAgentTaskResType | null>(null);
  /*
    에이전트가 되물어서 멈춰 선 태스크.
    "배포해줘"에 저장소 이름을, "도메인 연결해줘"에 도메인을 묻는 자리다.

    이때 사용자가 입력창에 적는 것은 **새 요청이 아니라 그 질문의 답**이다. 새 메시지로
    보내면 서버는 새 태스크를 만들고, 원래 태스크는 WAITING_INPUT 인 채 영원히 남는다
    — 배포가 되묻는 순간부터 빠져나올 길이 없어진다.
  */
  const [awaitingInputTaskId, setAwaitingInputTaskId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // 승인 대기 여부는 서버만 안다 — 채팅 본문에서 유추하지 않는다
  const [pendingApprovalId, setPendingApprovalId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const { data: serverMessages, isLoading: isMessagesLoading } = useConversationMessageListQuery(
    AGENT_CHAT_QUERY_KEY,
    conversationId ?? 0,
    isDeployInFlight,
  );
  const displayMessages = useMemo(
    () => mergeConversationMessages(serverMessages ?? [], overlayMessages),
    [serverMessages, overlayMessages],
  );
  const pollAbortRef = useRef<AbortController | null>(null);

  const { data: pendingApproval } = useApprovalDetailQuery(AGENT_CHAT_QUERY_KEY, pendingApprovalId);
  const activeApproval = pendingApproval?.status === 'PENDING' ? pendingApproval : null;

  // 대화를 열거나 바꿀 때 미결 승인을 서버에서 복원한다.
  //
  // taskId로 복원하면 안 된다 — taskId는 메시지 생성 응답에만 실려 오고 메모리에만 남아서,
  // 새로고침하면 사라진다. 그러면 승인은 PENDING인데 카드가 없어 결정할 방법이 없어진다.
  // 승인 목록에는 conversationId·taskId·input이 다 들어 있으므로 이쪽으로 찾는다.
  useEffect(() => {
    // 대화가 바뀌면 초기화한다. 남겨두면 다른 대화의 질문에 답을 보내게 된다
    setAwaitingInputTaskId(null);

    if (conversationId == null) {
      setPendingApprovalId(null);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const approvals = await getProjectApprovalList(projectId);
        // 반드시 conversationId로 거른다. 프로젝트 단위로 찾으면 conversationId가 null인
        // 고아 스캐폴딩 승인이 잡혀서, 다른 대화의 승인 카드가 뜨던 문제가 재현된다
        const pending = approvals.find(
          (approval) => approval.status === 'PENDING' && approval.conversationId === conversationId,
        );
        if (!cancelled) setPendingApprovalId(pending?.approvalId ?? null);
      } catch {
        // 복원에 실패하면 승인 없음으로 둔다 — 없는 승인을 띄우는 것보다 낫다
        if (!cancelled) setPendingApprovalId(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [conversationId, projectId]);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      let targetConversationId = conversationId;

      if (isNewConversation || targetConversationId === null) {
        const created = await postProjectConversationCreate(projectId);
        targetConversationId = created.conversationId;
      }

      const createdMessage = await postConversationMessageCreate(targetConversationId, { content });

      const taskId = createdMessage.taskId?.trim() || '';
      if (!taskId) {
        return {
          conversationId: targetConversationId,
          task: null,
          taskId: '',
          pendingApprovalId: null,
        };
      }

      rememberConversationTaskId(targetConversationId, taskId);
      onConversationActivity?.(targetConversationId);

      const sessionMessages = readSessionMessages(targetConversationId);
      const lastUserIndex = [...sessionMessages]
        .map((message, index) => ({ message, index }))
        .reverse()
        .find(({ message }) => message.role === 'user' && message.content === content)?.index;
      if (lastUserIndex != null) {
        const nextMessages = sessionMessages.map((message, index) =>
          index === lastUserIndex ? { ...message, taskId } : message,
        );
        writeSessionMessages(targetConversationId, nextMessages);
      }

      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;
      const task = await pollAgentTask(taskId, {
        signal: controller.signal,
        onProgress: setProgressTask,
      });

      const pendingApprovalId = await resolvePendingApprovalId(
        task,
        projectId,
        targetConversationId,
      );

      return {
        conversationId: targetConversationId,
        task,
        taskId,
        pendingApprovalId,
      };
    },
    onMutate: (content) => {
      const draftConversationId = conversationId ?? 0;
      const userMessage = createLocalMessage(draftConversationId, 'user', content);
      setOverlayMessages((prev) => {
        const next = [...mergeConversationMessages(serverMessages ?? [], prev), userMessage];
        writeSessionMessages(draftConversationId, next);
        return next;
      });
      setInput('');
      setIsAssistantReplying(true);
      // 앞선 실행의 문구가 남아 있으면 새 요청이 그 상태인 것처럼 보인다
      setProgressTask(null);
      return { content, userMessage, draftConversationId };
    },
    onSuccess: (result, _content, context) => {
      const targetConversationId = result.conversationId;

      if (context?.userMessage && context.draftConversationId !== targetConversationId) {
        migrateSessionMessages(context.draftConversationId, targetConversationId);
      }

      const pendingApprovalId = result.task?.pendingApprovalId ?? result.pendingApprovalId ?? null;
      setPendingApprovalId(pendingApprovalId);
      // 에이전트가 되물었으면 다음 입력은 새 요청이 아니라 그 답이다
      setAwaitingInputTaskId(
        result.task?.status === 'WAITING_INPUT' ? (result.taskId || null) : null,
      );

      // 어시스턴트 답변을 task.summary 로 직접 만들지 않는다. 서버가 같은 사건을
      // chat_messages 에 이미 적어두는데 문구가 달라서(요약 전문 vs 짧은 안내) 병합에
      // 걸리지 않고 두 벌로 보였다. 새로고침하면 서버 것만 남아 하나로 줄던 게 그 증거다.
      // 사용자 메시지는 오버레이에 남겨 둔다 — 서버 목록이 도착하면 본문이 같아 병합된다.
      const sessionMessages = readSessionMessages(targetConversationId);
      setOverlayMessages(sessionMessages);

      if (isNewConversation || conversationId === null) {
        onConversationCreated(targetConversationId);
      }

      if (result.taskId) {
        rememberConversationTaskId(targetConversationId, result.taskId);
      }

      void queryClient.invalidateQueries({
        queryKey: ['project-conversation-list', AGENT_CHAT_QUERY_KEY, projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, targetConversationId],
      });

      if (!result.task && context?.userMessage) {
        console.warn('[agent] message created without taskId', {
          conversationId: targetConversationId,
          taskId: result.taskId,
        });
        setAlertMessage(
          '메시지는 저장됐지만 작업이 시작되지 않았습니다. 다시 요청해 주세요.',
        );
      }

      setIsAssistantReplying(false);
      setProgressTask(null);
      onConversationActivity?.(targetConversationId);
    },
    onError: (error, content, context) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setIsAssistantReplying(false);
        setProgressTask(null);
        return;
      }

      console.error('[agent] send/poll failed', error);

      setAlertMessage(formatApiErrorMessage(error));
      // GitHub App 권한이 원인이면 여기서 설정 진입점을 띄운다. 문구만 보여주면
      // 사용자가 GitHub 설정까지 스스로 찾아가야 한다
      dispatchApiErrorAction(error);

      if (!(conversationId != null && context?.userMessage)) {
        setInput(content);
        if (context?.userMessage) {
          setOverlayMessages((prev) =>
            prev.filter((message) => message.messageId !== context.userMessage.messageId),
          );
        }
      }
      setIsAssistantReplying(false);
      setProgressTask(null);
    },
  });

  const decideApprovalMutation = useMutation({
    mutationFn: async ({
      approvalId,
      action,
      taskId,
      payload,
    }: {
      approvalId: number;
      action: 'approve' | 'reject';
      taskId: string;
      payload?: Record<string, string>;
    }) => {
      if (action === 'approve') {
        await postApprovalApprove(approvalId, payload);
      } else {
        await postApprovalReject(approvalId);
      }

      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;
      rememberConversationTaskId(conversationId ?? 0, taskId);
      const task = await pollAgentTask(taskId, {
        signal: controller.signal,
        onProgress: setProgressTask,
        until: (nextTask) => {
          const stillSameApproval =
            nextTask.pendingApprovalId === approvalId &&
            APPROVAL_WAIT_STATUSES.has(nextTask.status);
          if (stillSameApproval) return false;
          return SETTLED_AGENT_TASK_STATUSES.has(nextTask.status);
        },
      });
      const nextPendingApprovalId = await resolvePendingApprovalId(task, projectId, conversationId);
      const pendingApprovalId = nextPendingApprovalId === approvalId ? null : nextPendingApprovalId;

      return { task, pendingApprovalId, decidedApprovalId: approvalId };
    },
    onMutate: () => {
      setIsAssistantReplying(true);
      // 앞선 실행의 문구가 남아 있으면 새 요청이 그 상태인 것처럼 보인다
      setProgressTask(null);
      setPendingApprovalId(null);
    },
    onSuccess: ({ task, pendingApprovalId }) => {
      const targetConversationId = conversationId;
      if (targetConversationId == null) return;

      rememberConversationTaskId(targetConversationId, task.taskId);

      const needsApproval = APPROVAL_WAIT_STATUSES.has(task.status) && pendingApprovalId != null;
      setPendingApprovalId(needsApproval ? pendingApprovalId : null);
      // 승인 뒤 이어 달리다 되물을 수도 있다
      setAwaitingInputTaskId(task.status === 'WAITING_INPUT' ? (task.taskId || null) : null);

      // 태스크가 끝났으면 게이트 안내와 결과가 서버에 기록돼 있다.
      // 로컬 임시 메시지를 덧붙이면 곧 도착할 서버 메시지와 겹치므로 오버레이를 비우고
      // 서버 목록을 단일 출처로 삼는다 (기존 메시지는 그대로 남아 화면이 비지 않는다)
      setOverlayMessages([]);
      writeSessionMessages(targetConversationId, []);

      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
      // 승인은 서버 쪽 상태를 바꾼다 — 결정 뒤 화면에 남아 있는 옛 값을 걷어낸다.
      // 메시지: 게이트 안내와 결과가 서버에 기록되므로 다시 읽어야 이력이 보인다
      // 저장소 설정·프로젝트: REPOSITORY_BINDING 승인이 저장소를 붙인다
      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, targetConversationId],
      });
      void queryClient.invalidateQueries({ queryKey: ['project-repository-settings'] });
      void queryClient.invalidateQueries({ queryKey: ['project-detail'] });
      // DEPLOYMENT 승인이면 이 시점부터 배포가 돈다. 개요를 다시 읽어야 IN_PROGRESS 를
      // 보고 폴링이 켜지고, 그래야 웹훅이 나중에 붙이는 완료 안내를 받는다
      void queryClient.invalidateQueries({ queryKey: ['project-overview'] });
      setIsAssistantReplying(false);
      setProgressTask(null);
      onConversationActivity?.(targetConversationId);
    },
    onError: (error, variables) => {
      // onMutate에서 낙관적으로 감췄던 승인을 되돌린다 — 실패했으면 아직 대기 중이다.
      // 다만 방치 승인은 서버가 TTL로 CANCELLED 처리하므로(409) 상태를 다시 읽는다.
      // PENDING이면 카드가 돌아오고, 이미 닫혔으면 사라진다
      setPendingApprovalId(variables.approvalId);
      void queryClient.invalidateQueries({ queryKey: ['approval-detail'] });

      if (error instanceof DOMException && error.name === 'AbortError') {
        setIsAssistantReplying(false);
        setProgressTask(null);
        return;
      }

      setAlertMessage(formatApiErrorMessage(error));
      setIsAssistantReplying(false);
      setProgressTask(null);
      // 서버가 코드로 원인을 알려줬으면 그것으로 바로 진입점을 띄운다
      if (!dispatchApiErrorAction(error)) {
        // 코드가 없으면 예전 방식으로 — 저장소 연결 승인은 서버가 GitHub 을 호출하므로
        // 사용자 정보를 다시 읽어 재인증이 필요한지 확인한다
        void refreshUserInfoInBackground();
      }
    },
  });

  /**
   * 에이전트 질문에 대한 답을 제출한다.
   *
   * 새 메시지가 아니라 `POST /agent/tasks/{taskId}/input` 으로 보낸다 — 서버는 이 값을
   * 받아 멈춰 있던 태스크를 그 자리에서 이어 달리게 한다(WAITING_INPUT → QUEUED).
   * 새 메시지로 보내면 새 태스크가 생기고 원래 태스크는 영영 멈춰 있는다.
   *
   * 서버는 이 답을 채팅에 남기지 않는다(이벤트만 남긴다). 그래서 여기서 화면에 얹어
   * 준다 — 안 그러면 대화가 "질문 → (공백) → 결과" 로 읽힌다.
   */
  const submitInputMutation = useMutation({
    mutationFn: async ({ taskId, value }: { taskId: string; value: string }) => {
      await postAgentTaskInput(taskId, { value });

      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;
      const task = await pollAgentTask(taskId, {
        signal: controller.signal,
        onProgress: setProgressTask,
      });

      const pendingApprovalId = await resolvePendingApprovalId(task, projectId, conversationId);
      return { task, taskId, pendingApprovalId };
    },
    onMutate: ({ value }) => {
      const targetConversationId = conversationId ?? 0;
      const userMessage = createLocalMessage(targetConversationId, 'user', value);
      setOverlayMessages((prev) => {
        const next = [...mergeConversationMessages(serverMessages ?? [], prev), userMessage];
        writeSessionMessages(targetConversationId, next);
        return next;
      });
      setInput('');
      setIsAssistantReplying(true);
      setProgressTask(null);
      // 답을 보냈으니 대기 상태를 푼다. 이어 달리다 또 물으면 onSuccess 가 다시 세운다
      setAwaitingInputTaskId(null);
      return { userMessage, targetConversationId };
    },
    onSuccess: ({ task, taskId, pendingApprovalId }) => {
      if (conversationId == null) return;

      rememberConversationTaskId(conversationId, taskId);
      setPendingApprovalId(
        APPROVAL_WAIT_STATUSES.has(task.status) && pendingApprovalId != null
          ? pendingApprovalId
          : null,
      );
      setAwaitingInputTaskId(task.status === 'WAITING_INPUT' ? (task.taskId || null) : null);

      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, conversationId],
      });
      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
      void queryClient.invalidateQueries({ queryKey: ['project-detail'] });
      setIsAssistantReplying(false);
      setProgressTask(null);
      onConversationActivity?.(conversationId);
    },
    onError: (error, variables, context) => {
      setIsAssistantReplying(false);
      setProgressTask(null);

      if (error instanceof DOMException && error.name === 'AbortError') return;

      /*
        태스크가 더 이상 입력을 기다리지 않으면(취소됐거나 만료) 서버가 400·404 를 준다.
        그때는 사용자가 적은 말을 잃지 않도록 평범한 메시지로 다시 보낸다 — 답이 갈 곳이
        없어졌다고 사용자에게 되돌려주면 같은 말을 두 번 적게 된다.
      */
      setAwaitingInputTaskId(null);
      if (context?.userMessage) {
        setOverlayMessages((prev) => {
          const next = prev.filter((message) => message.messageId !== context.userMessage.messageId);
          writeSessionMessages(context.targetConversationId, next);
          return next;
        });
      }
      sendMessageMutation.mutate(variables.value);
    },
  });

  const isSending = sendMessageMutation.isPending;
  const isInputLocked = isSending || isAssistantReplying || submitInputMutation.isPending;

  // 세 경로 모두 mutationFn 안에서 태스크가 끝날 때까지 폴링하므로, 이 값이 참인 동안이 곧 작업 구간이다
  const isAgentTaskActive = isInputLocked || decideApprovalMutation.isPending;

  useEffect(() => {
    onAgentTaskActiveChange?.(isAgentTaskActive);
  }, [isAgentTaskActive, onAgentTaskActiveChange]);

  // 작업 중에 패널이 사라지면 부모가 참인 채로 남아 폴링이 멈추지 않는다
  useEffect(() => () => onAgentTaskActiveChange?.(false), [onAgentTaskActiveChange]);

  const showMessageSkeletons = isMessagesLoading && displayMessages.length === 0;
  const showWelcome =
    !showMessageSkeletons &&
    isNewConversation &&
    !isSending &&
    !isAssistantReplying &&
    displayMessages.length === 0;

  const handleSend = () => {
    const content = input.trim();
    if (!content || isInputLocked) return;

    // 에이전트가 되물어 놓은 상태면 이건 새 요청이 아니라 그 질문의 답이다
    if (awaitingInputTaskId) {
      submitInputMutation.mutate({ taskId: awaitingInputTaskId, value: content });
      return;
    }

    sendMessageMutation.mutate(content);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleAlertOpenChange = (open: boolean) => {
    if (!open) setAlertMessage(null);
  };

  const handleDecideApproval = (
    action: 'approve' | 'reject',
    payload?: Record<string, string>,
  ) => {
    if (decideApprovalMutation.isPending || isAssistantReplying || !activeApproval) {
      return;
    }

    const taskId = activeApproval.taskId?.trim() || readConversationTaskId(conversationId);
    if (!taskId) {
      setAlertMessage('이어서 진행할 작업 ID를 찾지 못했습니다.');
      return;
    }

    decideApprovalMutation.mutate({
      approvalId: activeApproval.approvalId,
      action,
      taskId,
      payload,
    });
  };

  useEffect(() => {
    const content = initialPrompt?.trim();
    if (!content || !shouldSendHomeAgentPromptOnce(content)) return;

    sendMessageMutation.mutate(content, {
      onError: () => clearHomeAgentPromptSendGuard(content),
    });
    // 홈에서 넘어온 프롬프트는 마운트 시 한 번만 전송한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  useEffect(() => {
    return () => {
      pollAbortRef.current?.abort();
    };
  }, []);

  return (
    <>
      <div role="tabpanel" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {showWelcome ? (
            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-[13px] leading-relaxed text-[#475569]">
              안녕하세요! <span className="font-semibold text-[#0f172a]">{projectName}</span>{' '}
              워크스페이스입니다. 메시지를 입력하면 대화가 시작됩니다.
            </div>
          ) : null}
          {showMessageSkeletons
            ? [0, 1, 2, 3].map((item) => (
                <AssistantReplySkeleton key={`message-skeleton-${item}`} />
              ))
            : displayMessages.map((message) => (
                <MessageBubble key={message.messageId} message={message} />
              ))}
          {activeApproval ? (
            <AgentApprovalCard
              key={activeApproval.approvalId}
              approval={activeApproval}
              isBusy={decideApprovalMutation.isPending}
              onApprove={(payload) => handleDecideApproval('approve', payload)}
              onReject={() => handleDecideApproval('reject')}
            />
          ) : null}
          {isSending || isAssistantReplying ? (
            <AssistantReplySkeleton progressLabel={describeTaskProgress(progressTask)} />
          ) : null}
          <div
            key={`${displayMessages.length}-${isAssistantReplying ? 'replying' : 'idle'}`}
            ref={(node) => {
              node?.scrollIntoView({ block: 'end' });
            }}
            aria-hidden="true"
            className="h-px shrink-0"
          />
        </div>
      </div>

      <footer className="border-t border-[#f1f5f9] p-3">
        {/*
          지금 적는 말이 새 요청이 아니라 위 질문의 답이라는 것을 알린다. 이 표시가 없으면
          사용자는 평소처럼 말을 걸었다고 생각하는데, 실제로는 멈춰 선 작업이 이어 달린다
        */}
        {awaitingInputTaskId ? (
          <p className="mb-2 rounded-lg bg-[#faf5ff] px-2.5 py-1.5 text-[12px] font-medium text-[#6d28d9]">
            에이전트가 답을 기다리고 있습니다. 여기에 적으면 하던 작업을 이어서 진행합니다.
          </p>
        ) : null}
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedPrompts.map(({ label, prompt }) => (
            <button
              key={label}
              type="button"
              disabled={isInputLocked}
              onClick={() => setInput(prompt)}
              className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#475569] transition hover:border-[#c4b5fd] hover:text-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 focus-within:border-[#a5b4fc] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6366f1]/15">
          <textarea
            rows={2}
            value={input}
            disabled={isInputLocked}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={awaitingInputTaskId ? '위 질문에 답해 주세요' : '메시지를 입력하세요'}
            className="min-h-[40px] flex-1 resize-none bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] disabled:opacity-60"
          />
          <button
            type="button"
            disabled={!input.trim() || isInputLocked}
            onClick={handleSend}
            className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed] text-white transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="전송"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </footer>

      <AppAlertDialog
        open={alertMessage != null}
        message={alertMessage ?? ''}
        onOpenChange={handleAlertOpenChange}
      />
    </>
  );
}

type MessageBubbleProps = {
  message: ConversationMessage;
};

const MESSAGE_URL_REGEX = /(https?:\/\/[^\s]+)/g;

function normalizeMessageUrl(url: string) {
  return url.replace(/[.,;:!?)]+$/, '');
}

function linkifyMessageContent(content: string, linkClassName: string) {
  return content.split(MESSAGE_URL_REGEX).map((part, index) => {
    if (!part.startsWith('http://') && !part.startsWith('https://')) {
      return part;
    }

    const href = normalizeMessageUrl(part);

    return (
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {part}
      </a>
    );
  });
}

/**
 * 두 곳에서 쓴다 — 메시지 목록을 처음 읽는 동안과, 에이전트가 도는 동안.
 * 앞쪽은 곧 끝나므로 문구가 없고, 뒤쪽은 몇 분 걸릴 수 있어 지금 무슨 단계인지 적는다.
 */
function AssistantReplySkeleton({ progressLabel }: { progressLabel?: string }) {
  return (
    <div className="px-3.5 py-3">
      {progressLabel ? (
        // aria-live 로 읽어준다. 몇 분 걸리는 작업이라 화면을 계속 보고 있지 않은
        // 사용자에게도 단계가 바뀌는 것이 전달돼야 한다
        <p aria-live="polite" className="mb-2 text-[12px] font-medium text-[#7c3aed]">
          {progressLabel}
        </p>
      ) : null}
      <div aria-hidden="true" className="flex flex-col gap-2">
        <div className="h-3 w-[78%] animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-3 w-[92%] animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-3 w-[64%] animate-pulse rounded bg-[#f1f5f9]" />
      </div>
    </div>
  );
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const linkClassName = isUser
    ? 'underline underline-offset-2 hover:text-[#5b21b6]'
    : 'text-[#7c3aed] underline underline-offset-2 hover:text-[#6d28d9]';

  return (
    <div className={isUser ? 'ml-6' : undefined}>
      <div
        className={`text-[13px] leading-relaxed ${
          isUser
            ? 'rounded-xl border border-[#c4b5fd] bg-[#ede9fe] px-3.5 py-3 text-[#4c1d95]'
            : isAssistant
              ? 'px-3.5 py-3 text-[#475569]'
              : 'rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-3 text-[#64748b]'
        }`}
      >
        <p className="whitespace-pre-wrap">
          {linkifyMessageContent(message.content, linkClassName)}
        </p>
      </div>
    </div>
  );
}

export default AgentConversationPanel;
