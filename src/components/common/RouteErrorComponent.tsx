import { useEffect } from 'react';
import type { ErrorComponentProps } from '@tanstack/react-router';
import AppErrorScreen from '@/components/common/AppErrorScreen';
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
      <AppErrorScreen
        title="화면을 불러오지 못했습니다."
        description={
          '연결이 불안정하거나, 방금 새 버전이 배포됐을 수 있습니다.\n잠시 뒤 다시 시도하면 대부분 해결됩니다.'
        }
        // 이 경우는 reset 으로 안 풀린다. 사라진 조각을 다시 받으려면 새 index.html 이 필요하다
        onRetry={() => window.location.reload()}
      />
    );
  }

  /*
    조각 문제가 아닌 오류. **무엇이 잘못됐는지는 여기서 알 수 없다** — 라우트 로더가
    던졌을 수도, 렌더 중 버그일 수도 있다. 그래서 원인을 짐작해 적지 않고, 대신
    **나갈 길**을 준다.

    라우터 기본 `ErrorComponent` 를 쓰지 않는 이유는 영문이기 때문만이 아니다. 그
    화면은 "Something went wrong!" 한 줄과 오류 원문 펼치기뿐이라, 사용자가 할 수
    있는 일이 없다.
  */
  return (
    <AppErrorScreen
      title="화면을 여는 중 문제가 생겼습니다."
      description={'잠시 뒤 다시 시도해 주세요.\n계속된다면 홈으로 돌아간 뒤 다시 들어와 보세요.'}
      onRetry={props.reset}
      detail={errorDetail(props.error)}
    />
  );
}

/** 제보 받을 때 쓸 한 줄. 사용자에게는 접힌 채로 둔다 */
function errorDetail(error: unknown): string | null {
  if (error instanceof Error) return error.message || error.name;
  if (typeof error === 'string') return error;
  return null;
}

export default RouteErrorComponent;
