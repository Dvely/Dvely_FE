<!--
Sync Impact Report
- Version: 1.0.0 → 1.1.0
- Principles: 5개 템플릿 플레이스홀더 → I. 코드 품질, II. 테스트 표준, III. UX 일관성, IV. 성능, V. 스펙–플랜 정합성
- Added: AI 수정 작업 공통 규칙(포맷/타입체크 필수, 변경 코드 주석 규칙)
- Removed: 없음
- Templates: .specify/templates/plan-template.md (Constitution Check) ✅ updated
- Follow-up: 없음
-->

# Dvely FE Constitution

## Core Principles

### I. 코드 품질 (Code Quality)

- **MUST** `eslint .`, `tsc` 기반 타입 검사(`typecheck` 스크립트), Prettier(`format:check`)가 CI 또는 머지 전에 통과해야 한다.
- **MUST** AI가 코드를 수정한 작업은 머지 전 최소 `bun run format`과 `bun run typecheck`를 실행하고, 실패 시 원인/예외를 PR에 기록한다.
- **MUST** 새로운 공용 모듈·훅·유틸은 단일 책임과 명확한 공개 API를 가진다. “우연한” 전역 상태·암묵적 부수 효과는 피한다.
- **MUST NOT** `any` 남용, 사용하지 않는 export, 데드 코드를 기본 브랜치에 남기지 않는다. 예외는 PR에 근거와 제거 시점을 적는다.
- **SHOULD** 복잡한 조건·도메인 규칙은 작은 순수 함수로 분리하고, 컴포넌트는 표현과 조합에 집중한다.
- **SHOULD** AI가 수정한 코드에는 유지보수에 필요한 짧은 의도 설명 주석을 추가한다. 자명한 코드 설명 주석은 피하고, 규칙/예외/비직관 분기 위주로 작성한다.

_근거: 프론트엔드 변경이 누적될수록 타입·린트·구조 없이는 회귀와 리뷰 비용이 기하급수적으로 증가한다._

### II. 테스트 표준 (Testing Standards)

- **MUST** 사용자 영향이 있는 버그 수정·새 동작에는 `spec.md`의 수용 시나리오(또는 동등한 Given/When/Then)가 PR 설명 또는 체크리스트에 연결되어야 한다.
- **MUST** 정적 품질 게이트(위 I절)는 모든 PR에 적용된다.
- **SHOULD** 비즈니스 로직·데이터 변환·훅 동작에는 자동화 단위 테스트를 둔다. 프로젝트에 테스트 러너가 없으면 플랜에 도입 과제와 우선순위를 명시한다.
- **SHOULD** API 계약·라우팅 등 회귀 위험이 큰 변경에는 통합 수준 검증(모킹된 서버·스냅샷 최소화, 행위 검증 우선)을 고려한다.

_근거: UI만으로는 회귀를 막기 어렵고, 문서화된 시나리오와 자동 테스트가 분리되어 있으면 팀 확장 시 기준이 흔들린다._

### III. 사용자 경험 일관성 (UX Consistency)

- **MUST** 상호작용 패턴(버튼·폼·모달·로딩·에러 피드백)은 기존 디자인 시스템 및 공용 컴포넌트(Radix/shadcn/Tailwind 등 저장소 표준)를 따른다. 동일 문제에 새 패턴을 도입하면 플랜에 마이그레이션 또는 예외 사유를 적는다.
- **MUST** 로딩·빈 상태·실패 상태가 사용자에게 노출되며, 치명적 오류는 복구 경로(재시도, 안내 문구, 홈 이동 등) 중 하나를 제공한다.
- **SHOULD** 키보드 접근 가능성 및 초점 순서가 기존 화면과 동급 이상으로 유지된다. 시각적 변경은 간격·타이포 스케일을 기존 토큰에 맞춘다.

_근거: 일관된 UX는 학습 비용을 낮추고 지원 부담을 줄이며, 마이크로 카피·상태 처리 누락은 품질 체감에 직접 영향한다._

### IV. 성능 요구사항 (Performance Requirements)

- **MUST** 플랜에 라우트·큰 의존성에 대한 코드 스플리팅 또는 지연 로딩 전략이 명시된다(불필요한 초기 번들 증가 방지).
- **MUST** 데이터 페칭은 중복 호출·폭풍 요청을 방지하기 위해 프로젝트 표준(TanStack Query 등) 패턴을 따른다.
- **SHOULD** 목록·폼 등에서 과도한 리렌더는 `memo`/쿼리 키/상태 분리 등으로 완화하며, 측정이 어렵다면 변경 전후 렌더 횟수 또는 네트워크 패널 검토를 PR에 요약한다.
- **SHOULD** 이미지·폰트·애니메이션은 LCP 및 메인 스레드 블로킹을 고려한다. 회귀가 우려되면 간단한 수치 또는 프로파일 캡처를 남긴다.

_근거: SPA는 초기 로드와 데이터 패턴에서 성능이 쉽게 저하되며, 사후 수정보다 플랜 단계 제약이 비용이 낮다._

### V. 스펙–플랜 정합성 (Specification & Plan Fidelity)

- **MUST** 구현은 승인된 `spec.md`의 사용자 스토리·수용 시나리오와 `plan.md`의 기술 접근이 모순 없이 대응되어야 한다. 벗어나는 경우 Complexity Tracking 또는 동등한 “의도적 예외” 기록이 필요하다.
- **MUST** constitution의 I–IV절을 위반하는 설계는 플랜의 Constitution Check에서 식별되거나 예외로 승인되어야 한다.

_근거: Spec Kit 파이프라인의 가치는 요구·설계·구현의 추적 가능성에서 나온다._

## Additional Constraints

- **스택**: React 19, Vite, TypeScript, TanStack Router/Query, Tailwind CSS, Radix UI, shadcn 패턴을 기본으로 한다. 대체·추가 의존성은 보안·번들·유지보수 영향을 플랜에 적는다.
- **빌드**: `build` 스크립트가 통과하는 상태만 배포 후보로 본다.

## Development Workflow

- 기능은 `specify` → `plan` → `tasks` → `implement` 순서를 기본으로 하며, 각 단계 게이트에서 스펙·플랜을 승인한다.
- PR은 최소 한 명 리뷰와 본 헌법의 정적 게이트 통과를 전제로 한다.
- AI 수정 PR 체크리스트 기본 항목은 `bun run format` 실행, `bun run typecheck` 실행, 변경 코드 핵심 주석 확인이다.
- 헌법 개정은 본 문서의 버전·날짜를 갱신하고, `plan-template.md`의 Constitution Check와 충돌 시 템플릿을 함께 수정한다.

## Governance

- 본 헌법은 동일 주제에 대한 팀 합의보다 우선하는 품질·프로세스 기준이다. 예외는 시한·담당·대체 통제가 문서화되어야 한다.
- **MAJOR**: 원칙 삭제·재정의·의무(MUST) 완화.
- **MINOR**: 새 원칙·섹션 추가, 기존 MUST/SHOULD 범위의 실질적 확대.
- **PATCH**: 문구 명확화·오탈자·비의미적 정리.
- 분기·릴리스 전 정기적으로 본 문서와 실제 CI·리뷰 관행의 일치를 점검한다.

**Version**: 1.1.0 | **Ratified**: 2026-05-05 | **Last Amended**: 2026-05-05
