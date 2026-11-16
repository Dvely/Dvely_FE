import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';
import {
  PROJECT_DELETION_BLOCKED_CODE,
  describeLiveResource,
  isProjectDeletionBlocked,
  projectDeletionBlockedSummary,
} from '@/lib/projectDeletion';
import { getProjectDeletionCheckResSchema } from '@/types/projects.type';
import { ApiError } from '@/utils/response';

/*
  #186. 이 프로젝트로 만든 서버·DB 가 사용자 AWS 에 살아 있으면 서버(BE #595)가 삭제를 막는다.
  화면은 무엇이 남았고 어디서 끄는지를 알려 준다. 서버·DB 는 인프라 탭에서 끄고, 배포는 끝나기를 기다린다.
*/
describe('프로젝트 삭제를 막는 자원 (#186)', () => {
  it('서버는 인스턴스 id 와 상태를 보이고 인프라 탭으로 보낸다', () => {
    expect(
      describeLiveResource({
        type: 'SERVER',
        id: 3,
        projectId: 11,
        label: 'i-0abc',
        status: 'RUNNING',
      }),
    ).toEqual({
      kind: 'EC2 서버',
      name: 'i-0abc',
      status: '실행 중',
      action: '인프라 탭에서 서버를 종료해 주세요.',
      cleanupInInfra: true,
    });
  });

  it('만든 뒤 실패한 서버는 인스턴스가 남았다고 말한다 — 실패했는데 왜 막히는지 알 수 있게', () => {
    expect(
      describeLiveResource({
        type: 'SERVER',
        id: 3,
        projectId: 11,
        label: 'i-0def',
        status: 'FAILED',
      }).status,
    ).toBe('실패 — 인스턴스가 남아 있음');
  });

  it('DB 는 방식·엔진을 이름으로 쓰고 인프라 탭으로 보낸다', () => {
    const view = describeLiveResource({
      type: 'DATABASE',
      id: 5,
      projectId: 11,
      label: 'RDS MYSQL',
      status: 'READY',
    });
    expect(view.kind).toBe('데이터베이스');
    expect(view.name).toBe('RDS MYSQL');
    expect(view.status).toBe('사용 중');
    expect(view.cleanupInInfra).toBe(true);
  });

  it('진행 중인 배포는 끝나기를 기다리라고 하고 인프라 탭으로 보내지 않는다', () => {
    const view = describeLiveResource({
      type: 'DEPLOYMENT',
      id: 30,
      projectId: 11,
      label: null,
      status: 'IN_PROGRESS',
    });
    expect(view.name).toBe('배포 #30');
    expect(view.status).toBe('진행 중');
    expect(view.cleanupInInfra).toBe(false);
    expect(view.action).toContain('끝난 뒤 다시 확인');
  });

  it('처음 보는 종류·상태도 막혔다는 사실은 그대로 보인다', () => {
    expect(
      describeLiveResource({ type: 'CDN', id: 9, projectId: 11, label: '  ', status: 'DEPLOYING' }),
    ).toEqual({
      kind: 'CDN',
      name: '#9',
      status: 'DEPLOYING',
      action: '정리한 뒤 다시 확인해 주세요.',
      cleanupInInfra: false,
    });
  });

  it('요약은 남은 개수와, 지우면 끌 수 없는데 요금이 나간다는 이유를 말한다', () => {
    const summary = projectDeletionBlockedSummary(2);
    expect(summary).toContain('2개');
    expect(summary).toContain('요금');
  });
});

describe('삭제 실패가 남은 자원 때문인지 (#186)', () => {
  it('API 함수가 던진 ApiError 의 코드로 가른다', () => {
    expect(
      isProjectDeletionBlocked(new ApiError('남아 있어요', PROJECT_DELETION_BLOCKED_CODE)),
    ).toBe(true);
    expect(isProjectDeletionBlocked(new ApiError('충돌', 'CONFLICT'))).toBe(false);
    expect(isProjectDeletionBlocked(new Error('네트워크'))).toBe(false);
  });

  it('axios 오류 본문의 코드도 읽는다', () => {
    const error = new AxiosError('409', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 409,
      statusText: 'Conflict',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: { status: 409, code: 'PROJECT_DELETION_BLOCKED', message: '남아 있어요', data: null },
    });
    expect(isProjectDeletionBlocked(error)).toBe(true);
  });
});

describe('GET /projects/{id}/deletion 응답 (#186)', () => {
  it('서버 응답을 그대로 읽는다', () => {
    const parsed = getProjectDeletionCheckResSchema.parse({
      deletable: false,
      liveResources: [{ type: 'SERVER', id: 3, projectId: 11, label: 'i-0abc', status: 'RUNNING' }],
    });
    expect(parsed.deletable).toBe(false);
    expect(parsed.liveResources[0]).toEqual({
      type: 'SERVER',
      id: 3,
      projectId: 11,
      label: 'i-0abc',
      status: 'RUNNING',
    });
  });

  it('서버가 종류를 늘려도 응답 전체가 깨지지 않는다', () => {
    const parsed = getProjectDeletionCheckResSchema.parse({
      deletable: false,
      liveResources: [{ type: 'SOMETHING_NEW', id: 1, projectId: 11, label: null, status: 'X' }],
    });
    expect(parsed.liveResources).toHaveLength(1);
  });

  it('지울 수 있으면 빈 목록이다', () => {
    expect(getProjectDeletionCheckResSchema.parse({ deletable: true, liveResources: [] })).toEqual({
      deletable: true,
      liveResources: [],
    });
  });
});
