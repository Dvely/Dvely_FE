/**
 * 시연 모드 박동.
 *
 * 어댑터는 요청이 올 때만 시나리오를 앞으로 민다. 그런데 화면 중에는 스스로 다시
 * 읽지 않는 것이 있다 — 배포 이력이 그렇다. 그런 화면에서는 요청이 안 나가니 시간도
 * 안 가고, 배포가 영원히 "진행 중"에 멈춘 것처럼 보인다.
 *
 * 그래서 바깥에서 규칙적으로 밀어 준다. 그리고 **실제로 무언가 바뀐 순간에만**
 * 조회를 무효화한다 — 매 박동마다 무효화하면 아무 일도 없는데 화면이 계속 다시
 * 그려지고, 폴링이 도는 화면에서는 요청이 배로 늘어난다.
 */
import type { QueryClient } from '@tanstack/react-query';
import { advanceDemoClock } from '@/demo/scenario';
import { demoMs } from '@/demo/config';

/** 상태가 넘어가는 순간과 화면에 뜨는 순간의 간격. 눈에 띄지 않을 만큼만 */
const BEAT_MS = 700;

export function startDemoHeartbeat(queryClient: QueryClient) {
  window.setInterval(() => {
    if (advanceDemoClock()) {
      void queryClient.invalidateQueries();
    }
  }, demoMs(BEAT_MS));
}
