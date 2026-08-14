import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  agentTaskEventSchema,
  getAgentTaskEventListParamsSchema,
  getAgentTaskEventListResSchema,
  getAgentTaskEventStreamParamsSchema,
  getAgentTaskParamsSchema,
  getAgentTaskResSchema,
  postAgentDecisionReqSchema,
  postAgentDecisionResSchema,
  postAgentTaskInputParamsSchema,
  postAgentTaskInputReqSchema,
  type AgentTaskEvent,
  type AgentTaskStatus,
  type GetAgentTaskEventListResType,
  type GetAgentTaskResType,
  type PostAgentDecisionReqType,
  type PostAgentDecisionResType,
  type PostAgentTaskInputReqType,
} from '@/types/agent.type';

const endpoint = '/agent';

/** 폴링을 멈춰도 되는 태스크 상태(완료·실패·입력/승인 대기) */
const SETTLED_AGENT_TASK_STATUSES = new Set<AgentTaskStatus>([
  'DONE',
  'FAILED',
  'CANCELLED',
  'WAITING_INPUT',
  'WAITING_APPROVAL',
  'WAITING_RESULT_APPROVAL',
]);

const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_MAX_POLL_ATTEMPTS = 150;

/** 에이전트 요청 제출 API POST */
async function postAgentDecision(params: PostAgentDecisionReqType) {
  const payload = postAgentDecisionReqSchema.parse(params);

  return Http.instance
    .post<ApiResponse<PostAgentDecisionResType>>(`${endpoint}/decision`, payload)
    .then((response) => {
      const body = succesResponse<ApiResponse<PostAgentDecisionResType>>(response);
      const data =
        body && typeof body === 'object' && 'data' in body && body.data != null ? body.data : body;
      return postAgentDecisionResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 에이전트 세션 종료 API DELETE */
async function deleteAgentSession() {
  return Http.instance.delete(`${endpoint}/session`).then(succesResponse).catch(errorResponse());
}

/** 에이전트 태스크 상태 조회 API GET */
async function getAgentTask(taskId: string) {
  const { taskId: id } = getAgentTaskParamsSchema.parse({ taskId });

  return Http.instance
    .get<ApiResponse<GetAgentTaskResType>>(`${endpoint}/tasks/${id}`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetAgentTaskResType>>(response);
      return getAgentTaskResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

const getAgentTaskStatus = getAgentTask;

type PollAgentTaskOptions = {
  intervalMs?: number;
  maxAttempts?: number;
  signal?: AbortSignal;
  /** true면 폴링을 종료한다. 없으면 종료·입력/승인 대기 상태에서 멈춘다. */
  until?: (task: GetAgentTaskResType) => boolean;
};

/** 에이전트 태스크가 종료·입력/승인 대기 상태가 될 때까지 폴링한다. */
async function pollAgentTask(taskId: string, options: PollAgentTaskOptions = {}) {
  const intervalMs = options.intervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_POLL_ATTEMPTS;
  const isComplete =
    options.until ?? ((task: GetAgentTaskResType) => SETTLED_AGENT_TASK_STATUSES.has(task.status));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (options.signal?.aborted) {
      throw new DOMException('Polling aborted', 'AbortError');
    }

    const task = await getAgentTask(taskId);
    if (isComplete(task)) {
      return task;
    }

    await new Promise<void>((resolve, reject) => {
      const onAbort = () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('Polling aborted', 'AbortError'));
      };

      const timeoutId = window.setTimeout(() => {
        options.signal?.removeEventListener('abort', onAbort);
        resolve();
      }, intervalMs);

      options.signal?.addEventListener('abort', onAbort, { once: true });
    });
  }

  throw new Error('에이전트 작업 상태 확인이 시간 초과되었습니다.');
}

/** 에이전트 태스크 취소 API DELETE */
async function deleteAgentTask(taskId: string) {
  return Http.instance
    .delete(`${endpoint}/tasks/${taskId}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 에이전트 태스크 이벤트 목록 조회 API GET */
async function getAgentTaskEventList(taskId: string, afterEventId: number | null = 0) {
  const params = getAgentTaskEventListParamsSchema.parse({
    taskId,
    afterEventId,
  });

  return Http.instance
    .get<ApiResponse<GetAgentTaskEventListResType>>(`${endpoint}/tasks/${params.taskId}/events`, {
      params: {
        afterEventId: params.afterEventId ?? 0,
      },
    })
    .then((response) => {
      const body = succesResponse<ApiResponse<GetAgentTaskEventListResType>>(response);
      return getAgentTaskEventListResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 태스크 이벤트 스트림 경로 */
function getAgentTaskEventStreamPath(taskId: string, afterEventId?: number) {
  const query = afterEventId != null ? `?afterEventId=${afterEventId}` : '';
  return `${endpoint}/tasks/${taskId}/events/stream${query}`;
}

type OpenAgentTaskEventStreamOptions = {
  afterEventId?: number | null;
  signal?: AbortSignal;
  onEvent: (event: AgentTaskEvent) => void;
};

function parseSseChunk(chunk: string): AgentTaskEvent | null {
  const dataLines: string[] = [];

  for (const line of chunk.split('\n')) {
    if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (dataLines.length === 0) return null;

  const raw = dataLines.join('\n').trim();
  if (!raw || raw === '[DONE]') return null;

  return agentTaskEventSchema.parse(JSON.parse(raw));
}

/** 에이전트 태스크 이벤트 SSE 스트림. envelope 없이 text/event-stream을 직접 수신한다. */
async function openAgentTaskEventStream(taskId: string, options: OpenAgentTaskEventStreamOptions) {
  const params = getAgentTaskEventStreamParamsSchema.parse({
    taskId,
    afterEventId: options.afterEventId ?? 0,
  });

  const baseUrl = import.meta.env.VITE_API_URL;
  const accessToken = localStorage.getItem('accessToken');
  const search = new URLSearchParams({
    afterEventId: String(params.afterEventId ?? 0),
  });
  const url = `${baseUrl}${endpoint}/tasks/${params.taskId}/events/stream?${search.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    signal: options.signal,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `SSE 연결 실패 (${response.status})`);
  }

  if (!response.body) {
    throw new Error('SSE 응답 본문이 없습니다.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split('\n\n');
    buffer = chunks.pop() ?? '';

    for (const chunk of chunks) {
      const event = parseSseChunk(chunk);
      if (event) options.onEvent(event);
    }
  }

  if (buffer.trim()) {
    const event = parseSseChunk(buffer);
    if (event) options.onEvent(event);
  }
}

/** 에이전트 태스크 사용자 입력 제출 API POST */
async function postAgentTaskInput(taskId: string, params: PostAgentTaskInputReqType) {
  const { taskId: id } = postAgentTaskInputParamsSchema.parse({ taskId });
  const payload = postAgentTaskInputReqSchema.parse(params);

  return Http.instance
    .post(`${endpoint}/tasks/${id}/input`, payload)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 실패한 태스크 재시도 API POST */
async function postAgentTaskRetry(taskId: string) {
  return Http.instance
    .post(`${endpoint}/tasks/${taskId}/retry`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 에이전트 태스크 상태 조회 Query Hook (진행 중이면 자동 폴링) */
function useAgentTaskQuery(queryKey: unknown, taskId: string | null) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['agent-task', queryKey, taskId],
    queryFn: () => getAgentTask(taskId!),
    enabled: typeof taskId === 'string' && taskId.length > 0,
    gcTime: 0,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (!status || SETTLED_AGENT_TASK_STATUSES.has(status)) return false;
      return DEFAULT_POLL_INTERVAL_MS;
    },
  });
}

/** 에이전트 태스크 이벤트 목록 조회 Query Hook */
function useAgentTaskEventListQuery(
  queryKey: unknown,
  taskId: string | null,
  afterEventId: number | null = 0,
) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['agent-task-events', queryKey, taskId, afterEventId],
    queryFn: () => getAgentTaskEventList(taskId!, afterEventId),
    enabled: typeof taskId === 'string' && taskId.length > 0,
    gcTime: 0,
  });
}

export {
  postAgentDecision,
  deleteAgentSession,
  getAgentTask,
  getAgentTaskStatus,
  pollAgentTask,
  deleteAgentTask,
  getAgentTaskEventList,
  getAgentTaskEventStreamPath,
  openAgentTaskEventStream,
  postAgentTaskInput,
  postAgentTaskRetry,
  useAgentTaskQuery,
  useAgentTaskEventListQuery,
  SETTLED_AGENT_TASK_STATUSES,
};
