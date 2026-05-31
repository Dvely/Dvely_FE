import { PORTFOLIO_ABOUT } from './portfolioContent';
import PortfolioSectionTitle from './PortfolioSectionTitle';

function PortfolioAbout() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <PortfolioSectionTitle>{PORTFOLIO_ABOUT.title}</PortfolioSectionTitle>
        <div className="mt-10 space-y-4">
          {PORTFOLIO_ABOUT.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="break-keep text-base leading-relaxed text-[#64748b] dark:text-[#9ca3af]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioAbout;
