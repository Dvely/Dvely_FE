/**
 * 승인 유형·상태 문구.
 *
 * 채팅의 승인 카드와 승인 탭이 같은 승인을 서로 다른 화면에서 보여준다. 문구를
 * 각자 들고 있으면 한쪽만 고쳐진 채 같은 승인이 화면마다 다르게 읽힌다 — 실제로
 * 승인 탭은 `SERVER_PROVISION` 같은 원시 값을 그대로 보여주고 있었다.
 *
 * **title 을 고치면 BE 도 같이 고쳐야 한다.** 채팅 본문은 서버가 쓰는데, 거기 적히는
 * 승인 이름이 아래 title 과 같은 값을 따로 들고 있다 — BE 의
 * `approval/domain/value/ApprovalTypeLabel.java`(BE #458). 한쪽만 바꾸면 같은 승인이
 * 채팅에서는 옛 이름, 카드에서는 새 이름으로 읽힌다. 바로 위에서 합쳐 둔 것과 같은
 * 모양이 저장소를 건너서 다시 생긴 자리다 — 합칠 수는 없다. 채팅 문구는 서버가
 * 소유하기로 한 것이라서다.
 *
 * 새 유형이 생길 때 **BE 는 컴파일에서 걸리지만 여기는 안 걸린다.** 모르는 유형이면
 * FALLBACK_APPROVAL_COPY 로 떨어뜨려 카드는 뜨게 해 뒀기 때문이다(아래 참고). 그래서
 * 유형 추가는 BE 쪽에서 먼저 알려 주기로 했다.
 */

/** 승인 유형별 제목과 설명. 무엇을 승인하는지 버튼 바로 옆에서 읽히게 한다 */
const APPROVAL_COPY: Record<string, { title: string; description: string }> = {
  /*
    실행 **전**에 묻는 계획 승인이다(BE §3.5 ①). 전에는 "만든 코드 변경을 적용할지" 라고
    적혀 있어서 이미 만든 것을 반영하는 승인(RESULT)처럼 읽혔다.
  */
  CHANGE: {
    title: '변경 사항 승인',
    description: '에이전트가 세운 코드 변경 계획대로 작업을 시작할지 결정합니다.',
  },
  DEPLOYMENT: {
    title: '배포 승인',
    description: '이 작업물을 배포할지 결정합니다.',
  },
  DOMAIN_BINDING: {
    title: '도메인 연결 승인',
    description: '이 프로젝트에 도메인을 연결할지 결정합니다.',
  },
  /*
    떼어내는 것은 붙이는 것과 다른 결정이라 따로 쓴다.

    전에는 둘이 같은 유형이라 해제 승인에도 "도메인을 연결할지 결정합니다" 가 떴다.
    상세줄만 "연결 해제" 라고 맞게 적혀 있었는데, 제목과 설명이 반대를 말하면 그쪽을
    먼저 읽는다 — 되돌리기 어려운 동작에서 가장 나쁜 종류의 어긋남이다.

    서버가 이 유형으로 바꿔 보내기 전에 미리 넣어 둔다. 그래야 배포되는 순간부터
    제대로 읽히고, 그동안 원시 값이 노출되는 구간도 안 생긴다.
  */
  DOMAIN_UNBIND: {
    title: '도메인 연결 해제 승인',
    description: '이 도메인을 프로젝트에서 떼어냅니다. 그 주소로는 더 이상 접속할 수 없습니다.',
  },
  INFRA_OPERATION: {
    title: '인프라 작업 승인',
    description: '인프라를 변경하는 작업입니다. 진행할지 결정합니다.',
  },
  REPOSITORY_BINDING: {
    title: 'GitHub 저장소 연결',
    description:
      '작업물이 준비됐는데 이 프로젝트에는 아직 GitHub 저장소가 연결되어 있지 않습니다. 아래 이름으로 새 저장소를 만들어 연결합니다.',
  },
  RESULT: {
    title: '작업 결과 승인',
    description: '에이전트가 낸 결과를 확정할지 결정합니다.',
  },
  SERVER_PROVISION: {
    title: '백엔드 서버 생성',
    description: '당신의 AWS 계정에 서버를 만듭니다. 켜져 있는 동안 과금됩니다.',
  },
  DATABASE_PROVISION: {
    title: '데이터베이스 생성',
    description: '당신의 AWS 계정에 데이터베이스를 만듭니다. 켜져 있는 동안 과금됩니다.',
  },
};

/**
 * "이게 뭔가요?" 를 펼쳤을 때 보이는 설명. 누르면 무엇이 되고 안 누르면 무엇이 되는지를
 * 적는다 — 카드의 설명은 무엇을 묻는지까지만 말해서, 처음 보는 사람은 거절이 무엇을
 * 지우는지(혹은 안 지우는지) 알 수 없었다.
 *
 * **서버 동작만 적는다**(BE FRONTEND_API_GUIDE §3.5 · §5.3). 화면이 짐작한 말을 적으면
 * 바로 이 자리가 "없는 일을 있다고 말하는" 자리가 된다. 비용 숫자는 적지 않는다 — 숫자는
 * 처음 쓰는 사람용 안내가 서버 기준으로 들고 있다.
 */
const APPROVAL_HELP: Record<string, { approve: string; reject: string }> = {
  CHANGE: {
    approve: '이 계획대로 작업을 시작합니다. 아직 아무것도 바뀌지 않은 상태에서 묻는 승인입니다.',
    reject: '작업이 취소되고 아무것도 바뀌지 않습니다.',
  },
  RESULT: {
    approve:
      'preview 브랜치의 지금 상태가 main 에 반영됩니다(PR 생성·병합). 공개된 사이트는 배포해야 바뀝니다.',
    reject:
      'main 에 반영되지 않습니다. 변경은 preview 브랜치에 남아 다음 요청이 그 위에서 이어집니다.',
  },
  REPOSITORY_BINDING: {
    approve:
      '이 이름으로 GitHub 저장소를 만들어(같은 이름이 있으면 그것을) 연결하고, 작업물을 preview 브랜치에 올립니다.',
    reject:
      '작업은 그대로 끝나지만 결과물은 프리뷰에만 남고, 프리뷰가 만료되면 사라집니다. 이 승인만 정책으로 끌 수 없는 이유입니다.',
  },
  DEPLOYMENT: {
    approve: 'main 의 현재 상태를 실제로 공개합니다.',
    reject: '배포하지 않습니다. 코드와 저장소는 그대로입니다.',
  },
  DOMAIN_BINDING: {
    approve: '이 도메인을 프로젝트에 연결하는 작업을 시작합니다.',
    reject: '연결하지 않습니다.',
  },
  DOMAIN_UNBIND: {
    approve: '도메인을 떼어냅니다. 그 주소로는 더 이상 접속할 수 없습니다.',
    reject: '도메인은 그대로 연결되어 있습니다.',
  },
  INFRA_OPERATION: {
    approve: '이 인프라 작업을 실행합니다.',
    reject: '실행하지 않습니다.',
  },
  SERVER_PROVISION: {
    approve:
      '당신의 AWS 계정에 서버를 만듭니다. 켜져 있는 동안 AWS 가 당신에게 청구하고, 서버를 종료하면 그때부터 청구가 멈춥니다.',
    reject: '서버를 만들지 않습니다. 비용도 생기지 않습니다.',
  },
  DATABASE_PROVISION: {
    approve:
      '당신의 AWS 계정에 데이터베이스를 만듭니다. 만드는 데 5~10분이 걸리고, 켜져 있는 동안 AWS 가 당신에게 청구합니다.',
    reject: '데이터베이스를 만들지 않습니다. 비용도 생기지 않습니다.',
  },
};

/** 모르는 유형이 와도 카드는 떠야 한다. 결정할 방법이 사라지는 것보다 낫다 */
const FALLBACK_APPROVAL_COPY = {
  title: '승인이 필요합니다',
  description: '아래 내용을 확인하고 결정해 주세요.',
};

/** 처리된 승인 목록에서 쓰는 상태 문구 */
const APPROVAL_STATUS_LABEL: Record<string, string> = {
  PENDING: '대기 중',
  APPROVED: '승인함',
  REJECTED: '거절함',
  CANCELLED: '취소됨',
};

/** 유형 제목. 모르는 값은 그대로 보여준다 — 원시 값이라도 없는 것보다 낫다 */
function describeApprovalType(type: string): string {
  return APPROVAL_COPY[type]?.title ?? type;
}

export {
  APPROVAL_COPY,
  APPROVAL_HELP,
  APPROVAL_STATUS_LABEL,
  FALLBACK_APPROVAL_COPY,
  describeApprovalType,
};
