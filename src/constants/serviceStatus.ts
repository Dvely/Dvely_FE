/*
  서비스 일시 중단 상태 (2026-10-30 부터).

  AWS 지원이 끝나 운영 EC2 를 비웠다. 프론트는 GitHub Pages 로 옮겼지만(deploy/README.md)
  백엔드는 아직 옮길 곳이 없어서, `VITE_API_URL` 이 가리키는 `/api/v1` 은 Pages 의 404 를
  받는다. 그 상태로 로그인·워크스페이스를 열어 두면 사용자는 "GitHub 로그인 URL을 받지
  못했습니다" 같은, 원인을 알 수 없는 문장만 본다. 그래서 이 값 하나로 화면이 멈춘 이유를
  먼저 말하게 한다.

  **다시 열 때:** 백엔드를 새 주소에 띄우고 `VITE_API_URL` 을 그리로 맞춘 뒤, 이 값을
  false 로 바꿔 배포한다. `public/status.json` 도 같이 바꾼다 — MCP·CLI(@qeploy/client)가
  그 파일을 읽어 같은 안내를 내므로, 여기만 바꾸면 터미널 쪽은 계속 중단이라고 말한다.
*/
export const SERVICE_SUSPENDED = true;

/** 배너·안내 창이 같은 문장을 쓴다. `public/status.json` 의 message 와 뜻을 맞춘다 */
export const SERVICE_SUSPENSION_NOTICE = {
  title: 'Qeploy 서비스 일시 중단 안내',
  since: '2026년 10월 30일',
  /** 배너 한 줄. 좁은 화면에서는 이것만 남는다 */
  headline: 'Qeploy 서비스를 일시 중단했습니다.',
  unavailable: '로그인, 프로젝트 생성·관리, 배포, 도메인 연결, MCP·CLI 연동',
  available: '서비스 소개와 템플릿 둘러보기',
} as const;
