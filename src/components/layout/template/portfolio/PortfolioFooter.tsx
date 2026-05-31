import { ExternalLink, Mail } from 'lucide-react';
import { PORTFOLIO_CONTACT } from './portfolioContent';

function PortfolioFooter() {
  return (
    <footer className="border-t border-[#e2e8f0] px-4 py-16 sm:px-6 dark:border-[#2f2f2f]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1e293b] dark:text-[#f8f8f8]">
          Contact
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
          프로젝트 협업이나 채용 관련 문의는 아래 연락처로 편하게 연락 주세요.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${PORTFOLIO_CONTACT.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#3b82f6] hover:text-[#3b82f6] dark:border-[#2f2f2f] dark:bg-[#1e1e1e] dark:text-[#f8f8f8] dark:hover:border-[#c6a664] dark:hover:text-[#c6a664]"
          >
            <Mail className="size-4" />
            {PORTFOLIO_CONTACT.email}
          </a>
          <a
            href={PORTFOLIO_CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#1e293b] transition hover:border-[#3b82f6] hover:text-[#3b82f6] dark:border-[#2f2f2f] dark:bg-[#1e1e1e] dark:text-[#f8f8f8] dark:hover:border-[#c6a664] dark:hover:text-[#c6a664]"
          >
            <ExternalLink className="size-4" />
            {PORTFOLIO_CONTACT.githubLabel}
          </a>
        </div>
        <p className="text-xs text-[#64748b] dark:text-[#9ca3af]">
          © {new Date().getFullYear()} Jace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default PortfolioFooter;
