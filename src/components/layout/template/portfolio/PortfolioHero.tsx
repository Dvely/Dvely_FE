import { PORTFOLIO_HERO } from './portfolioContent';

function PortfolioHero() {
  return (
    <section id="hero" className="flex min-h-screen items-center px-4 pt-20 sm:px-6">
      <div className="mx-auto w-full max-w-6xl py-24 text-center">
        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#1e293b] sm:text-5xl lg:text-6xl dark:text-[#f8f8f8]">
          {PORTFOLIO_HERO.greeting}{' '}
          <span className="text-[#3b82f6] transition-colors duration-500 dark:text-[#c6a664]">
            {PORTFOLIO_HERO.role}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
          {PORTFOLIO_HERO.subtitle[0]}
          <br />
          {PORTFOLIO_HERO.subtitle[1]}
        </p>
      </div>
    </section>
  );
}

export default PortfolioHero;
