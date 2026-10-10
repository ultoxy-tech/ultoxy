import SEO from '../components/SEO'
import { seoConfig } from '../data/companyData'
import '../styles/placeholder.css'

export default function Blog() {
  return (
    <section className="placeholder-page">
      <SEO
        title={seoConfig.pages.blog.title}
        description={seoConfig.pages.blog.description}
      />
      <div className="placeholder-page__content">
        <div className="placeholder-page__badge">Engineering &amp; Growth Insights</div>
        <h1 className="placeholder-page__title">
          Latest <span className="gradient-text">Insights &amp; Stories</span>
        </h1>
        <p className="placeholder-page__text">
          Perspectives from the Ultoxy Technologies team on scalable React &amp; Django web
          apps, Flutter mobile development, cloud architecture, and digital growth.
        </p>
      </div>
    </section>
  )
}
