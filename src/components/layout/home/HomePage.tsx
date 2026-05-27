import HomeHeroSection from '@/components/layout/home/HomeHeroSection';
import HomeResourceSections from '@/components/layout/home/HomeResourceSections';
import HomeShowcaseSection from '@/components/layout/home/HomeShowcaseSection';

function HomePage() {
  return (
    <div className="min-h-full bg-white px-5 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-[1280px] space-y-8">
        <HomeHeroSection />
        <HomeShowcaseSection />
        <HomeResourceSections />
      </div>
    </div>
  );
}

export default HomePage;
