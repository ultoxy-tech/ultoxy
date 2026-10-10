import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Home,
  Layers,
  FolderGit2,
  Building2,
  BookOpen,
  MessageSquare,
  Globe,
  Smartphone,
  Database,
  TrendingUp,
  SearchCheck,
  MapPin,
  Mail,
  PhoneCall,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Moon,
  Search,
  Command,
  Copy,
  Check,
  ExternalLink,
  X,
  Zap,
  Clock,
} from 'lucide-react'
import logo from '../assets/images/logo.png'
import { useTheme } from '../context/ThemeContext'
import {
  companyInfo,
  serviceCategories,
  mainNavItems,
  featuredProjectsQuickList,
} from '../data/companyData'
import './Navbar.css'

export function NavItemIcon({ type, size = 15 }) {
  const iconProps = { size, strokeWidth: 2.1, className: 'navbar__nav-icon' }
  switch (type) {
    case 'home':
      return <Home {...iconProps} />
    case 'services':
      return <Layers {...iconProps} />
    case 'projects':
      return <FolderGit2 {...iconProps} />
    case 'about':
      return <Building2 {...iconProps} />
    case 'blog':
      return <BookOpen {...iconProps} />
    case 'contact':
    default:
      return <MessageSquare {...iconProps} />
  }
}

export function ServiceCategoryIcon({ type, size = 22 }) {
  const iconProps = { size, strokeWidth: 2.1, className: 'service-cat-icon' }
  switch (type) {
    case 'web':
      return <Globe {...iconProps} />
    case 'mobile':
      return <Smartphone {...iconProps} />
    case 'software':
      return <Database {...iconProps} />
    case 'marketing':
      return <TrendingUp {...iconProps} />
    case 'seo':
    default:
      return <SearchCheck {...iconProps} />
  }
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNavPath, setHoveredNavPath] = useState(null)
  const [activePreviewService, setActivePreviewService] = useState(serviceCategories[0])

  const { theme, isDark, toggleTheme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const megaMenuTimeoutRef = useRef(null)
  const navRef = useRef(null)
  const shellRef = useRef(null)
  const searchInputRef = useRef(null)

  // Smooth scroll progress bar at bottom edge of sticky header
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  // Detect scroll for sticky floating capsule transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsServicesOpen(false)
    setIsCommandOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname, location.search])

  // Lock body scroll when mobile drawer or command palette is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen || isCommandOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen, isCommandOpen])

  // Focus search input when Command Palette opens
  useEffect(() => {
    if (isCommandOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60)
    } else {
      setCommandQuery('')
    }
  }, [isCommandOpen])

  // Global keyboard shortcuts (Ctrl+K / Cmd+K and Escape) & resize handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
        setIsServicesOpen(false)
      } else if (e.key === 'Escape') {
        setIsServicesOpen(false)
        setIsMobileOpen(false)
        setIsCommandOpen(false)
      }
    }
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsServicesOpen(false)
      }
    }
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileOpen) {
        setIsMobileOpen(false)
      }
      if (window.innerWidth <= 1024 && isServicesOpen) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileOpen, isServicesOpen])

  // Cursor spotlight tracking across header shell
  const handleShellMouseMove = useCallback((e) => {
    if (!shellRef.current) return
    const rect = shellRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    shellRef.current.style.setProperty('--mouse-x', `${x}px`)
    shellRef.current.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  const handleMegaEnter = useCallback(() => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current)
    setIsServicesOpen(true)
  }, [])

  const handleMegaLeave = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 180)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText(companyInfo.contact.primaryEmail)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }, [])

  const isRouteActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // Filtered items for Command Palette
  const filteredServices = useMemo(() => {
    const q = commandQuery.trim().toLowerCase()
    if (!q) return serviceCategories
    return serviceCategories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.techTags.some((t) => t.toLowerCase().includes(q))
    )
  }, [commandQuery])

  const filteredProjects = useMemo(() => {
    const q = commandQuery.trim().toLowerCase()
    if (!q) return featuredProjectsQuickList
    return featuredProjectsQuickList.filter(
      (p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    )
  }, [commandQuery])

  return (
    <>
      <header
        ref={navRef}
        className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${
          isMobileOpen ? 'site-header--mobile-open' : ''
        }`}
      >
        {/* ==================== TOP EXECUTIVE UTILITY BAR (Desktop) ==================== */}
        <div className="topbar" aria-label="Company status and quick contact information">
          <div className="topbar__container">
            <div className="topbar__left">
              <span className="topbar__status">
                <span className="topbar__status-dot" aria-hidden="true" />
                <span>Enterprise Software, Web &amp; Mobile Engineering</span>
              </span>
              <span className="topbar__divider" aria-hidden="true" />
              <span className="topbar__location">
                <MapPin size={13} strokeWidth={2.3} className="topbar__icon" />
                <span>{companyInfo.location.fullAddress}</span>
              </span>
              <span className="topbar__divider topbar__divider--lg" aria-hidden="true" />
              <span className="topbar__sla">
                <Clock size={13} strokeWidth={2.3} className="topbar__icon" />
                <span>{companyInfo.contact.responseTime}</span>
              </span>
            </div>

            <div className="topbar__right">
              <a
                href={`mailto:${companyInfo.contact.primaryEmail}`}
                className="topbar__contact-link"
              >
                <Mail size={13} strokeWidth={2.3} className="topbar__icon" />
                <span>{companyInfo.contact.primaryEmail}</span>
              </a>
              <span className="topbar__divider" aria-hidden="true" />
              <a
                href={`tel:${companyInfo.contact.phones[0].raw}`}
                className="topbar__contact-link"
              >
                <PhoneCall size={13} strokeWidth={2.3} className="topbar__icon" />
                <span>{companyInfo.contact.phones[0].number}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ==================== MAIN NAVIGATION BAR ==================== */}
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <div
            ref={shellRef}
            onMouseMove={handleShellMouseMove}
            className="navbar__shell"
          >
            {/* Interactive Cursor Spotlight Overlay */}
            <div className="navbar__spotlight-overlay" aria-hidden="true" />

            {/* Top Sapphire Shimmer Line + Smooth Scroll Progress Bar */}
            <div className="navbar__laser-line" aria-hidden="true" />
            <motion.div
              className="navbar__scroll-progress"
              style={{ scaleX }}
              aria-hidden="true"
            />

            <div className="navbar__inner">
              {/* 1. BRAND LOGO LOCKUP */}
              <Link
                to="/"
                className="navbar__brand"
                aria-label="Ultoxy Technologies — Home"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="navbar__logo-frame"
                >
                  <img
                    src={logo}
                    alt="Ultoxy Technologies Logo"
                    className="navbar__logo-img"
                    width="36"
                    height="36"
                  />
                  <span className="navbar__logo-aura" aria-hidden="true" />
                </motion.div>
                <div className="navbar__brand-copy">
                  <span className="navbar__brand-title">
                    ULTOXY<span className="navbar__brand-dot" aria-hidden="true">.</span>
                  </span>
                  <span className="navbar__brand-subtitle">TECHNOLOGIES</span>
                </div>
              </Link>

              {/* 2. CENTER CAPSULE NAVIGATION WITH SPRING SLIDING PILL */}
              <ul
                className="navbar__pill-group"
                role="menubar"
                onMouseLeave={() => setHoveredNavPath(null)}
              >
                {mainNavItems.map((item) => {
                  const active = isRouteActive(item.path)
                  const isHovered = hoveredNavPath === item.path

                  if (item.hasMegaMenu) {
                    return (
                      <li
                        key={item.path}
                        className="navbar__item navbar__item--has-mega"
                        role="none"
                        onMouseEnter={() => {
                          setHoveredNavPath(item.path)
                          handleMegaEnter()
                        }}
                        onMouseLeave={handleMegaLeave}
                      >
                        <div className="navbar__mega-trigger-group">
                          <Link
                            to={item.path}
                            role="menuitem"
                            aria-haspopup="true"
                            aria-expanded={isServicesOpen}
                            className={`navbar__link ${active ? 'navbar__link--active' : ''} ${
                              isServicesOpen ? 'navbar__link--open' : ''
                            }`}
                          >
                            {(isHovered || isServicesOpen) && (
                              <motion.span
                                layoutId="navbar-sliding-hover-pill"
                                className="navbar__sliding-pill"
                                transition={{
                                  type: 'spring',
                                  stiffness: 380,
                                  damping: 30,
                                }}
                                aria-hidden="true"
                              />
                            )}
                            <NavItemIcon type={item.icon} />
                            <span className="navbar__link-label">{item.label}</span>
                            <ChevronDown
                              size={14}
                              strokeWidth={2.4}
                              className={`navbar__chevron ${
                                isServicesOpen ? 'navbar__chevron--open' : ''
                              }`}
                            />
                            {active && (
                              <motion.span
                                layoutId="navbar-active-beam"
                                className="navbar__active-beam"
                                transition={{
                                  type: 'spring',
                                  stiffness: 380,
                                  damping: 30,
                                }}
                                aria-hidden="true"
                              />
                            )}
                          </Link>
                          <button
                            type="button"
                            className="navbar__sr-toggle"
                            aria-label="Toggle Services submenu"
                            aria-expanded={isServicesOpen}
                            onClick={() => setIsServicesOpen((prev) => !prev)}
                          />
                        </div>
                      </li>
                    )
                  }

                  return (
                    <li
                      key={item.path}
                      className="navbar__item"
                      role="none"
                      onMouseEnter={() => setHoveredNavPath(item.path)}
                    >
                      <Link
                        to={item.path}
                        role="menuitem"
                        className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                      >
                        {isHovered && (
                          <motion.span
                            layoutId="navbar-sliding-hover-pill"
                            className="navbar__sliding-pill"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                            aria-hidden="true"
                          />
                        )}
                        <NavItemIcon type={item.icon} />
                        <span className="navbar__link-label">{item.label}</span>
                        {item.badge && (
                          <span
                            className="navbar__link-badge"
                            aria-label={`${item.badge} projects`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <motion.span
                            layoutId="navbar-active-beam"
                            className="navbar__active-beam"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* 3. RIGHT ACTION CLUSTER (Command Explorer + Theme Toggle + Call + CTA) */}
              <div className="navbar__actions">
                {/* Quick Command Explorer Trigger (Ctrl+K) */}
                <button
                  type="button"
                  className="navbar__cmd-btn"
                  onClick={() => setIsCommandOpen(true)}
                  aria-label="Open Quick Service & Project Explorer (Ctrl+K)"
                  title="Quick Service & Project Explorer (Ctrl+K)"
                >
                  <Search size={15} strokeWidth={2.3} className="navbar__cmd-icon" />
                  <span className="navbar__cmd-text">Explore</span>
                  <kbd className="navbar__cmd-kbd">Ctrl K</kbd>
                </button>

                {/* Animated Dual-Theme Toggle Button */}
                <button
                  type="button"
                  className="navbar__theme-toggle"
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? 'Switch to Light (White) Theme' : 'Switch to Dark Theme'
                  }
                  title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={theme}
                      initial={{ y: -12, opacity: 0, rotate: -60 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 12, opacity: 0, rotate: 60 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="navbar__theme-icon-wrap"
                    >
                      {isDark ? (
                        <Sun
                          size={16}
                          strokeWidth={2.3}
                          className="navbar__theme-icon navbar__theme-icon--sun"
                        />
                      ) : (
                        <Moon
                          size={16}
                          strokeWidth={2.3}
                          className="navbar__theme-icon navbar__theme-icon--moon"
                        />
                      )}
                    </motion.span>
                  </AnimatePresence>
                  <span className="navbar__theme-label">{isDark ? 'Light' : 'Dark'}</span>
                </button>

                {/* Direct Call Button */}
                <a
                  href={`tel:${companyInfo.contact.phones[0].raw}`}
                  className="navbar__quick-call"
                  aria-label={`Call Ultoxy Technologies at ${companyInfo.contact.phones[0].number}`}
                  title={`Direct Call: ${companyInfo.contact.phones[0].number}`}
                >
                  <PhoneCall
                    size={16}
                    strokeWidth={2.2}
                    className="navbar__quick-call-icon"
                  />
                </a>

                {/* Primary CTA */}
                <Link to="/contact" className="navbar__cta">
                  <span className="navbar__cta-shimmer" aria-hidden="true" />
                  <span className="navbar__cta-label">Start a Project</span>
                  <span className="navbar__cta-icon" aria-hidden="true">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </Link>

                {/* Mobile & Tablet Hamburger Button */}
                <button
                  type="button"
                  className={`navbar__hamburger ${
                    isMobileOpen ? 'navbar__hamburger--active' : ''
                  }`}
                  onClick={toggleMobileMenu}
                  aria-expanded={isMobileOpen}
                  aria-controls="mobile-navigation-drawer"
                  aria-label={
                    isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'
                  }
                >
                  <span className="navbar__hamburger-box">
                    <span className="navbar__hamburger-bar" />
                    <span className="navbar__hamburger-bar" />
                    <span className="navbar__hamburger-bar" />
                  </span>
                </button>
              </div>
            </div>

            {/* ==================== 3D PERSPECTIVE INTERACTIVE MEGA-MENU ==================== */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.985, rotateX: -5 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99, rotateX: -3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 28,
                  }}
                  className="mega-menu"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                  role="region"
                  aria-label="Ultoxy Services Categories"
                >
                  <div className="mega-menu__inner">
                    {/* Left Column: 5 Interactive Service Selector Cards */}
                    <div className="mega-menu__main">
                      <div className="mega-menu__header">
                        <div>
                          <span className="mega-menu__eyebrow">
                            <Sparkles size={13} strokeWidth={2.3} />
                            <span>INTERACTIVE CAPABILITY MATRIX</span>
                          </span>
                          <h3 className="mega-menu__heading">
                            Hover any practice to inspect deliverables &amp; live case studies
                          </h3>
                        </div>
                        <Link to="/services" className="mega-menu__all-link">
                          <span>View All 5 Practices</span>
                          <ArrowRight size={14} strokeWidth={2.3} />
                        </Link>
                      </div>

                      <div className="mega-menu__grid">
                        {serviceCategories.map((service, index) => {
                          const isSelected = activePreviewService.id === service.id
                          return (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.035, duration: 0.22 }}
                            >
                              <Link
                                to={`/services?category=${service.slug}`}
                                className={`mega-card ${
                                  isSelected ? 'mega-card--selected' : ''
                                }`}
                                onMouseEnter={() => setActivePreviewService(service)}
                                onFocus={() => setActivePreviewService(service)}
                              >
                                {isSelected && (
                                  <motion.span
                                    layoutId="mega-card-active-outline"
                                    className="mega-card__active-ring"
                                    transition={{
                                      type: 'spring',
                                      stiffness: 360,
                                      damping: 28,
                                    }}
                                    aria-hidden="true"
                                  />
                                )}
                                <div className="mega-card__icon-wrap">
                                  <ServiceCategoryIcon type={service.iconType} size={21} />
                                </div>
                                <div className="mega-card__body">
                                  <div className="mega-card__title-row">
                                    <span className="mega-card__title">{service.title}</span>
                                    <span className="mega-card__badge">{service.badge}</span>
                                  </div>
                                  <p className="mega-card__desc">{service.tagline}</p>
                                  <div className="mega-card__tags">
                                    {service.techTags.map((tag) => (
                                      <span key={tag} className="mega-card__tag">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <span className="mega-card__arrow" aria-hidden="true">
                                  <ArrowUpRight size={15} strokeWidth={2.3} />
                                </span>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Right Column: Live Dynamic Service Inspector Panel */}
                    <aside className="mega-menu__spotlight">
                      <div className="mega-spotlight">
                        <div className="mega-spotlight__glow" aria-hidden="true" />

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activePreviewService.id}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="mega-spotlight__dynamic"
                          >
                            <div className="mega-spotlight__top-row">
                              <span className="mega-spotlight__tag">
                                <ShieldCheck size={14} strokeWidth={2.3} />
                                <span>{activePreviewService.badge.toUpperCase()}</span>
                              </span>
                              <span className="mega-spotlight__metric-pill">
                                <Zap size={12} strokeWidth={2.4} />
                                <span>
                                  {activePreviewService.metrics.label}:{' '}
                                  <strong>{activePreviewService.metrics.value}</strong>
                                </span>
                              </span>
                            </div>

                            <h4 className="mega-spotlight__title">
                              {activePreviewService.title}
                            </h4>
                            <p className="mega-spotlight__text">
                              {activePreviewService.description}
                            </p>

                            {/* Deliverables Checklist */}
                            <div className="mega-spotlight__deliverables">
                              <span className="mega-spotlight__sub-eyebrow">
                                KEY DELIVERABLES
                              </span>
                              <ul className="mega-spotlight__list">
                                {activePreviewService.deliverables.map((item) => (
                                  <li key={item} className="mega-spotlight__list-item">
                                    <CheckCircle2
                                      size={14}
                                      strokeWidth={2.3}
                                      className="mega-spotlight__check"
                                    />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Verified Case Study Highlight */}
                            <div className="mega-spotlight__case-box">
                              <span className="mega-spotlight__case-lbl">
                                PROVEN ULTOXY DELIVERY
                              </span>
                              <strong className="mega-spotlight__case-client">
                                {activePreviewService.caseStudy.client}
                              </strong>
                              <span className="mega-spotlight__case-res">
                                {activePreviewService.caseStudy.result}
                              </span>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        <div className="mega-spotlight__actions">
                          <Link
                            to={`/services?category=${activePreviewService.slug}`}
                            className="mega-spotlight__cta"
                          >
                            <span>Explore {activePreviewService.shortTitle}</span>
                            <ArrowRight size={15} strokeWidth={2.3} />
                          </Link>
                          <Link to="/projects" className="mega-spotlight__secondary">
                            <span>View All 11+ Live Client Systems</span>
                            <ArrowUpRight size={14} strokeWidth={2.3} />
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ==================== MOBILE & TABLET NAVIGATION DRAWER ==================== */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mobile-drawer mobile-drawer--open"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div
                className="mobile-drawer__backdrop"
                onClick={toggleMobileMenu}
                aria-hidden="true"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="mobile-drawer__panel"
              >
                <div className="mobile-drawer__ambient" aria-hidden="true">
                  <span className="mobile-drawer__orb mobile-drawer__orb--primary" />
                  <span className="mobile-drawer__orb mobile-drawer__orb--secondary" />
                </div>

                {/* Sticky Drawer Top Header */}
                <div className="mobile-drawer__header">
                  <Link
                    to="/"
                    className="mobile-drawer__brand"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="navbar__logo-frame navbar__logo-frame--sm">
                      <img src={logo} alt="Ultoxy Logo" width="26" height="26" />
                    </div>
                    <div className="navbar__brand-copy">
                      <span className="navbar__brand-title navbar__brand-title--sm">
                        ULTOXY<span className="navbar__brand-dot">.</span>
                      </span>
                      <span className="navbar__brand-subtitle">TECHNOLOGIES</span>
                    </div>
                  </Link>

                  <div className="mobile-drawer__header-actions">
                    <div
                      className="mobile-drawer__theme-switch"
                      role="group"
                      aria-label="Theme mode"
                    >
                      <button
                        type="button"
                        className={`mobile-drawer__theme-btn ${
                          theme === 'light' ? 'mobile-drawer__theme-btn--active' : ''
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun size={13} strokeWidth={2.3} />
                        <span>Light</span>
                      </button>
                      <button
                        type="button"
                        className={`mobile-drawer__theme-btn ${
                          theme === 'dark' ? 'mobile-drawer__theme-btn--active' : ''
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon size={13} strokeWidth={2.3} />
                        <span>Dark</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="mobile-drawer__close-btn"
                      onClick={toggleMobileMenu}
                      aria-label="Close navigation menu"
                    >
                      <X size={18} strokeWidth={2.3} />
                    </button>
                  </div>
                </div>

                <div className="mobile-drawer__content">
                  {/* Quick Search Trigger inside Mobile Drawer */}
                  <button
                    type="button"
                    className="mobile-drawer__search-trigger"
                    onClick={() => {
                      setIsMobileOpen(false)
                      setIsCommandOpen(true)
                    }}
                  >
                    <Search size={16} strokeWidth={2.2} className="mobile-drawer__search-icon" />
                    <span>Search services, ERP, React, Flutter...</span>
                  </button>

                  {/* Primary Links */}
                  <ul className="mobile-drawer__nav-list">
                    {mainNavItems.map((item, idx) => {
                      const active = isRouteActive(item.path)

                      if (item.hasMegaMenu) {
                        return (
                          <motion.li
                            key={item.path}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className="mobile-drawer__item mobile-drawer__item--accordion"
                          >
                            <div className="mobile-drawer__row">
                              <Link
                                to={item.path}
                                className={`mobile-drawer__link ${
                                  active ? 'mobile-drawer__link--active' : ''
                                }`}
                              >
                                <span className="mobile-drawer__icon-box">
                                  <NavItemIcon type={item.icon} size={17} />
                                </span>
                                <span className="mobile-drawer__label">{item.label}</span>
                              </Link>
                              <button
                                type="button"
                                className={`mobile-drawer__expand-btn ${
                                  isMobileServicesOpen
                                    ? 'mobile-drawer__expand-btn--open'
                                    : ''
                                }`}
                                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                                aria-expanded={isMobileServicesOpen}
                                aria-label="Toggle service categories"
                              >
                                <ChevronDown size={18} strokeWidth={2.3} />
                              </button>
                            </div>

                            <div
                              className={`mobile-drawer__subgrid ${
                                isMobileServicesOpen ? 'mobile-drawer__subgrid--open' : ''
                              }`}
                            >
                              <div className="mobile-drawer__subgrid-inner">
                                {serviceCategories.map((service) => (
                                  <Link
                                    key={service.id}
                                    to={`/services?category=${service.slug}`}
                                    className="mobile-service-pill"
                                  >
                                    <span className="mobile-service-pill__icon">
                                      <ServiceCategoryIcon
                                        type={service.iconType}
                                        size={18}
                                      />
                                    </span>
                                    <span className="mobile-service-pill__info">
                                      <span className="mobile-service-pill__title">
                                        {service.title}
                                      </span>
                                      <span className="mobile-service-pill__sub">
                                        {service.techTags.slice(0, 3).join(' • ')}
                                      </span>
                                    </span>
                                    <ArrowUpRight
                                      size={15}
                                      strokeWidth={2.2}
                                      className="mobile-service-pill__arrow"
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.li>
                        )
                      }

                      return (
                        <motion.li
                          key={item.path}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="mobile-drawer__item"
                        >
                          <Link
                            to={item.path}
                            className={`mobile-drawer__link ${
                              active ? 'mobile-drawer__link--active' : ''
                            }`}
                          >
                            <span className="mobile-drawer__icon-box">
                              <NavItemIcon type={item.icon} size={17} />
                            </span>
                            <span className="mobile-drawer__label">{item.label}</span>
                            {item.badge && (
                              <span className="mobile-drawer__badge">{item.badge}</span>
                            )}
                            <ArrowRight
                              size={17}
                              strokeWidth={2.2}
                              className="mobile-drawer__arrow"
                            />
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>

                  {/* Mobile CTA & Direct Contact Footer */}
                  <div className="mobile-drawer__footer">
                    <Link to="/contact" className="mobile-drawer__cta">
                      <span>Start a Project</span>
                      <ArrowUpRight size={18} strokeWidth={2.4} />
                    </Link>

                    <div className="mobile-drawer__contact-cards">
                      <a
                        href={`mailto:${companyInfo.contact.primaryEmail}`}
                        className="mobile-drawer__contact-card"
                      >
                        <span className="mobile-drawer__contact-lbl">
                          <Mail size={12} strokeWidth={2.3} />
                          <span>EMAIL US</span>
                        </span>
                        <span className="mobile-drawer__contact-val">
                          {companyInfo.contact.primaryEmail}
                        </span>
                      </a>
                      <a
                        href={`tel:${companyInfo.contact.phones[0].raw}`}
                        className="mobile-drawer__contact-card"
                      >
                        <span className="mobile-drawer__contact-lbl">
                          <PhoneCall size={12} strokeWidth={2.3} />
                          <span>CALL DIRECT</span>
                        </span>
                        <span className="mobile-drawer__contact-val">
                          {companyInfo.contact.phones[0].number}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== INTERACTIVE COMMAND & SERVICE EXPLORER (Ctrl+K) ==================== */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="cmd-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Ultoxy Quick Command and Service Explorer"
          >
            <div
              className="cmd-modal__backdrop"
              onClick={() => setIsCommandOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="cmd-modal__box"
            >
              {/* Search Bar */}
              <div className="cmd-modal__search-bar">
                <Search size={18} strokeWidth={2.2} className="cmd-modal__search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  placeholder="Search Ultoxy services, technologies (React, Flutter, ERP), or projects..."
                  className="cmd-modal__input"
                />
                <button
                  type="button"
                  onClick={() => setIsCommandOpen(false)}
                  className="cmd-modal__close-btn"
                  aria-label="Close Quick Explorer"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>

              <div className="cmd-modal__body">
                {/* Services Group */}
                {filteredServices.length > 0 && (
                  <div className="cmd-modal__group">
                    <span className="cmd-modal__group-title">
                      CORE ENGINEERING PRACTICES
                    </span>
                    <div className="cmd-modal__list">
                      {filteredServices.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className="cmd-modal__item"
                          onClick={() => {
                            navigate(`/services?category=${s.slug}`)
                            setIsCommandOpen(false)
                          }}
                        >
                          <span className="cmd-modal__item-icon">
                            <ServiceCategoryIcon type={s.iconType} size={18} />
                          </span>
                          <span className="cmd-modal__item-main">
                            <span className="cmd-modal__item-title">{s.title}</span>
                            <span className="cmd-modal__item-sub">{s.tagline}</span>
                          </span>
                          <span className="cmd-modal__item-tags">
                            {s.techTags.slice(0, 2).map((t) => (
                              <span key={t} className="cmd-modal__tag">
                                {t}
                              </span>
                            ))}
                          </span>
                          <ArrowRight size={15} className="cmd-modal__item-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Projects Group */}
                {filteredProjects.length > 0 && (
                  <div className="cmd-modal__group">
                    <span className="cmd-modal__group-title">
                      VERIFIED CLIENT SYSTEMS (11+ DELIVERED)
                    </span>
                    <div className="cmd-modal__grid-2">
                      {filteredProjects.map((proj) => (
                        <button
                          key={proj.name}
                          type="button"
                          className="cmd-modal__proj-card"
                          onClick={() => {
                            navigate('/projects')
                            setIsCommandOpen(false)
                          }}
                        >
                          <FolderGit2
                            size={16}
                            strokeWidth={2.1}
                            className="cmd-modal__proj-icon"
                          />
                          <span className="cmd-modal__proj-info">
                            <span className="cmd-modal__proj-name">{proj.name}</span>
                            <span className="cmd-modal__proj-type">{proj.type}</span>
                          </span>
                          <ExternalLink size={13} className="cmd-modal__proj-ext" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions Group */}
                <div className="cmd-modal__group">
                  <span className="cmd-modal__group-title">QUICK ACTIONS</span>
                  <div className="cmd-modal__quick-row">
                    <button
                      type="button"
                      className="cmd-modal__action-pill"
                      onClick={toggleTheme}
                    >
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                      <span>Switch to {isDark ? 'White' : 'Dark'} Theme</span>
                    </button>

                    <button
                      type="button"
                      className="cmd-modal__action-pill"
                      onClick={handleCopyEmail}
                    >
                      {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                      <span>
                        {copiedEmail
                          ? 'Copied info@ultoxy.com!'
                          : 'Copy info@ultoxy.com'}
                      </span>
                    </button>

                    <a
                      href={`tel:${companyInfo.contact.phones[0].raw}`}
                      className="cmd-modal__action-pill"
                    >
                      <PhoneCall size={15} />
                      <span>Call {companyInfo.contact.phones[0].number}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="cmd-modal__footer">
                <span>
                  <Command size={12} /> Ultoxy Quick Navigator
                </span>
                <span>Press ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
