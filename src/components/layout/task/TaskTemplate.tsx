import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import container1 from '@/assets/images/tasktemplate/container1.png';
import container2 from '@/assets/images/tasktemplate/container2.png';
import container3 from '@/assets/images/tasktemplate/container3.png';
import container4 from '@/assets/images/tasktemplate/container4.png';
import container5 from '@/assets/images/tasktemplate/container5.png';
import container6 from '@/assets/images/tasktemplate/container6.png';
import container7 from '@/assets/images/tasktemplate/container7.png';

const templates = [
  { image: container1 },
  { image: container2 },
  { image: container3 },
  { image: container4 },
  { image: container5 },
  { image: container6 },
  { image: container7 },
] as const;

function TaskTemplate() {
  const [tab, setTab] = useState<'explore' | 'mine'>('explore');

  return (
    <section className="flex-1 px-5 pb-10 pt-2 sm:px-6">
      <div className="border-b border-[#efefef]">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setTab('explore')}
            className={`relative pb-2.5 pt-2 text-[14px] font-semibold transition ${
              tab === 'explore' ? 'text-[#232425]' : 'text-[#606366] hover:text-[#232425]'
            }`}
          >
            탐색
            {tab === 'explore' ? (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#232425]" />
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setTab('mine')}
            className={`relative pb-2.5 pt-2 text-[14px] font-semibold transition ${
              tab === 'mine' ? 'text-[#232425]' : 'text-[#606366] hover:text-[#232425]'
            }`}
          >
            내 템플릿
            {tab === 'mine' ? (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#232425]" />
            ) : null}
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        {['모든 스타일', '모든 테마', '정렬 기준: 인기순'].map((label) => (
          <button
            key={label}
            type="button"
            className="inline-flex h-[37px] items-center gap-3 rounded-[20px] border border-[#e9ecef] bg-white px-[17px] py-2 text-[13px] text-[#495057] transition hover:border-[#dee2e6]"
          >
            {label}
            <ChevronDown className="size-2.5 text-[#495057]" strokeWidth={3} />
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <button
          type="button"
          className="flex h-[168px] min-h-[168px] flex-col items-center justify-center gap-2 rounded-xl border border-[#efefef] bg-gradient-to-b from-white to-[#f2f2f2] p-3 text-[#232425] transition hover:border-[#dee2e6]"
        >
          <div className="flex size-8 items-center justify-center rounded-lg border border-[#0f172a]/10 bg-white shadow-sm">
            <Plus className="size-5 text-[#64748b]" />
          </div>
          <span className="text-center text-[16px] font-normal leading-[1.3]">내 템플릿 추가</span>
        </button>

        {templates.map((t) => (
          <article className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#efefef] bg-white transition hover:border-[#dee2e6] hover:shadow-md">
            <div className="relative h-[170px] shrink-0 overflow-hidden">
              <img src={t.image} alt="template" className="size-full object-cover" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TaskTemplate;
