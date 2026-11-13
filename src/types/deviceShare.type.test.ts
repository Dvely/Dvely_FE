import { describe, expect, it } from 'vitest';
import {
  deviceShareKindLabel,
  deviceShareState,
  formatRemaining,
  getDeviceShareListResSchema,
  splitDeviceShares,
  type DeviceShare,
} from '@/types/deviceShare.type';

const NOW = Date.parse('2026-11-13T21:00:00+09:00');

function share(overrides: Partial<DeviceShare> = {}): DeviceShare {
  return {
    shareId: 1,
    kind: 'WEB',
    targetLabel: 'http://localhost:5173',
    tokenPrefix: 'k3x9q2',
    status: 'ACTIVE',
    deviceConnected: true,
    viewers: 1,
    expiresAt: '2026-11-13T21:30:00+09:00',
    revokedAt: null,
    lastViewedAt: null,
    createdAt: '2026-11-13T20:30:00+09:00',
    ...overrides,
  };
}

describe('deviceShareState', () => {
  it('살아 있는 링크는 live', () => {
    expect(deviceShareState(share(), NOW)).toBe('live');
  });

  it('ACTIVE 로 받았어도 만료 시각이 지났으면 expired — 띄워 둔 사이 끝난 링크에 "공유 중" 을 붙이지 않는다', () => {
    expect(deviceShareState(share({ expiresAt: '2026-11-13T20:59:59+09:00' }), NOW)).toBe(
      'expired',
    );
    expect(deviceShareState(share({ expiresAt: '2026-11-13T21:00:00+09:00' }), NOW)).toBe(
      'expired',
    );
  });

  it('오프셋 없는 시각은 KST 로 읽는다', () => {
    expect(deviceShareState(share({ expiresAt: '2026-11-13T21:00:01' }), NOW)).toBe('live');
    expect(deviceShareState(share({ expiresAt: '2026-11-13T20:59:59' }), NOW)).toBe('expired');
  });

  it('회수된 링크는 revoked, 모르는 상태는 끝난 것으로 본다(끝내기 버튼을 달지 않게)', () => {
    expect(deviceShareState(share({ status: 'REVOKED' }), NOW)).toBe('revoked');
    expect(deviceShareState(share({ status: 'EXPIRED' }), NOW)).toBe('expired');
    expect(deviceShareState(share({ status: 'PAUSED' }), NOW)).toBe('expired');
  });
});

describe('formatRemaining', () => {
  it('분 단위로 올려 적는다', () => {
    expect(formatRemaining('2026-11-13T21:30:00+09:00', NOW)).toBe('30분 남음');
    expect(formatRemaining('2026-11-13T21:00:01+09:00', NOW)).toBe('1분 남음');
  });

  it('한 시간이 넘으면 시간과 분으로', () => {
    expect(formatRemaining('2026-11-13T22:00:00+09:00', NOW)).toBe('1시간 남음');
    expect(formatRemaining('2026-11-14T08:05:00+09:00', NOW)).toBe('11시간 5분 남음');
  });

  it('지났거나 읽을 수 없으면', () => {
    expect(formatRemaining('2026-11-13T20:00:00+09:00', NOW)).toBe('곧 끝남');
    expect(formatRemaining(null, NOW)).toBeNull();
    expect(formatRemaining('언젠가', NOW)).toBeNull();
  });
});

describe('splitDeviceShares', () => {
  it('살아 있는 것과 끝난 것으로 나누고, 각각 최근 것이 위다', () => {
    const older = share({ shareId: 1, createdAt: '2026-11-13T19:00:00+09:00' });
    const newer = share({ shareId: 2, createdAt: '2026-11-13T20:50:00+09:00' });
    const revoked = share({ shareId: 3, status: 'REVOKED' });
    const lapsed = share({
      shareId: 4,
      expiresAt: '2026-11-13T20:10:00+09:00',
      createdAt: '2026-11-13T20:40:00+09:00',
    });

    const { live, ended } = splitDeviceShares([older, revoked, newer, lapsed], NOW);
    expect(live.map((s) => s.shareId)).toEqual([2, 1]);
    expect(ended.map((s) => s.shareId)).toEqual([4, 3]);
  });
});

describe('목록 응답', () => {
  it('빠진 필드는 기본값으로, 모르는 종류도 그대로 받는다', () => {
    const [parsed] = getDeviceShareListResSchema.parse([{ shareId: 9, kind: 'DESKTOP' }]);
    expect(parsed).toMatchObject({
      shareId: 9,
      kind: 'DESKTOP',
      viewers: 0,
      deviceConnected: false,
      expiresAt: null,
    });
    expect(deviceShareKindLabel(parsed.kind)).toBe('DESKTOP');
  });

  it('응답에 평문 링크가 섞여 와도 버린다', () => {
    const [parsed] = getDeviceShareListResSchema.parse([
      { shareId: 1, viewUrl: 'https://secret.share.qeploy.com/', controlUrl: 'x#c=y' },
    ]);
    expect(parsed).not.toHaveProperty('viewUrl');
    expect(parsed).not.toHaveProperty('controlUrl');
  });

  it('종류 이름', () => {
    expect(deviceShareKindLabel('WEB')).toBe('웹');
    expect(deviceShareKindLabel('ANDROID')).toBe('Android');
    expect(deviceShareKindLabel('IOS')).toBe('iOS');
  });
});
