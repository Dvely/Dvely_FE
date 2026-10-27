import { useEffect } from 'react';
import { ErrorComponent, type ErrorComponentProps } from '@tanstack/react-router';
import { clearAssetLoadFailure } from '@/lib/assetLoadFailure';
import { isChunkLoadError, reloadOnceForChunkFailure } from '@/lib/chunkReload';

/**
 * 라우트 조각을 못 받은 경우만 가로챈다.
 *
 * 배포가 나가면 `dist` 링크가 갈아끼워져 옛 해시 청크가 404 가 된다. 배포 전에 열어 둔
 * 탭이 다른 라우트로 옮겨가면 여기로 떨어진다 — 사용자 잘못도 아니고 고칠 방법을
 * 알려줄 수도 없는 오류라, 묻지 않고 새로고침해서 새 번들을 받는다.
 *
 * **조각 문제가 아닌 오류는 손대지 않는다.** 그건 진짜 버그일 수 있고, 새로고침으로
 * 덮으면 원인이 묻힌다. 기존 기본 화면을 그대로 쓴다.
 *
 * `router.tsx` 가 아니라 여기 두는 이유는, 컴포넌트와 컴포넌트 아닌 것을 한 파일에서
 * 내보내면 fast refresh 가 깨지기 때문이다(eslint 가 잡아준다).
 */
function RouteErrorComponent(props: ErrorComponentProps) {
  const isChunk = isChunkLoadError(props.error);
  const reloading = isChunk && reloadOnceForChunkFailure(props.error);

  /*
    전역 배너(`AssetLoadFailureNotice`)를 내린다.

    그 배너는 `vite:preloadError` 로 뜨는데, 그 신호는 **일관되게 오지 않는다** — 라우터가
    자동 분할한 조각이 처음 실패할 때는 안 쏘이고 새로고침 뒤에는 쏘인다. 그래서 배너에
    기대지 않고 이 화면이 직접 말한다. 둘 다 뜨면 같은 말을 두 번 하게 된다.
  */
  useEffect(() => {
    if (isChunk) clearAssetLoadFailure();
  }, [isChunk]);

  // 새로고침이 걸렸다. 그 사이 깜빡임을 줄이려고 빈 자리만 둔다
  if (reloading) return null;

  /*
    조각 문제인데 새로고침은 못 한다 — 방금 해봤는데 또 실패했거나(쿨다운), 저장소를
    못 읽어 루프를 막을 길이 없는 경우다. 보통은 배포가 아니라 연결 문제다.

    라우터 기본 화면은 "Something went wrong!" 이라는 영문 한 줄이라 여기서 쓰지 않는다.
    무엇이 잘못됐는지도, 무엇을 하면 되는지도 말해주지 않는다.
  */
  if (isChunk) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-[15px] font-medium text-[#0f172a]">화면을 불러오지 못했습니다.</p>
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          연결이 불안정하거나, 방금 새 버전이 배포됐을 수 있습니다.
          <br />
          잠시 뒤 새로고침하면 대부분 해결됩니다.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#0f172a] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1e293b]"
        >
          새로고침
        </button>
      </div>
    );
  }

  return <ErrorComponent {...props} />;
}

export default RouteErrorComponent;
