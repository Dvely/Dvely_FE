import { useCallback, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
  실제 후기가 아니라 화면 구성을 보여주기 위한 예시다. 진짜 이용자의 평가처럼
  읽히면 안 되므로 섹션 제목 옆에 예시라는 것을 적어 둔다.
*/
const reviews = [
  {
    id: 'kim',
    name: '김ㅇㅇ',
    role: 'PM',
    initials: '김',
    body: '기획서 없이 첫 랜딩 시안을 공유할 수 있어서 주간 회의가 빨라졌어요. 문구와 섹션 순서를 대화로 바꿔 보고, 바로 화면으로 확인하니 팀 피드백이 한 번에 모입니다.',
    detail:
      '다음 스프린트 전에 방향을 맞추는 시간이 확실히 줄었습니다. 예전에는 시안을 받느라 이틀을 썼는데, 지금은 회의 전에 링크만 돌려도 의견이 모입니다. 배포 승인 화면도 기획자 기준으로 읽혀서, 개발 일정을 따로 잡지 않고 랜딩 실험을 돌릴 수 있었습니다.',
  },
  {
    id: 'lee',
    name: '이ㅇㅇ',
    role: '풀스택',
    initials: '이',
    body: 'GitHub만 연결하면 파이프라인까지 한 화면에 있다는 게 설득 포인트였습니다. 미리보기와 배포 상태를 오가며 설명할 수 있어서, 코드 리뷰 전에 결과물을 먼저 보게 되었습니다.',
    detail:
      '로컬 환경을 맞추느라 쓰던 시간이 줄어든 점이 가장 컸습니다. preview 브랜치가 바로 떠서 디자이너와 같은 화면을 보고 이야기할 수 있고, 승인 후에만 배포가 나가니 실수 배포도 줄었습니다. 환경변수와 도메인까지 같은 워크스페이스에 있어서, 서버 쪽 설정을 보려고 창을 옮겨 다니지 않아도 됩니다.',
  },
  {
    id: 'moon',
    name: '문ㅇㅇ',
    role: '프론트',
    initials: '문',
    body: '섹션 단위로 초안이 나오니 퍼블리싱 시작점이 생깁니다. 반복되는 레이아웃은 에이전트에 맡기고, 저는 인터랙션과 반응형만 손보면 되는 구조가 됐어요.',
    detail:
      '처음부터 마크업을 쌓는 대신 나온 결과물을 고치는 방식이라 착수가 빨라졌습니다. Code 탭에서 폴더 구조를 그대로 볼 수 있어서 어디를 건드려야 하는지 바로 찾고, 고친 내용은 미리보기에서 확인한 뒤 올립니다. 디자인 시안을 기다리는 구간이 짧아진 것이 체감상 가장 큰 변화였습니다.',
  },
] as const;

function ReviewCard({ name, role, initials, body, detail }: Omit<(typeof reviews)[number], 'id'>) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#0F172A]/8 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-[15px] font-semibold text-[#475569]">
          {initials}
        </span>
        <div>
          <p className="text-[16px] font-semibold text-[#111827]">{name}</p>
          <p className="mt-0.5 text-[13px] text-[#64748B]">{role}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-0.5" aria-label="별점 5점">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="size-5 fill-[#FACC15] text-[#FACC15]" />
        ))}
      </div>

      <p
        className={cn(
          'mt-3 text-[15px] leading-relaxed text-[#334155]',
          !expanded && 'line-clamp-3',
        )}
      >
        {body}
      </p>
      {expanded ? (
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155]">{detail}</p>
      ) : null}
      <button
        type="button"
        aria-expanded={expanded}
        onClick={handleToggle}
        className="mt-auto cursor-pointer pt-3 text-left text-[14px] font-medium text-[#7C3AED] transition hover:text-[#6D28D9]"
      >
        {expanded ? '접기' : '더 보기'}
      </button>
    </article>
  );
}

function UserReviews() {
  return (
    <section id="reviews" className="w-full scroll-mt-4 border-t border-[#E2E8F0] bg-white">
      <div className="flex flex-col items-start justify-center gap-2 px-5 py-12 md:px-10 md:py-14 xl:px-52 xl:py-16">
        <p className="text-lg font-extrabold text-[#7C3AED]">이용 후기</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="typo-h2-bd text-[#111827]">팀에서 남긴 한 줄 평가</p>
          <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[12px] font-semibold text-[#64748B]">
            예시
          </span>
        </div>
        <p className="text-[14px] text-[#94A3B8]">
          아래 후기는 화면 구성을 보여주기 위한 예시이며, 실제 이용자의 평가가 아닙니다.
        </p>

        <div className="grid w-full grid-cols-1 gap-4 pt-5 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserReviews;
