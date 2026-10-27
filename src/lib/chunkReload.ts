/**
 * 배포로 사라진 조각을 만났을 때 한 번만 새로고침한다.
 *
 * 배포는 `dist` 심볼릭 링크를 새 릴리스로 갈아끼우는 것이고, nginx 는 그 링크 안쪽만
 * 내준다. 이전 릴리스 디렉터리는 디스크에 남지만 `/assets/...` 로는 닿지 않는다 —
 * 운영에서 없는 청크를 부르면 **404** 가 온다(확인함).
 *
 * 그래서 배포 **전에** 열어 둔 탭이 다른 라우트로 옮겨가면, 그 탭이 기억하는 옛 해시
 * 파일을 부르다가 실패한다. 라우트마다 청크를 쪼개기 전에는 첫 로드에 거의 다 받아
 * 뒀으므로 드러나지 않았다. 쪼갠 뒤로는 **이동할 때마다** 가능한 일이 됐다.
 *
 * `vite:preloadError` 로는 못 잡는다. 그 신호는 Vite 가 넣은 preload 보조 코드에서만
 * 나오는데, 라우터가 자동 분할로 만든 import 는 그 경로를 타지 않는다. 실제로 청크를
 * 지우고 이동해 보면 이벤트가 **안 쏘이고**, 사용자는 라우터 기본 화면("Something went
 * wrong!")을 본다. 그래서 오류 문구로 판단한다 — 브라우저마다 다르므로 넓게 잡는다.
 *
 * 새로고침하면 새 `index.html` 을 받고 해시가 맞아떨어져 풀린다. 다만 **조각을 못 받는
 * 이유가 배포만은 아니다** — 그냥 연결이 끊겼을 수도 있다. 그때 새로고침을 반복하면
 * 빈 화면을 무한히 깜빡이게 되므로, 직전 새로고침 시각을 들고 다니며 막는다.
 */

/** 마지막으로 이것 때문에 새로고침한 시각 */
const RELOAD_AT_KEY = 'qeploy.chunk-reload-at';

/**
 * 이 간격 안에 또 실패하면 새로고침해도 소용없다고 본다.
 *
 * 탭 하나를 아예 비우는 게 아니라 **시각**으로 재는 이유: 한 번만 하고 영영 막으면,
 * 같은 탭을 오래 띄워 둔 사용자가 다음 배포 때 다시 막힌다. 시간이 지났으면 그건
 * 새로운 배포일 가능성이 높으니 한 번 더 시도할 값어치가 있다.
 */
const RELOAD_COOLDOWN_MS = 10_000;

/** 조각을 못 받았다는 오류인가. 문구는 브라우저마다 다르다 */
function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');

  return (
    // Chrome
    /failed to fetch dynamically imported module/i.test(message) ||
    // Safari
    /importing a module script failed/i.test(message) ||
    // Firefox
    /error loading dynamically imported module/i.test(message) ||
    // Vite 의 CSS preload 보조 코드
    /unable to preload css/i.test(message)
  );
}

/**
 * 조각 때문이면 새로고침하고 true. 아니면 아무것도 안 하고 false.
 *
 * 저장소를 못 읽는 환경(사생활 보호 모드 등)에서는 **새로고침하지 않는다.** 막을 길이
 * 없는 채로 도는 것보다, 오류 화면을 보여주고 사용자가 직접 누르게 두는 쪽이 낫다.
 */
function reloadOnceForChunkFailure(error: unknown): boolean {
  if (!isChunkLoadError(error)) return false;

  let lastAt: number | null = null;
  try {
    const raw = sessionStorage.getItem(RELOAD_AT_KEY);
    lastAt = raw ? Number(raw) : null;
    sessionStorage.setItem(RELOAD_AT_KEY, String(Date.now()));
  } catch {
    return false;
  }

  if (lastAt && Number.isFinite(lastAt) && Date.now() - lastAt < RELOAD_COOLDOWN_MS) {
    return false;
  }

  window.location.reload();
  return true;
}

export { isChunkLoadError, reloadOnceForChunkFailure };
