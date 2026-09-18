export const IS_SCRATCH_ENABLED = false;

export const scratchConfig = {
  retries: 1,
  label: 'scratch',
};

export function scratchPad(): boolean {
  return IS_SCRATCH_ENABLED;
}

export function scratchNoop() {}
