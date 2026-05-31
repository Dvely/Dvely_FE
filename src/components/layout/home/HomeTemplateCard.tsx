import { Link } from '@tanstack/react-router';
import { Check, Eye } from 'lucide-react';
import type { ProjectStartType } from '@/lib/userProjects';

export type HomeTemplateCardData = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  startType: ProjectStartType;
};

type HomeTemplateCardProps = {
  card: HomeTemplateCardData;
  selected: boolean;
  onSelect: () => void;
};

function HomeTemplateCard({ card, selected, onSelect }: HomeTemplateCardProps) {
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
      <div
        className={`relative aspect-16/10 overflow-hidden rounded-2xl border bg-[#f1f5f9] transition duration-300 ${
          selected
            ? 'border-[#2ea7ff] ring-2 ring-[#2ea7ff] shadow-[0_10px_28px_rgba(29,155,240,0.2)]'
            : 'border-[#e2e8f0] group-hover:border-[#cbd5e1] group-hover:shadow-[0_10px_24px_rgba(15,23,42,0.14)]'
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/50 to-transparent" />

        {selected ? (
          <span className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-[#2ea7ff] text-white">
            <Check className="size-4" />
          </span>
        ) : null}

        <div
          className={`absolute inset-0 z-10 flex items-end justify-center gap-3 bg-black/45 px-4 pb-4 transition-opacity duration-200 ${
            selected
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
          }`}
        >
          <Link
            to="/project/new"
            search={{ type: card.startType, templateId: card.id }}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#1d9bf0] px-5 py-2.5 text-center text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#1689d6]"
          >
            <Eye className="size-3.5" />이 템플릿으로 시작
          </Link>
        </div>
      </div>

      <p className="mt-2 text-[22px] font-semibold tracking-tight text-[#0f172a]">{card.title}</p>
      <p className="mt-0.5 text-[13px] text-[#64748b]">{card.tags.join(' ')}</p>
    </article>
  );
}

export default HomeTemplateCard;
