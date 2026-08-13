import type { PipelineRun, PipelineStep, PipelineStepStatus } from '@/types/pipeline.type';

const PLAYBACK_STEP_MS = 600;

/** UI에 표시하는 4단계 파이프라인 (GitHub Actions 세부 스텝과 분리) */
export const PIPELINE_DISPLAY_STEPS: Omit<PipelineStep, 'status' | 'duration'>[] = [
  { id: 'install', label: '의존성 설치', description: 'npm install' },
  { id: 'build', label: '빌드', description: 'vite build' },
  { id: 'preview', label: '프리뷰 배포', description: 'GitHub Pages 준비' },
  { id: 'publish', label: '프로덕션 게시', description: 'gh-pages 배포' },
];

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

function buildIdleSteps(): PipelineStep[] {
  return PIPELINE_DISPLAY_STEPS.map((step) => ({
    ...step,
    status: 'pending' as const,
  }));
}

export function createIdlePipelineRun(): PipelineRun {
  return {
    id: 'run-idle',
    branch: 'main',
    triggeredAt: '대기 중',
    status: 'idle',
    steps: buildIdleSteps(),
    logs: [],
  };
}

export async function runPipelineSequence(
  setRun: (updater: (prev: PipelineRun) => PipelineRun) => void,
  options?: { signal?: AbortSignal },
): Promise<'success' | 'aborted'> {
  const signal = options?.signal;

  setRun(() => ({
    id: `run-${Date.now()}`,
    branch: 'main',
    triggeredAt: new Date().toLocaleString('ko-KR'),
    status: 'running',
    steps: buildIdleSteps(),
    logs: [],
  }));

  try {
    for (const step of PIPELINE_DISPLAY_STEPS) {
      if (signal?.aborted) return 'aborted';

      setRun((prev) => ({
        ...prev,
        status: 'running',
        steps: updateStepStatus(prev.steps, step.id, 'running'),
        logs: [...prev.logs, `${step.label} 시작`],
      }));

      await delay(PLAYBACK_STEP_MS, signal);

      setRun((prev) => ({
        ...prev,
        steps: updateStepStatus(prev.steps, step.id, 'success'),
        logs: [...prev.logs, `${step.label} 완료`],
      }));
    }

    setRun((prev) => ({ ...prev, status: 'success' }));
    return 'success';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'aborted';
    }
    throw error;
  }
}
