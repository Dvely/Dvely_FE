import { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  AGENT_CLIENTS,
  CI_TOKEN_COMMAND,
  ENABLE_WRITES_ENV,
  LOGIN_COMMAND,
  buildExamplePrompts,
  buildRegisterCommand,
  type AgentClient,
} from '@/lib/agentConnect';
import { cn } from '@/lib/utils';

/** 복사 버튼이 붙은 명령 한 덩어리 */
function CommandBlock({ command, demoId }: { command: string; demoId?: string }) {
  return (
    <div className="mt-1.5 flex items-start gap-2 rounded-lg bg-[#0f172a] py-2 pr-2 pl-3">
      <pre className="min-w-0 flex-1 overflow-x-auto py-0.5 font-mono text-[11px] leading-relaxed text-[#e2e8f0]">
        {command}
      </pre>
      {/* 명령이 바뀌면(에이전트·쓰기 전환) "복사됨" 도 새로 시작한다 */}
      <CopyButton key={command} text={command} tone="onDark" demoId={demoId} />
    </div>
  );
}

function StepNumber({ value }: { value: number }) {
  return (
    <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[11px] font-semibold text-[#475569]">
      {value}
    </span>
  );
}

type WritesToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/**
 * "배포까지 맡기기". 켜면 등록 명령에 쓰기 도구를 켜는 환경변수가 붙고, 토큰도 WRITE 여야
 * 한다. 기본은 꺼져 있다 — 과하게 적극적인 에이전트의 실패는 틀린 답이 아니라 진짜 배포다.
 */
export function WritesToggle({ checked, onChange }: WritesToggleProps) {
  return (
    <label
      data-demo="agent-connect-writes"
      className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-3"
    >
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-[#0f172a]">배포까지 맡기기</span>
        <span className="mt-0.5 block text-[12px] leading-relaxed text-[#64748b]">
          켜면 에이전트가 배포 실행·재시도, 환경변수 추가·수정, 도메인 연결까지 할 수 있습니다.
          WRITE 토큰이 필요합니다.
        </span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="h-5 w-9 rounded-full bg-[#cbd5e1] transition peer-checked:bg-[#7c3aed] peer-focus-visible:ring-2 peer-focus-visible:ring-[#c4b5fd]"
        />
        <span
          aria-hidden
          className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition peer-checked:translate-x-4"
        />
      </span>
    </label>
  );
}

type AgentConnectStepsProps = {
  enableWrites: boolean;
  /** 첫 단계의 번호. 시트는 1번이 토큰 발급이라 2부터 센다 */
  firstStepNumber?: number;
  /** 예시 요청에 넣을 이름. 없으면 예시를 그리지 않는다 */
  projectName?: string;
  /** CI 용 환경변수 안내. 설정 화면에서만 보인다 */
  showCi?: boolean;
};

/**
 * 발급한 토큰으로 Claude Code·Codex 를 잇는 단계. 설정의 토큰 패널과 프로젝트의 연결 안내
 * 시트가 같이 쓴다 — 두 곳의 문구가 갈라지지 않게 한 자리에 둔다.
 *
 * **순서가 곧 안전장치다.** 토큰을 먼저 기기에 저장해야 등록 명령에 토큰을 적지 않을 수
 * 있고, 환경변수는 로그인을 못 하는 환경용 보조로 뒤에 온다. 순서를 바꾸면 토큰이 셸 기록과
 * 에이전트 설정 파일로 퍼진다.
 *
 * `qeploy login` 은 브라우저 로그인 토큰을 받아 새로 발급하는 경로도 갖고 있는데, **여기엔
 * 적지 않는다.** 이 안내는 늘 발급 버튼 가까이 있다 — 발급할 수 있는 사람에게 발급의 우회로를
 * 같이 보여줄 이유가 없다. `--scope` 도 같은 이유로 뺐다. 그 플래그는 브라우저 토큰 경로에서만
 * 의미가 있고, 이미 발급된 토큰과 같이 주면 CLI 가 거절한다 — @qeploy/cli 0.1.3 기준.
 */
function AgentConnectSteps({
  enableWrites,
  firstStepNumber = 1,
  projectName,
  showCi = false,
}: AgentConnectStepsProps) {
  const [client, setClient] = useState<AgentClient>('claude');
  const examples = projectName != null ? buildExamplePrompts(projectName) : [];

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-3">
        <li className="flex gap-2">
          <StepNumber value={firstStepNumber} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#0f172a]">
              발급한 토큰을 기기에 저장합니다
            </p>
            <CommandBlock command={LOGIN_COMMAND} demoId="agent-connect-copy-login" />
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">
              발급한 토큰(qp_ 로 시작합니다)을 붙여넣습니다. 입력은 화면에 표시되지 않고, 서버에 한
              번 확인한 뒤 소유자만 읽을 수 있는 파일에 저장됩니다. 스코프는 발급할 때 정해지므로 이
              명령으로는 바꿀 수 없습니다.
            </p>
          </div>
        </li>

        <li className="flex gap-2">
          <StepNumber value={firstStepNumber + 1} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] font-semibold text-[#0f172a]">
                에이전트에 MCP 서버로 등록합니다
              </p>
              <div role="tablist" className="flex rounded-lg bg-[#f1f5f9] p-0.5">
                {AGENT_CLIENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={client === item.id}
                    onClick={() => setClient(item.id)}
                    className={cn(
                      'cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-semibold transition',
                      client === item.id
                        ? 'bg-white text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                        : 'text-[#64748b] hover:text-[#334155]',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <CommandBlock
              command={buildRegisterCommand(client, enableWrites)}
              demoId="agent-connect-copy-register"
            />
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">
              토큰은 이 명령에 적지 않습니다. 앞에서 저장한 것을 그대로 읽습니다.
              {enableWrites ? (
                <>
                  {' '}
                  <code className="rounded bg-[#f1f5f9] px-1 py-0.5 font-mono text-[11px]">
                    {ENABLE_WRITES_ENV}
                  </code>{' '}
                  가 쓰기 도구를 켭니다.
                </>
              ) : null}
            </p>
          </div>
        </li>

        {showCi ? (
          <li className="flex gap-2">
            <StepNumber value={firstStepNumber + 2} />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#0f172a]">
                CI 에서는 환경변수로 넘깁니다
              </p>
              <CommandBlock command={CI_TOKEN_COMMAND} />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">
                로그인을 못 하는 환경에서만 씁니다. 환경변수가 저장된 토큰을 이깁니다. 주소는 따로
                적지 않아도 기본값으로 붙습니다.
              </p>
            </div>
          </li>
        ) : null}
      </ol>

      <p className="text-[12px] leading-relaxed text-[#64748b]">
        <b className="font-semibold text-[#0f172a]">쓰기 도구는 기본으로 꺼져 있습니다.</b> 켜려면{' '}
        <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px]">
          {ENABLE_WRITES_ENV}
        </code>{' '}
        가 추가로 필요하고, 그때도 WRITE 스코프 토큰이어야 합니다 — 두 가지는 별개의 층입니다. READ
        토큰이면 서버가 변경 요청을 403 으로 막고, 배포·인프라 변경의 승인 게이트는 이 경로에서도
        그대로입니다. 켜도 늘어나는 것은 다섯 개(배포 실행·재시도, 환경변수 추가·수정, 도메인
        연결)뿐이고, 프로젝트·서버 삭제나 승인 결정처럼 되돌릴 수 없는 것은 애초에 들어 있지
        않습니다.
      </p>

      {examples.length > 0 ? (
        <div>
          <p className="text-[12px] font-semibold text-[#0f172a]">연결한 뒤 이렇게 시켜 보세요</p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {examples.map((example) => {
              const unavailable = example.needsWrites && !enableWrites;
              return (
                <li
                  key={example.text}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[12px]',
                    unavailable ? 'text-[#94a3b8]' : 'text-[#334155]',
                  )}
                >
                  <span>“{example.text}”</span>
                  {unavailable ? (
                    <span className="shrink-0 text-[11px] text-[#94a3b8]">
                      배포까지 맡기기를 켜야 합니다
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <p className="text-[12px] leading-relaxed text-[#94a3b8]">
        토큰이 만료되면 연결이 끊깁니다. 새로 발급한 뒤 {firstStepNumber}번을 다시 실행하세요.
      </p>
    </div>
  );
}

export default AgentConnectSteps;
