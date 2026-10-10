import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoConfig } from '../data/companyData'

export default function SEO({ title, description, keywords }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const finalTitle = title || seoConfig.default.title
    const finalDescription = description || seoConfig.default.description
    const finalKeywords = keywords || seoConfig.default.keywords
    const canonicalUrl = `https://ultoxy.com${pathname === '/' ? '' : pathname}`

    document.title = finalTitle

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (el) {
        el.setAttribute(attr, value)
      }
    }

    setMeta('meta[name="description"]', 'content', finalDescription)
    setMeta('meta[name="keywords"]', 'content', finalKeywords)
    setMeta('meta[property="og:title"]', 'content', finalTitle)
    setMeta('meta[property="og:description"]', 'content', finalDescription)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[name="twitter:title"]', 'content', finalTitle)
    setMeta('meta[name="twitter:description"]', 'content', finalDescription)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [title, description, keywords, pathname])

  return null
}
