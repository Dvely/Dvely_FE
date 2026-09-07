import type { TaskClarification } from '@/types/agent.type';

/** 이 둘만 컨트롤로 그린다. 서버가 새 형태를 더하면 자유 입력으로 떨어진다 */
const SELECT_INPUT_TYPES = ['SINGLE_SELECT', 'MULTI_SELECT'];

/** 선택지를 두고도 직접 적고 싶을 때 고르는 값. 서버 값과 겹치지 않게 둔다 */
const OTHER_CHOICE = '__other__';

/**
 * 이 되묻기를 골라서 답할 수 있는지.
 *
 * 선택지가 실제로 있어야 한다 — inputType 이 SELECT 라도 options 가 비어 오면 고를 게
 * 없으므로 자유 입력이 맞다. 모르는 inputType 도 마찬가지로 자유 입력으로 떨어진다.
 */
function canRenderAsChoices(clarification: TaskClarification | null): boolean {
  if (!clarification) return false;
  return SELECT_INPUT_TYPES.includes(clarification.inputType) && clarification.options.length > 0;
}

export { canRenderAsChoices, OTHER_CHOICE };
