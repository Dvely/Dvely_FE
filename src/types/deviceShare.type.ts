import { z } from 'zod';

/**
 * 내 기기 화면 공유(BE #652 · #656 · #662, `api.md` §20).
 *
 * 내 기기에서 띄운 앱 화면(웹 개발 서버, Android 에뮬레이터, iOS 시뮬레이터)을 링크로 남에게
 * 보여 준다. 공유는 **터미널의 `qeploy share` 가 만든다** — 기기 화면을 서버로 올리는 터널을 그
 * 프로세스가 열기 때문이다. 웹은 만든 링크를 보고 끝내기만 한다.
 *
 * **링크 주소는 웹에서 다시 볼 수 없다.** 주소에 든 토큰을 서버가 해시로만 두고, 평문은 만들 때
 * 터미널에만 한 번 나온다. 목록에는 앞 6자(tokenPrefix)만 온다 — 터미널에 찍힌 링크와 맞춰 볼
 * 때 쓴다.
 */

/** 서버가 받는 종류. 목록은 열린 문자열로 받는다 — 종류가 늘어도 목록 전체가 깨지지 않게 */
const DEVICE_SHARE_KINDS = ['WEB', 'ANDROID', 'IOS'] as const;

type DeviceShareKind = (typeof DEVICE_SHARE_KINDS)[number];

/**
 * 사용자당 살아 있는 링크 수. 넘으면 CLI 가 `429 DEVICE_SHARE_LIMIT_EXCEEDED` 를 받는다.
 * 서버 설정(`qeploy.device-share.max-active-per-user`, 기본 5)과 같은 값이다 — 목록 응답에
 * 한도가 실리지 않아 여기 적는다. 서버가 바꾸면 같이 바꾼다.
 */
const DEVICE_SHARE_MAX_ACTIVE = 5;

const deviceShareSchema = z.object({
  shareId: z.number().prefault(0),
  kind: z.string().prefault(''),
  /** 웹은 공유한 주소, Android 는 `<기기 이름> · <패키지>`, iOS 는 `<시뮬레이터 이름> · <번들 ID>` */
  targetLabel: z.string().prefault(''),
  /** 링크 토큰 앞 6자. 평문은 어디에도 없다 */
  tokenPrefix: z.string().prefault(''),
  /** `ACTIVE`·`EXPIRED`·`REVOKED`. 응답을 만든 순간 기준이다 */
  status: z.string().prefault(''),
  /** 기기(CLI)가 터널로 붙어 있는지 */
  deviceConnected: z.boolean().prefault(false),
  /** 지금 열려 있는 뷰어 수. 주인이 연 내 제어 링크도 센다 */
  viewers: z.number().prefault(0),
  expiresAt: z.string().nullable().prefault(null),
  revokedAt: z.string().nullable().prefault(null),
  lastViewedAt: z.string().nullable().prefault(null),
  createdAt: z.string().prefault(''),
});

/** GET /device-shares — 본인 것 최근 50개. 끝난 것도 상태와 함께 온다 */
const getDeviceShareListResSchema = z.array(deviceShareSchema).prefault([]);

type DeviceShare = z.infer<typeof deviceShareSchema>;
type GetDeviceShareListResType = z.infer<typeof getDeviceShareListResSchema>;

/** 화면이 가르는 상태. 서버가 모르는 값은 끝난 것으로 본다 — 끝내기 버튼을 달지 않기 위해서다 */
type DeviceShareState = 'live' | 'expired' | 'revoked';

function parseTime(value: string | null | undefined) {
  if (!value) return null;
  // 서버는 KST 오프셋을 붙여 보낸다. 없으면 KST 로 본다(seoulTime 과 같은 규칙)
  const withOffset = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(value) ? value : `${value}+09:00`;
  const time = new Date(withOffset).getTime();
  return Number.isFinite(time) ? time : null;
}

/**
 * 지금 이 순간의 상태.
 *
 * 서버의 `status` 는 응답을 만든 때 기준이라, 목록을 띄워 둔 사이 만료 시각이 지나면 `ACTIVE`
 * 인 채로 남는다. 만료 시각을 직접 보고 고친다 — 만료된 링크에 "공유 중" 을 붙이면, 사용자는
 * 남이 아직 보고 있다고 믿는다.
 */
function deviceShareState(share: DeviceShare, now = Date.now()): DeviceShareState {
  if (share.status === 'REVOKED') return 'revoked';
  if (share.status !== 'ACTIVE') return 'expired';
  const expiry = parseTime(share.expiresAt);
  return expiry != null && expiry <= now ? 'expired' : 'live';
}

/** 남은 시간 한 마디. 분 단위로 올려 적는다 — "0분 남음" 이 살아 있는 링크에 붙지 않게 */
function formatRemaining(expiresAt: string | null, now = Date.now()) {
  const expiry = parseTime(expiresAt);
  if (expiry == null) return null;
  const minutes = Math.ceil((expiry - now) / 60_000);
  if (minutes <= 0) return '곧 끝남';
  if (minutes < 60) return `${minutes}분 남음`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}시간 남음` : `${hours}시간 ${rest}분 남음`;
}

const KIND_LABELS: Record<DeviceShareKind, string> = {
  WEB: '웹',
  ANDROID: 'Android',
  IOS: 'iOS',
};

function deviceShareKindLabel(kind: string) {
  return (KIND_LABELS as Record<string, string>)[kind] ?? kind;
}

/** 살아 있는 것과 끝난 것으로 나눈다. 각각 최근 것이 위다(서버 순서를 믿지 않는다) */
function splitDeviceShares(shares: DeviceShare[], now = Date.now()) {
  const newestFirst = [...shares].sort(
    (a, b) => (parseTime(b.createdAt) ?? 0) - (parseTime(a.createdAt) ?? 0),
  );
  const live: DeviceShare[] = [];
  const ended: DeviceShare[] = [];
  for (const share of newestFirst) {
    (deviceShareState(share, now) === 'live' ? live : ended).push(share);
  }
  return { live, ended };
}

export {
  DEVICE_SHARE_KINDS,
  DEVICE_SHARE_MAX_ACTIVE,
  deviceShareKindLabel,
  deviceShareSchema,
  deviceShareState,
  formatRemaining,
  getDeviceShareListResSchema,
  splitDeviceShares,
  type DeviceShare,
  type DeviceShareKind,
  type DeviceShareState,
  type GetDeviceShareListResType,
};
