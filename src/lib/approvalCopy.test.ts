import { describe, expect, it } from 'vitest';
import { APPROVAL_COPY, APPROVAL_HELP } from '@/lib/approvalCopy';

/*
  승인 카드의 "이게 뭔가요?" 는 유형마다 따로 적는다. 유형이 늘 때 설명만 빠지면 그 카드에서
  도움말 버튼이 조용히 사라진다 — 처음 보는 승인일수록 설명이 필요한데 거꾸로 된다.
*/
describe('APPROVAL_HELP', () => {
  it('제목이 있는 유형은 모두 도움말이 있다', () => {
    expect(Object.keys(APPROVAL_HELP).sort()).toEqual(Object.keys(APPROVAL_COPY).sort());
  });

  it('승인과 거절을 둘 다 말한다', () => {
    for (const [type, help] of Object.entries(APPROVAL_HELP)) {
      expect(help.approve.trim(), type).not.toBe('');
      expect(help.reject.trim(), type).not.toBe('');
    }
  });
});
