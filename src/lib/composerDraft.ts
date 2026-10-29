/**
 * 새로고침으로 날아갈 입력을 맡아 뒀다가 돌려준다.
 *
 * 배포로 조각이 사라지면 화면이 새로고침된다(`chunkReload`, 그리고 배너의 새로고침 버튼).
 * 그때 **적던 말이 그대로 사라진다.** 길게 적어 둔 요청일수록 손해가 크고, 사용자 입장에서는
 * 자기가 뭘 잘못한 것도 아닌데 날아간 것이라 더 나쁘다.
 *
 * 맡기는 쪽은 예전에도 있었다. 다만 **읽는 자리가 없어서** 맡아만 두고 아무도 찾아가지
 * 않았다 — 약속이 지켜지지 않는 상태였다(#146).
 *
 * ## 아무 데나 붙이면 안 된다
 *
 * 돌려주는 자리를 가리지 않으면, A 대화에서 적던 말이 새로고침 뒤 B 대화 입력창에 붙는다.
 * 그건 사라지는 것보다 나쁘다 — 엉뚱한 곳에 보낼 수 있다. 그래서 맡길 때 **어느 프로젝트의
 * 어느 대화였는지**를 함께 적고, 돌려줄 때 그 자리가 맞을 때만 돌려준다.
 *
 * ## 오래된 것은 버린다
 *
 * 세션 저장소는 탭이 살아 있는 동안 남는다. 보정이 없으면 한참 전에 맡긴 말이 한참 뒤
 * 엉뚱한 순간에 입력창에 나타난다. 새로고침 직후에 찾아가는 것만 받아준다.
 */

const DRAFT_STASH_KEY = 'qeploy.reload-draft';

/**
 * 맡긴 말을 찾아갈 수 있는 시간.
 *
 * 새로고침 한 번을 건너는 것이 목적이라 짧다. 다만 청크 재다운로드·라우트 로딩에 더해
 * **로그인이 한 번 끼는 경우**까지는 살아남아야 해서 초 단위로는 모자란다. 5분이면 그
 * 경로는 넉넉히 덮고, 한참 전에 적던 말이 뒤늦게 튀어나오는 일은 막는다.
 */
const DRAFT_TTL_MS = 5 * 60 * 1000;

/** 맡긴 말이 어느 자리의 것인지 */
type ComposerDraftScope = {
  projectId: number | string;
  /** 새 대화면 아직 id 가 없다 */
  conversationId: number | null;
};

type StoredDraft = {
  scope: string;
  text: string;
  /** 맡긴 시각(ms) */
  at: number;
};

/**
 * 자리를 문자열 하나로. 프로젝트까지 넣는 이유는 **대화 id 만으로는 새 대화끼리 구분이
 * 안 되기 때문**이다 — 두 프로젝트에서 각각 새 대화를 열면 둘 다 id 가 없다.
 */
function toScopeKey({ projectId, conversationId }: ComposerDraftScope): string {
  return `${projectId}:${conversationId ?? 'new'}`;
}

/**
 * 적던 말을 맡긴다. 빈 말은 맡지 않는다 — 돌려줄 것이 없는데 자리만 차지한다.
 */
function stashComposerDraft(scope: ComposerDraftScope, text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  const stored: StoredDraft = { scope: toScopeKey(scope), text: trimmed, at: Date.now() };
  try {
    sessionStorage.setItem(DRAFT_STASH_KEY, JSON.stringify(stored));
  } catch {
    // 저장이 막힌 브라우저(사생활 보호 모드 등)면 그냥 넘어간다.
    // 입력을 지키려다 새로고침 자체를 막을 이유는 없다
  }
}

/**
 * 맡긴 말을 **한 번만** 돌려준다. 자리가 다르거나 너무 오래됐으면 빈 문자열.
 *
 * 돌려주든 버리든 **읽은 뒤에는 지운다.** 남겨두면 같은 말이 다음 방문에도 또 나타나서,
 * 사용자가 지워도 계속 돌아오는 것처럼 보인다.
 */
function takeComposerDraft(scope: ComposerDraftScope): string {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(DRAFT_STASH_KEY);
  } catch {
    return '';
  }
  if (!raw) return '';

  // 읽기로 한 이상 결과와 무관하게 치운다
  try {
    sessionStorage.removeItem(DRAFT_STASH_KEY);
  } catch {
    // 못 지워도 아래 검사가 또 걸러낸다
  }

  let stored: StoredDraft;
  try {
    stored = JSON.parse(raw) as StoredDraft;
  } catch {
    // 옛 형식(문자열 하나)으로 맡긴 값이 남아 있을 수 있다. 그 값에는 어느 자리의 것인지가
    // 없어서 돌려줄 곳을 고를 수 없다 — 엉뚱한 대화에 붙이느니 버린다
    return '';
  }

  if (!stored || typeof stored.text !== 'string' || !stored.text) return '';
  if (stored.scope !== toScopeKey(scope)) return '';
  if (!Number.isFinite(stored.at) || Date.now() - stored.at > DRAFT_TTL_MS) return '';

  return stored.text;
}

/**
 * 입력창을 가리키는 표시. 새로고침을 띄우는 쪽(배너·자동 새로고침)은 라우트 바깥에 있어서
 * **React 로는 지금 어느 대화인지 알 수 없다.** 그래서 입력창이 자기 자리를 DOM 에 적어
 * 두고, 맡기는 쪽은 그것을 읽는다.
 *
 * 예전에는 `document.querySelector('textarea')` 로 **페이지의 첫 textarea** 를 집었다.
 * 어느 자리의 입력인지 알 수 없었고, 입력창이 아닌 textarea 가 먼저 있으면 엉뚱한 값을
 * 맡았다.
 */
const COMPOSER_SELECTOR = 'textarea[data-composer-draft]';

/** 화면에 떠 있는 입력창의 말을 그 자리와 함께 맡긴다 */
function stashComposerDraftFromDom(): void {
  const composer = document.querySelector<HTMLTextAreaElement>(COMPOSER_SELECTOR);
  if (!composer) return;

  const { projectId, conversationId } = composer.dataset;
  // 자리를 모르면 맡지 않는다 — 돌려줄 곳을 고를 수 없는 값은 없는 것과 같다
  if (!projectId) return;

  const parsed = conversationId ? Number(conversationId) : Number.NaN;
  stashComposerDraft(
    { projectId, conversationId: Number.isInteger(parsed) ? parsed : null },
    composer.value,
  );
}

export {
  COMPOSER_SELECTOR,
  DRAFT_STASH_KEY,
  DRAFT_TTL_MS,
  stashComposerDraft,
  stashComposerDraftFromDom,
  takeComposerDraft,
  type ComposerDraftScope,
};
