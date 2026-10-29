import type { GetCloudConnectionVerificationJobResType } from '@/types/cloudConnection.type';

/**
 * 연결 상태를 사람 말로. **목록을 닫지 않는다** — 서버가 상태를 늘려도 모르는 값은 그대로
 * 보여주면 되지, 화면에서 사라지면 안 된다.
 *
 * 설정의 연결 목록과 프로젝트의 연결 안내가 같은 말을 써야 해서 여기 둔다. 한쪽은
 * "연결됨", 한쪽은 `CONNECTED` 로 보이면 같은 연결인지부터 헷갈린다.
 */
const CLOUD_CONNECTION_STATUS_LABEL: Record<string, string> = {
  VALIDATED: '검증됨',
  VERIFYING: '검증 중',
  CHECKING: '확인 중',
  CONNECTED: '연결됨',
  PERMISSION_MISSING: '권한 부족',
  BILLING_DISABLED: '결제 비활성',
  REGION_UNSUPPORTED: '미지원 리전',
  INVALID_CREDENTIAL: '자격 만료·오류',
  UNKNOWN_ERROR: '알 수 없는 오류',
};

function cloudConnectionStatusLabel(status: string): string {
  return CLOUD_CONNECTION_STATUS_LABEL[status] ?? status;
}

/**
 * 검증 Job 이 "이 연결로 배포할 수 있다" 고 끝났는지.
 *
 * Job 이 SUCCEEDED 라고 연결이 쓸 만한 것은 아니다 — 서버는 권한이 모자란 것을 찾아낸
 * 경우에도 **검증 자체는 마쳤으므로** SUCCEEDED 로 닫고, 연결 상태를 PERMISSION_MISSING
 * 같은 값으로 남긴다. 그래서 연결 상태까지 본다.
 */
function isCloudConnectionVerified(
  job: Pick<GetCloudConnectionVerificationJobResType, 'status' | 'connectionStatus'> | undefined,
): boolean {
  return job?.status === 'SUCCEEDED' && job.connectionStatus === 'CONNECTED';
}

export { CLOUD_CONNECTION_STATUS_LABEL, cloudConnectionStatusLabel, isCloudConnectionVerified };
