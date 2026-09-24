import { Component, type ErrorInfo, type ReactNode } from 'react';

type ChunkErrorBoundaryProps = {
  children: ReactNode;
  /** 대신 보여줄 것. 조각이 하려던 일의 가장 단순한 형태여야 한다 */
  fallback: ReactNode;
  /**
   * 값이 바뀌면 다시 시도한다.
   *
   * 한 번 실패하면 영영 대신 보여줄 것만 나오는 상태를 피하려는 것이다. 내용이 바뀐
   * 메시지는 다시 그려볼 가치가 있다.
   */
  resetKey?: unknown;
};

type ChunkErrorBoundaryState = {
  hasError: boolean;
};

/**
 * 지연 로딩한 조각이 안 와도 화면이 살아 있게 한다.
 *
 * `Suspense` 는 **기다리는 것만** 다룬다. `lazy(() => import(...))` 가 거절되면 렌더 중에
 * throw 되고, 그건 Suspense 가 아니라 에러 경계가 받아야 한다. 경계가 없으면 React 가
 * 트리를 통째로 버려서 **빈 화면**이 된다 — 한 줄이 서식을 못 입는 것과는 전혀 다른 결과다.
 *
 * 조각 문제가 아닌 오류도 같이 받는다. 빈 화면보다는 대신 보여줄 것이 낫기 때문인데,
 * 그러면 진짜 버그가 조용히 묻힌다. 그래서 콘솔에는 반드시 남긴다 — 화면은 버티되
 * 원인은 드러나야 한다.
 *
 * 사용자에게 알리는 일은 여기서 하지 않는다. 조각을 못 받았다는 신호는 Vite 가 window 로
 * 쏘고(`vite:preloadError`), 그걸 앱 전체가 하나로 본다(`lib/assetLoadFailure`). 경계마다
 * 알리면 메시지 수만큼 중복으로 불린다.
 */
class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  state: ChunkErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ChunkErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prev: ChunkErrorBoundaryProps) {
    if (this.state.hasError && prev.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[chunk-boundary] 렌더 중 오류', error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export { ChunkErrorBoundary };
