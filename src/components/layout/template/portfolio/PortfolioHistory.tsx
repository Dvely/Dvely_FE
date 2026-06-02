import { PORTFOLIO_HISTORY } from './portfolioContent';
import PortfolioSectionTitle from './PortfolioSectionTitle';

function PortfolioHistory() {
  return (
    <section id="history" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <PortfolioSectionTitle>History</PortfolioSectionTitle>
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-[#e2e8f0] dark:bg-[#2f2f2f] md:block" />
          <ul className="flex flex-col gap-16">
            {PORTFOLIO_HISTORY.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={`${item.period}-${item.title}`}
                  className={`relative flex md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'}`}
                >
                  <span className="absolute left-1/2 top-2 hidden size-3 -translate-x-1/2 rounded-full bg-[#3b82f6] dark:bg-[#c6a664] md:block" />
                  <div className="w-full rounded-xl border border-[#e2e8f0] bg-white p-6 dark:border-[#2f2f2f] dark:bg-[#1e1e1e]">
                    <p className="font-mono text-xs text-[#3b82f6] dark:text-[#c6a664]">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#1e293b] dark:text-[#f8f8f8]">
                      {item.title}
                    </h3>
                    <p className="mt-3 break-keep text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PortfolioHistory;
