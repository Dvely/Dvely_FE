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

/** 전체 배속. `.env.demo` 에서 한 번 정한다 */
const rawSpeed = Number(import.meta.env.VITE_DEMO_SPEED);
const BASE_SPEED = Number.isFinite(rawSpeed) && rawSpeed > 0 ? rawSpeed : 1;

/**
 * 장면별 추가 배속.
 *
 * 90초 안에 개발·인프라·배포·도메인을 다 담으려면 어떤 구간은 시간을 접어야 한다.
 * 다만 접는다는 사실은 화면에 밝힌다(자막의 배속 표시) — 조용히 빠르게 만들면
 * 보는 사람이 실제 소요 시간을 오해한다.
 */
let sceneSpeed = 1;

export function setSceneSpeed(multiplier: number) {
  sceneSpeed = multiplier > 0 ? multiplier : 1;
}

export function getSceneSpeed() {
  return sceneSpeed;
}

/** 배속을 적용한 밀리초 */
export function demoMs(base: number) {
  return Math.max(16, Math.round(base / (BASE_SPEED * sceneSpeed)));
}
