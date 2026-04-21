import HeroSection from './HeroSection';
import HighlightSection from './HighlightSection';
import PainPointsSection from './PainPointsSection';
import RoleSpecificUsage from './RoleSpecificUsage';
import ServiceIntro from './ServiceIntro';
import OutputShowcase from './OutputShowcase';
import UserReviews from './UserReviews';
import ServiceStats from './ServiceStats';
import ProcessSection from './ProcessSection';

function MainContainer() {
  return (
    <main className="w-[1440px] mx-auto flex flex-col">
      <HeroSection />
      <HighlightSection />
      <PainPointsSection />
      <RoleSpecificUsage />
      <ServiceIntro />
      <OutputShowcase />
      <UserReviews />
      <ServiceStats />
      <ProcessSection />
    </main>
  );
}

export default MainContainer;
