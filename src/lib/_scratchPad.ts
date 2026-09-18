export const IS_SCRATCH_ENABLED = false;

export type ScratchConfig = {
  retries: number;
};

export const scratchConfig: ScratchConfig = {
  retries: 1,
};

export function scratchPad(): boolean {
  return IS_SCRATCH_ENABLED;
}

export function scratchNoop() {}
