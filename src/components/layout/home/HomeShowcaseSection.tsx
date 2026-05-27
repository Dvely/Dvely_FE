import { Link } from '@tanstack/react-router';
import { homeFeaturedProjects } from '@/mocks/home/homeShowcase';

function HomeShowcaseSection() {
  const landing = homeFeaturedProjects.filter((p) => p.category === 'landing');
  const portfolio = homeFeaturedProjects.filter((p) => p.category === 'portfolio');

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#0f172a]">랜딩페이지</h2>
          <Link
            to="/templates"
            className="text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
          >
            템플릿 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {landing.map((item) => (
            <Link key={item.id} to="/templates" className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f1f5f9]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-2 truncate text-[13px] font-medium text-[#334155]">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#0f172a]">포트폴리오</h2>
          <Link
            to="/templates"
            className="text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
          >
            템플릿 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {portfolio.map((item) => (
            <Link key={item.id} to="/templates" className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f1f5f9]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-2 truncate text-[13px] font-medium text-[#334155]">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeShowcaseSection;
