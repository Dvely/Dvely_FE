/**
 * 시연 모드 스위치.
 *
 * 실제 백엔드는 에이전트 작업·EC2 프로비저닝·RDS 생성이 분 단위로 걸려서 90초짜리
 * 시연 영상에 담을 수 없다. 시연 모드는 그 왕복을 전부 화면 안에서 흉내 내
 * 네트워크 없이도 같은 화면이 같은 순서로 흐르게 한다.
 *
 * **기본값은 꺼짐이다.** 환경변수로만 켜지므로 운영 빌드에는 절대 섞이지 않는다 —
 * `.env.demo` 를 쓰는 `bun run dev:demo` 로만 들어온다.
 */
export const IS_DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

/**
 * 시연 배속. 모든 대기 시간을 이 값으로 나눈다.
 *
 * 1 이면 아래 상수 그대로(전체 흐름이 1분 남짓), 2 면 절반이다. 리허설에서는 크게,
 * 실제 촬영에서는 1 로 두고 편집에서 자르는 쪽이 화면 전환이 자연스럽다.
 */
const rawSpeed = Number(import.meta.env.VITE_DEMO_SPEED);
export const DEMO_SPEED = Number.isFinite(rawSpeed) && rawSpeed > 0 ? rawSpeed : 1;

/** 배속을 적용한 밀리초 */
export function demoMs(base: number) {
  return Math.round(base / DEMO_SPEED);
}
