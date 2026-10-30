/**
 * 사용자 정보를 다시 읽고 그것이 화면에 반영된 뒤에 닫는다.
 *
 * GitHub App 설치(또는 재인증) 팝업이 끝나면 권한 안내를 닫고 사용자 정보를 다시 읽는다.
 * 예전에는 **닫은 다음에** 읽어서, 안내가 걷힌 화면이 잠깐 옛 정보(미설치)로 그려졌다.
 *
 * 다만 영원히 기다리지는 않는다. 서버가 늦거나 실패해도 `timeoutMs` 가 지나면 닫는다 —
 * 설치는 이미 GitHub 에서 끝났고, 사용자 정보는 다음에 읽을 때 맞춰진다. 안내가 안 닫혀
 * 화면이 막히는 쪽이 훨씬 나쁘다.
 */

/** 사용자 정보가 이만큼 안 오면 기다리지 않고 닫는다 */
const REFRESH_BEFORE_CLOSE_TIMEOUT_MS = 5000;

type CloseAfterRefreshOptions = {
  /** 다시 읽기. 실패해도 된다 — 닫는 것은 막지 않는다 */
  refresh: () => Promise<unknown>;
  close: () => void;
  timeoutMs?: number;
};

async function closeAfterRefresh({
  refresh,
  close,
  timeoutMs = REFRESH_BEFORE_CLOSE_TIMEOUT_MS,
}: CloseAfterRefreshOptions): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    await Promise.race([
      refresh().then(
        () => undefined,
        () => undefined,
      ),
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }

  /*
    한 태스크를 넘긴 뒤 닫는다. 다시 읽은 값은 쿼리 캐시에 바로 들어가지만, 그것을 보는
    화면에는 다음 태스크에 알려진다(TanStack Query 의 notifyManager). 같은 태스크 안에서
    닫으면 안내가 먼저 걷히고, 화면이 무거울 때는 그 사이가 한 프레임 넘게 찍혔다.
  */
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
  close();
}

export { REFRESH_BEFORE_CLOSE_TIMEOUT_MS, closeAfterRefresh };
