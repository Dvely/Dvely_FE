import { Link } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import type { ProjectStartType } from '@/lib/userProjects';

export type HomeTemplateCardData = {
  id: string;
  title: string;
  tags: string[];
  /**
   * 카드에 쓸 그림.
   *
   * **없을 수 있다.** 카탈로그가 GH Pages 에서 실시간으로 오므로 템플릿 저장소가
   * 발행되기 전에는 서버가 이 값을 안 준다. 없으면 이름과 태그만으로 그린다 —
   * 깨진 이미지 아이콘을 보여주느니 글자만 있는 카드가 낫다.
   */
  image?: string | null;
  startType: ProjectStartType;
  thumbnailPreviewUrl?: string;
};

type HomeTemplateCardProps = {
  card: HomeTemplateCardData;
  selected: boolean;
  onSelect: () => void;
};

function HomeTemplateCard({ card, onSelect }: HomeTemplateCardProps) {
  return (
    <article
      className="group text-left"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative isolate aspect-16/10 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f1f5f9] transition duration-300">
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          /*
            그림이 없을 때. 빈 상자를 두면 무엇인지 알 수 없고 깨진 이미지 아이콘은
            고장으로 읽힌다. 이름을 크게 두면 적어도 무슨 템플릿인지는 읽힌다.
          */
          <div className="flex size-full items-center justify-center bg-linear-to-br from-[#ede9fe] to-[#f1f5f9] px-4">
            <p className="text-center text-[15px] font-semibold text-[#6d28d9]">{card.title}</p>
          </div>
        )}
        {card.thumbnailPreviewUrl && (
          <iframe
            src={card.thumbnailPreviewUrl}
            title={`${card.title} 썸네일`}
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className="pointer-events-none absolute inset-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 bg-transparent"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/50 to-transparent" />

        <Link
          to="/project/new"
          search={{ type: card.startType, templateId: card.id }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`${card.title} 미리보기`}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/45 text-[15px] font-semibold text-white opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-black/55"
        >
          <Eye className="size-5" strokeWidth={2} />
          미리보기
        </Link>
      </div>

      <p className="mt-2 text-[22px] font-semibold tracking-tight text-[#0f172a]">{card.title}</p>
      <p className="mt-0.5 text-[13px] text-[#64748b]">{card.tags.join(' ')}</p>
    </article>
  );
}

export default HomeTemplateCard;
