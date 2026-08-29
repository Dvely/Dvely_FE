#!/usr/bin/env python3
"""Generate Qeploy table-definition slides in the sample 6-column format."""
from __future__ import annotations

import html
from pathlib import Path

OUT = Path("/Users/kimtaewoo/Documents/GitHub/Dvely_FE/canvases/qeploy-table-defs")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# col: name, type, required(Y/N), values, desc, extra(pk/fk note)
# values → 값 목록. extra appended to 설명 as bullets.


def C(name, typ, req, values, desc, extra=""):
    return (name, typ, req, values, desc, extra)


TABLES: dict[str, list[tuple]] = {
    "users": [
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 기본키"),
        C("github_user_id", "varchar(255)", "N", "", "GitHub 고유 ID"),
        C("user_name", "varchar(255)", "N", "", "GitHub 사용자명"),
        C("avatar_url", "varchar(512)", "N", "", "GitHub 프로필 이미지 URL"),
        C("github_installation_id", "bigint", "N", "", "GitHub App 설치 ID"),
        C("github_user_access_token", "text", "N", "", "GitHub App 액세스 토큰(암호화)"),
        C("github_user_refresh_token", "text", "N", "", "GitHub App 리프레시 토큰(암호화)"),
        C("user_access_token_expires_at", "datetime", "N", "", "액세스 토큰 만료 시각"),
        C("access_token", "text", "N", "", "GitHub API Access Token(암호화 저장)"),
        C("scope", "varchar(255)", "N", "", "토큰 권한 범위 (repo, workflow 등)"),
        C("token_expires_at", "datetime", "N", "", "Access Token 만료 시간"),
        C("created_at", "datetime", "Y", "", "계정 생성 일시"),
        C("updated_at", "datetime", "Y", "", "계정 수정 일시"),
    ],
    "refresh_tokens": [
        C("id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("token", "varchar(36)", "Y", "", "토큰"),
        C("expires_at", "datetime", "Y", "", "만료 시각"),
        C("revoked", "tinyint(1)", "Y", "0 / 1", "폐기 여부"),
    ],
    "revoked_access_tokens": [
        C("id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("jti", "varchar(36)", "Y", "", "JWT 식별자"),
        C("expires_at", "datetime", "Y", "", "만료 시각"),
    ],
    "projects": [
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_name", "varchar(255)", "Y", "", "프로젝트명"),
        C("project_status", "varchar(50)", "Y", "DRAFT", "프로젝트 상태"),
        C("start_mode", "varchar(50)", "Y", "blank", "시작 모드"),
        C("template_type", "varchar(100)", "N", "", "템플릿 유형"),
        C("draft_mode", "varchar(50)", "Y", "fast", "초안 모드"),
        C("deploy_status", "varchar(50)", "Y", "DRAFT / Live / Pending / Failed", "배포 상태"),
        C("current_url", "varchar(512)", "N", "", "현재 URL"),
        C("current_version", "varchar(100)", "N", "", "현재 버전"),
        C("source_repository", "varchar(255)", "N", "", "소스 저장소"),
        C("deployment_repository", "varchar(255)", "N", "", "배포 저장소"),
        C("repository_visibility", "varchar(20)", "Y", "PRIVATE / PUBLIC", "저장소 공개 범위"),
        C("binding_status", "varchar(30)", "Y", "NOT_BOUND", "저장소 연결 상태"),
        C("repository_health", "varchar(30)", "Y", "UNKNOWN_ERROR", "저장소 상태"),
        C("repository_head_sha", "varchar(40)", "N", "", "저장소 HEAD SHA"),
        C("repository_head_message", "varchar(1000)", "N", "", "저장소 HEAD 커밋 메시지"),
        C("repository_head_author", "varchar(255)", "N", "", "저장소 HEAD 작성자"),
        C("repository_head_committed_at", "datetime", "N", "", "repository head committed 시각"),
        C("repository_head_synced_at", "datetime", "N", "", "repository head synced 시각"),
        C("repository_version", "varchar(100)", "N", "", "저장소 버전"),
        C("repository_version_synced_at", "datetime", "N", "", "repository version synced 시각"),
        C("repository_connected_at", "datetime", "N", "", "GitHub 저장소 연결 시각. 해제 시 NULL"),
        C("is_deleted", "tinyint(1)", "Y", "0 / 1", "삭제 여부"),
        C("version", "bigint", "Y", "", "JPA @Version 낙관적 잠금 카운터"),
        C("created_at", "datetime", "Y", "", "생성 일시"),
        C("updated_at", "datetime", "Y", "", "수정 일시"),
    ],
    "project_infrastructure_settings": [
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 기본키 · 외래키 → projects(project_id)"),
        C("deployment_architecture", "varchar(20)", "Y", "SERVER / CONTAINER / SERVERLESS", "배포 아키텍처"),
        C("compute_tier", "varchar(20)", "Y", "MICRO / SMALL / MEDIUM / LARGE", "provider-중립 티어"),
        C("storage_type", "varchar(30)", "Y", "NONE / OBJECT_STORAGE", "스토리지 유형"),
        C("network_access", "varchar(20)", "Y", "PUBLIC / PRIVATE", "네트워크 접근"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "project_budget_settings": [
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 기본키 · 외래키 → projects(project_id)"),
        C("monthly_budget_amount", "decimal(12,2)", "Y", "", "월 예산 금액"),
        C("currency", "varchar(3)", "Y", "USD", "통화"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "project_cloud_connection_settings": [
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 기본키 · 외래키 → projects(project_id)"),
        C("cloud_connection_id", "bigint", "Y", "", "클라우드 연결 ID", "• 외래키 → cloud_connections(cloud_connection_id)"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "project_approval_policies": [
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 기본키 · 외래키 → projects(project_id)"),
        C("change_approval_required", "tinyint(1)", "Y", "0 / 1", "변경 승인 필요 여부"),
        C("deployment_approval_required", "tinyint(1)", "Y", "0 / 1", "배포 승인 필요 여부"),
        C("domain_approval_required", "tinyint(1)", "Y", "0 / 1", "도메인 승인 필요 여부"),
        C("infra_approval_required", "tinyint(1)", "Y", "0 / 1", "인프라 승인 필요 여부"),
        C("result_approval_required", "tinyint(1)", "Y", "0 / 1", "실행 결과(preview·diff) 확인 후 main 반영(RESULT) 승인 필요 여부"),
    ],
    "chat_sessions": [
        C("chat_session_id", "bigint", "Y", "", "채팅 세션 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("title", "varchar(120)", "Y", "", "제목"),
        C("is_deleted", "tinyint(1)", "Y", "0 / 1", "삭제 여부 (0: 사용, 1: 삭제)"),
        C("deleted_at", "datetime", "N", "", "채팅 휴지통 처리 시점"),
        C("created_at", "datetime", "Y", "", "채팅 세션 생성 시간"),
        C("updated_at", "datetime", "Y", "", "채팅 세션 수정 시간"),
    ],
    "chat_messages": [
        C("message_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("chat_session_id", "bigint", "Y", "", "채팅 세션 ID", "• 외래키 → chat_sessions(chat_session_id)"),
        C("role", "enum", "Y", "user / assistant / system", "작성자 역할"),
        C("content", "text", "Y", "", "채팅 내용"),
        C("token_count", "bigint", "Y", "", "LLM 사용 토큰 수"),
        C("created_at", "datetime", "Y", "", "메시지 생성 시간"),
    ],
    "approvals": [
        C("approval_id", "bigint", "Y", "", "승인 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "N", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("chat_session_id", "bigint", "N", "", "채팅 세션 ID", "• 외래키 → chat_sessions(chat_session_id)"),
        C("task_id", "varchar(64)", "N", "", "Agent task 승인은 값 있음, standalone 승인은 NULL"),
        C("approval_type", "varchar(30)", "Y", "CHANGE / DEPLOY / DOMAIN / INFRA / RESULT", "승인 유형"),
        C("status", "varchar(20)", "Y", "PENDING / APPROVED / REJECTED", "상태"),
        C("summary", "varchar(500)", "Y", "", "요약"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("decided_at", "datetime", "N", "", "결정 시각"),
    ],
    "project_changes": [
        C("change_id", "bigint", "Y", "", "변경 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "N", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("chat_session_id", "bigint", "N", "", "채팅 세션 ID", "• 외래키 → chat_sessions(chat_session_id)"),
        C("task_id", "varchar(64)", "Y", "", "에이전트 작업 ID", "• 외래키 → agent_runs(task_id)"),
        C("preview_session_id", "varchar(36)", "Y", "", "프리뷰 세션 ID", "• 외래키 → preview_sessions(preview_session_id)"),
        C("status", "varchar(30)", "Y", "", "상태"),
        C("summary", "text", "N", "", "요약"),
        C("diff_text", "mediumtext", "N", "", "변경 diff"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
        C("approval_id", "bigint", "N", "", "결과 승인(RESULT) 행. 게이트 미발동·legacy 변경은 NULL", "• 외래키 → approvals(approval_id)"),
        C("pr_number", "int", "N", "", "preview → main 반영 PR 번호 (멱등 no-op merge는 NULL)"),
        C("merge_commit_sha", "varchar(64)", "N", "", "main 반영 커밋 SHA"),
        C("merged_at", "datetime", "N", "", "main 반영 시각"),
    ],
    "agent_runs": [
        C("task_id", "varchar(64)", "Y", "", "에이전트 작업 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "N", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("chat_session_id", "bigint", "N", "", "채팅 세션 ID", "• 외래키 → chat_sessions(chat_session_id)"),
        C("status", "varchar(30)", "Y", "", "상태"),
        C("plan_json", "longtext", "N", "", "실행 계획 JSON"),
        C("current_step", "int", "Y", "", "현재 스텝"),
        C("attempt", "int", "Y", "", "시도 횟수"),
        C("max_attempts", "int", "Y", "", "최대 시도 횟수"),
        C("preview_url", "varchar(1000)", "N", "", "프리뷰 URL"),
        C("summary", "text", "N", "", "요약"),
        C("error", "text", "N", "", "오류"),
        C("question", "text", "N", "", "사용자 입력 요구"),
        C("input_value", "text", "N", "", "제출된 입력값"),
        C("failure_log", "text", "N", "", "실패 로그"),
        C("suggested_fix", "text", "N", "", "제안된 수정"),
        C("next_run_at", "datetime", "N", "", "다음 실행 예정 시각"),
        C("lease_owner", "varchar(100)", "N", "", "리스 소유자"),
        C("lease_until", "datetime", "N", "", "리스 만료 시각"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "agent_run_events": [
        C("event_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("task_id", "varchar(64)", "Y", "", "에이전트 작업 ID", "• 외래키 → agent_runs(task_id)"),
        C("event_type", "varchar(40)", "Y", "", "이벤트 유형"),
        C("status", "varchar(30)", "Y", "", "상태"),
        C("message", "text", "N", "", "내용"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
    "preview_sessions": [
        C("preview_session_id", "varchar(36)", "Y", "", "프리뷰 세션 ID", "• 기본키"),
        C("access_token", "varchar(64)", "Y", "", "액세스 토큰"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "N", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("chat_session_id", "bigint", "N", "", "채팅 세션 ID", "• 외래키 → chat_sessions(chat_session_id)"),
        C("task_id", "varchar(64)", "N", "", "에이전트 작업 ID", "• 외래키 → agent_runs(task_id)"),
        C("container_id", "varchar(128)", "Y", "", "컨테이너 ID"),
        C("host_port", "int", "Y", "", "호스트 포트"),
        C("status", "varchar(20)", "Y", "", "상태"),
        C("failure_reason", "varchar(500)", "N", "", "실패 사유"),
        C("public_url", "varchar(1000)", "Y", "", "공개 URL"),
        C("expires_at", "datetime", "Y", "", "만료 시각"),
        C("last_accessed_at", "datetime", "Y", "", "last accessed 시각"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "pipelines": [
        C("pipeline_id", "bigint", "Y", "", "파이프라인 ID", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
    "deployments": [
        C("deployment_id", "bigint", "Y", "", "배포 ID", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("pipeline_id", "bigint", "Y", "", "파이프라인 ID", "• 외래키 → pipelines(pipeline_id)"),
        C("deploy_url", "varchar(512)", "Y", "", "배포된 서비스 URL"),
        C("status", "varchar(50)", "Y", "pending / success / failed", "배포 상태"),
        C("log", "text", "Y", "", "배포 로그"),
        C("deployed_at", "datetime", "Y", "", "배포 시작 시간"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
    "deployment_histories": [
        C("history_id", "bigint", "Y", "", "배포 이력 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("project_id", "bigint", "Y", "", "Dvely 프로젝트 ID"),
        C("deploy_target_type", "varchar(20)", "Y", "LATEST / VERSION", "배포 대상 유형"),
        C("version_label", "varchar(100)", "N", "", "VERSION 배포 시 태그명"),
        C("deployed_url", "varchar(512)", "N", "", "배포 URL"),
        C("status", "varchar(30)", "Y", "IN_PROGRESS / LIVE / FAILED", "상태"),
        C("workflow_run_id", "bigint", "N", "", "워크플로 실행 ID"),
        C("correlation_id", "varchar(36)", "Y", "", "상관 ID"),
        C("commit_sha", "varchar(40)", "N", "", "커밋 SHA"),
        C("workflow_head_sha", "varchar(40)", "N", "", "워크플로 HEAD SHA"),
        C("title", "varchar(500)", "N", "", "제목"),
        C("description", "text", "N", "", "설명"),
        C("merged_by", "varchar(100)", "N", "", "머지한 사용자"),
        C("merged_by_avatar_url", "varchar(1000)", "N", "", "머지 사용자 아바타 URL"),
        C("pr_number", "int", "N", "", "PR 번호"),
        C("merged_at", "datetime", "N", "", "머지 시각"),
        C("agent_task_id", "varchar(64)", "N", "", "에이전트 작업 ID"),
        C("error_message", "text", "N", "", "오류 메시지"),
        C("failure_code", "varchar(40)", "N", "", "실패 분류"),
        C("attempt", "int", "Y", "", "시도 횟수"),
        C("max_attempts", "int", "Y", "", "최대 시도 횟수"),
        C("next_run_at", "datetime", "N", "", "다음 실행 예정 시각"),
        C("lease_owner", "varchar(100)", "N", "", "리스 소유자"),
        C("lease_until", "datetime", "N", "", "리스 만료 시각"),
        C("retried_from_history_id", "bigint", "N", "", "재시도 원본 이력 ID", "• 외래키 → deployment_histories(history_id)"),
        C("triggered_at", "datetime", "Y", "", "배포 트리거 시각"),
        C("updated_at", "datetime", "Y", "", "상태 변경 시각"),
    ],
    "deployment_failure_analyses": [
        C("analysis_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("history_id", "bigint", "Y", "", "배포 이력 ID", "• 외래키 → deployment_histories(history_id)"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("source", "varchar(20)", "Y", "LLM / RULE_BASED", "분석 출처"),
        C("summary", "text", "Y", "", "요약"),
        C("log_excerpt", "mediumtext", "Y", "", "로그 발췌"),
        C("suggested_fix", "text", "Y", "", "제안된 수정"),
        C("provider", "varchar(20)", "N", "", "분석에 사용한 AI provider (RULE_BASED면 NULL)"),
        C("model", "varchar(100)", "N", "", "사용 모델"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
    "domains": [
        C("domain_id", "bigint", "Y", "", "도메인 ID", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("domain_name", "varchar(255)", "Y", "", "도메인 주소"),
        C("domain_type", "varchar(30)", "Y", "CUSTOM_DOMAIN", "도메인 유형"),
        C("hosting_target", "varchar(30)", "Y", "GITHUB_PAGES", "배포 대상"),
        C("status", "varchar(30)", "Y", "VERIFYING", "상태"),
        C("verification_method", "varchar(10)", "N", "", "검증 방식"),
        C("dns_target", "varchar(512)", "N", "", "DNS 대상"),
        C("cloudflare_record_id", "varchar(100)", "N", "", "Cloudflare 레코드 ID"),
        C("last_checked_at", "datetime", "N", "", "마지막 확인 시각"),
        C("https_enforced", "tinyint(1)", "Y", "0 / 1", "실제 HTTPS 강제 적용 여부"),
        C("certificate_status", "varchar(30)", "Y", "PENDING", "인증서 상태"),
        C("certificate_expires_at", "date", "N", "", "인증서 만료일"),
        C("dns_verified", "tinyint(1)", "Y", "0 / 1", "DNS 인증 여부 (0: 미인증, 1: 인증완료)"),
        C("created_at", "datetime", "Y", "", "도메인 등록 시간"),
        C("updated_at", "datetime", "Y", "", "도메인 수정 시간"),
    ],
    "cloud_connections": [
        C("cloud_connection_id", "bigint", "Y", "", "클라우드 연결 ID", "• 기본키"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("provider", "varchar(20)", "Y", "AWS / GCP", "클라우드 제공자"),
        C("display_name", "varchar(100)", "Y", "", "사용자가 구분하기 위한 연결 이름"),
        C("account_id", "varchar(50)", "N", "", "AWS 계정 ID"),
        C("region", "varchar(80)", "Y", "", "배포 기본 리전"),
        C("role_arn", "varchar(255)", "N", "", "IAM Role ARN"),
        C("aws_credential_type", "varchar(30)", "N", "ACCESS_KEY / ROLE_ARN", "AWS 자격 유형"),
        C("access_key_id", "varchar(80)", "N", "", "AWS 액세스 키 ID"),
        C("secret_access_key", "mediumtext", "N", "", "AWS 시크릿 키 (암호화)"),
        C("session_token", "mediumtext", "N", "", "AWS 세션 토큰 (암호화)"),
        C("gcp_credential_type", "varchar(40)", "N", "SERVICE_ACCOUNT_KEY / SERVICE_ACCOUNT_EMAIL", "GCP 자격 유형"),
        C("service_account_key_json", "mediumtext", "N", "", "GCP 서비스 계정 키 (암호화)"),
        C("gcp_project_id", "varchar(255)", "N", "", "GCP 프로젝트 ID"),
        C("service_account_email", "varchar(255)", "N", "", "GCP 서비스 계정 이메일"),
        C("status", "varchar(40)", "Y", "VALIDATED / VERIFYING / CONNECTED", "연결 상태"),
        C("last_checked_at", "datetime", "N", "", "마지막 health 확인 시각"),
        C("created_at", "datetime", "Y", "", "클라우드 연결 등록 시각"),
        C("updated_at", "datetime", "Y", "", "클라우드 연결 수정 시각"),
    ],
    "cloud_connection_verification_jobs": [
        C("job_id", "varchar(36)", "Y", "", "식별자", "• 기본키"),
        C("cloud_connection_id", "bigint", "Y", "", "클라우드 연결 ID", "• 외래키 → cloud_connections(cloud_connection_id)"),
        C("user_id", "bigint", "Y", "", "소속 사용자", "• 외래키 → users(user_id)"),
        C("status", "varchar(30)", "Y", "PENDING", "상태"),
        C("connection_status", "varchar(40)", "Y", "VALIDATED", "연결 상태"),
        C("message", "text", "Y", "", "내용"),
        C("attempt", "int", "Y", "", "시도 횟수"),
        C("lease_owner", "varchar(120)", "N", "", "리스 소유자"),
        C("lease_until", "datetime", "N", "", "리스 만료 시각"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("started_at", "datetime", "N", "", "started 시각"),
        C("completed_at", "datetime", "N", "", "completed 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "environment_variables": [
        C("environment_variable_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("scope", "varchar(20)", "Y", "PREVIEW / PRODUCTION", "적용 범위"),
        C("env_key", "varchar(128)", "Y", "", "POSIX 환경변수 키 (case-sensitive)"),
        C("env_value", "mediumtext", "Y", "", "AES-256-GCM 암호문(Base64), 애플리케이션 레벨 암호화"),
        C("secret", "tinyint(1)", "Y", "0 / 1", "시크릿 여부"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "environment_variable_histories": [
        C("environment_variable_history_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("environment_variable_id", "bigint", "N", "", "원본 삭제 시 NULL", "• 외래키 → environment_variables(environment_variable_id)"),
        C("scope", "varchar(20)", "Y", "PREVIEW / PRODUCTION", "적용 범위"),
        C("env_key", "varchar(128)", "Y", "", "환경변수 키"),
        C("action", "varchar(20)", "Y", "CREATED / UPDATED / DELETED", "변경 유형"),
        C("secret", "tinyint(1)", "Y", "0 / 1", "시크릿 여부"),
        C("value_changed", "tinyint(1)", "Y", "0 / 1", "값 변경 여부"),
        C("actor_user_id", "bigint", "Y", "", "행위자 사용자", "• 외래키 → users(user_id)"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
    "project_infrastructure_setting_changes": [
        C("change_id", "bigint", "Y", "", "변경 ID", "• 기본키"),
        C("project_id", "bigint", "Y", "", "소속 프로젝트", "• 외래키 → projects(project_id)"),
        C("action", "varchar(20)", "Y", "CREATED / UPDATED", "변경 유형"),
        C("status", "varchar(30)", "Y", "APPLIED / PENDING_APPROVAL / REJECTED", "상태"),
        C("deployment_architecture", "varchar(20)", "Y", "", "배포 아키텍처"),
        C("compute_tier", "varchar(20)", "Y", "", "컴퓨팅 티어"),
        C("storage_type", "varchar(30)", "Y", "", "스토리지 유형"),
        C("network_access", "varchar(20)", "Y", "", "네트워크 접근"),
        C("approval_id", "bigint", "N", "", "즉시 적용 변경은 NULL", "• 외래키 → approvals(approval_id)"),
        C("actor_user_id", "bigint", "Y", "", "행위자 사용자", "• 외래키 → users(user_id)"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
        C("decided_at", "datetime", "N", "", "APPLIED/REJECTED 확정 시각"),
    ],
    "webhook_deliveries": [
        C("delivery_id", "varchar(64)", "Y", "", "전달 ID", "• 기본키"),
        C("event_type", "varchar(80)", "Y", "", "이벤트 유형"),
        C("payload", "longblob", "Y", "", "페이로드"),
        C("status", "varchar(30)", "Y", "PENDING", "상태"),
        C("attempt", "int", "Y", "", "시도 횟수"),
        C("max_attempts", "int", "Y", "", "최대 시도 횟수"),
        C("next_attempt_at", "datetime", "N", "", "next attempt 시각"),
        C("lease_owner", "varchar(120)", "N", "", "리스 소유자"),
        C("lease_until", "datetime", "N", "", "리스 만료 시각"),
        C("error_message", "text", "N", "", "오류 메시지"),
        C("received_at", "datetime", "Y", "", "수신 시각"),
        C("processed_at", "datetime", "N", "", "처리 시각"),
        C("updated_at", "datetime", "Y", "", "수정 시각"),
    ],
    "audit_logs": [
        C("audit_log_id", "bigint", "Y", "", "식별자", "• 기본키"),
        C("category", "varchar(20)", "Y", "GITHUB / DEPLOYMENT / DOMAIN / INFRA", "감사 분류"),
        C("action", "varchar(40)", "Y", "", "AuditAction enum 이름"),
        C("outcome", "varchar(20)", "Y", "SUCCEEDED / FAILED", "결과"),
        C("actor_type", "varchar(20)", "Y", "USER / AGENT / SYSTEM", "행위자 유형"),
        C("actor_user_id", "bigint", "N", "", "행위 귀속 사용자. SYSTEM 이벤트도 소유자 추적 가능하면 세팅"),
        C("project_id", "bigint", "N", "", "계정 수준 이벤트는 NULL 허용. FK 없음(ADR-A3)"),
        C("resource_type", "varchar(30)", "N", "REPOSITORY / DEPLOYMENT / DOMAIN_BINDING / PREVIEW_SESSION / INFRA_CONFIG_CHANGE / CHANGE", "리소스 유형"),
        C("resource_id", "varchar(255)", "N", "", "대상 식별자 (숫자 PK 또는 repo full name 등)"),
        C("task_id", "varchar(64)", "N", "", "agent task 상관관계 (FK 아님)"),
        C("approval_id", "bigint", "N", "", "승인 상관관계 (FK 아님)"),
        C("detail", "varchar(1000)", "N", "", "코드가 조립한 화이트리스트 요약. 토큰/시크릿/환경변수 값/로그 본문 저장 금지"),
        C("error_summary", "varchar(500)", "N", "", "실패 시 예외 요약 — SecretRedactor 적용 + 500자 절단"),
        C("created_at", "datetime", "Y", "", "생성 시각"),
    ],
}


def render(name: str, cols: list[tuple]) -> str:
    n = len(cols)
    # Fit 1200x600: padding 48 + title 32 + header + rows
    avail = 600 - 56 - 34
    row_h = min(36, max(16, avail // (n + 1)))
    font = 13 if row_h >= 28 else (12 if row_h >= 20 else 11)

    rows = []
    for col, typ, req, values, desc, extra in cols:
        req_txt = "필수" if req == "Y" else "선택"
        desc_html = html.escape(desc)
        if extra:
            desc_html = f"{html.escape(extra)}<br/>{desc_html}" if desc else html.escape(extra)
        rows.append(
            f"<tr><td class='nm'>{html.escape(col)}</td>"
            f"<td class='c'>{html.escape(typ)}</td>"
            f"<td class='c'>{req_txt}</td>"
            f"<td class='c'>{html.escape(values)}</td>"
            f"<td class='c'>활성</td>"
            f"<td class='desc'>{desc_html}</td></tr>"
        )

    return f"""<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"/><title>{html.escape(name)}</title>
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body, .page {{ width: 1200px; height: 600px; background: #fff; overflow: hidden; }}
body {{ font-family: "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif; color: #111; }}
.page {{ padding: 28px 28px 22px; }}
.ttl {{
  font-size: 16px; font-weight: 700; color: #1a1a1a;
  margin-bottom: 10px; letter-spacing: 0.2px;
}}
table {{ width: 100%; border-collapse: collapse; table-layout: fixed; }}
th, td {{
  border: 1px solid #9aa7b4;
  font-size: {font}px;
  height: {row_h}px;
  vertical-align: middle;
}}
th {{
  background: #c5d8ea;
  font-weight: 700;
  text-align: center;
}}
tbody tr:nth-child(even) td {{ background: #eef4f8; }}
td.nm {{ padding: 0 10px; text-align: left; font-weight: 600; }}
td.c {{ text-align: center; }}
td.desc {{ padding: 0 10px; text-align: left; line-height: 1.25; }}
</style></head>
<body>
<section class="page">
  <div class="ttl">&lt; {html.escape(name)} 테이블 &gt;</div>
  <table>
    <colgroup>
      <col style="width:22%"/><col style="width:14%"/><col style="width:10%"/>
      <col style="width:22%"/><col style="width:9%"/><col/>
    </colgroup>
    <thead>
      <tr>
        <th>항목명</th>
        <th>Type</th>
        <th>필수/선택</th>
        <th>값 목록</th>
        <th>활성여부</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      {''.join(rows)}
    </tbody>
  </table>
</section>
</body></html>
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, cols in TABLES.items():
        (OUT / f"{name}.html").write_text(render(name, cols), encoding="utf-8")
    print(f"wrote {len(TABLES)} html files to {OUT}")


if __name__ == "__main__":
    main()
