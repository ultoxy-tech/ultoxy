import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Palette,
  TrendingUp,
  ShieldCheck,
  Globe,
  Smartphone,
  Cpu,
  Megaphone,
  Search,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Layers,
  Database,
  Server,
  Terminal,
  Cloud,
  GitBranch,
  Layout,
  ExternalLink,
  Lock,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MapPin,
  Rocket,
  Zap,
} from 'lucide-react'
import {
  companyInfo,
  aboutFeatures,
  serviceCategories,
  portfolioProjects,
  techStackItems,
  clientTestimonials,
  processSteps,
} from '../data/companyData'
import './HomeSections.css'

const ABOUT_ICON_MAP = {
  code: Code2,
  palette: Palette,
  trending: TrendingUp,
  shield: ShieldCheck,
}

const SERVICE_ICON_MAP = {
  web: Globe,
  mobile: Smartphone,
  software: Cpu,
  marketing: Megaphone,
  seo: Search,
}

const TECH_ICON_MAP = {
  React: Code2,
  Django: Server,
  Flutter: Smartphone,
  'JavaScript (ES6+)': Terminal,
  Python: Cpu,
  'Node.js': Layers,
  'HTML5 & CSS3': Layout,
  'MySQL & PostgreSQL': Database,
  Firebase: Cloud,
  'Bootstrap & Tailwind': Palette,
  'RESTful APIs': Globe,
  'Git & Cloud DevOps': GitBranch,
}

const SERVICE_COLOR_PALETTE = [
  {
    accent: '#0284c7',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
    softBg: 'rgba(2, 132, 199, 0.09)',
  },
  {
    accent: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    softBg: 'rgba(124, 58, 237, 0.09)',
  },
  {
    accent: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    softBg: 'rgba(37, 99, 235, 0.09)',
  },
  {
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    softBg: 'rgba(236, 72, 153, 0.09)',
  },
  {
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
    softBg: 'rgba(16, 185, 129, 0.09)',
  },
]

const SERVICE_STACK_MAP = {
  'website-development': ['React 19', 'Django', 'Tailwind CSS', 'Cloud SSR'],
  'mobile-app-development': [
    'Flutter SDK',
    'iOS & Android',
    'Firebase',
    'REST APIs',
  ],
  'desktop-software-erp': [
    'Python ERP',
    'PostgreSQL',
    'Role Security',
    'Cloud Sync',
  ],
  'digital-marketing': [
    'Google Ads',
    'Meta Ads',
    'Lead Funnels',
    'CRO Analytics',
  ],
  'seo-optimization': [
    'Technical SEO',
    'JSON-LD Schema',
    'Core Vitals',
    'Local Ranking',
  ],
}

const PROCESS_METADATA = [
  { phase: 'PHASE 01', deliverables: ['System Blueprint', 'DB Schema'] },
  { phase: 'PHASE 02', deliverables: ['Interactive UI', 'Design System'] },
  { phase: 'PHASE 03', deliverables: ['Clean Codebase', 'QA Testing'] },
  { phase: 'PHASE 04', deliverables: ['Cloud Launch', '24/7 Support'] },
]

/* ---------- Smooth GPU-Accelerated Scroll Reveal Variants ---------- */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: EASE_OUT_EXPO,
      staggerChildren: 0.1,
    },
  },
}

const headerChildVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}

const gridStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

const cardFadeUpVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: EASE_OUT_EXPO },
  },
}

const stripSlideLeftVariants = {
  hidden: { opacity: 0, x: -30, y: 14 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.56, ease: EASE_OUT_EXPO },
  },
}

const stageSlideRightVariants = {
  hidden: { opacity: 0, x: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
}

export default function HomeSections() {
  /* Section 2: Interactive About Pillar Selection & Video Player */
  const [activeAboutIdx, setActiveAboutIdx] = useState(0)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  /* Section 3: Interactive Master-Detail Service Studio State */
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)

  /* Section 4: Tech Stack Filter State */
  const [activeTechFilter, setActiveTechFilter] = useState('All')
  const techCategories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database']

  /* Section 5: Projects Carousel Slider State */
  const [projectFilter, setProjectFilter] = useState('all')
  const [activeProjectSlide, setActiveProjectSlide] = useState(0)
  const [isProjectsPaused, setIsProjectsPaused] = useState(false)
  const projectCarouselRef = useRef(null)

  /* Section 6: Interactive Process Runway Hover State */
  const [activeProcessIdx, setActiveProcessIdx] = useState(0)

  /* Section 7: Testimonials Spotlight State */
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isSpotlightPaused, setIsSpotlightPaused] = useState(false)

  useEffect(() => {
    if (isSpotlightPaused) return undefined
    const timer = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === clientTestimonials.length - 1 ? 0 : prev + 1
      )
    }, 6800)
    return () => clearInterval(timer)
  }, [isSpotlightPaused])

  const toggleVideoPlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleVideoMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const filteredTech =
    activeTechFilter === 'All'
      ? techStackItems
      : techStackItems.filter((item) => item.category === activeTechFilter)

  const filteredProjects =
    projectFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((proj) => proj.filterGroup === projectFilter)

  const scrollToProjectSlide = (targetIdx) => {
    const total = filteredProjects.length
    if (!total) return
    const normalizedIdx = ((targetIdx % total) + total) % total
    setActiveProjectSlide(normalizedIdx)
    const trackEl = projectCarouselRef.current
    if (!trackEl) return
    const slideCards = trackEl.querySelectorAll('.project-carousel-slide')
    const targetCard = slideCards[normalizedIdx]
    if (targetCard) {
      const targetLeft = targetCard.offsetLeft - trackEl.offsetLeft
      trackEl.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      })
    }
  }

  const handleSelectProjectFilter = (filterId) => {
    setProjectFilter(filterId)
    setActiveProjectSlide(0)
    if (projectCarouselRef.current) {
      projectCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const handleNextProjectSlide = () => {
    const trackEl = projectCarouselRef.current
    if (trackEl) {
      const maxScrollLeft = trackEl.scrollWidth - trackEl.clientWidth
      if (trackEl.scrollLeft >= maxScrollLeft - 14) {
        scrollToProjectSlide(0)
        return
      }
    }
    scrollToProjectSlide(activeProjectSlide + 1)
  }

  const handlePrevProjectSlide = () => {
    const trackEl = projectCarouselRef.current
    if (trackEl && trackEl.scrollLeft <= 14) {
      scrollToProjectSlide(filteredProjects.length - 1)
      return
    }
    scrollToProjectSlide(activeProjectSlide - 1)
  }

  const handleProjectTrackScroll = () => {
    const trackEl = projectCarouselRef.current
    if (!trackEl) return
    const slideCards = trackEl.querySelectorAll('.project-carousel-slide')
    if (!slideCards.length) return
    const currentScroll = trackEl.scrollLeft
    let closestIdx = 0
    let minDistance = Infinity
    slideCards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - trackEl.offsetLeft
      const dist = Math.abs(cardLeft - currentScroll)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = index
      }
    })
    if (closestIdx !== activeProjectSlide) {
      setActiveProjectSlide(closestIdx)
    }
  }

  useEffect(() => {
    if (isProjectsPaused || filteredProjects.length <= 1) return undefined
    const timer = setInterval(() => {
      const trackEl = projectCarouselRef.current
      if (trackEl) {
        const maxScrollLeft = trackEl.scrollWidth - trackEl.clientWidth
        if (trackEl.scrollLeft >= maxScrollLeft - 14) {
          scrollToProjectSlide(0)
          return
        }
      }
      scrollToProjectSlide(activeProjectSlide + 1)
    }, 4600)
    return () => clearInterval(timer)
  }, [isProjectsPaused, activeProjectSlide, filteredProjects.length])

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? clientTestimonials.length - 1 : prev - 1
    )
  }

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === clientTestimonials.length - 1 ? 0 : prev + 1
    )
  }

  const currentService = serviceCategories[activeServiceIdx]
  const currentServicePalette =
    SERVICE_COLOR_PALETTE[activeServiceIdx % SERVICE_COLOR_PALETTE.length]
  const ActiveServiceIcon =
    SERVICE_ICON_MAP[currentService.iconType] || Globe

  const currentSpotlight = clientTestimonials[activeTestimonial]
  const currentSpotlightPalette =
    SERVICE_COLOR_PALETTE[activeTestimonial % SERVICE_COLOR_PALETTE.length]

  return (
    <div className="ultoxy-home-sections">
      {/* =====================================================================
          SECTION 2: INTERACTIVE ENGINEERING ACCORDION + STUDIO CINEMA HUB
          (Original Layout #1: Left Interactive Pillar Strips + Right Cinema Hub)
          ===================================================================== */}
      <section className="home-sec home-about-sec" id="about-ultoxy">
        <div className="sec-ambient-orb sec-orb-cyan" aria-hidden="true" />
        <div className="sec-ambient-orb sec-orb-violet" aria-hidden="true" />

        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Sparkles size={14} className="sec-eyebrow-icon" />
              <span>WHO WE ARE • DIGITAL GROWTH PARTNER</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              Engineering Digital Products{' '}
              <span className="gradient-text">Built To Scale</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              We partner with ambitious companies to build high-speed web
              platforms, Flutter apps, and custom ERP software.
            </motion.p>
          </motion.div>

          <div className="about-studio-split">
            {/* Left Column: 4 Interactive Horizontal Engineering Strips */}
            <motion.div
              className="about-interactive-strips"
              variants={gridStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.18, margin: '-40px' }}
            >
              {aboutFeatures.map((feat, idx) => {
                const IconComp = ABOUT_ICON_MAP[feat.icon] || Code2
                const palette =
                  SERVICE_COLOR_PALETTE[idx % SERVICE_COLOR_PALETTE.length]
                const isSelected = idx === activeAboutIdx

                return (
                  <motion.div
                    key={feat.title}
                    variants={stripSlideLeftVariants}
                    className={`about-strip-item ${
                      isSelected ? 'is-active' : ''
                    }`}
                    style={{
                      '--strip-accent': palette.accent,
                      '--strip-gradient': palette.gradient,
                    }}
                    onMouseEnter={() => setActiveAboutIdx(idx)}
                    onClick={() => setActiveAboutIdx(idx)}
                  >
                    <div className="about-strip-main">
                      <span className="about-strip-num">0{idx + 1}</span>
                      <div className="about-strip-icon">
                        <IconComp size={20} />
                      </div>
                      <div className="about-strip-titles">
                        <h3 className="about-strip-title">{feat.title}</h3>
                        <p className="about-strip-desc">{feat.description}</p>
                      </div>
                      <span className="about-strip-arrow">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Right Column: Dual-Layer Cinema Viewport + Live Telemetry Dock */}
            <motion.div
              className="about-cinema-column"
              variants={stageSlideRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2, margin: '-40px' }}
            >
              <div className="about-cinema-card">
                <div className="about-cinema-topbar">
                  <div className="about-cinema-status">
                    <span className="cinema-pulse-dot" />
                    <span>ULTOXY ENGINEERING STUDIO • PUNE</span>
                  </div>
                  <div className="about-cinema-controls">
                    <button
                      type="button"
                      onClick={toggleVideoPlay}
                      className="cinema-ctrl-btn"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="cinema-ctrl-btn"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>

                <div className="about-cinema-viewport">
                  <video
                    className="about-cinema-backdrop"
                    src="/videos/about_intro.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                  />
                  <video
                    ref={videoRef}
                    className="about-cinema-video"
                    src="/videos/about_intro.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                <motion.div
                  className="about-cinema-telemetry"
                  variants={gridStaggerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.25 }}
                >
                  <motion.div
                    className="telemetry-stat"
                    variants={cardFadeUpVariants}
                  >
                    <strong>11+</strong>
                    <span>Live Systems</span>
                  </motion.div>
                  <motion.div
                    className="telemetry-stat"
                    variants={cardFadeUpVariants}
                  >
                    <strong>5</strong>
                    <span>Core Practices</span>
                  </motion.div>
                  <motion.div
                    className="telemetry-stat"
                    variants={cardFadeUpVariants}
                  >
                    <strong>100%</strong>
                    <span>Satisfaction</span>
                  </motion.div>
                  <Link to="/about" className="telemetry-explore-btn">
                    <span>Our Story</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTERACTIVE MASTER-DETAIL SERVICE COMMAND STUDIO
          (Original Layout #2: Left Vertical Selector Rail + Right Live Stage)
          ===================================================================== */}
      <section className="home-sec home-services-sec" id="our-services">
        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Layers size={14} className="sec-eyebrow-icon" />
              <span>OUR SERVICES • END-TO-END CAPABILITIES</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              Five Specialized Practices.{' '}
              <span className="gradient-text">One Engineering Partner.</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              Select any practice below to explore our deliverables, technology
              stack, and business impact.
            </motion.p>
          </motion.div>

          <motion.div
            className="service-command-studio"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.16, margin: '-40px' }}
            transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
            style={{
              '--srv-accent': currentServicePalette.accent,
              '--srv-gradient': currentServicePalette.gradient,
              '--srv-soft': currentServicePalette.softBg,
            }}
          >
            {/* Left Vertical Service Selector Rail */}
            <motion.div
              className="service-selector-rail"
              role="tablist"
              aria-label="Ultoxy Core Services"
              variants={gridStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {serviceCategories.map((srv, index) => {
                const IconComp = SERVICE_ICON_MAP[srv.iconType] || Globe
                const palette =
                  SERVICE_COLOR_PALETTE[index % SERVICE_COLOR_PALETTE.length]
                const isSelected = index === activeServiceIdx

                return (
                  <motion.button
                    key={srv.id}
                    variants={stripSlideLeftVariants}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`service-rail-tab ${
                      isSelected ? 'is-active' : ''
                    }`}
                    style={{
                      '--tab-accent': palette.accent,
                      '--tab-gradient': palette.gradient,
                    }}
                    onClick={() => setActiveServiceIdx(index)}
                    onMouseEnter={() => setActiveServiceIdx(index)}
                  >
                    <span className="rail-tab-icon">
                      <IconComp size={19} />
                    </span>
                    <span className="rail-tab-copy">
                      <span className="rail-tab-code">0{index + 1}</span>
                      <span className="rail-tab-title">{srv.title}</span>
                    </span>
                    <ChevronRight size={16} className="rail-tab-arrow" />
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Right Dynamic Holographic Service Stage */}
            <motion.div
              className="service-stage-panel"
              variants={stageSlideRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  className="service-stage-inner"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                >
                  <div className="service-stage-header">
                    <div className="service-stage-badge-group">
                      <div className="service-stage-icon">
                        <ActiveServiceIcon size={26} />
                      </div>
                      <div>
                        <span className="service-stage-kicker">
                          PRACTICE 0{activeServiceIdx + 1} •{' '}
                          {currentService.shortTitle.toUpperCase()}
                        </span>
                        <h3 className="service-stage-title">
                          {currentService.title}
                        </h3>
                      </div>
                    </div>

                    <div className="service-stage-metric">
                      <strong>
                        {typeof currentService.metrics === 'object'
                          ? currentService.metrics.value
                          : currentService.metrics}
                      </strong>
                      <span>
                        {typeof currentService.metrics === 'object'
                          ? currentService.metrics.label
                          : 'Verified Benchmark'}
                      </span>
                    </div>
                  </div>

                  <p className="service-stage-desc">
                    {currentService.description}
                  </p>

                  {/* 2x2 Architectural Deliverables Matrix */}
                  <div className="service-deliverables-matrix">
                    {currentService.deliverables.map((item, idx) => (
                      <motion.div
                        key={item}
                        className="deliverable-node-card"
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.38,
                          delay: idx * 0.06,
                          ease: EASE_OUT_EXPO,
                        }}
                      >
                        <span className="deliverable-node-num">
                          0{idx + 1}
                        </span>
                        <CheckCircle2
                          size={16}
                          className="deliverable-node-check"
                        />
                        <span className="deliverable-node-text">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Stack Pills & Action CTA */}
                  <div className="service-stage-footer">
                    <div className="service-stack-pills">
                      {(SERVICE_STACK_MAP[currentService.slug] || []).map(
                        (tech) => (
                          <span key={tech} className="service-stack-chip">
                            {tech}
                          </span>
                        )
                      )}
                    </div>

                    <Link
                      to={`/services?category=${currentService.slug}`}
                      className="service-stage-cta"
                    >
                      <span>Explore {currentService.shortTitle}</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: ARCHITECTURAL TECHNOLOGY MATRIX RIBBON
          (Original Layout #3: Compact Interactive Tech Nodes + Guarantee Bar)
          ===================================================================== */}
      <section className="home-sec home-tech-sec" id="tech-stack">
        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Cpu size={14} className="sec-eyebrow-icon" />
              <span>TECHNOLOGY STACK • MODERN ARCHITECTURE</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              Powered By Battle-Tested{' '}
              <span className="gradient-text">Frameworks &amp; Cloud</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              Clean, modular code engineered with modern frontend, backend,
              mobile, and relational database stacks.
            </motion.p>
          </motion.div>

          {/* Compact Category Filter Pills */}
          <motion.div
            className="tech-filter-tabs"
            role="tablist"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            {techCategories.map((cat) => {
              const active = activeTechFilter === cat
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`tech-filter-pill ${active ? 'active' : ''}`}
                  onClick={() => setActiveTechFilter(cat)}
                >
                  {active && (
                    <motion.span
                      layoutId="techActiveTabIndicator"
                      className="tech-filter-active-bg"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="tech-filter-label">{cat}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Sleek Horizontal Architectural Tech Nodes */}
          <motion.div
            className="tech-nodes-matrix"
            variants={gridStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15, margin: '-40px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech, index) => {
                const IconComp = TECH_ICON_MAP[tech.name] || Code2
                const palette =
                  SERVICE_COLOR_PALETTE[index % SERVICE_COLOR_PALETTE.length]
                return (
                  <motion.div
                    key={tech.name}
                    className="tech-node-pill"
                    style={{
                      '--node-accent': palette.accent,
                      '--node-gradient': palette.gradient,
                    }}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: (index % 4) * 0.05,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <div className="tech-node-icon">
                      <IconComp size={19} />
                    </div>
                    <div className="tech-node-info">
                      <h3 className="tech-node-name">{tech.name}</h3>
                      <span className="tech-node-role">{tech.badge}</span>
                    </div>
                    <span className="tech-node-dot" aria-hidden="true" />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FEATURED PROJECTS CAROUSEL SLIDER (11+ DEPLOYMENTS)
          (Original Layout #4: Single-Row Interactive Carousel Slider)
          ===================================================================== */}
      <section className="home-sec home-projects-sec" id="our-projects">
        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Rocket size={14} className="sec-eyebrow-icon" />
              <span>OUR PROJECTS • 11+ PRODUCTION DEPLOYMENTS</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              Real-World{' '}
              <span className="gradient-text">Websites &amp; Custom ERPs</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              Slide through our live portfolio of enterprise ERPs, examination
              portals, and corporate websites.
            </motion.p>
          </motion.div>

          {/* Top Toolbar: Category Filter Tabs + Carousel Navigation Controls */}
          <motion.div
            className="project-carousel-toolbar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.52, ease: EASE_OUT_EXPO }}
          >
            <div className="project-filter-bar" role="tablist">
              {[
                {
                  id: 'all',
                  label: 'All Projects',
                  count: portfolioProjects.length,
                },
                {
                  id: 'erp',
                  label: 'ERP & Software',
                  count: portfolioProjects.filter(
                    (p) => p.filterGroup === 'erp'
                  ).length,
                },
                {
                  id: 'web',
                  label: 'Websites & Portals',
                  count: portfolioProjects.filter(
                    (p) => p.filterGroup === 'web'
                  ).length,
                },
              ].map((tab) => {
                const active = projectFilter === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`project-filter-btn ${active ? 'active' : ''}`}
                    onClick={() => handleSelectProjectFilter(tab.id)}
                  >
                    {active && (
                      <motion.span
                        layoutId="projectFilterActivePill"
                        className="project-filter-active-bg"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="project-filter-text">{tab.label}</span>
                    <span className="project-filter-count">{tab.count}</span>
                  </button>
                )
              })}
            </div>

            <div className="project-carousel-nav-group">
              <div className="project-slider-controls">
                <button
                  type="button"
                  onClick={handlePrevProjectSlide}
                  className="project-slider-btn"
                  aria-label="Previous project slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="project-slider-counter">
                  {String(activeProjectSlide + 1).padStart(2, '0')} /{' '}
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={handleNextProjectSlide}
                  className="project-slider-btn"
                  aria-label="Next project slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <Link to="/projects" className="project-view-all-btn">
                <span>View All</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Single-Row Interactive Projects Carousel Stage */}
          <motion.div
            className="projects-carousel-stage"
            onMouseEnter={() => setIsProjectsPaused(true)}
            onMouseLeave={() => setIsProjectsPaused(false)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: '-40px' }}
            transition={{ duration: 0.62, ease: EASE_OUT_EXPO }}
          >
            <button
              type="button"
              onClick={handlePrevProjectSlide}
              className="project-floating-arrow project-floating-arrow--prev"
              aria-label="Slide projects left"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={projectCarouselRef}
              onScroll={handleProjectTrackScroll}
              className="projects-carousel-track"
            >
              {filteredProjects.map((project, idx) => {
                const palette =
                  SERVICE_COLOR_PALETTE[idx % SERVICE_COLOR_PALETTE.length]
                const isCurrent = idx === activeProjectSlide
                return (
                  <motion.article
                    key={project.id}
                    className={`project-showcase-card project-carousel-slide ${
                      isCurrent ? 'is-active-slide' : ''
                    }`}
                    style={{
                      '--proj-accent': palette.accent,
                      '--proj-gradient': palette.gradient,
                    }}
                    initial={{ opacity: 0, y: 26, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.12 }}
                    transition={{
                      duration: 0.52,
                      delay: (idx % 3) * 0.08,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <div className="project-browser-bar">
                      <div className="project-browser-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="project-category-badge">
                        {project.category}
                      </span>
                    </div>

                    {/* Full Uncropped Screenshot Viewport */}
                    <div className="project-image-wrap">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category}`}
                        className="project-screenshot"
                        loading="lazy"
                      />
                      <div className="project-image-overlay">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-overlay-btn"
                          >
                            <span>Visit Live</span>
                            <ExternalLink size={15} />
                          </a>
                        ) : (
                          <span className="project-overlay-btn project-private-badge">
                            <Lock size={14} />
                            <span>Enterprise ERP</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="project-card-body">
                      <div className="project-tags-row">
                        {project.tags.slice(0, 2).map((t) => (
                          <span key={t} className="project-tag-chip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-desc">{project.description}</p>

                      <div className="project-card-footer">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-visit-link"
                          >
                            <span>Live Preview</span>
                            <ArrowUpRight size={15} />
                          </a>
                        ) : (
                          <Link to="/contact" className="project-visit-link">
                            <span>Request Demo</span>
                            <ArrowRight size={15} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleNextProjectSlide}
              className="project-floating-arrow project-floating-arrow--next"
              aria-label="Slide projects right"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>

          <motion.div
            className="project-carousel-bottom"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <div
              className="project-carousel-dots"
              role="tablist"
              aria-label="Project slides"
            >
              {filteredProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeProjectSlide}
                  aria-label={`Go to ${proj.title}`}
                  className={`project-carousel-dot ${
                    idx === activeProjectSlide ? 'active' : ''
                  }`}
                  onClick={() => scrollToProjectSlide(idx)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: INTERACTIVE ENGINEERING RUNWAY TIMELINE
          (Original Layout #5: Glowing Fiber-Optic Track + Milestone Nodes)
          ===================================================================== */}
      <section className="home-sec home-process-sec" id="how-we-work">
        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Zap size={14} className="sec-eyebrow-icon" />
              <span>EXECUTION ROADMAP • CONCEPT TO CLOUD</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              How We Turn Bold Ideas Into{' '}
              <span className="gradient-text">Live Products</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              A transparent 4-stage engineering pipeline designed for speed,
              precision, and measurable business impact.
            </motion.p>
          </motion.div>

          <div className="runway-timeline-wrapper">
            <motion.div
              className="runway-fiber-line"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.48 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
              aria-hidden="true"
            />

            <motion.div
              className="runway-steps-grid"
              variants={gridStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.18, margin: '-40px' }}
            >
              {processSteps.map((stepItem, index) => {
                const palette =
                  SERVICE_COLOR_PALETTE[index % SERVICE_COLOR_PALETTE.length]
                const meta = PROCESS_METADATA[index] || PROCESS_METADATA[0]
                const isActive = index === activeProcessIdx

                return (
                  <motion.article
                    key={stepItem.step}
                    variants={cardFadeUpVariants}
                    className={`runway-milestone-card ${
                      isActive ? 'is-active' : ''
                    }`}
                    style={{
                      '--step-accent': palette.accent,
                      '--step-gradient': palette.gradient,
                    }}
                    onMouseEnter={() => setActiveProcessIdx(index)}
                    onClick={() => setActiveProcessIdx(index)}
                  >
                    {/* Top Glowing Runway Node */}
                    <div className="runway-node-row">
                      <span className="runway-node-badge">
                        {stepItem.step}
                      </span>
                      <span className="runway-phase-tag">{meta.phase}</span>
                    </div>

                    <h3 className="runway-card-title">{stepItem.title}</h3>
                    <p className="runway-card-desc">{stepItem.description}</p>

                    <div className="runway-deliverables-row">
                      {meta.deliverables.map((d) => (
                        <span key={d} className="runway-deliverable-chip">
                          {d}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: VOICES THAT POWER ULTOXY (SINGLE BIG SPOTLIGHT STAGE)
          (Original Layout #6: Blurry Aurora Shapes + Clean 2-Column Stage)
          ===================================================================== */}
      <section className="home-sec home-testimonials-sec" id="testimonials">
        <div
          className="testimonials-ambient-orb testimonials-orb-cyan"
          aria-hidden="true"
        />
        <div
          className="testimonials-ambient-orb testimonials-orb-violet"
          aria-hidden="true"
        />

        <div className="container">
          <motion.div
            className="sec-header"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
          >
            <motion.div className="sec-eyebrow" variants={headerChildVariants}>
              <Star size={14} className="sec-eyebrow-icon" />
              <span>CLIENT SUCCESS STORIES • 100% SATISFACTION</span>
            </motion.div>
            <motion.h2 className="sec-title" variants={headerChildVariants}>
              Voices That Power{' '}
              <span className="gradient-text">Ultoxy Technologies</span>
            </motion.h2>
            <motion.p className="sec-subtitle" variants={headerChildVariants}>
              Trusted by CEOs, Founders, School Principals, and Enterprise
              Leaders across Maharashtra and beyond.
            </motion.p>
          </motion.div>

          <motion.div
            className="testimonial-spotlight-stage"
            onMouseEnter={() => setIsSpotlightPaused(true)}
            onMouseLeave={() => setIsSpotlightPaused(false)}
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.16, margin: '-40px' }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            style={{
              '--spot-accent': currentSpotlightPalette.accent,
              '--spot-gradient': currentSpotlightPalette.gradient,
            }}
          >
            <div className="testimonial-spotlight-shell">
              <div className="spotlight-bg-canvas" aria-hidden="true">
                <span className="spotlight-blur-shape spotlight-blur-shape--cyan" />
                <span className="spotlight-blur-shape spotlight-blur-shape--violet" />
                <span className="spotlight-blur-shape spotlight-blur-shape--rose" />
                <svg
                  className="spotlight-wave-svg"
                  viewBox="0 0 1200 360"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M-60 260 C 240 140, 480 340, 780 200 C 980 110, 1120 240, 1260 170"
                    stroke="url(#spotlightWaveGrad1)"
                    strokeWidth="2"
                  />
                  <path
                    d="M-60 310 C 280 200, 540 360, 840 240 C 1020 165, 1140 280, 1260 220"
                    stroke="url(#spotlightWaveGrad2)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />
                  <defs>
                    <linearGradient
                      id="spotlightWaveGrad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.22" />
                      <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient
                      id="spotlightWaveGrad2"
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.16" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpotlight.id}
                  className="testimonial-spotlight-grid"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.34, ease: EASE_OUT_EXPO }}
                >
                  <aside className="spotlight-identity-panel">
                    <div className="spotlight-verified-pill">
                      <CheckCircle2 size={14} />
                      <span>Verified Client Partner</span>
                    </div>

                    <div className="spotlight-profile-block">
                      <div className="spotlight-avatar-frame">
                        {currentSpotlight.avatar ? (
                          <img
                            src={currentSpotlight.avatar}
                            alt={currentSpotlight.name}
                            className="spotlight-avatar-img"
                          />
                        ) : (
                          <div
                            className="spotlight-avatar-initials"
                            style={{
                              background: currentSpotlightPalette.gradient,
                            }}
                          >
                            {currentSpotlight.initials}
                          </div>
                        )}
                      </div>

                      <div className="spotlight-author-info">
                        <h3 className="spotlight-author-name">
                          {currentSpotlight.name}
                        </h3>
                        <p className="spotlight-author-role">
                          {currentSpotlight.role}
                        </p>
                      </div>
                    </div>

                    <div
                      className="spotlight-rating-box"
                      aria-label="5.0 out of 5 stars"
                    >
                      <div className="spotlight-stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            fill="#f59e0b"
                            color="#f59e0b"
                          />
                        ))}
                      </div>
                      <span className="spotlight-rating-score">
                        5.0 / 5.0 Rating
                      </span>
                    </div>

                    <div className="spotlight-solution-box">
                      <span className="spotlight-solution-label">
                        DELIVERED SOLUTION
                      </span>
                      <span className="spotlight-project-pill">
                        {currentSpotlight.projectTag}
                      </span>
                    </div>
                  </aside>

                  <div className="spotlight-editorial-panel">
                    <div
                      className="spotlight-quote-watermark"
                      aria-hidden="true"
                    >
                      <Quote size={100} />
                    </div>

                    <div className="spotlight-editorial-top">
                      <div className="spotlight-quote-badge-wrap">
                        <span
                          className="spotlight-quote-icon-box"
                          style={{
                            background: currentSpotlightPalette.gradient,
                          }}
                        >
                          <Quote size={17} />
                        </span>
                        <span className="spotlight-case-tag">
                          SUCCESS STORY • 0{activeTestimonial + 1} / 0
                          {clientTestimonials.length}
                        </span>
                      </div>

                      <div className="spotlight-nav-controls">
                        <button
                          type="button"
                          onClick={handlePrevTestimonial}
                          className="spotlight-nav-btn"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className="spotlight-counter">
                          0{activeTestimonial + 1} / 0
                          {clientTestimonials.length}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextTestimonial}
                          className="spotlight-nav-btn"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    <blockquote className="spotlight-quote-text">
                      “{currentSpotlight.quote}”
                    </blockquote>

                    <div className="spotlight-outcomes-strip">
                      <span className="spotlight-outcome-chip">
                        <CheckCircle2 size={14} />
                        100% Client Satisfaction
                      </span>
                      <span className="spotlight-outcome-chip">
                        <ShieldCheck size={14} />
                        Production-Grade Quality
                      </span>
                      <span className="spotlight-outcome-chip">
                        <Zap size={14} />
                        Timely Delivery &amp; Support
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="spotlight-client-switcher"
                role="tablist"
                aria-label="Select client review"
                variants={gridStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
              >
                {clientTestimonials.map((item, idx) => {
                  const isSelected = idx === activeTestimonial
                  const palette =
                    SERVICE_COLOR_PALETTE[idx % SERVICE_COLOR_PALETTE.length]
                  return (
                    <motion.button
                      key={item.id}
                      variants={cardFadeUpVariants}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`spotlight-client-pill ${
                        isSelected ? 'active' : ''
                      }`}
                      onClick={() => setActiveTestimonial(idx)}
                      style={{
                        '--pill-accent': palette.accent,
                        '--pill-gradient': palette.gradient,
                      }}
                    >
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="spotlight-pill-avatar"
                        />
                      ) : (
                        <span
                          className="spotlight-pill-initials"
                          style={{ background: palette.gradient }}
                        >
                          {item.initials}
                        </span>
                      )}
                      <span className="spotlight-pill-text">
                        <span className="spotlight-pill-name">{item.name}</span>
                        <span className="spotlight-pill-tag">
                          {item.projectTag}
                        </span>
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: SPLIT EXECUTIVE LAUNCHPAD BANNER
          (Original Layout #7: Left Headline & Actions + Right Quick-Launch Dock)
          ===================================================================== */}
      <section className="home-sec home-cta-sec" id="start-project">
        <div className="container">
          <motion.div
            className="cta-split-launchpad"
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: '-40px' }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="cta-aurora-glow cta-glow-1" aria-hidden="true" />
            <div className="cta-aurora-glow cta-glow-2" aria-hidden="true" />

            <motion.div
              className="cta-launchpad-left"
              variants={stripSlideLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="cta-eyebrow-pill">
                <Sparkles size={14} />
                <span>READY TO SCALE WITH ULTOXY?</span>
              </div>

              <h2 className="cta-banner-title">
                Let’s Engineer Your Next{' '}
                <span className="gradient-text">Digital Breakthrough</span>
              </h2>

              <p className="cta-banner-subtitle">
                Partner with our Pune engineering team for custom websites,
                Flutter mobile apps, enterprise ERPs, and SEO growth.
              </p>

              <div className="cta-banner-actions">
                <Link to="/contact" className="cta-primary-btn">
                  <span>Start Your Project</span>
                  <ArrowUpRight size={18} />
                </Link>

                <a
                  href={`tel:${companyInfo.contact.phones[0].raw}`}
                  className="cta-secondary-btn"
                >
                  <PhoneCall size={16} />
                  <span>{companyInfo.contact.phones[0].number}</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="cta-launchpad-right"
              variants={stageSlideRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="cta-quick-dock">
                <span className="cta-dock-kicker">
                  DIRECT CONSULTATION TRACKS
                </span>
                <div className="cta-dock-links">
                  <Link
                    to="/contact?service=website"
                    className="cta-dock-item"
                  >
                    <Globe size={16} />
                    <span>Dynamic Website &amp; Portal</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link
                    to="/contact?service=mobile"
                    className="cta-dock-item"
                  >
                    <Smartphone size={16} />
                    <span>Flutter Android &amp; iOS App</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link to="/contact?service=erp" className="cta-dock-item">
                    <Database size={16} />
                    <span>Custom Enterprise ERP</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
                <div className="cta-dock-foot">
                  <span>
                    <MapPin size={13} /> Pune, Maharashtra
                  </span>
                  <span>•</span>
                  <span>24-Hour Response SLA</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
