/**
 * 프로젝트에서 설정으로 나갔다가 하던 자리로 돌아오기.
 *
 * AI API 키나 클라우드 연결은 계정 설정에 있다. 그런데 그걸 넣어야 한다는 걸 알게 되는
 * 곳은 프로젝트 안이다 — 채팅이 막히거나, 배포가 연결을 기다리며 멈췄을 때다. 예전에는
 * 설정으로 보내 놓고 끝이어서, 등록을 마친 사용자가 **프로젝트를 다시 찾아 들어가야**
 * 했다. 들어가도 다른 대화가 열려 있거나 적던 말이 사라져 있었다.
 *
 * 그래서 나갈 때 돌아올 자리를 `?returnTo=` 로 들고 가고, 등록이 끝나면 그 자리로 돌려
 * 보낸다.
 *
 * ## 앱 안 경로만 받는다
 *
 * returnTo 는 주소창에 있는 값이라 누구나 고쳐 만들 수 있다. 그대로 따라가면
 * `?returnTo=https://evil.example` 같은 링크로 우리 도메인을 거쳐 남의 사이트로 보내는
 * 길(오픈 리다이렉트)이 된다. 키를 막 넣은 사람을 가짜 로그인 화면으로 보내기에 좋은
 * 자리라 특히 조심한다.
 */

/** 등록을 마친 뒤 돌아가기 전에 결과를 읽을 시간 */
const SETUP_RETURN_DELAY_MS = 1200;

/** 경로로 쓰기엔 지나치게 긴 값은 받지 않는다 */
const RETURN_TO_MAX_LENGTH = 2048;

/** 출처 비교용. 실제로 요청이 나가지 않는 이름이다 */
const PROBE_ORIGIN = 'https://return-to.invalid';

/**
 * 탭·개행 같은 제어 문자가 있는지. 브라우저는 주소에서 이것들을 **지우고** 읽는다 —
 * `/\t/evil.example` 이 `//evil.example` 이 된다.
 */
function hasControlCharacter(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

/**
 * 앱 안 경로만 통과시킨다. 아니면 null.
 *
 * 글자만 보고 거르면 브라우저가 다르게 읽는 경우를 놓친다. 그래서 먼저 모양을 보고,
 * 실제로 주소로 풀어 본 뒤 출처가 그대로인지 한 번 더 본다. 돌려주는 값은 풀어 본
 * 쪽이다 — `/./` 같은 것이 정리된 모양이어야 다시 검사한 의미가 있다.
 */
function toSafeReturnPath(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  if (!raw || raw.length > RETURN_TO_MAX_LENGTH) return null;

  // 스킴(`https:`, `javascript:`)이 붙은 값과 `//host` 는 여기서 걸린다
  if (!raw.startsWith('/') || raw.startsWith('//')) return null;
  // 역슬래시는 브라우저가 / 로 읽는다 — `/\evil.example` 은 `//evil.example` 이다
  if (raw.includes('\\')) return null;
  if (hasControlCharacter(raw)) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw, PROBE_ORIGIN);
  } catch {
    return null;
  }
  if (parsed.origin !== PROBE_ORIGIN) return null;

  const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
  // `/.//evil.example` 은 정리하면 `//evil.example` 이 된다. 정리한 뒤에도 다시 본다
  if (path.startsWith('//')) return null;
  return path;
}

/**
 * 에이전트 화면으로 돌아올 경로. **보던 대화까지** 적는다.
 *
 * 대화는 주소에 없고 화면 상태에만 있다. 경로만 적으면 돌아왔을 때 가장 최근 대화가
 * 열린다 — 새 대화를 열어 적던 중이었다면 그 자리가 사라지고, 맡겨 둔 입력도 자리가
 * 안 맞아 돌아오지 않는다.
 */
function agentReturnPath(
  projectId: number,
  conversationId: number | null,
  isNewConversation: boolean,
): string {
  const base = `/project/${projectId}/agent`;
  if (isNewConversation) return `${base}?conversation=new`;
  return conversationId == null ? base : `${base}?conversation=${conversationId}`;
}

/** 돌아가기 버튼 문구. 프로젝트에서 왔으면 그렇게 말한다 */
function returnLabel(path: string): string {
  return path.startsWith('/project/') ? '프로젝트로 돌아가기' : '이전 화면으로 돌아가기';
}

export { SETUP_RETURN_DELAY_MS, agentReturnPath, returnLabel, toSafeReturnPath };
