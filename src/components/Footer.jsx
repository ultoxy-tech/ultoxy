import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PhoneCall,
  Mail,
  MapPin,
  ArrowUp,
  Globe,
  Smartphone,
  Cpu,
  Megaphone,
  Search,
  ChevronRight,
} from 'lucide-react'
import logo from '../assets/images/logo.png'
import {
  companyInfo,
  serviceCategories,
  mainNavItems,
} from '../data/companyData'
import './Footer.css'

const FOOTER_GRID_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const FOOTER_COL_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const SERVICE_FOOTER_ICONS = {
  web: Globe,
  mobile: Smartphone,
  software: Cpu,
  marketing: Megaphone,
  seo: Search,
}

/* Crisp custom SVG brand icons for social profiles */
function SocialIcon({ type }) {
  switch (type) {
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'twitter':
      return (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    case 'github':
      return (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    default:
      return <Globe size={16} />
  }
}

export default function Footer() {
  const [showFloatingTop, setShowFloatingTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 420)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialItems = [
    { id: 'linkedin', label: 'LinkedIn', href: companyInfo.socials.linkedin },
    { id: 'twitter', label: 'Twitter / X', href: companyInfo.socials.twitter },
    {
      id: 'instagram',
      label: 'Instagram',
      href: companyInfo.socials.instagram,
    },
    { id: 'facebook', label: 'Facebook', href: companyInfo.socials.facebook },
    { id: 'github', label: 'GitHub', href: companyInfo.socials.github },
  ]

  return (
    <>
      <footer className="ultoxy-footer" role="contentinfo">
        {/* ===============================================================
            1. MULTI-LAYERED HARMONIC SVG WAVE CREST (SUBTLE & EXECUTIVE)
            =============================================================== */}
        <div className="footer-wave-crest" aria-hidden="true">
          <svg
            className="footer-wave-svg"
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="ultoxyWaveGradPrimary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
                <stop offset="28%" stopColor="#2563eb" stopOpacity="0.24" />
                <stop offset="55%" stopColor="#7c3aed" stopOpacity="0.26" />
                <stop offset="80%" stopColor="#ec4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.16" />
              </linearGradient>

              <linearGradient
                id="ultoxyWaveGradSecondary"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.14" />
                <stop offset="45%" stopColor="#7c3aed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.12" />
              </linearGradient>

              <linearGradient
                id="ultoxyWaveStroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="30%" stopColor="#2563eb" />
                <stop offset="60%" stopColor="#7c3aed" />
                <stop offset="85%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            <path fill="url(#ultoxyWaveGradSecondary)">
              <animate
                attributeName="d"
                dur="16s"
                repeatCount="indefinite"
                values="
                  M0,45 C320,105 720,5 1120,65 C1280,85 1380,40 1440,55 L1440,110 L0,110 Z;
                  M0,65 C360,10 760,95 1100,35 C1260,15 1380,70 1440,45 L1440,110 L0,110 Z;
                  M0,45 C320,105 720,5 1120,65 C1280,85 1380,40 1440,55 L1440,110 L0,110 Z
                "
              />
            </path>

            <path fill="url(#ultoxyWaveGradPrimary)">
              <animate
                attributeName="d"
                dur="11s"
                repeatCount="indefinite"
                values="
                  M0,62 C380,12 700,98 1060,48 C1240,22 1360,68 1440,52 L1440,110 L0,110 Z;
                  M0,42 C360,92 740,18 1080,68 C1260,88 1360,32 1440,62 L1440,110 L0,110 Z;
                  M0,62 C380,12 700,98 1060,48 C1240,22 1360,68 1440,52 L1440,110 L0,110 Z
                "
              />
            </path>

            <path
              fill="none"
              stroke="url(#ultoxyWaveStroke)"
              strokeWidth="2"
              strokeOpacity="0.72"
            >
              <animate
                attributeName="d"
                dur="11s"
                repeatCount="indefinite"
                values="
                  M0,62 C380,12 700,98 1060,48 C1240,22 1360,68 1440,52;
                  M0,42 C360,92 740,18 1080,68 C1260,88 1360,32 1440,62;
                  M0,62 C380,12 700,98 1060,48 C1240,22 1360,68 1440,52
                "
              />
            </path>
          </svg>
        </div>

        {/* ===============================================================
            2. AMBIENT BLURRY AURORA SHAPES & FLOWING WAVE RIBBON
            =============================================================== */}
        <div className="footer-ambient-canvas" aria-hidden="true">
          <div className="footer-blur-orb footer-orb-cyan" />
          <div className="footer-blur-orb footer-orb-violet" />
          <div className="footer-blur-orb footer-orb-rose" />
          <div className="footer-mesh-grid" />

          <svg
            className="footer-bg-wave-lines"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              stroke="url(#ultoxyWaveStroke)"
              strokeOpacity="0.13"
              strokeWidth="1.5"
            >
              <animate
                attributeName="d"
                dur="18s"
                repeatCount="indefinite"
                values="
                  M-100,160 C280,60 640,260 1020,140 C1260,65 1420,190 1540,130;
                  M-100,120 C300,240 680,40 1040,180 C1280,250 1420,90 1540,170;
                  M-100,160 C280,60 640,260 1020,140 C1260,65 1420,190 1540,130
                "
              />
            </path>
            <path
              stroke="url(#ultoxyWaveStroke)"
              strokeOpacity="0.09"
              strokeWidth="1.2"
              strokeDasharray="6 8"
            >
              <animate
                attributeName="d"
                dur="22s"
                repeatCount="indefinite"
                values="
                  M-100,220 C340,300 720,90 1100,210 C1300,270 1440,130 1540,200;
                  M-100,190 C320,80 700,280 1080,150 C1300,90 1440,240 1540,160;
                  M-100,220 C340,300 720,90 1100,210 C1300,270 1440,130 1540,200
                "
              />
            </path>
          </svg>
        </div>

        <div className="container footer-inner-container">
          {/* ===============================================================
              3. CONCISE 4-COLUMN EXECUTIVE FOOTER GRID
              =============================================================== */}
          <motion.div
            className="footer-main-grid"
            variants={FOOTER_GRID_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18, margin: '-30px' }}
          >
            {/* Column 1: Brand Identity & Socials */}
            <motion.div
              className="footer-brand-col"
              variants={FOOTER_COL_VARIANTS}
            >
              <Link to="/" className="footer-logo-link">
                <div className="footer-logo-badge">
                  <img
                    src={logo}
                    alt="Ultoxy Technologies"
                    className="footer-logo-img"
                  />
                </div>
                <div className="footer-brand-titles">
                  <span className="footer-brand-name">ULTOXY</span>
                  <span className="footer-brand-sub">TECHNOLOGIES</span>
                </div>
              </Link>

              <p className="footer-brand-desc">
                {companyInfo.shortDescription}
              </p>

              <div className="footer-socials-row">
                {socialItems.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={`Ultoxy Technologies on ${soc.label}`}
                    title={soc.label}
                  >
                    <SocialIcon type={soc.id} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              className="footer-links-col"
              variants={FOOTER_COL_VARIANTS}
            >
              <h4 className="footer-col-heading">Quick Links</h4>
              <ul className="footer-links-list">
                {mainNavItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="footer-nav-link">
                      <ChevronRight size={14} className="footer-link-chevron" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Our Services */}
            <motion.div
              className="footer-links-col"
              variants={FOOTER_COL_VARIANTS}
            >
              <h4 className="footer-col-heading">Our Services</h4>
              <ul className="footer-links-list">
                {serviceCategories.map((srv) => {
                  const IconComp =
                    SERVICE_FOOTER_ICONS[srv.iconType] || Globe
                  return (
                    <li key={srv.id}>
                      <Link
                        to={`/services?category=${srv.slug}`}
                        className="footer-nav-link footer-service-link"
                      >
                        <span className="footer-srv-icon-box">
                          <IconComp size={13} />
                        </span>
                        <span>{srv.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>

            {/* Column 4: Direct Contact */}
            <motion.div
              className="footer-contact-col"
              variants={FOOTER_COL_VARIANTS}
            >
              <h4 className="footer-col-heading">Contact Us</h4>

              <div className="footer-contact-list">
                <div className="footer-contact-row">
                  <span className="footer-contact-icon">
                    <PhoneCall size={15} />
                  </span>
                  <div className="footer-contact-body">
                    <a
                      href={`tel:${companyInfo.contact.phones[0].raw}`}
                      className="footer-contact-link"
                    >
                      {companyInfo.contact.phones[0].number}
                    </a>
                    <a
                      href={`tel:${companyInfo.contact.phones[1].raw}`}
                      className="footer-contact-sublink"
                    >
                      {companyInfo.contact.phones[1].number}
                    </a>
                  </div>
                </div>

                <a
                  href={`mailto:${companyInfo.contact.primaryEmail}`}
                  className="footer-contact-row"
                >
                  <span className="footer-contact-icon">
                    <Mail size={15} />
                  </span>
                  <div className="footer-contact-body">
                    <span className="footer-contact-link">
                      {companyInfo.contact.primaryEmail}
                    </span>
                  </div>
                </a>

                <div className="footer-contact-row">
                  <span className="footer-contact-icon">
                    <MapPin size={15} />
                  </span>
                  <div className="footer-contact-body">
                    <span className="footer-contact-link">
                      {companyInfo.location.fullAddress}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ===============================================================
              4. MINIMAL BOTTOM COPYRIGHT BAR
              =============================================================== */}
          <motion.div
            className="footer-bottom-bar"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="footer-copyright">
              © {new Date().getFullYear()}{' '}
              <strong className="gradient-text">{companyInfo.name}</strong>. All
              Rights Reserved.
            </p>

            <div className="footer-bottom-right">
              <span className="footer-bottom-tagline">
                {companyInfo.tagline}
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                className="footer-scroll-top-btn"
                aria-label="Scroll to top"
                title="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Scroll-To-Top Button (Visible on Scroll) */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`ultoxy-floating-top-btn ${
          showFloatingTop ? 'is-visible' : ''
        }`}
        aria-label="Scroll to top of page"
        title="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}
