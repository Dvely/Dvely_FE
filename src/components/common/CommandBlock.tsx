import CopyButton from '@/components/common/CopyButton';

/** 복사 버튼이 붙은 명령 한 덩어리 */
function CommandBlock({ command }: { command: string }) {
  return (
    <div className="mt-1.5 flex items-start gap-2 rounded-lg bg-[#0f172a] py-2 pr-2 pl-3">
      {/*
        줄을 바꿔 다 보여 준다. 가로로 넘기게 두면 시트 폭에서 등록 명령의 끝(쓰기 도구를 켜는
        환경변수 부분)이 잘려, 무엇이 붙었는지 안 보인다. 복사는 원래 문자열을 그대로 넣는다.
      */}
      <pre className="min-w-0 flex-1 py-0.5 font-mono text-[11px] leading-relaxed whitespace-pre-wrap wrap-break-word text-[#e2e8f0]">
        {command}
      </pre>
      {/* 명령이 바뀌면(에이전트·쓰기 전환) "복사됨" 도 새로 시작한다 */}
      <CopyButton key={command} text={command} tone="onDark" />
    </div>
  );
}

export default CommandBlock;
