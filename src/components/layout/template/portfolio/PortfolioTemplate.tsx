import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import PortfolioAbout from './PortfolioAbout';
import PortfolioCoverLetter from './PortfolioCoverLetter';
import PortfolioFooter from './PortfolioFooter';
import PortfolioHeader from './PortfolioHeader';
import PortfolioHero from './PortfolioHero';
import PortfolioHistory from './PortfolioHistory';
import PortfolioProjects from './PortfolioProjects';
import PortfolioSkills from './PortfolioSkills';
import { PORTFOLIO_SITE_TITLE } from './portfolioContent';

function PortfolioTemplate() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = PORTFOLIO_SITE_TITLE;
  }, []);

  return (
    <div className={cn(isDark && 'dark')}>
      <div className="min-h-screen bg-[#f9f9f9] text-[#1e293b] transition-colors duration-500 dark:bg-[#121212] dark:text-[#f8f8f8]">
        <PortfolioHeader isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
        <main>
          <PortfolioHero />
          <PortfolioAbout />
          <PortfolioCoverLetter />
          <PortfolioHistory />
          <PortfolioSkills />
          <PortfolioProjects />
        </main>
        <PortfolioFooter />
      </div>
    </div>
  );
}

export default PortfolioTemplate;
