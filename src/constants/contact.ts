/*
  공식 연락 주소.

  qeploy.com 의 Cloudflare Email Routing 이 이 주소들을 운영팀 메일함으로 전달한다. 받는
  메일함 자체는 화면에 드러내지 않는다 — 주소를 용도별로 나눠 두면 나중에 담당자가 바뀌어도
  화면을 고칠 필요가 없다.

  주소를 늘리거나 줄이면 Cloudflare 대시보드(qeploy.com > Email > Email Routing > Routing
  rules)도 같이 바꾼다. 화면에만 있고 라우팅 규칙이 없는 주소로 보낸 메일은 반송된다.
*/
export const CONTACT_EMAILS = {
  /** 일반 문의·제휴 */
  contact: 'contact@qeploy.com',
  /** 이용 문의·장애 신고 */
  support: 'support@qeploy.com',
  /** 개인정보 보호책임자 — 열람·정정·삭제·처리정지 요청 */
  privacy: 'privacy@qeploy.com',
  /** 보안 취약점 제보 */
  security: 'security@qeploy.com',
} as const;

export type ContactKind = keyof typeof CONTACT_EMAILS;

export function mailto(kind: ContactKind): string {
  return `mailto:${CONTACT_EMAILS[kind]}`;
}
