import { z } from 'zod';

/**
 * 짚기 피드백(BE #681·#683, `api.md` §20.6, FRONTEND_API_GUIDE "짚기 피드백").
 *
 * 공유 링크로 화면을 본 사람이 한 지점을 짚어 남긴 글이다. 짚은 요소·컴포넌트·소스 후보·잘라 낸
 * 이미지가 함께 저장되고, 서버가 코딩 에이전트용 프롬프트(Markdown)를 만든다.
 *
 * **받기 전(NEW) 글은 에이전트에게 나가지 않는다.** 손님이 쓴 글이 에이전트 지시가 되지 않게,
 * 주인이 받아야(ACCEPTED) MCP·CLI 가 읽는다. 웹의 "받기" 가 그 문이다.
 */

const FEEDBACK_STATUSES = ['NEW', 'ACCEPTED', 'FIXED', 'CONFIRMED', 'DISMISSED'] as const;

type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

/** 목록 한 줄. 열린 문자열로 받는다 — 서버가 상태를 늘려도 목록 전체가 깨지지 않게 */
const shareFeedbackSchema = z.object({
  feedbackId: z.number().prefault(0),
  shareId: z.number().prefault(0),
  kind: z.string().prefault(''),
  status: z.string().prefault(''),
  /** `OWNER`(내 제어 링크로 짚음)·`GUEST` */
  authorRole: z.string().prefault('GUEST'),
  authorName: z.string().nullable().prefault(null),
  /** 웹은 경로, Android 는 `패키지/Activity` */
  screenLabel: z.string().nullable().prefault(null),
  /** 요소 이름. 예: `<button> "저장"`. 요소를 못 찾았으면 null */
  label: z.string().nullable().prefault(null),
  /** 가장 안쪽 컴포넌트 이름 */
  component: z.string().nullable().prefault(null),
  /** 처음 글. 손님이 썼으면 지시가 아니라 데이터다 — 텍스트로만 그린다 */
  body: z.string().prefault(''),
  createdAt: z.string().prefault(''),
  updatedAt: z.string().prefault(''),
});

const getShareFeedbackListResSchema = z.array(shareFeedbackSchema).prefault([]);

const feedbackNoteSchema = z.object({
  noteId: z.number().prefault(0),
  /** `OWNER`·`GUEST`·`AGENT` */
  authorRole: z.string().prefault(''),
  /** `FIXED`·`REOPEN`·`CONFIRM` */
  kind: z.string().prefault(''),
  body: z.string().nullable().prefault(null),
  createdAt: z.string().prefault(''),
});

const sourceHintSchema = z.object({
  file: z.string().prefault(''),
  line: z.number().nullable().optional(),
  /** `COMPONENT`·`ID`·`TEXT` */
  reason: z.string().nullable().optional(),
});

const componentSchema = z.object({
  name: z.string().prefault(''),
  file: z.string().nullable().optional(),
  line: z.number().nullable().optional(),
});

/** 서버가 고른 요소 기술(§14.3). 모르는 필드는 버리고 아는 것만 읽는다 */
const feedbackElementSchema = z
  .object({
    ok: z.boolean().optional(),
    reason: z.string().optional(),
    element: z
      .object({
        type: z.string().optional(),
        text: z.string().optional(),
        id: z.string().optional(),
        selector: z.string().optional(),
      })
      .optional(),
    components: z.array(componentSchema).optional(),
    sourceHints: z.array(sourceHintSchema).optional(),
  })
  .nullable()
  .prefault(null);

const getShareFeedbackDetailResSchema = z.object({
  feedback: shareFeedbackSchema,
  element: feedbackElementSchema,
  notes: z.array(feedbackNoteSchema).prefault([]),
  hasCrop: z.boolean().prefault(false),
  hasScreen: z.boolean().prefault(false),
});

const getShareFeedbackPromptResSchema = z.object({ markdown: z.string().prefault('') });

/** PATCH 로 바꿀 수 있는 상태. 고침은 POST …/fixed 로 따로 한다 */
const patchShareFeedbackReqSchema = z.object({
  status: z.enum(['ACCEPTED', 'DISMISSED', 'CONFIRMED']),
});

const FIXED_NOTE_MAX = 300;

const postShareFeedbackFixedReqSchema = z.object({
  note: z.string().trim().max(FIXED_NOTE_MAX).optional(),
});

type ShareFeedback = z.infer<typeof shareFeedbackSchema>;
type ShareFeedbackDetail = z.infer<typeof getShareFeedbackDetailResSchema>;
type FeedbackNote = z.infer<typeof feedbackNoteSchema>;
type GetShareFeedbackListResType = z.infer<typeof getShareFeedbackListResSchema>;

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  NEW: '받기 전',
  ACCEPTED: '받음',
  FIXED: '고침',
  CONFIRMED: '확인함',
  DISMISSED: '받지 않음',
};

function feedbackStatusLabel(status: string) {
  return (STATUS_LABELS as Record<string, string>)[status] ?? status;
}

/** 화면에 보일 상태 순서. 받기 전이 맨 앞이다 — 주인이 할 일이 거기 있다 */
const STATUS_ORDER: FeedbackStatus[] = ['NEW', 'ACCEPTED', 'FIXED', 'CONFIRMED', 'DISMISSED'];

/**
 * 상태마다 누를 수 있는 것. 서버의 바뀌는 길(§14.2)과 같다 — 여기 없는 버튼을 달면 409 가 난다.
 *
 * - accept: 받기(`DISMISSED` 에서는 되돌려 받기, `FIXED` 에서는 다시 열기)
 * - dismiss: 받지 않기
 * - fixed: 고쳤다고 표시(짚은 사람에게 알림)
 * - confirm: 확인함으로(짚은 사람 대신 주인이 닫는다)
 */
type FeedbackAction = 'accept' | 'dismiss' | 'fixed' | 'confirm';

function feedbackActions(status: string): FeedbackAction[] {
  switch (status) {
    case 'NEW':
      return ['accept', 'dismiss'];
    case 'ACCEPTED':
      return ['fixed', 'dismiss'];
    case 'DISMISSED':
      return ['accept'];
    case 'FIXED':
      return ['confirm', 'accept'];
    default:
      return [];
  }
}

/** 에이전트(MCP·CLI)가 읽을 수 있는 상태인가. 받기 전·받지 않음은 서버가 내주지 않는다 */
function agentCanRead(status: string) {
  return status === 'ACCEPTED' || status === 'FIXED' || status === 'CONFIRMED';
}

/** 상태별 개수와, 공유마다 받기 전 개수 */
function countFeedback(items: ShareFeedback[]) {
  const byStatus: Record<string, number> = {};
  const newByShare: Record<number, number> = {};
  for (const item of items) {
    byStatus[item.status] = (byStatus[item.status] ?? 0) + 1;
    if (item.status === 'NEW') newByShare[item.shareId] = (newByShare[item.shareId] ?? 0) + 1;
  }
  return { byStatus, newByShare };
}

function authorLabel(item: Pick<ShareFeedback, 'authorRole' | 'authorName'>) {
  if (item.authorRole === 'OWNER') return '나';
  const name = item.authorName?.trim();
  return name ? `손님 ${name}` : '손님';
}

const NOTE_LABELS: Record<string, string> = {
  FIXED: '고침',
  REOPEN: '다시 열기',
  CONFIRM: '확인',
};

const NOTE_AUTHORS: Record<string, string> = {
  OWNER: '나',
  GUEST: '손님',
  AGENT: '에이전트',
};

function noteLabel(note: FeedbackNote) {
  const kind = NOTE_LABELS[note.kind] ?? note.kind;
  const who = NOTE_AUTHORS[note.authorRole] ?? note.authorRole;
  return `${kind}(${who})`;
}

const HINT_REASONS: Record<string, string> = {
  COMPONENT: '컴포넌트',
  ID: '요소 id',
  TEXT: '보이는 텍스트',
};

function hintReasonLabel(reason: string | null | undefined) {
  return reason ? (HINT_REASONS[reason] ?? reason) : '';
}

export {
  FEEDBACK_STATUSES,
  FIXED_NOTE_MAX,
  STATUS_ORDER,
  agentCanRead,
  authorLabel,
  countFeedback,
  feedbackActions,
  feedbackStatusLabel,
  getShareFeedbackDetailResSchema,
  getShareFeedbackListResSchema,
  getShareFeedbackPromptResSchema,
  hintReasonLabel,
  noteLabel,
  patchShareFeedbackReqSchema,
  postShareFeedbackFixedReqSchema,
  shareFeedbackSchema,
  type FeedbackAction,
  type FeedbackNote,
  type FeedbackStatus,
  type GetShareFeedbackListResType,
  type ShareFeedback,
  type ShareFeedbackDetail,
};
