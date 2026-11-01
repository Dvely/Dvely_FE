import HeaderContainer from '@/components/layout/header/HeaderContainer';
import HeroSection from './HeroSection';
import HighlightSection from './HighlightSection';
import RoleSpecificUsage from './RoleSpecificUsage';
import ServiceIntro from './ServiceIntro';
import OutputShowcase from './OutputShowcase';
import UserReviews from './UserReviews';
import ServiceStats from './ServiceStats';
import ProcessSection from './ProcessSection';
import PricingSection from './PricingSection';
import Footer from '../footer/Footer';

function MainContainer() {
  return (
    <main className="mx-auto flex w-full flex-col">
      <HeaderContainer />
      <HeroSection />
      <HighlightSection />

      <RoleSpecificUsage />
      <ServiceIntro />
      <OutputShowcase />
      <UserReviews />
      <ServiceStats />
      <ProcessSection />
      <PricingSection />
      <Footer />
    </main>
  );
}

export default MainContainer;
