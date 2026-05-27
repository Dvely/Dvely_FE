import { Link } from '@tanstack/react-router';
import { homeLibrary, homeTutorials } from '@/mocks/home/homeShowcase';

function HomeResourceSections() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#0f172a]">튜토리얼</h2>
          <button
            type="button"
            className="text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
          >
            모두 보기 →
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {homeTutorials.map((item) => (
            <article
              key={item.id}
              className={`relative overflow-hidden rounded-xl border border-[#e2e8f0] bg-gradient-to-br ${item.accent} p-4`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">
                {item.subtitle}
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#0f172a]">{item.title}</p>
              <img
                src={item.image}
                alt=""
                className="mt-3 h-24 w-full rounded-lg border border-white/60 object-cover object-top shadow-sm"
              />
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#0f172a]">라이브러리</h2>
          <Link
            to="/templates"
            className="text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
          >
            모두 보기 →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {homeLibrary.map((item) => (
            <Link
              key={item.id}
              to="/templates"
              className={`relative overflow-hidden rounded-xl border border-[#e2e8f0] bg-gradient-to-br ${item.accent} p-4 transition hover:border-[#cbd5e1]`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">
                {item.subtitle}
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#0f172a]">{item.title}</p>
              <img
                src={item.image}
                alt=""
                className="mt-3 h-24 w-full rounded-lg border border-white/60 object-cover object-top shadow-sm"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeResourceSections;
