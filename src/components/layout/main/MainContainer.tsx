import HeroSection from "./HeroSection"
import HighlightSection from "./HighlightSection"
import PainPointsSection from "./PainPointsSection"
import RoleSpecificUsage from "./RoleSpecificUsage"
import ServiceIntro from "./ServiceIntro"

function MainContainer() {
  return (
    <main className="w-[1440px] mx-auto flex flex-col">
        <HeroSection />
        <HighlightSection />
        <PainPointsSection />
        <RoleSpecificUsage />
        <ServiceIntro />
    </main>
  )
}

export default MainContainer
