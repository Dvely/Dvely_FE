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
 * 랜딩의 시작 버튼이 자동 재생을 부르는 이벤트.
 *
 * 운영 코드가 재생기(director)를 직접 import 하면 `if (IS_DEMO)` 로 막아도 재생기 모듈이
 * 운영 번들에 그대로 실린다 — 장면 대본·자막·시연용 키까지. 이벤트로 이어 두면 재생기는
 * 시연 빌드에서만 마운트되는 DemoCaption 쪽에만 걸린다.
 */
export const DEMO_START_EVENT = 'qeploy-demo:start';

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

/*
  화면 시계.

  시연은 실제로 수십 분 걸리는 일(코드 생성 수 분, RDS·EC2 5~10분, 배포 수 분)을 80여 초에
  담는다. 그런데 화면에 찍히는 시각이 벽시계 그대로면 진행 로그·승인 이력이 전부 같은
  분(11:11)으로 찍혀서, 시간을 접었다는 사실이 화면에서 사라지고 오히려 어색해진다.

  그래서 화면에 적히는 시각은 따로 흐르는 시계를 쓴다. 장면마다 배속(×N)을 정하면 그
  장면 동안 시계가 N배로 가고, 자막에도 같은 ×N 을 띄운다 — 자막의 배속과 화면 시각의
  흐름이 같은 숫자에서 나온다.

  시연 진행 속도(위 sceneSpeed)와는 다르다. 그것은 시나리오 타이머를 줄이는 내부 장치고,
  보는 사람에게 약속하는 것은 이 시계다.
*/
let clockAt = Date.now();
let clockRealAt = Date.now();
let clockRate = 1;

/** 화면 시각(ms) */
export function demoNow() {
  return clockAt + (Date.now() - clockRealAt) * clockRate;
}

/** 지금부터 화면 시계를 이 배속으로 흘린다. 여기까지 흐른 시각은 그대로 둔다 */
export function setClockRate(rate: number) {
  clockAt = demoNow();
  clockRealAt = Date.now();
  clockRate = rate > 0 ? rate : 1;
}

export function getClockRate() {
  return clockRate;
}

/** 시계를 이 시각에 맞추고 실시간으로 되돌린다 */
export function resetDemoClock(startAt: number) {
  clockAt = startAt;
  clockRealAt = Date.now();
  clockRate = 1;
}
