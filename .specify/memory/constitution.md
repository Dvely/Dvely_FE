<!--
Sync Impact Report
- Version: 1.3.0 → 1.4.0
- Modified Principles: III. UX 일관성 — 로딩 상태 스켈레톤 UI MUST 추가
- Added sections: .specify/standards/loading-ui.md
- Templates: plan-template.md (로딩 UX 체크), specify-rules.mdc, speckit-implement SKILL
- Follow-up TODOs: 없음
-->

# Dvely FE Constitution

## Core Principles

### I. 코드 품질 및 안정성

- **MUST** 코드 변경 시 `bun run format`과 `bun run typecheck`를 작업 종료 전에 실행한다.
- **MUST** API Zod 스키마(`src/types/*.type.ts`)는 `.specify/standards/zod-api-schema.md` 규칙을 따른다.
  - 필수 문자열: `.min(1, '한국어 에러 메시지').prefault('')`
  - 비필수 필드(문자열·enum 등): `.nullable()` 필수 (문자열은 `.nullable().prefault('')`)
  - export는 파일 하단 일괄, 객체 필드 사이 빈 줄 없음
- **MUST** 새로운 공용 모듈/훅/유틸은 단일 책임 원칙과 명시적 입력/출력을 가진다.
- **MUST NOT** 불필요한 `any`, 미사용 export, 데드 코드를 기본 브랜치에 남긴다.
- **SHOULD** 복잡한 분기와 예외 처리 로직은 작은 순수 함수로 분리한다.
- **SHOULD** AI가 수정한 비직관 로직에는 유지보수 목적의 짧은 의도 주석을 남긴다.

### II. 테스트 및 검증 기준

- **MUST** 기능 구현/수정 후 quickstart 시나리오 또는 동등한 수동 검증 절차를 수행한다.
- **MUST** 실패/예외 상황은 사용자 관점에서 재현 가능한 형태로 기록한다.
- **SHOULD** 자동 테스트 러너 도입 시 핵심 인증 플로우(로그인/연동상태/해제)를 우선 자동화한다.
- **SHOULD** API 계약 변경이 있는 경우 계약 문서(`contracts/`)를 동기화한다.

### III. UX 일관성 및 사용자 안내

- **MUST** 로그인/오류/재시도 안내 문구는 한국어 우선 정책을 따른다.
- **MUST** 실패 상태에서 사용자가 다음 행동(재시도, 재로그인, 재연동)을 선택할 수 있어야 한다.
- **MUST** 모든 `isLoading` 상태는 텍스트 플레이스홀더 대신 스켈레톤 UI로 표현한다.
- **SHOULD** 인증/연동 관련 상태 표현은 동일한 용어와 상태값을 재사용한다.
- **SHOULD** 사용자 혼란을 줄이기 위해 화면마다 핵심 상태 메시지를 하나의 기준으로 유지한다.

### IV. 보안 및 인증 경계

- **MUST** 서비스 인증 정보와 외부 제공자 토큰(GitHub access token)을 분리 관리한다.
- **MUST** OAuth 콜백 처리 시 보안 검증(`state`)을 기본 정책으로 유지한다.
- **MUST** 개발 편의를 위한 보안 우회는 로컬/개발 환경으로 제한하고 운영 배포 전 제거한다.
- **MUST NOT** 민감 토큰을 로그나 UI에 평문으로 노출한다.

### V. 스펙-플랜-태스크 정합성

- **MUST** 구현은 `spec.md` 요구사항(FR)과 `tasks.md` 작업 항목에 추적 가능해야 한다.
- **MUST** 문서 산출물(`spec`, `plan`, `tasks`, `contracts`) 간 경로/이름 불일치를 남기지 않는다.
- **SHOULD** 기능 단위 문서는 `specs/<번호-기능명>/` 구조를 유지한다.
- **SHOULD** 사용자 결정이 필요한 항목은 구현 전에 명시적으로 확인한다.

## Additional Constraints

- 기본 기술 스택은 React + TypeScript + TanStack Router + Axios + Vite + Bun을 따른다.
- 브랜치 정책은 팀 운영 정책(개인 feature 브랜치)을 따르되, 기능 문서 경로는 기능 단위로 관리한다.
- 백엔드 미구현 API는 프론트에서 기능 플래그로 제어해 사용자 오류를 최소화한다.

## Development Workflow

- 기본 순서는 `specify → plan → tasks → implement`를 따른다.
- 각 작업 단위 종료 시 오류를 확인하고 즉시 수정한다.
- 완료한 작업은 `tasks.md` 체크박스로 추적한다.
- 작업 기록에는 실패 원인/예외 처리/사용자 결정 사항을 남긴다.

## Governance

- 본 헌법은 프로젝트의 기본 개발 규칙이며, 충돌 시 다른 문서보다 우선한다.
- 예외 적용 시에는 사유, 영향 범위, 종료 시점을 작업 기록에 명시한다.
- 버전 규칙:
  - **MAJOR**: 원칙 제거 또는 의미 변경
  - **MINOR**: 원칙/섹션 추가 또는 의무 범위 확대
  - **PATCH**: 문구 개선, 오탈자 수정, 비의미적 정리
- 본 문서는 기능 개발 흐름의 변화가 있을 때 즉시 갱신한다.

**Version**: 1.4.0 | **Ratified**: 2026-05-05 | **Last Amended**: 2026-05-27
