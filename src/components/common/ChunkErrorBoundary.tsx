import { Component, type ErrorInfo, type ReactNode } from 'react';
import { looksLikeChunkLoadError } from '@/lib/chunkLoadError';

/**
 * 지연 로딩한 조각이 안 와도 화면이 살아 있게 한다.
 *
 * `Suspense` 는 **기다리는 것만** 다룬다. `lazy(() => import(...))` 가 거절되면 렌더 중에
 * throw 되고, 그건 Suspense 가 아니라 에러 경계가 받아야 한다. 경계가 없으면 React 가
 * 트리를 통째로 버려서 **빈 화면**이 된다 — 한 줄이 서식을 못 입는 것과는 전혀 다른 결과다.
 *
 * 이 일이 실제로 나는 자리는 배포 직후다. 산출물이 트리째 교체되므로 열어 둔 탭이 들고
 * 있는 옛 해시 파일은 그 순간부터 404 다. 그 탭에서 조각을 처음 불러오는 순간 터진다.
 *
 * 그래서 두 가지를 한다 — 대신 보여줄 것을 그리고, 배포가 바뀐 것 같으면 바깥에 알린다.
 * 알리는 쪽은 사용자에게 새로고침을 권하기 위한 것이고, 새로고침하면 회복된다(index.html
 * 은 no-cache 라 항상 최신이 온다).
 */


type ChunkErrorBoundaryProps = {
  children: ReactNode;
  /** 조각 대신 보여줄 것. 조각이 하려던 일의 가장 단순한 형태여야 한다 */
  fallback: ReactNode;
  /** 배포가 바뀐 것으로 보일 때 한 번 부른다. 새로고침을 권하는 데 쓴다 */
  onChunkLoadError?: () => void;
};

type ChunkErrorBoundaryState = {
  hasError: boolean;
};

class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  state: ChunkErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ChunkErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (looksLikeChunkLoadError(error)) {
      this.props.onChunkLoadError?.();
      return;
    }

    /*
      조각 문제가 아닌 오류는 삼키지 않는다. 화면은 fallback 으로 버티지만, 원인을 모르면
      아무도 못 고친다 — 콘솔에는 남겨야 한다.
    */
    console.error('[chunk-boundary] 렌더 중 오류', error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export { ChunkErrorBoundary };
