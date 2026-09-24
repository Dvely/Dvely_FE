import { useState } from 'react';
import { useAssetLoadFailed } from '@/lib/assetLoadFailure';

/**
 * 조각을 못 받았다는 것을 알리고 새로고침할 길을 준다.
 *
 * **왜 "새 버전이 배포됐습니다" 라고 하지 않는가.** 배포로 옛 파일이 지워진 것과 네트워크가
 * 잠깐 끊긴 것을, 브라우저가 내는 신호로는 구분할 수 없다. 배포라고 단정하면 와이파이가
 * 끊긴 사용자에게 거짓을 말하게 되고, 그 상태로 새로고침을 누르면 **화면이 통째로 사라진다**
 * — 읽을 수는 있던 화면이 브라우저 오류 페이지가 된다.
 *
 * 그래서 아는 만큼만 말한다: 일부를 못 받았고, 다시 받아보려면 새로고침하면 된다.
 *
 * **새로고침이 반드시 낫는다고도 하지 않는다.** 이 저장소의 배포 문서가 Cloudflare 가 옛
 * index.html 을 돌려줄 수 있다고 적어두고 있다(`deploy/README.md`). 그러면 같은 빌드를
 * 다시 받아 제자리다. "하면 낫는다" 가 아니라 "다시 받아본다" 가 정확하다.
 *
 * 닫을 수 있게 둔다. 잘못 뜬 경우에 지울 방법이 없으면 남은 세션 내내 자리를 차지한다.
 */

/** 새로고침으로 날아갈 입력을 잠깐 맡아 둘 자리. 복구는 각 화면이 알아서 한다 */
const DRAFT_STASH_KEY = 'dvely:reload-draft';

function stashComposerDraft() {
  const draft = document.querySelector<HTMLTextAreaElement>('textarea')?.value?.trim();
  if (!draft) return;
  try {
    sessionStorage.setItem(DRAFT_STASH_KEY, draft);
  } catch {
    // 저장이 막힌 브라우저(프라이빗 모드 등)면 그냥 넘어간다 — 새로고침을 막을 이유는 아니다
  }
}

function AssetLoadFailureNotice() {
  const hasFailed = useAssetLoadFailed();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!hasFailed || isDismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
    >
      <div className="flex max-w-xl items-center gap-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] px-3.5 py-2.5 shadow-lg">
        <p className="text-[12px] leading-relaxed text-[#92400e]">
          화면 일부를 불러오지 못했습니다. 연결을 확인하거나 새로고침해 주세요.
        </p>
        <button
          type="button"
          onClick={() => {
            stashComposerDraft();
            window.location.reload();
          }}
          className="shrink-0 cursor-pointer rounded-lg bg-[#92400e] px-2.5 py-1 text-[12px] font-semibold text-white transition hover:bg-[#78350f]"
        >
          새로고침
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="닫기"
          className="shrink-0 cursor-pointer text-[12px] font-medium text-[#b45309] hover:text-[#92400e]"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export { AssetLoadFailureNotice, DRAFT_STASH_KEY };
