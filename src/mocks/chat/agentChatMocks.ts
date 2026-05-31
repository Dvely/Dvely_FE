import type { ConversationMessage } from '@/types/chat.type';
import {
  readSessionMessages,
  writeSessionMessages,
} from '@/components/layout/project/agentChat.utils';

export type MessageReviewStatus = 'pending' | 'accepted' | 'rejected';

export const MOCK_NEW_PORTFOLIO_USER_PROMPT =
  'React로 포트폴리오 랜딩 페이지 만들어줘. 내 이름은 이운학(Jace)이고 3년차 프론트엔드 개발자야.\n\n페이지 구성은 헤더 네비게이션, 히어로, 자기소개(About), 경력 타임라인(History), 기술 스택, 프로젝트 갤러리, 연락처 푸터로 해줘.\n\n기술 스택은 메인(React, Next.js, TypeScript, Tailwind CSS, Zustand, Zod, React Hook Form)이랑 경험(Vue, Spring Boot, AWS, Figma 등) 두 카테고리로 나눠서 보여줘.\n\n프로젝트는 실무(HeartField, Hectofinancial, etevers, SRT)랑 토이(UPDEV, Eclectic Explorations)로 구분해줘.\n\n연락처는 이메일 dldnsgkr3326@gmail.com이랑 GitHub github.com/dldnsgkr 넣어줘.\n\n다 만들면 GitHub Pages로 배포해줘. 그리고 portfolio.qeploy.com 도메인도 연결해줘.';

export const MOCK_REPO_EDIT_USER_PROMPT =
  '내 이름이랑 소개글 수정하고 배포해줘. blog.dldnsgkr.dev 도메인도 연결해줘.';

type MockScriptStep = {
  templateMessageId: number;
  content: string;
  tokenCount: number;
  requiresApproval: boolean;
};

const MOCK_ASSISTANT_REPLY_DELAY_MS = 700;
const MOCK_CODE_WRITING_DELAY_MS = 2500;
const MOCK_SAVE_PROMPT_DELAY_MS = 400;
const MOCK_DEPLOY_DELAY_MS = 1500;

/** "약 2~3분" 배포 수락 단계 — 수락 시 파이프라인 실행 */
export const DEPLOY_APPROVAL_TEMPLATE_IDS = new Set([1005, 2005]);

/** 신규 포트폴리오 생성 대화 (conversation 예: 201) */
const MOCK_PORTFOLIO_SCRIPT: MockScriptStep[] = [
  {
    templateMessageId: 1002,
    content:
      '이운학(Jace)님의 포트폴리오 랜딩 페이지를 만들어드릴게요.\n\n진행 순서\n1. 코드 작성 — 헤더, 히어로, About, History, 기술 스택, 프로젝트 갤러리, 푸터 제작\n2. GitHub Pages 배포 — 누구나 접속할 수 있는 주소 생성\n3. 도메인 연결 — portfolio.qeploy.com 주소로 접속 설정\n\n코드 작성을 시작합니다!',
    tokenCount: 312,
    requiresApproval: false,
  },
  {
    templateMessageId: 1004,
    content:
      '코드 작성이 완료됐어요!\n\n작성된 화면 구성\n- 헤더 — 네비게이션\n- 히어로 — 이름·직업·소개\n- About · History(경력 타임라인)\n- 기술 스택 — 메인 / 경험 카테고리\n- 프로젝트 갤러리 — 실무 / 토이\n- 푸터 — 이메일 · GitHub\n\n이 코드를 GitHub에 저장할게요. 저장해두면 나중에 언제든 불러오거나 수정할 수 있고, 다음 배포 단계도 진행할 수 있어요.\n\n저장을 진행할까요?',
    tokenCount: 468,
    requiresApproval: true,
  },
];

/** 기존 레포 수정 대화 (conversation 예: 202) */
const MOCK_REPO_EDIT_SCRIPT: MockScriptStep[] = [
  {
    templateMessageId: 2002,
    content:
      '이름·소개글을 수정하고 배포 후 blog.dldnsgkr.dev 주소를 연결해드릴게요.\n\n진행 순서\n1. 코드 수정 — 이름·소개글 등 내용 업데이트\n2. 인터넷에 올리기 — 누구나 접속할 수 있는 주소 생성\n3. 도메인 연결 — blog.dldnsgkr.dev 주소로 바로 접속할 수 있도록 설정\n\n시작합니다!',
    tokenCount: 298,
    requiresApproval: false,
  },
  {
    templateMessageId: 2003,
    content:
      '프로젝트를 불러오고 내용을 수정했어요!\n\n수정된 내용\n- 이름·소개글 업데이트 (src/config/site.js)\n- 소개 페이지 내용 수정 (src/pages/About.jsx)\n\n배포를 위해 추가된 파일\n- 자동 배포 설정 (.github/workflows/deploy.yml)\n- 도메인 연결 파일 (CNAME)',
    tokenCount: 256,
    requiresApproval: false,
  },
  {
    templateMessageId: 2004,
    content: '이 변경 내용을 GitHub에 저장할게요.\n\n저장을 진행할까요?',
    tokenCount: 98,
    requiresApproval: true,
  },
];

const MOCK_APPROVAL_FOLLOWUPS: Record<number, MockScriptStep> = {
  1004: {
    templateMessageId: 1005,
    content:
      '이제 인터넷에 사이트를 올릴게요. 완료되면 아래 주소로 누구나 접속할 수 있어요.\n\nhttps://dldnsgkr.github.io/portfolio/\n\n약 2~3분 정도 걸려요. 지금 바로 올릴까요?',
    tokenCount: 198,
    requiresApproval: true,
  },
  1005: {
    templateMessageId: 1006,
    content:
      '사이트가 올라갔어요!\n\nhttps://dldnsgkr.github.io/portfolio/\n\n이제 portfolio.qeploy.com 주소로도 바로 접속할 수 있도록 연결할게요. 연결이 완료되면 portfolio.qeploy.com 으로 접속할 수 있어요. 주소가 완전히 적용되기까지 최대 48시간 정도 걸릴 수 있어요.\n\n도메인 연결을 시작할까요?',
    tokenCount: 286,
    requiresApproval: true,
  },
  1006: {
    templateMessageId: 1007,
    content:
      '모든 작업이 완료됐어요!\n\n사이트 주소:  portfolio.qeploy.com/\n**커스텀 주소:** portfolio.qeploy.com\n\nportfolio.qeploy.com 주소는 인터넷 전체에 전파되기까지 최대 48시간이 걸릴 수 있어요. 전파 완료 후에는 해당 주소로 바로 접속할 수 있어요.',
    tokenCount: 367,
    requiresApproval: false,
  },
  2004: {
    templateMessageId: 2005,
    content:
      '이제 인터넷에 사이트를 올릴게요. 완료되면 아래 주소로 누구나 접속할 수 있어요.\n\nhttps://dldnsgkr.github.io/my-blog/\n\n약 2~3분 정도 걸려요. 지금 바로 올릴까요?',
    tokenCount: 198,
    requiresApproval: true,
  },
  2005: {
    templateMessageId: 2006,
    content:
      '사이트가 올라갔어요!\n\nhttps://dldnsgkr.github.io/my-blog/\n\n이제 blog.dldnsgkr.dev 주소로도 바로 접속할 수 있도록 연결할게요. 연결이 완료되면 blog.dldnsgkr.dev 로 접속할 수 있어요. 주소가 완전히 적용되기까지 최대 48시간 정도 걸릴 수 있어요.\n\n도메인 연결을 시작할까요?',
    tokenCount: 286,
    requiresApproval: true,
  },
  2006: {
    templateMessageId: 2007,
    content:
      '모든 작업이 완료됐어요!\n\n사이트 주소:  portfolio.qeploy.com/\n**커스텀 주소:** blog.dldnsgkr.dev\n\nblog.dldnsgkr.dev 주소는 인터넷 전체에 전파되기까지 최대 48시간이 걸릴 수 있어요. 전파 완료 후에는 해당 주소로 바로 접속할 수 있어요.',
    tokenCount: 367,
    requiresApproval: false,
  },
};

const FALLBACK_ASSISTANT_REPLY =
  '알겠습니다. 요청하신 내용을 반영해 프리뷰에 적용할게요. 잠시만 기다려 주세요.';

let localMessageId = -1;
const pendingReplyTimers = new Map<number, number>();
const completedReplyUserMessageIds = new Set<number>();
const messageReviewStatusById = new Map<number, MessageReviewStatus>();
const messageTemplateIdByLocalId = new Map<number, number>();
const portfolioScriptStartedConversationIds = new Set<number>();
const repoEditScriptStartedConversationIds = new Set<number>();

type MockAssistantReplyListener = (conversationId: number, messages: ConversationMessage[]) => void;

let mockAssistantReplyListener: MockAssistantReplyListener | null = null;

export function setMockAssistantReplyListener(listener: MockAssistantReplyListener | null) {
  mockAssistantReplyListener = listener;
}

export function isMockAssistantReplyPending(conversationId: number): boolean {
  return pendingReplyTimers.has(conversationId);
}

export function getMessageReviewStatus(messageId: number): MessageReviewStatus | null {
  return messageReviewStatusById.get(messageId) ?? null;
}

export function setMessageReviewStatus(messageId: number, status: MessageReviewStatus) {
  messageReviewStatusById.set(messageId, status);
}

export function isDeployApprovalMessage(messageId: number): boolean {
  const templateMessageId = messageTemplateIdByLocalId.get(messageId);
  return (
    templateMessageId !== undefined && DEPLOY_APPROVAL_TEMPLATE_IDS.has(templateMessageId)
  );
}

export function hasPendingMessageReview(messages: ConversationMessage[]): boolean {
  return messages.some(
    (message) =>
      message.role === 'assistant' && messageReviewStatusById.get(message.messageId) === 'pending',
  );
}

export function createLocalMessage(
  conversationId: number,
  role: 'user' | 'assistant',
  content: string,
  tokenCount = role === 'assistant' ? 96 : 0,
): ConversationMessage {
  const messageId = localMessageId;
  localMessageId -= 1;

  return {
    messageId,
    conversationId,
    role,
    content,
    tokenCount,
    createdAt: new Date().toISOString(),
  };
}

function isRepoEditRequest(content: string): boolean {
  const normalized = content.trim();
  if (normalized === MOCK_REPO_EDIT_USER_PROMPT) return true;

  return (
    /blog\.dldnsgkr\.dev/i.test(normalized) &&
    /(수정|소개글|이름)/.test(normalized) &&
    /(배포|연결)/.test(normalized)
  );
}

function notifyConversationUpdate(conversationId: number) {
  mockAssistantReplyListener?.(conversationId, readSessionMessages(conversationId));
}

function clearPendingReplyTimer(conversationId: number) {
  const timerId = pendingReplyTimers.get(conversationId);
  if (timerId !== undefined) {
    window.clearTimeout(timerId);
    pendingReplyTimers.delete(conversationId);
  }
}

function scheduleConversationUpdate(conversationId: number, deliver: () => void, delayMs: number) {
  clearPendingReplyTimer(conversationId);

  const timerId = window.setTimeout(() => {
    pendingReplyTimers.delete(conversationId);
    deliver();
    notifyConversationUpdate(conversationId);
  }, delayMs);

  pendingReplyTimers.set(conversationId, timerId);
}

function appendScriptMessage(conversationId: number, step: MockScriptStep) {
  const assistantMessage = createLocalMessage(
    conversationId,
    'assistant',
    step.content,
    step.tokenCount,
  );

  messageTemplateIdByLocalId.set(assistantMessage.messageId, step.templateMessageId);

  const next = [...readSessionMessages(conversationId), assistantMessage];
  writeSessionMessages(conversationId, next);

  if (step.requiresApproval) {
    messageReviewStatusById.set(assistantMessage.messageId, 'pending');
  }

  return assistantMessage;
}

function runScriptSteps(
  conversationId: number,
  steps: MockScriptStep[],
  delaysAfterFirst: number[],
) {
  scheduleConversationUpdate(
    conversationId,
    () => {
      appendScriptMessage(conversationId, steps[0]);

      if (steps.length < 2) return;

      scheduleConversationUpdate(
        conversationId,
        () => {
          appendScriptMessage(conversationId, steps[1]);

          if (steps.length < 3) return;

          scheduleConversationUpdate(
            conversationId,
            () => {
              appendScriptMessage(conversationId, steps[2]);
            },
            delaysAfterFirst[1] ?? MOCK_SAVE_PROMPT_DELAY_MS,
          );
        },
        delaysAfterFirst[0] ?? MOCK_CODE_WRITING_DELAY_MS,
      );
    },
    MOCK_ASSISTANT_REPLY_DELAY_MS,
  );
}

function startPortfolioScript(conversationId: number) {
  portfolioScriptStartedConversationIds.add(conversationId);
  runScriptSteps(conversationId, MOCK_PORTFOLIO_SCRIPT, [MOCK_CODE_WRITING_DELAY_MS]);
}

function startRepoEditScript(conversationId: number) {
  repoEditScriptStartedConversationIds.add(conversationId);
  runScriptSteps(conversationId, MOCK_REPO_EDIT_SCRIPT, [
    MOCK_CODE_WRITING_DELAY_MS,
    MOCK_SAVE_PROMPT_DELAY_MS,
  ]);
}

function appendFallbackReply(conversationId: number) {
  appendScriptMessage(conversationId, {
    templateMessageId: -1,
    content: FALLBACK_ASSISTANT_REPLY,
    tokenCount: 96,
    requiresApproval: false,
  });
}

export function scheduleMockAssistantReply({
  conversationId,
  userMessageId,
  content,
}: {
  conversationId: number;
  userMessageId: number;
  content: string;
}) {
  if (completedReplyUserMessageIds.has(userMessageId)) {
    notifyConversationUpdate(conversationId);
    return;
  }

  completedReplyUserMessageIds.add(userMessageId);

  if (isRepoEditRequest(content)) {
    if (!repoEditScriptStartedConversationIds.has(conversationId)) {
      startRepoEditScript(conversationId);
    } else {
      scheduleConversationUpdate(
        conversationId,
        () => {
          appendFallbackReply(conversationId);
        },
        MOCK_ASSISTANT_REPLY_DELAY_MS,
      );
    }
    notifyConversationUpdate(conversationId);
    return;
  }

  if (!portfolioScriptStartedConversationIds.has(conversationId)) {
    startPortfolioScript(conversationId);
    notifyConversationUpdate(conversationId);
    return;
  }

  scheduleConversationUpdate(
    conversationId,
    () => {
      appendFallbackReply(conversationId);
    },
    MOCK_ASSISTANT_REPLY_DELAY_MS,
  );
  notifyConversationUpdate(conversationId);
}

export async function resolveMockScriptReview(
  conversationId: number,
  messageId: number,
  status: Exclude<MessageReviewStatus, 'pending'>,
  options?: {
    runDeployPipeline?: () => Promise<void>;
  },
) {
  if (status === 'rejected') return;

  const templateMessageId = messageTemplateIdByLocalId.get(messageId);
  if (templateMessageId === undefined) return;

  const followUpStep = MOCK_APPROVAL_FOLLOWUPS[templateMessageId];
  if (!followUpStep) return;

  const isDeployApproval = DEPLOY_APPROVAL_TEMPLATE_IDS.has(templateMessageId);
  const isSaveApproval = templateMessageId === 1004 || templateMessageId === 2004;
  const delayMs = isSaveApproval ? MOCK_ASSISTANT_REPLY_DELAY_MS : MOCK_DEPLOY_DELAY_MS;

  const deliverFollowUp = () => {
    appendScriptMessage(conversationId, followUpStep);
    notifyConversationUpdate(conversationId);
  };

  if (isDeployApproval && options?.runDeployPipeline) {
    await options.runDeployPipeline();
    scheduleConversationUpdate(conversationId, deliverFollowUp, 0);
    return;
  }

  scheduleConversationUpdate(conversationId, deliverFollowUp, delayMs);
  notifyConversationUpdate(conversationId);
}
