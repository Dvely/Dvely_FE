import HeroSection from "./HeroSection"
import HighlightSection from "./HighlightSection"

function MainContainer() {
  return (
    <main className="w-[1440px] mx-auto flex flex-col">
        <HeroSection />
        <HighlightSection />
    </main>
  )
}

export default MainContainer
