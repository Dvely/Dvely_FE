export type PipelineStepStatus = 'pending' | 'running' | 'success' | 'failed';

export type PipelineStep = {
  id: string;
  label: string;
  description: string;
  status: PipelineStepStatus;
  duration?: string;
};

export type PipelineRun = {
  id: string;
  branch: string;
  triggeredAt: string;
  status: 'running' | 'success' | 'failed' | 'idle';
  workflow?: string;
  repository?: string;
  trigger?: string;
  steps: PipelineStep[];
  logs: string[];
};
