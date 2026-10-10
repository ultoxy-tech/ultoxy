import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import HomeSections from '../components/HomeSections'
import { seoConfig } from '../data/companyData'

export default function Home() {
  return (
    <>
      <SEO
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
      />
      <HeroSection />
      <HomeSections />
    </>
  )
}
