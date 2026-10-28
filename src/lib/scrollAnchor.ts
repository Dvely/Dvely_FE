/**
 * 대화를 바닥에 붙여 둘지 판단한다.
 *
 * 컴포넌트 안에 두면 테스트할 수가 없다 — 스크롤 컨테이너를 실제로 만들어야 하고,
 * 그러면 **경계값이 맞는지**가 아니라 **브라우저가 어떻게 재는지**를 보게 된다.
 * 여기서는 숫자 세 개만 받아 판단한다.
 */

/**
 * 이만큼 안쪽이면 "바닥에 있다"고 본다.
 *
 * 한 줄 높이(약 20px)로는 모자라다. 사용자가 바닥에 있다고 여기는 범위는 그보다 넓고,
 * 스크롤 관성이 멈춘 자리가 몇 px 떠 있는 일도 흔하다. 그때마다 따라가기를 놓으면
 * "거의 바닥인데 안 따라온다"가 된다.
 */
const NEAR_BOTTOM_PX = 80;

type ScrollMetrics = {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
};

/** 바닥에서 얼마나 떨어져 있는지. 음수가 나올 수 있다(고무줄 스크롤) */
function distanceFromBottom({ scrollHeight, scrollTop, clientHeight }: ScrollMetrics): number {
  return scrollHeight - scrollTop - clientHeight;
}

/**
 * 바닥 근처인가.
 *
 * 내용이 화면보다 짧아 스크롤이 아예 없을 때도 참이다 — 그때는 거리가 0 이고,
 * 사용자는 모든 내용을 보고 있으므로 새 내용을 따라가는 게 맞다.
 */
function isNearBottom(metrics: ScrollMetrics, threshold: number = NEAR_BOTTOM_PX): boolean {
  return distanceFromBottom(metrics) <= threshold;
}

export { NEAR_BOTTOM_PX, distanceFromBottom, isNearBottom, type ScrollMetrics };
