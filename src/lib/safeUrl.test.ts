import { describe, expect, it } from 'vitest';
import { toSafeHttpUrl } from '@/lib/safeUrl';

/*
  이 함수가 막는 것은 `javascript:` 가 href 에 들어가는 일이다. 여기 오는 주소는
  서버가 조립하지만 저장소 이름·호스트명처럼 사용자가 정한 값이 섞인다.
*/
describe('toSafeHttpUrl', () => {
  it('http·https 는 통과시킨다', () => {
    expect(toSafeHttpUrl('https://qeploy.com/')).toBe('https://qeploy.com/');
    expect(toSafeHttpUrl('http://example.test/a/b')).toBe('http://example.test/a/b');
  });

  it('앞뒤 공백은 떼고 본다', () => {
    expect(toSafeHttpUrl('  https://qeploy.com/  ')).toBe('https://qeploy.com/');
  });

  it.each([
    ['javascript 스킴', 'javascript:alert(1)'],
    ['대문자 섞인 javascript', 'JavaScript:alert(1)'],
    ['data 스킴', 'data:text/html,<script>alert(1)</script>'],
    ['vbscript 스킴', 'vbscript:msgbox(1)'],
    ['file 스킴', 'file:///etc/passwd'],
  ])('%s 은 막는다', (_label, raw) => {
    expect(toSafeHttpUrl(raw)).toBeUndefined();
  });

  it('공백을 끼워 스킴을 숨겨도 막는다', () => {
    // 브라우저는 선행 공백을 버리고 읽으므로, trim 뒤에도 스킴 검사가 살아 있어야 한다
    expect(toSafeHttpUrl('  javascript:alert(1)')).toBeUndefined();
  });

  it('상대 경로는 통과시키지 않는다', () => {
    // 링크로 쓰려면 절대 주소여야 한다. 호출부는 undefined 면 링크를 안 그린다
    expect(toSafeHttpUrl('/home')).toBeUndefined();
    expect(toSafeHttpUrl('qeploy.com')).toBeUndefined();
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['빈 문자열', ''],
    ['공백만', '   '],
  ])('%s 은 undefined', (_label, raw) => {
    expect(toSafeHttpUrl(raw)).toBeUndefined();
  });
});
