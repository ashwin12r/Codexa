import FeaturesSection from '../components/landing/FeaturesSection'
import HeroSection from '../components/landing/HeroSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import TechnologiesSection from '../components/landing/TechnologiesSection'

export default function LandingPage() {
  return (
    <div className="space-y-20 py-4 sm:space-y-24 lg:space-y-28">
      <HeroSection />
      <FeaturesSection />
      <TechnologiesSection />
      <HowItWorksSection />
    </div>
  )
}