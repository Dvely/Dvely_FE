type PortfolioSectionTitleProps = {
  children: string;
};

function PortfolioSectionTitle({ children }: PortfolioSectionTitleProps) {
  return (
    <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1e293b] dark:text-[#f8f8f8]">
      {children}
    </h2>
  );
}

export default PortfolioSectionTitle;
