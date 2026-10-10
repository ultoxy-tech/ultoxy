import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  Globe,
  Smartphone,
  Database,
  TrendingUp,
  SearchCheck,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Code2,
  Activity,
  Award,
} from 'lucide-react'
import { serviceCategories, companyInfo } from '../data/companyData'
import './HeroSection.css'

const rotatingHeadlineWords = [
  'Ultoxy Innovation.',
  'Scalable Web Apps.',
  'Flutter Mobile Apps.',
  'Custom ERP Systems.',
  'Digital Growth.',
]

const heroShowcaseModules = [
  {
    id: 'website-development',
    shortLabel: 'Web Apps',
    title: 'Next-Gen Web Engineering',
    subtitle: 'React • Django • E-Commerce • Cloud Portals',
    metricValue: '99.4%',
    metricLabel: 'Core Web Vitals Score',
    clientHighlight: 'Saint Monica Intl. School & Sai Land Developers',
    accentFrom: '#00c6ff',
    accentTo: '#7c3aed',
    bars: [78, 92, 86, 99, 95],
    tags: ['React 19', 'Django REST', 'SSR / SEO', 'Ultra-Fast UI'],
    icon: Globe,
  },
  {
    id: 'mobile-app-development',
    shortLabel: 'Mobile Apps',
    title: 'iOS & Android Ecosystems',
    subtitle: 'Flutter • Native Performance • Cloud Sync',
    metricValue: '60 FPS',
    metricLabel: 'Native Smoothness',
    clientHighlight: 'Cross-Platform Enterprise & Consumer Apps',
    accentFrom: '#7c3aed',
    accentTo: '#ec4899',
    bars: [85, 90, 96, 94, 100],
    tags: ['Flutter SDK', 'iOS & Android', 'Realtime DB', 'Push Engine'],
    icon: Smartphone,
  },
  {
    id: 'desktop-software-erp',
    shortLabel: 'Custom ERP',
    title: 'Enterprise ERP & Automation',
    subtitle: 'Real Estate • Transport • Institute & Exam ERP',
    metricValue: '+300%',
    metricLabel: 'Workflow Speedup',
    clientHighlight: 'Sai Land Developers ERP & Patel Transport ERP',
    accentFrom: '#ec4899',
    accentTo: '#f59e0b',
    bars: [70, 84, 91, 96, 100],
    tags: ['Custom ERP', 'ExamTrax', 'Role Security', 'Cloud Analytics'],
    icon: Database,
  },
  {
    id: 'digital-marketing',
    shortLabel: 'Digital Growth',
    title: 'Performance Growth Engine',
    subtitle: 'Google Ads • Social Campaigns • Conversion Funnels',
    metricValue: '4.8x',
    metricLabel: 'Target Campaign ROI',
    clientHighlight: 'Multi-Industry Lead & Brand Amplification',
    accentFrom: '#f59e0b',
    accentTo: '#00c6ff',
    bars: [68, 80, 88, 94, 98],
    tags: ['Google Ads', 'Social Growth', 'Lead Funnels', 'CRO Analytics'],
    icon: TrendingUp,
  },
  {
    id: 'seo-optimization',
    shortLabel: 'Technical SEO',
    title: 'Search Ranking Dominance',
    subtitle: 'Technical Audits • Schema Architecture • Organic ROI',
    metricValue: 'Top 1%',
    metricLabel: 'Search Architecture',
    clientHighlight: 'Sustainable First-Page Organic Visibility',
    accentFrom: '#10b981',
    accentTo: '#2563eb',
    bars: [74, 82, 90, 96, 100],
    tags: ['Technical SEO', 'JSON-LD Schema', 'Keyword Dominance', 'Organic Traffic'],
    icon: SearchCheck,
  },
]

const heroQuickStats = [
  { value: '11+', label: 'Live Client Systems', icon: Layers },
  { value: '5', label: 'Core Tech Practices', icon: Code2 },
  { value: '99%', label: 'Performance Standard', icon: Activity },
  { value: '100%', label: 'Client Satisfaction', icon: Award },
]

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // 3D Tilt Motion Values for Desktop Interactive Stage
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 24,
  })

  // Cycle headline gradient phrase
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingHeadlineWords.length)
    }, 3400)
    return () => clearInterval(timer)
  }, [])

  // Auto-cycle interactive 3D showcase module unless hovered
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveModuleIndex((prev) => (prev + 1) % heroShowcaseModules.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [isPaused])

  const handleStageMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY]
  )

  const handleStageMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsPaused(false)
  }, [mouseX, mouseY])

  const activeModule = heroShowcaseModules[activeModuleIndex]
  const ActiveIcon = activeModule.icon

  return (
    <section className="hero" aria-label="Ultoxy Technologies Introduction">
      {/* ==================== ANIMATED MULTI-COLOR AURORA MESH BACKGROUND ==================== */}
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__aurora-orb hero__aurora-orb--cyan" />
        <div className="hero__aurora-orb hero__aurora-orb--violet" />
        <div className="hero__aurora-orb hero__aurora-orb--rose" />
        <div className="hero__aurora-orb hero__aurora-orb--amber" />
        <div className="hero__grid-overlay" />
      </div>

      <div className="container hero__container">
        <div className="hero__main-grid">
          {/* ==================== LEFT STAGE: UNCROWDED CREATIVE TYPOGRAPHY & ACTIONS ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="hero__copy-col"
          >
            {/* Animated Multi-Color Eyebrow Pill */}
            <div className="hero__eyebrow-pill">
              <span className="hero__eyebrow-glow" aria-hidden="true" />
              <span className="hero__eyebrow-icon">
                <Sparkles size={14} strokeWidth={2.3} />
              </span>
              <span className="hero__eyebrow-text">
                Next-Gen Software &amp; Digital Engineering
              </span>
            </div>

            {/* Monumental Uncrowded Display Headline with Fixed-Height Rotator (Zero Layout Shift) */}
            <h1 className="hero__headline">
              <span className="hero__headline-static">
                Elevate Everything With
              </span>
              <span className="hero__headline-rotator-slot">
                {/* Invisible static sizer locks exact 1-line height & width permanently */}
                <span className="hero__headline-sizer" aria-hidden="true">
                  Flutter Mobile Apps.
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingHeadlineWords[wordIndex]}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="hero__gradient-word"
                  >
                    {rotatingHeadlineWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Concise, Breathable Lead Paragraph */}
            <p className="hero__subtitle">
              We craft ultra-fast web applications, Flutter mobile apps, custom ERP
              software, and high-ROI digital growth engines for forward-thinking brands.
            </p>

            {/* Interactive Capability Selector Pills (Synced with Right 3D Stage) */}
            <div
              className="hero__practice-pills"
              role="tablist"
              aria-label="Preview Ultoxy Core Capabilities"
            >
              {heroShowcaseModules.map((mod, idx) => {
                const IconComp = mod.icon
                const isSelected = idx === activeModuleIndex
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`hero__practice-pill ${
                      isSelected ? 'hero__practice-pill--active' : ''
                    }`}
                    onClick={() => {
                      setActiveModuleIndex(idx)
                      setIsPaused(true)
                    }}
                    onMouseEnter={() => {
                      setActiveModuleIndex(idx)
                      setIsPaused(true)
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <IconComp size={15} strokeWidth={2.2} className="hero__practice-icon" />
                    <span className="hero__practice-label">{mod.shortLabel}</span>
                  </button>
                )
              })}
            </div>

            {/* Primary & Secondary CTA Cluster */}
            <div className="hero__cta-group">
              <Link to="/contact" className="hero__btn-primary">
                <span className="hero__btn-shimmer" aria-hidden="true" />
                <span>Start Your Project</span>
                <span className="hero__btn-icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </Link>

              <Link to="/projects" className="hero__btn-secondary">
                <span className="hero__btn-live-dot" aria-hidden="true" />
                <span>Explore 11+ Live Systems</span>
                <ArrowUpRight size={16} strokeWidth={2.2} className="hero__btn-sec-arrow" />
              </Link>
            </div>
          </motion.div>

          {/* ==================== RIGHT STAGE: INTERACTIVE 3D HOLOGRAPHIC COMMAND DECK ==================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="hero__visual-col"
            onMouseMove={handleStageMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleStageMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="hero__stage-3d"
            >
              {/* Animated Multi-Color Glowing Halo Behind Card */}
              <div className="hero__stage-halo" aria-hidden="true" />

              {/* Floating Orbit Badge 1 (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="hero__float-card hero__float-card--top"
              >
                <span className="hero__float-icon hero__float-icon--aurora">
                  <Zap size={16} strokeWidth={2.4} />
                </span>
                <div className="hero__float-copy">
                  <span className="hero__float-val">11+ Live Systems</span>
                  <span className="hero__float-lbl">Web, Mobile &amp; ERP</span>
                </div>
              </motion.div>

              {/* Main Interactive Holographic Glass Deck */}
              <div className="hero__deck">
                {/* Animated Multi-Color Flowing Border */}
                <div className="hero__deck-border-glow" aria-hidden="true" />

                {/* Top Window Bar */}
                <div className="hero__deck-topbar">
                  <div className="hero__deck-dots" aria-hidden="true">
                    <span className="hero__deck-dot hero__deck-dot--1" />
                    <span className="hero__deck-dot hero__deck-dot--2" />
                    <span className="hero__deck-dot hero__deck-dot--3" />
                  </div>
                  <div className="hero__deck-status">
                    <span className="hero__deck-status-pulse" />
                    <span>ULTOXY STUDIO ENGINE</span>
                  </div>
                  <div className="hero__deck-step">
                    0{activeModuleIndex + 1} / 0{heroShowcaseModules.length}
                  </div>
                </div>

                {/* Dynamic Animated Module Content */}
                <div className="hero__deck-body">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="hero__module-view"
                    >
                      {/* Module Header */}
                      <div className="hero__module-header">
                        <div className="hero__module-icon-box">
                          <ActiveIcon size={24} strokeWidth={2.2} />
                        </div>
                        <div className="hero__module-titles">
                          <h2 className="hero__module-title">{activeModule.title}</h2>
                          <p className="hero__module-sub">{activeModule.subtitle}</p>
                        </div>
                        <div className="hero__module-metric">
                          <span className="hero__module-metric-val gradient-text">
                            {activeModule.metricValue}
                          </span>
                          <span className="hero__module-metric-lbl">
                            {activeModule.metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Animated Multi-Color Telemetry Graph & Wave Visualizer */}
                      <div className="hero__visualizer">
                        <div className="hero__visualizer-grid" aria-hidden="true" />
                        <div className="hero__visualizer-bars">
                          {activeModule.bars.map((heightPct, barIdx) => (
                            <div key={barIdx} className="hero__bar-col">
                              <div className="hero__bar-track">
                                <motion.div
                                  initial={{ height: '15%' }}
                                  animate={{ height: `${heightPct}%` }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 220,
                                    damping: 20,
                                    delay: barIdx * 0.05,
                                  }}
                                  className="hero__bar-fill"
                                />
                              </div>
                              <span className="hero__bar-pct">{heightPct}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Animated SVG Multi-Color Wave Overlay */}
                        <svg
                          className="hero__wave-svg"
                          viewBox="0 0 400 90"
                          fill="none"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient
                              id="ultoxyHeroWaveGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#00c6ff" />
                              <stop offset="35%" stopColor="#2563eb" />
                              <stop offset="70%" stopColor="#7c3aed" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                            d="M 0 72 Q 55 45, 105 55 T 210 32 T 315 24 T 400 10"
                            stroke="url(#ultoxyHeroWaveGrad)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="hero__module-tags">
                        {activeModule.tags.map((tag) => (
                          <span key={tag} className="hero__module-tag">
                            <CheckCircle2 size={12} strokeWidth={2.4} className="hero__tag-check" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Verified Client Delivery Footer inside Deck */}
                      <div className="hero__module-footer">
                        <div className="hero__module-client">
                          <span className="hero__module-client-lbl">VERIFIED DELIVERY</span>
                          <span className="hero__module-client-name">
                            {activeModule.clientHighlight}
                          </span>
                        </div>
                        <Link
                          to={`/services?category=${activeModule.id}`}
                          className="hero__module-link"
                          aria-label={`Explore ${activeModule.title}`}
                        >
                          <span>Explore</span>
                          <ArrowUpRight size={14} strokeWidth={2.4} />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Indicator Dots */}
                <div className="hero__deck-dots-nav" role="tablist" aria-label="Slide selector">
                  {heroShowcaseModules.map((mod, idx) => (
                    <button
                      key={mod.id}
                      type="button"
                      aria-label={`Show ${mod.title}`}
                      className={`hero__deck-nav-dot ${
                        idx === activeModuleIndex ? 'hero__deck-nav-dot--active' : ''
                      }`}
                      onClick={() => setActiveModuleIndex(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Orbit Badge 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="hero__float-card hero__float-card--bottom"
              >
                <span className="hero__float-icon hero__float-icon--emerald">
                  <ShieldCheck size={16} strokeWidth={2.4} />
                </span>
                <div className="hero__float-copy">
                  <span className="hero__float-val">Pune, India • Global</span>
                  <span className="hero__float-lbl">Enterprise Quality Standard</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ==================== BOTTOM UNCROWDED METRICS RIBBON ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hero__metrics-bar"
        >
          {heroQuickStats.map((stat) => {
            const StatIcon = stat.icon
            return (
              <div key={stat.label} className="hero__metric-item">
                <div className="hero__metric-icon">
                  <StatIcon size={18} strokeWidth={2.1} />
                </div>
                <div className="hero__metric-info">
                  <span className="hero__metric-number gradient-text">{stat.value}</span>
                  <span className="hero__metric-text">{stat.label}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
