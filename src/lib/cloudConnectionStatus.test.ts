import { describe, expect, it } from 'vitest';
import { cloudConnectionStatusLabel, isCloudConnectionVerified } from '@/lib/cloudConnectionStatus';

/*
  프로젝트에서 연결하러 온 사람은 검증이 끝나면 프로젝트로 돌려보낸다. 쓸 수 없는 연결을
  들고 돌아가면 배포에서 다시 막히므로, "검증이 끝났다" 와 "쓸 수 있다" 를 가른다.
*/
describe('isCloudConnectionVerified', () => {
  it('검증을 마치고 연결됨이면 쓸 수 있다', () => {
    expect(isCloudConnectionVerified({ status: 'SUCCEEDED', connectionStatus: 'CONNECTED' })).toBe(
      true,
    );
  });

  /** 서버는 권한이 모자란 걸 찾아낸 경우에도 검증 자체는 마쳤으므로 SUCCEEDED 로 닫는다 */
  it.each(['PERMISSION_MISSING', 'BILLING_DISABLED', 'REGION_UNSUPPORTED', 'INVALID_CREDENTIAL'])(
    '검증은 끝났어도 %s 면 쓸 수 없다',
    (connectionStatus) => {
      expect(isCloudConnectionVerified({ status: 'SUCCEEDED', connectionStatus })).toBe(false);
    },
  );

  it.each(['PENDING', 'RUNNING', 'FAILED'] as const)('검증이 %s 면 아직 아니다', (status) => {
    expect(isCloudConnectionVerified({ status, connectionStatus: 'CONNECTED' })).toBe(false);
  });

  it('검증 결과가 없으면 아직 아니다', () => {
    expect(isCloudConnectionVerified(undefined)).toBe(false);
    expect(isCloudConnectionVerified({ status: 'SUCCEEDED', connectionStatus: null })).toBe(false);
  });
});

describe('cloudConnectionStatusLabel', () => {
  it('아는 상태는 사람 말로', () => {
    expect(cloudConnectionStatusLabel('CONNECTED')).toBe('연결됨');
  });

  /** 서버가 상태를 늘려도 화면에서 사라지면 안 된다 */
  it('모르는 상태는 그대로', () => {
    expect(cloudConnectionStatusLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW');
  });
});
