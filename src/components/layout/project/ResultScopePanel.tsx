import type {
  GetResultScopeResType,
  ResultScopeDetail,
  ResultScopeFile,
  ResultScopeOrigin,
} from '@/types/resultScope.type';

/**
 * 결과 승인이 main 에 **무엇을** 반영하는지 보여준다.
 *
 * 카드는 그동안 에이전트가 이번에 한 일만 보여줬다. 그런데 승인하면 preview 상태
 * **전체**가 들어간다. 둘이 어긋날 때 사용자는 자기가 무엇을 승인하는지 몰랐고,
 * 거절해 둔 변경이 다음 승인에 묻어 들어가는 것도 그래서 드러나지 않았다.
 *
 * 여기 나오는 문장은 **전부 서버가 만든 것을 그대로** 쓴다. 숫자도 서버가 계산한
 * main...preview 다 — 에이전트가 쓴 설명이 아니다.
 */

/** 이번 작업이 아닌 변경에만 꼬리표를 단다. 전부에 달면 아무것도 눈에 띄지 않는다 */
const FOREIGN_ORIGIN_LABEL: Partial<Record<ResultScopeOrigin, string>> = {
  PREVIOUSLY_REJECTED: '이전에 거절함',
  OTHER: '다른 작업',
  UNKNOWN: '출처 불명',
};

const FILE_STATUS_LABEL: Record<ResultScopeFile['status'], string> = {
  added: '추가',
  modified: '수정',
  removed: '삭제',
  renamed: '이름 변경',
};

function OriginBadges({ origins }: { origins: ResultScopeOrigin[] }) {
  const foreign = origins.filter((origin) => FOREIGN_ORIGIN_LABEL[origin]);
  if (foreign.length === 0) return null;

  return (
    <span className="ml-1.5 inline-flex flex-wrap gap-1 align-middle">
      {foreign.map((origin) => (
        <span
          key={origin}
          className="rounded-full bg-[#fef3c7] px-1.5 py-0.5 text-[10px] font-semibold text-[#92400e]"
        >
          {FOREIGN_ORIGIN_LABEL[origin]}
        </span>
      ))}
    </span>
  );
}

function FileCount({ file }: { file: ResultScopeFile }) {
  // 바이너리는 GitHub 이 증감을 세어주지 않는다. 0 으로 적으면 "안 바뀌었다"로 읽힌다
  if (file.additions === null || file.deletions === null) {
    return <span className="shrink-0 text-[11px] text-[#94a3b8]">증감 미집계</span>;
  }

  return (
    <span className="shrink-0 text-[11px] tabular-nums">
      <span className="text-[#16a34a]">+{file.additions}</span>{' '}
      <span className="text-[#dc2626]">−{file.deletions}</span>
    </span>
  );
}

function ScopeFileList({ scope }: { scope: ResultScopeDetail }) {
  if (scope.files.length === 0) {
    return <p className="mt-2 text-[12px] text-[#64748b]">바뀐 파일이 없습니다.</p>;
  }

  return (
    <>
      <ul className="mt-2 flex flex-col gap-1">
        {scope.files.map((file) => (
          <li key={file.path} className="flex items-start justify-between gap-2 text-[12px]">
            <span className="min-w-0 break-all text-[#334155]">
              <span className="mr-1.5 text-[11px] text-[#94a3b8]">
                {FILE_STATUS_LABEL[file.status]}
              </span>
              {file.path}
              {file.previousPath ? (
                <span className="text-[11px] text-[#94a3b8]"> ← {file.previousPath}</span>
              ) : null}
              <OriginBadges origins={file.origins} />
            </span>
            <FileCount file={file} />
          </li>
        ))}
      </ul>

      {/*
        잘렸으면 totals 가 null 로 온다. 일부만 센 숫자를 합계처럼 보여주면 사용자에게
        틀린 수치를 자신 있게 말하게 된다 — 그래서 서버가 아예 안 준다.
      */}
      {scope.truncated ? (
        <p className="mt-2 text-[11px] leading-relaxed text-[#92400e]">
          변경이 많아 목록 일부만 표시합니다. 전체 합계는 표시하지 않습니다.
        </p>
      ) : scope.totals ? (
        <p className="mt-2 text-[11px] text-[#64748b] tabular-nums">
          파일 {scope.totals.files}개 ·{' '}
          <span className="text-[#16a34a]">+{scope.totals.additions}</span>{' '}
          <span className="text-[#dc2626]">−{scope.totals.deletions}</span>
        </p>
      ) : null}
    </>
  );
}

function ResultScopePanel({ scope }: { scope: GetResultScopeResType }) {
  const detail =
    scope.scopeState === 'READY'
      ? scope.scope
      : scope.scopeState === 'DECIDED'
        ? scope.decidedSnapshot.scope
        : null;

  /*
    이번 작업 말고도 들어가는 것이 있으면 그걸 먼저 말한다. 서버 notice 가 이미 그
    문장을 들고 있으므로 여기서 다시 쓰지 않는다 — 두 벌로 적으면 서버가 문구를 고칠 때
    화면만 옛말을 한다.
  */
  const flagged = detail?.includesRejected || detail?.includesOtherWork;

  return (
    <div
      className={`mt-3 rounded-lg border px-2.5 py-2 ${
        flagged ? 'border-[#fcd34d] bg-[#fffbeb]' : 'border-[#e2e8f0] bg-white'
      }`}
    >
      <p className="text-[11px] font-semibold text-[#475569]">
        main 에 반영될 범위
        <span className="ml-1.5 font-normal text-[#94a3b8]">
          {scope.base} ← {scope.head}
        </span>
      </p>

      <p
        className={`mt-1 text-[12px] leading-relaxed ${
          flagged ? 'text-[#92400e]' : 'text-[#475569]'
        }`}
      >
        {scope.notice}
      </p>

      {scope.scopeState === 'UNAVAILABLE' ? null : detail ? (
        <ScopeFileList scope={detail} />
      ) : // DECIDED 인데 당시 범위가 기록되지 않은 경우. notice 가 그 사실을 말한다
      null}

      {detail?.pendingPush ? (
        <p className="mt-2 text-[11px] leading-relaxed text-[#64748b]">
          아직 저장소에 올리지 않았습니다. 승인하면 올린 뒤 반영합니다.
        </p>
      ) : null}
    </div>
  );
}

export default ResultScopePanel;
