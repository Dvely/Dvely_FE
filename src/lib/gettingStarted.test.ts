// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GETTING_STARTED_HIDDEN_KEY,
  computeGettingStarted,
  isGettingStartedHidden,
  setGettingStartedHidden,
  subscribeGettingStartedHidden,
} from '@/lib/gettingStarted';

/*
  시작하기의 진행은 **서버 데이터에서만** 나온다. 아직 모르는 값(불러오는 중)을 끝난 것으로
  치면, 아무것도 안 한 사람에게 "모두 마쳤습니다" 가 잠깐 뜬다.
*/
describe('computeGettingStarted', () => {
  it('아무것도 모르면 하나도 끝나지 않았고, 첫 단계가 다음이다', () => {
    const result = computeGettingStarted({});
    expect(result.doneCount).toBe(0);
    expect(result.next?.id).toBe('github');
    expect(result.allDone).toBe(false);
  });

  it('순서대로 일곱 단계다', () => {
    expect(computeGettingStarted({}).steps.map((step) => step.id)).toEqual([
      'github',
      'project',
      'ai-key',
      'first-request',
      'repository',
      'cloud',
      'deploy',
    ]);
  });

  it('끝낸 것만 센다', () => {
    const result = computeGettingStarted({
      githubAppInstalled: true,
      aiCredentialCount: 1,
      projectCount: 1,
      latestProjectConversationCount: 0,
    });
    expect(result.doneCount).toBe(3);
    expect(result.next?.id).toBe('first-request');
  });

  /** 앞 단계를 건너뛰고 뒤를 먼저 해도 그대로 센다. 다음은 아직 안 한 첫 단계다 */
  it('건너뛴 단계가 다음으로 남는다', () => {
    const result = computeGettingStarted({
      githubAppInstalled: true,
      aiCredentialCount: 0,
      projectCount: 2,
      verifiedCloudConnectionCount: 1,
    });
    expect(result.steps.find((step) => step.id === 'cloud')?.done).toBe(true);
    expect(result.next?.id).toBe('ai-key');
  });

  it('권한 검증 전 연결은 세지 않는다 — 호출하는 쪽이 CONNECTED 만 넘긴다', () => {
    expect(
      computeGettingStarted({ verifiedCloudConnectionCount: 0 }).steps.find(
        (step) => step.id === 'cloud',
      )?.done,
    ).toBe(false);
  });

  it('다 끝나면 다음이 없다', () => {
    const result = computeGettingStarted({
      githubAppInstalled: true,
      aiCredentialCount: 1,
      projectCount: 1,
      latestProjectConversationCount: 1,
      latestProjectRepositoryConnected: true,
      verifiedCloudConnectionCount: 1,
      deployedProjectCount: 1,
    });
    expect(result.allDone).toBe(true);
    expect(result.next).toBeNull();
    expect(result.doneCount).toBe(result.total);
  });
});

/*
  숨기기는 되돌릴 수 있어야 하고, 홈 카드와 사이드바가 같이 움직여야 한다.
*/
describe('숨기기', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('기본은 보인다', () => {
    expect(isGettingStartedHidden()).toBe(false);
  });

  it('숨기고 다시 켤 수 있다', () => {
    setGettingStartedHidden(true);
    expect(isGettingStartedHidden()).toBe(true);
    expect(localStorage.getItem(GETTING_STARTED_HIDDEN_KEY)).toBe('1');

    setGettingStartedHidden(false);
    expect(isGettingStartedHidden()).toBe(false);
    expect(localStorage.getItem(GETTING_STARTED_HIDDEN_KEY)).toBeNull();
  });

  it('바꾸면 같은 탭의 다른 자리에 알린다', () => {
    const onChange = vi.fn();
    const unsubscribe = subscribeGettingStartedHidden(onChange);
    setGettingStartedHidden(true);
    unsubscribe();
    setGettingStartedHidden(false);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
