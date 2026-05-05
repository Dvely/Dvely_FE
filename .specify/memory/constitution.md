<!--
Sync Impact Report
- Version: 1.0.0 → 1.1.0
- Principles: 5개 템플릿 플레이스홀더 → I. 코드 품질, II. 테스트 표준, III. UX 일관성, IV. 성능, V. 스펙–플랜 정합성
- Added: AI 수정 작업 공통 규칙(포맷/타입체크 필수, 변경 코드 주석 규칙)
- Removed: 없음
- Templates: .specify/templates/plan-template.md (Constitution Check) updated
- Follow-up: 없음
-->

# Dvely FE Constitution

## Core Principles

### [PRINCIPLE_1_NAME]

<!-- Example: I. Library-First -->

[PRINCIPLE_1_DESCRIPTION]

<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

- **MUST** `eslint .`, `tsc` 기반 타입 검사(`typecheck` 스크립트), Prettier(`format:check`)가 CI 또는 머지 전에 통과해야 한다.
- **MUST** AI가 코드를 수정한 작업은 머지 전 최소 `bun format`과 `bun typecheck`를 실행하고, 실패 시 원인/예외를 작업 기록(커밋 메시지 또는 작업 로그)에 남긴다.
- **MUST** 새로운 공용 모듈·훅·유틸은 단일 책임과 명확한 공개 API를 가진다. “우연한” 전역 상태·암묵적 부수 효과는 피한다.
- **MUST NOT** `any` 남용, 사용하지 않는 export, 데드 코드를 기본 브랜치에 남기지 않는다. 예외는 작업 기록(커밋 메시지 또는 작업 로그)에 근거와 제거 시점을 남긴다.
- **SHOULD** 복잡한 조건·도메인 규칙은 작은 순수 함수로 분리하고, 컴포넌트는 표현과 조합에 집중한다.
- **SHOULD** AI가 수정한 코드에는 유지보수에 필요한 짧은 의도 설명 주석을 추가한다. 자명한 코드 설명 주석은 피하고, 규칙/예외/비직관 분기 위주로 작성한다.

### [PRINCIPLE_3_NAME]

<!-- Example: III. Test-First (NON-NEGOTIABLE) -->

[PRINCIPLE_3_DESCRIPTION]

<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### [PRINCIPLE_4_NAME]

<!-- Example: IV. Integration Testing -->

[PRINCIPLE_4_DESCRIPTION]

<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]

<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->

[PRINCIPLE_5_DESCRIPTION]

<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]

<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]

<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]

<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]

<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance

<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]

<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]

<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
