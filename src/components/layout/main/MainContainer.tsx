import HeroSection from "./HeroSection"
import HighlightSection from "./HighlightSection"
import PainPointsSection from "./PainPointsSection"

function MainContainer() {
  return (
    <main className="w-[1440px] mx-auto flex flex-col">
        <HeroSection />
        <HighlightSection />
        <PainPointsSection />
    </main>
  )
}

export default MainContainer
