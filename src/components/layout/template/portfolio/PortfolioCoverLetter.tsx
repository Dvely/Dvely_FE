import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PORTFOLIO_COVER_LETTERS } from './portfolioContent';
import PortfolioSectionTitle from './PortfolioSectionTitle';

function PortfolioCoverLetter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="cover" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <PortfolioSectionTitle>Cover Letter</PortfolioSectionTitle>
        <div className="mt-10 flex flex-col gap-4">
          {PORTFOLIO_COVER_LETTERS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.number}
                className="overflow-hidden rounded-xl border border-[#e2e8f0] transition-colors duration-500 dark:border-[#2f2f2f]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between bg-white px-6 py-5 text-left transition-colors duration-500 dark:bg-[#1e1e1e]"
                >
                  <span className="text-base font-medium text-[#1e293b] dark:text-[#f8f8f8]">
                    <span className="mr-3 font-mono text-sm text-[#3b82f6] dark:text-[#c6a664]">
                      {item.number}
                    </span>
                    {item.title}
                  </span>
                  <span className="text-[#64748b] dark:text-[#9ca3af]">
                    {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
                  </span>
                </button>
                {isOpen ? (
                  <div className="space-y-4 border-t border-[#e2e8f0] bg-white px-6 py-5 dark:border-[#2f2f2f] dark:bg-[#1e1e1e]">
                    {item.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="break-keep text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortfolioCoverLetter;
