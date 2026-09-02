import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Code,
  MessageSquare,
  Pencil,
  RefreshCw,
  RotateCcw,
  Share2,
} from 'lucide-react';
import {
  deleteConversation,
  getConversationMessageList,
  useProjectConversationListQuery,
} from '@/api/chat';
import {
  deleteProjectRepository,
  postProjectRepository,
  useProjectRepositorySettingsQuery,
} from '@/api/projects';
import {
  postProjectPreviewSession,
  usePreviewAccessQuery,
  useProjectPreviewQuery,
} from '@/api/preview';
import { refreshUserInfoInBackground } from '@/api/user';
import { extractApiErrorMessage } from '@/utils/response';
import {
  postProjectRepositoryReqSchema,
  type GetProjectDetailResType,
  type GithubRepository,
  type PostProjectRepositoryCreateFormType,
  type PostProjectRepositoryReqType,
} from '@/types/projects.type';
import { toGithubRepositoryFromBinding } from '@/components/layout/project/githubRepository.utils';
import {
  AGENT_CHAT_QUERY_KEY,
  consumePendingHomeAgentPrompt,
  formatProjectDisplayName,
} from '@/components/layout/project/agentChat.utils';
import {
  deriveAgentPreviewPhase,
  resolvePreviewFrameUrl,
} from '@/components/layout/project/agentPreview.utils';
import AgentChatListPanel from '@/components/layout/project/AgentChatListPanel';
import AgentConversationPanel from '@/components/layout/project/AgentConversationPanel';
import AgentSitePreviewPanel from '@/components/layout/project/AgentSitePreviewPanel';
import GithubRepositoryPicker from '@/components/layout/project/GithubRepositoryPicker';
import ProjectCodeExplorerPanel from '@/components/layout/project/ProjectCodeExplorerPanel';
import ProjectPipelinePanel from '@/components/layout/project/ProjectPipelinePanel';
import { createIdlePipelineRun, runPipelineSequence } from '@/lib/projectPipelineRunner';
import type { PipelineRun } from '@/types/pipeline.type';
import { useHorizontalPanelResize } from '@/hooks/useHorizontalPanelResize';
import { cn } from '@/lib/utils';

/** 태스크 종료 후 배포 완료를 지켜보는 시간 */
const DEPLOY_WATCH_MS = 3 * 60 * 1000;

const AGENT_CHAT_PANEL_MIN_WIDTH = 280;
const AGENT_CHAT_PANEL_MAX_WIDTH = 640;
const AGENT_CHAT_PANEL_DEFAULT_WIDTH = 380;

type AgentSidebarTab = 'list' | 'conversation';
type RightPanelView = 'preview' | 'code' | 'pipeline';

type ProjectAgentPageProps = {
  projectId: number;
  project: GetProjectDetailResType;
};

function ProjectAgentPage({ projectId, project }: ProjectAgentPageProps) {
  const [homePrompt] = useState(() => consumePendingHomeAgentPrompt());
  const [sidebarTab, setSidebarTab] = useState<AgentSidebarTab>('conversation');
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [isNewConversation, setIsNewConversation] = useState(() => homePrompt !== null);
  const [deletingConversationId, setDeletingConversationId] = useState<number | null>(null);
  const [connectedRepo, setConnectedRepo] = useState<GithubRepository | null>(null);
  const [hasDisconnectedRepository, setHasDisconnectedRepository] = useState(false);
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>('preview');
  const [previewFrameKey, setPreviewFrameKey] = useState(0);
  const [isAgentTaskActive, setIsAgentTaskActive] = useState(false);
  const [deployWatchStartedAt, setDeployWatchStartedAt] = useState<number | null>(null);
  const [isDeployWatchActive, setIsDeployWatchActive] = useState(false);
  const [pipelineRun, setPipelineRun] = useState<PipelineRun>(() => createIdlePipelineRun());
  const pipelineAbortRef = useRef<AbortController | null>(null);
  const wasAgentTaskActiveRef = useRef(false);

  const { width: chatPanelWidth, handleResizeStart: handleChatPanelResizeStart } =
    useHorizontalPanelResize({
      defaultWidth: AGENT_CHAT_PANEL_DEFAULT_WIDTH,
      minWidth: AGENT_CHAT_PANEL_MIN_WIDTH,
      maxWidth: AGENT_CHAT_PANEL_MAX_WIDTH,
    });

  const queryClient = useQueryClient();
  const { data: repositorySettings } = useProjectRepositorySettingsQuery(
    'project-agent-page',
    projectId,
  );
  const connectRepositoryMutation = useMutation({
    mutationFn: (params: PostProjectRepositoryReqType) => postProjectRepository(projectId, params),
    onSuccess: async (result) => {
      setConnectedRepo(toGithubRepositoryFromBinding(result));
      setHasDisconnectedRepository(false);
      await queryClient.invalidateQueries({ queryKey: ['project-repository-settings'] });
      await queryClient.invalidateQueries({ queryKey: ['github-repository-list'] });
    },
    // GitHub 연동이 끊겨서 실패했을 수 있다. 사용자 정보를 다시 읽으면
    // 재인증이 필요한 경우 모달이 뜬다 — 서버 오류 문구만 보고 막히지 않게 한다
    onError: () => {
      void refreshUserInfoInBackground();
    },
  });
  const disconnectRepositoryMutation = useMutation({
    mutationFn: () => deleteProjectRepository(projectId),
    onSuccess: async () => {
      setConnectedRepo(null);
      setHasDisconnectedRepository(true);
      await queryClient.invalidateQueries({ queryKey: ['project-repository-settings'] });
    },
  });

  const connectedRepoLabel = hasDisconnectedRepository
    ? null
    : (connectedRepo?.fullName ?? repositorySettings?.repositoryFullName);
  const isRepositoryConnected =
    !hasDisconnectedRepository && (connectedRepo != null || repositorySettings?.connected === true);
  const isRepositoryBusy =
    connectRepositoryMutation.isPending || disconnectRepositoryMutation.isPending;

  const isPipelineRunning = pipelineRun.status === 'running';

  const handleDisconnectRepository = useCallback(async () => {
    await disconnectRepositoryMutation.mutateAsync();
  }, [disconnectRepositoryMutation]);

  const handleSelectRepository = useCallback(
    async (repository: GithubRepository) => {
      const payload = postProjectRepositoryReqSchema.parse({
        repositoryMode: 'existing',
        repositoryName: repository.name,
        repositoryFullName: repository.fullName,
        repositoryVisibility: repository.visibility,
      });
      await connectRepositoryMutation.mutateAsync(payload);
    },
    [connectRepositoryMutation],
  );

  const handleCreateRepository = useCallback(
    async (params: PostProjectRepositoryCreateFormType) => {
      const payload = postProjectRepositoryReqSchema.parse({
        repositoryMode: 'create',
        repositoryName: params.repositoryName,
        repositoryFullName: null,
        repositoryVisibility: params.repositoryVisibility,
      });
      await connectRepositoryMutation.mutateAsync(payload);
    },
    [connectRepositoryMutation],
  );

  const handleDeployPipelineStart = useCallback(async () => {
    pipelineAbortRef.current?.abort();
    const controller = new AbortController();
    pipelineAbortRef.current = controller;
    setRightPanelView('pipeline');

    try {
      await runPipelineSequence(setPipelineRun, { signal: controller.signal });
    } finally {
      if (pipelineAbortRef.current === controller) {
        pipelineAbortRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      pipelineAbortRef.current?.abort();
    };
  }, []);

  // 태스크 종료 후 이 시간 동안 배포 완료를 지켜본다. 실측 배포는 30~50초라 넉넉하다
  useEffect(() => {
    if (deployWatchStartedAt == null) return;

    setIsDeployWatchActive(true);
    const timer = setTimeout(() => setIsDeployWatchActive(false), DEPLOY_WATCH_MS);
    return () => clearTimeout(timer);
  }, [deployWatchStartedAt]);

  const { data: conversations = [], isLoading: isConversationsLoading } =
    useProjectConversationListQuery(AGENT_CHAT_QUERY_KEY, projectId);

  const activeConversations = useMemo(
    () =>
      [...conversations]
        .filter((conversation) => !conversation.deleted)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [conversations],
  );

  const resolvedConversationId = isNewConversation
    ? activeConversationId
    : (activeConversationId ?? activeConversations[0]?.conversationId ?? null);

  const {
    data: projectPreview,
    isLoading: isPreviewLoading,
    isFetching: isPreviewFetching,
    refetch: refetchProjectPreview,
  } = useProjectPreviewQuery('project-agent-page', projectId, isAgentTaskActive);

  // 배포 완료는 태스크가 끝난 한참 뒤 GitHub 웹훅으로 확정된다. 이 쿼리가 배포 중에
  // 스스로 폴링하고, 그동안 서버가 대화에 덧붙이는 완료 안내도 같이 다시 읽게 한다
  // 배포 여부를 개요로 판단하지 않는다. 개요는 한 번 부를 때마다 서버가 GitHub 을 두 번
  // 때리므로(최근 커밋 · 저장소 상태) 상시 폴링하면 사용자 한 명이 화면 한 장으로
  // GitHub 레이트 리밋을 크게 갉아먹는다. 완료 안내를 실제로 실어오는 건 대화 메시지
  // 조회이고 그쪽은 순수 DB 라 싸다 — 그래서 그쪽만 상시 폴링한다.
  //
  // 감시 창은 태스크 종료 직후 메시지 간격을 좁히는 용도로만 남긴다. 창이 안 열려도
  // 기본 폴링이 받아내므로 이제 정확성이 여기에 걸려 있지 않다.
  const isDeployInFlight = isDeployWatchActive;

  const activePreviewSessionId =
    projectPreview?.status === 'ACTIVE' && projectPreview.sessionId
      ? projectPreview.sessionId
      : null;

  // 게이트웨이는 URL만으로 열리지 않는다 — 표시 직전 열람 권한(소유권 쿠키)을 발급받고,
  // 토큰이 회전되므로 세션 응답이 아니라 이 응답의 previewUrl을 iframe에 쓴다 (Issue #77)
  const {
    data: previewAccess,
    isLoading: isPreviewAccessLoading,
    isError: isPreviewAccessError,
    error: previewAccessError,
  } = usePreviewAccessQuery('project-agent-page', activePreviewSessionId, previewFrameKey);

  const previewUrl = useMemo(
    () =>
      activePreviewSessionId && previewAccess
        ? resolvePreviewFrameUrl(previewAccess.previewUrl)
        : '',
    [activePreviewSessionId, previewAccess],
  );

  // 발급 실패(권한 만료·종료된 세션 등)면 세션 상태를 다시 동기화한다
  useEffect(() => {
    if (isPreviewAccessError) void refetchProjectPreview();
  }, [isPreviewAccessError, refetchProjectPreview]);

  const previewPhase = useMemo(
    () =>
      deriveAgentPreviewPhase({
        previewUrl,
        sessionStatus: projectPreview?.status,
      }),
    [previewUrl, projectPreview?.status],
  );

  const provisionPreviewMutation = useMutation({
    mutationFn: () => postProjectPreviewSession(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['project-preview-session', 'project-agent-page', projectId],
      });
    },
  });

  const handleRefreshPreview = () => {
    setRightPanelView('preview');
    setPreviewFrameKey((key) => key + 1);
    void refetchProjectPreview();
  };

  const handleLoadPreview = () => {
    setRightPanelView('preview');
    setPreviewFrameKey((key) => key + 1);
    provisionPreviewMutation.mutate();
  };

  // AgentConversationPanel이 매 렌더에서 부르므로 identity를 고정한다.
  //
  // 태스크가 끝나는 순간 감시 창을 연다. 배포 태스크는 "접수했습니다"만 남기고 그 자리에서
  // 끝나고, 실제 배포는 그 뒤 워커가 비동기로 돌린다 — 즉 배포는 태스크 구간 **밖**에서
  // 시작해서 끝난다. 상태를 보고 폴링을 켜려 하면 "배포 시작을 알아야 폴링하고 폴링해야
  // 배포 시작을 안다"는 교착에 계속 걸리므로, 관측 가능한 사건(태스크 종료)을 기점으로
  // 일정 시간 무조건 지켜본다.
  const handleAgentTaskActiveChange = useCallback((isActive: boolean) => {
    setIsAgentTaskActive(isActive);
    // 실제로 돌던 태스크가 끝났을 때만 연다. 패널은 마운트 시에도 false를 알리는데
    // 거기에 반응하면 페이지를 열 때마다 3분씩 폴링하게 된다
    if (!isActive && wasAgentTaskActiveRef.current) {
      setDeployWatchStartedAt(Date.now());
    }
    wasAgentTaskActiveRef.current = isActive;
  }, []);

  const handleConversationActivity = () => {
    void queryClient.invalidateQueries({
      queryKey: ['project-preview-session', 'project-agent-page', projectId],
    });
  };

  const invalidateConversationQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: ['project-conversation-list', AGENT_CHAT_QUERY_KEY, projectId],
    });
    void queryClient.invalidateQueries({
      queryKey: ['trash-conversation-list', AGENT_CHAT_QUERY_KEY],
    });
  };

  const deleteConversationMutation = useMutation({
    mutationFn: deleteConversation,
    onMutate: (conversationId) => {
      setDeletingConversationId(conversationId);
    },
    onSuccess: (_, conversationId) => {
      if (activeConversationId === conversationId) {
        setActiveConversationId(null);
        setIsNewConversation(false);
        if (sidebarTab === 'conversation') {
          setSidebarTab('list');
        }
      }
      invalidateConversationQueries();
    },
    onSettled: () => {
      setDeletingConversationId(null);
    },
  });

  const handleDeleteChat = (conversationId: number) => {
    if (deletingConversationId !== null) return;
    deleteConversationMutation.mutate(conversationId);
  };

  const tabButtonClass = (isActive: boolean) =>
    `flex flex-1 items-center justify-center gap-1 border-b-2 px-1.5 py-2.5 text-[11px] font-semibold transition ${
      isActive
        ? 'border-[#7c3aed] text-[#7c3aed]'
        : 'border-transparent text-[#94a3b8] hover:text-[#64748b]'
    }`;

  return (
    <div className="flex h-[calc(100vh)] min-h-0 w-full overflow-hidden bg-[#f4f5f7]">
      <section
        className="relative flex shrink-0 flex-col border-r border-[#e2e8f0] bg-white"
        style={{ width: chatPanelWidth }}
      >
        <header className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-3">
          <h1 className="text-[14px] font-bold text-[#0f172a]">SYS.AI Agent</h1>
          <button type="button" className="text-[12px] font-medium text-[#7c3aed] hover:underline">
            도움말 보기
          </button>
        </header>

        <div
          role="tablist"
          aria-label="에이전트 사이드바"
          className="flex border-b border-[#f1f5f9] px-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={sidebarTab === 'list'}
            onClick={() => setSidebarTab('list')}
            className={tabButtonClass(sidebarTab === 'list')}
          >
            <MessageSquare className="size-3.5 shrink-0" />
            채팅 목록
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarTab === 'conversation'}
            onClick={() => setSidebarTab('conversation')}
            className={tabButtonClass(sidebarTab === 'conversation')}
          >
            대화
          </button>
        </div>

        {sidebarTab === 'list' ? (
          <AgentChatListPanel
            conversations={activeConversations}
            isLoading={isConversationsLoading}
            deletingConversationId={deletingConversationId}
            activeConversationId={resolvedConversationId}
            onSelectChat={(conversationId) => {
              setIsNewConversation(false);
              setActiveConversationId(conversationId);
              setSidebarTab('conversation');
              void queryClient.invalidateQueries({
                queryKey: ['project-preview-session', 'project-agent-page', projectId],
              });
              void queryClient.prefetchQuery({
                queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, conversationId],
                queryFn: () => getConversationMessageList(conversationId),
              });
            }}
            onDeleteChat={handleDeleteChat}
            onNewChat={() => {
              setIsNewConversation(true);
              setActiveConversationId(null);
              setSidebarTab('conversation');
            }}
          />
        ) : (
          <AgentConversationPanel
            key={String(resolvedConversationId ?? 'new')}
            projectId={projectId}
            projectName={formatProjectDisplayName(project.name, project.projectId)}
            conversationId={resolvedConversationId}
            isNewConversation={isNewConversation}
            initialPrompt={isNewConversation ? homePrompt : null}
            onConversationCreated={(conversationId) => {
              setActiveConversationId(conversationId);
              setIsNewConversation(false);
            }}
            onConversationActivity={handleConversationActivity}
            onAgentTaskActiveChange={handleAgentTaskActiveChange}
            isDeployInFlight={isDeployInFlight}
            onDeployPipelineStart={handleDeployPipelineStart}
          />
        )}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="채팅 패널 너비 조절"
          onPointerDown={handleChatPanelResizeStart}
          className={cn(
            'absolute -right-1 top-0 z-20 h-full w-2 touch-none',
            'cursor-col-resize bg-transparent',
            'hover:bg-[#7c3aed]/15 active:bg-[#7c3aed]/25',
          )}
        />
      </section>

      <section className="flex min-w-0 flex-1 flex-col bg-[#ececee]">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e8f0] bg-white px-4 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Link
              to="/project/$slug"
              params={{ slug: String(projectId) }}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-[#f8fafc]"
              aria-label="프로젝트 상세로"
            >
              <ChevronLeft className="size-4" />
            </Link>
            <div className="flex min-w-0 items-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-1">
              <button type="button" className="rounded p-1.5 text-[#94a3b8] hover:bg-white">
                <ChevronLeft className="size-3.5" />
              </button>
              <button type="button" className="rounded p-1.5 text-[#94a3b8] hover:bg-white">
                <ChevronRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleRefreshPreview}
                className="cursor-pointer rounded p-1.5 text-[#94a3b8] hover:bg-white"
                aria-label="미리보기 새로고침"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setRightPanelView((view) => (view === 'code' ? 'preview' : 'code'))}
                aria-label="코드 보기"
                aria-pressed={rightPanelView === 'code'}
                className={cn(
                  'rounded p-1.5 transition',
                  rightPanelView === 'code'
                    ? 'bg-white text-[#0f172a] shadow-sm ring-1 ring-[#e2e8f0]'
                    : 'text-[#94a3b8] hover:bg-white',
                )}
              >
                <Code className="size-3.5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5">
              <span className="truncate text-[12px] text-[#64748b]">
                {connectedRepoLabel
                  ? `/${connectedRepoLabel}`
                  : previewPhase === 'ready'
                    ? previewUrl
                    : '/'}
              </span>
            </div>
            <span className="hidden shrink-0 rounded-full bg-[#ede9fe] px-2 py-0.5 text-[10px] font-semibold text-[#7c3aed] sm:inline">
              preview branch
            </span>
          </div>

          <div className="flex items-center gap-2">
            <GithubRepositoryPicker
              defaultRepositoryName={project.name}
              connectedRepositoryFullName={connectedRepoLabel}
              isConnected={isRepositoryConnected}
              isSubmitting={isRepositoryBusy}
              onSelect={handleSelectRepository}
              onCreate={handleCreateRepository}
              onDisconnect={handleDisconnectRepository}
            />
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155]"
            >
              <Share2 className="size-3.5" />
              Share
            </button>
            <button
              type="button"
              onClick={() =>
                setRightPanelView((view) => (view === 'pipeline' ? 'preview' : 'pipeline'))
              }
              aria-pressed={rightPanelView === 'pipeline'}
              className={cn(
                'inline-flex h-8 items-center rounded-lg px-3 text-[12px] font-semibold transition',
                rightPanelView === 'pipeline'
                  ? 'bg-[#1e293b] text-white ring-2 ring-[#0f172a]/20 ring-offset-1'
                  : 'bg-[#0f172a] text-white hover:bg-[#1e293b]',
              )}
            >
              게시
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155]"
            >
              <Pencil className="size-3.5" />
              편집
            </button>
            <button
              type="button"
              onClick={handleRefreshPreview}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b]"
              aria-label="미리보기 불러오기"
            >
              <RefreshCw className={`size-3.5 ${isPreviewFetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {rightPanelView === 'code' ? (
          <ProjectCodeExplorerPanel />
        ) : rightPanelView === 'pipeline' ? (
          <ProjectPipelinePanel run={pipelineRun} isRunning={isPipelineRunning} />
        ) : (
          <AgentSitePreviewPanel
            phase={previewPhase}
            previewUrl={previewUrl}
            frameKey={previewFrameKey}
            isLoading={(isPreviewLoading || isPreviewAccessLoading) && !previewUrl}
            onLoadPreview={handleLoadPreview}
            failureReason={
              projectPreview?.failureReason?.trim() ||
              extractApiErrorMessage(provisionPreviewMutation.error) ||
              extractApiErrorMessage(previewAccessError) ||
              ''
            }
            isProvisioning={
              projectPreview?.status === 'PROVISIONING' || provisionPreviewMutation.isPending
            }
          />
        )}
      </section>
    </div>
  );
}

export default ProjectAgentPage;
