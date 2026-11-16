import type { ProjectDeletionLiveResource } from '@/types/projects.type';
import { extractApiErrorCode } from '@/utils/response';

/**
 * 프로젝트 삭제를 막는 AWS 자원을 화면 문장으로 옮긴다(#186, BE #595).
 *
 * 이 프로젝트로 만든 서버·DB 가 사용자 AWS 계정에 살아 있으면 서버가 삭제를 막는다. 프로젝트가 목록에서
 * 사라지면 그 자원을 Qeploy 에서 끌 수 없는데 요금은 계속 나가기 때문이다. 함께 종료해 주지는 않는다 —
 * 되돌릴 수 없는 삭제를 한 번에 묶지 않으려는 것이다. 그래서 화면이 할 일은 **무엇이 남았고 어디서 끄는지**를
 * 알려 주는 것이다.
 */

/** 서버가 프로젝트 삭제를 막았을 때의 코드(BE #595, 409). 아무것도 지우지 않았다(GitHub 저장소도 그대로) */
const PROJECT_DELETION_BLOCKED_CODE = 'PROJECT_DELETION_BLOCKED';

/** 삭제 요청이 남은 AWS 자원 때문에 막혔는가 */
function isProjectDeletionBlocked(error: unknown): boolean {
  return extractApiErrorCode(error) === PROJECT_DELETION_BLOCKED_CODE;
}

type LiveResourceView = {
  /** 종류(EC2 서버, 데이터베이스, 진행 중인 배포) */
  kind: string;
  /** 무엇인지 — 인스턴스 id, `RDS MYSQL`, 배포 제목. 서버가 이름을 주지 않으면 번호 */
  name: string;
  /** 상태를 사람 말로. 모르는 상태는 서버 값 그대로 */
  status: string;
  /** 어떻게 정리하는지 */
  action: string;
  /** 인프라 탭에서 정리하는가. 배포는 끝나기를 기다릴 뿐이다 */
  cleanupInInfra: boolean;
};

const STATUS_TEXT: Record<string, string> = {
  QUEUED: '만들기 대기',
  BUILDING: '빌드 중',
  PROVISIONING: '만드는 중',
  RUNNING: '실행 중',
  // 만든 뒤 실패한 서버. 인스턴스·EIP 가 남아 있어서 목록에 나온다
  FAILED: '실패 — 인스턴스가 남아 있음',
  PENDING: '대기 중',
  READY: '사용 중',
  IN_PROGRESS: '진행 중',
};

function describeLiveResource(resource: ProjectDeletionLiveResource): LiveResourceView {
  const label = resource.label?.trim() || null;
  const status = STATUS_TEXT[resource.status] ?? resource.status;

  switch (resource.type) {
    case 'SERVER':
      return {
        kind: 'EC2 서버',
        name: label ?? `서버 #${resource.id}`,
        status,
        action: '인프라 탭에서 서버를 종료해 주세요.',
        cleanupInInfra: true,
      };
    case 'DATABASE':
      return {
        kind: '데이터베이스',
        name: label ?? `DB #${resource.id}`,
        status,
        action: '인프라 탭에서 데이터베이스를 삭제해 주세요.',
        cleanupInInfra: true,
      };
    case 'DEPLOYMENT':
      return {
        kind: '진행 중인 배포',
        name: label ?? `배포 #${resource.id}`,
        status,
        action: '배포가 끝나면 목록에서 빠져요. 끝난 뒤 다시 확인해 주세요.',
        cleanupInInfra: false,
      };
    default:
      // 서버가 종류를 늘려도 막혔다는 사실은 그대로 보여 준다
      return {
        kind: resource.type,
        name: label ?? `#${resource.id}`,
        status,
        action: '정리한 뒤 다시 확인해 주세요.',
        cleanupInInfra: false,
      };
  }
}

/** 막혔을 때 맨 위에 보일 문장 */
function projectDeletionBlockedSummary(count: number): string {
  return `이 프로젝트로 만든 AWS 자원이 ${count}개 남아 있어 삭제할 수 없어요. 프로젝트를 지우면 이 자원을 Qeploy 에서 끌 수 없는데 요금은 계속 나가요. 먼저 정리해 주세요.`;
}

export {
  PROJECT_DELETION_BLOCKED_CODE,
  isProjectDeletionBlocked,
  describeLiveResource,
  projectDeletionBlockedSummary,
};
export type { LiveResourceView };
