import { PORTFOLIO_SKILL_GROUPS } from './portfolioContent';
import PortfolioSectionTitle from './PortfolioSectionTitle';

function PortfolioSkills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionTitle>Skills</PortfolioSectionTitle>
        <div className="mt-16 flex flex-col gap-16">
          {PORTFOLIO_SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-semibold text-[#1e293b] dark:text-[#f8f8f8]">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-[#64748b] dark:text-[#9ca3af]">{group.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#1e293b] dark:border-[#2f2f2f] dark:bg-[#1e1e1e] dark:text-[#f8f8f8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSkills;
