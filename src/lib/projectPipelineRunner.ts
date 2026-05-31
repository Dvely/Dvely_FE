import type { PipelineRun, PipelineStep, PipelineStepStatus } from '@/mocks/project/pipeline';

export type PipelineStepDefinition = {
  id: string;
  label: string;
  description: string;
  durationMs: number;
  successDuration: string;
  startLogs: string[];
  completeLog: string;
};

export const PIPELINE_STEP_DEFINITIONS: PipelineStepDefinition[] = [
  {
    id: 'install',
    label: '의존성 설치',
    description: 'bun install',
    durationMs: 2_000,
    successDuration: '25s',
    startLogs: ['Running bun install...'],
    completeLog: 'bun install — 248 packages',
  },
  {
    id: 'build',
    label: '빌드',
    description: 'vite build',
    durationMs: 3_000,
    successDuration: '55s',
    startLogs: ['Running vite build...', 'transforming modules...'],
    completeLog: 'vite build completed',
  },
  {
    id: 'preview',
    label: '프리뷰 배포',
    description: 'preview 환경 배포',
    durationMs: 3_000,
    successDuration: '50s',
    startLogs: ['Deploying to preview environment...', 'Uploading build artifacts...'],
    completeLog: 'Preview deployed — https://preview.dvely.app/run',
  },
  {
    id: 'publish',
    label: '프로덕션 게시',
    description: 'live 도메인 반영',
    durationMs: 2_000,
    successDuration: '25s',
    startLogs: ['Publishing to production...', 'Updating live domain DNS...'],
    completeLog: 'Production publish complete — live domain active',
  },
];

function formatLogTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function appendLog(logs: string[], message: string): string[] {
  const stamp = formatLogTime(new Date());
  return [...logs, `[${stamp}] ${message}`];
}

function updateStepStatus(
  steps: PipelineStep[],
  stepId: string,
  status: PipelineStepStatus,
  duration?: string,
): PipelineStep[] {
  return steps.map((step) =>
    step.id === stepId ? { ...step, status, duration: duration ?? step.duration } : step,
  );
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timeoutId = window.setTimeout(() => resolve(), ms);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

export function createIdlePipelineRun(): PipelineRun {
  return {
    id: `run-${Date.now()}`,
    branch: 'preview',
    triggeredAt: '대기 중',
    status: 'idle',
    steps: PIPELINE_STEP_DEFINITIONS.map((definition) => ({
      id: definition.id,
      label: definition.label,
      description: definition.description,
      status: 'pending',
    })),
    logs: [],
  };
}

export async function runPipelineSequence(
  setRun: (updater: (prev: PipelineRun) => PipelineRun) => void,
  options?: { signal?: AbortSignal },
): Promise<'success' | 'aborted'> {
  const signal = options?.signal;
  const runId = Date.now();

  setRun(() => ({
    id: `run-${runId}`,
    branch: 'preview',
    triggeredAt: '방금 전',
    status: 'running',
    steps: PIPELINE_STEP_DEFINITIONS.map((definition) => ({
      id: definition.id,
      label: definition.label,
      description: definition.description,
      status: 'pending',
    })),
    logs: appendLog([], `Pipeline run #${runId} started`),
  }));

  try {
    for (const definition of PIPELINE_STEP_DEFINITIONS) {
      if (signal?.aborted) return 'aborted';

      setRun((prev) => ({
        ...prev,
        status: 'running',
        steps: updateStepStatus(prev.steps, definition.id, 'running'),
        logs: definition.startLogs.reduce((logs, line) => appendLog(logs, line), prev.logs),
      }));

      await delay(definition.durationMs, signal);

      setRun((prev) => ({
        ...prev,
        steps: updateStepStatus(prev.steps, definition.id, 'success', definition.successDuration),
        logs: appendLog(prev.logs, definition.completeLog),
      }));
    }

    setRun((prev) => ({
      ...prev,
      status: 'success',
      logs: appendLog(prev.logs, 'Pipeline finished successfully'),
    }));

    return 'success';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'aborted';
    }
    throw error;
  }
}
