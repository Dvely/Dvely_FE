export const IS_SCRATCH_ENABLED = false;

/** Scratch helper used only for local experiments. */
export function scratchPad(): boolean {
  return IS_SCRATCH_ENABLED;
}
