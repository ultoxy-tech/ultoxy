import SEO from '../components/SEO'
import { seoConfig } from '../data/companyData'
import '../styles/placeholder.css'

export default function About() {
  return (
    <section className="placeholder-page">
      <SEO
        title={seoConfig.pages.about.title}
        description={seoConfig.pages.about.description}
      />
      <div className="placeholder-page__content">
        <div className="placeholder-page__badge">About Ultoxy</div>
        <h1 className="placeholder-page__title">
          Driving Innovation <span className="gradient-text">Through Technology</span>
        </h1>
        <p className="placeholder-page__text">
          At Ultoxy Technologies, we are more than just an IT company—we are innovators,
          problem solvers, and partners in your digital journey based in Pune, India.
        </p>
      </div>
    </section>
  )
}
