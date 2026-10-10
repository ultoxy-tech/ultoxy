import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Cpu,
  Megaphone,
  Search,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Layers,
  ShieldCheck,
  Zap,
  Rocket,
  BarChart3,
  Lock,
  Building2,
  GraduationCap,
  Truck,
  ShoppingBag,
  Briefcase,
  PhoneCall,
  Sliders,
  Compass,
  Terminal,
} from 'lucide-react'
import SEO from '../components/SEO'
import ServicesHeroCanvas from '../components/ServicesHeroCanvas'
import {
  seoConfig,
  serviceCategories,
  companyInfo,
} from '../data/companyData'
import './Services.css'

const SERVICE_ICONS = {
  web: Globe,
  mobile: Smartphone,
  software: Cpu,
  marketing: Megaphone,
  seo: Search,
}

const SERVICE_THEMES = [
  {
    accent: '#0284c7',
    secondary: '#2563eb',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
    glow: 'rgba(2, 132, 199, 0.22)',
    soft: 'rgba(2, 132, 199, 0.08)',
  },
  {
    accent: '#7c3aed',
    secondary: '#ec4899',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    glow: 'rgba(124, 58, 237, 0.22)',
    soft: 'rgba(124, 58, 237, 0.08)',
  },
  {
    accent: '#2563eb',
    secondary: '#7c3aed',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    glow: 'rgba(37, 99, 235, 0.22)',
    soft: 'rgba(37, 99, 235, 0.08)',
  },
  {
    accent: '#ec4899',
    secondary: '#f59e0b',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    glow: 'rgba(236, 72, 153, 0.22)',
    soft: 'rgba(236, 72, 153, 0.08)',
  },
  {
    accent: '#059669',
    secondary: '#0284c7',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
    glow: 'rgba(16, 185, 129, 0.22)',
    soft: 'rgba(16, 185, 129, 0.08)',
  },
]

/* Custom 3D Visual Blueprint Telemetry per Service */
const SERVICE_BLUEPRINTS = {
  'website-development': {
    mode: 'WEB ARCHITECTURE ENGINE',
    status: '99/100 CORE VITALS',
    layers: [
      { label: 'UI Layer', value: 'React 19 + Interactive Motion', pct: '100%' },
      { label: 'Backend Core', value: 'Django REST + Dynamic CMS', pct: '99%' },
      { label: 'Security & SEO', value: 'SSL + Semantic Schema', pct: '100%' },
    ],
    highlights: ['Sub-Second Load', 'Responsive 5-Tier UI', 'Custom Admin Portal'],
  },
  'mobile-app-development': {
    mode: 'FLUTTER NATIVE ENGINE',
    status: '60FPS IOS & ANDROID',
    layers: [
      { label: 'App Shell', value: 'Flutter Cross-Platform SDK', pct: '100%' },
      { label: 'Cloud Sync', value: 'Firebase + REST APIs', pct: '98%' },
      { label: 'Native UX', value: 'Biometric & Push Alerts', pct: '100%' },
    ],
    highlights: ['Single Codebase', 'Play Store & App Store', 'Offline-Ready Sync'],
  },
  'desktop-software-erp': {
    mode: 'ENTERPRISE ERP MATRIX',
    status: '+300% WORKFLOW ROI',
    layers: [
      { label: 'Core Modules', value: 'Billing, Ledger & Inventory', pct: '100%' },
      { label: 'Access Control', value: 'Multi-Role RBAC Security', pct: '100%' },
      { label: 'Data Engine', value: 'PostgreSQL + Live Reports', pct: '99%' },
    ],
    highlights: ['Automated Workflows', 'Real-Time Analytics', 'Cloud & Desktop'],
  },
  'digital-marketing': {
    mode: 'GROWTH & FUNNEL ENGINE',
    status: 'HIGH-INTENT ROI',
    layers: [
      { label: 'Paid Acquisition', value: 'Google Search & Meta Ads', pct: '96%' },
      { label: 'Brand Funnel', value: 'Social & Content Strategy', pct: '98%' },
      { label: 'Conversion CRO', value: 'Landing Page Optimization', pct: '95%' },
    ],
    highlights: ['Qualified Lead Flow', 'Multi-Channel Reach', 'Live ROI Tracking'],
  },
  'seo-optimization': {
    mode: 'ORGANIC SEARCH RADAR',
    status: 'PAGE-1 AUTHORITY',
    layers: [
      { label: 'Technical SEO', value: 'Core Vitals & Crawl Speed', pct: '100%' },
      { label: 'On-Page Schema', value: 'JSON-LD & Keyword Intent', pct: '99%' },
      { label: 'Local & Authority', value: 'Backlinks & Maps Ranking', pct: '97%' },
    ],
    highlights: ['100% Semantic HTML', 'Zero-Bloat Speed', 'Long-Term Traffic'],
  },
}

/* Interactive 3D Solution Configurator Tracks */
const SOLUTION_TRACKS = [
  {
    id: 'web-portal',
    title: 'Dynamic Web & E-Commerce',
    kicker: 'TRACK 01 • BRAND & COMMERCE',
    icon: Globe,
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
    accent: '#0284c7',
    summary:
      'Ideal for businesses launching a high-converting corporate portal, school website, or full e-commerce store.',
    nodes: [
      { stage: '01 FRONTEND', name: 'React / Next.js Glass UI', detail: '5-device fluid responsiveness' },
      { stage: '02 BACKEND', name: 'Django Dynamic CMS', detail: 'Instant content & product control' },
      { stage: '03 GROWTH', name: 'Technical SEO + Analytics', detail: 'Built-in schema & fast indexing' },
    ],
    deliverable: 'Production-Ready Web Platform',
    serviceSlug: 'website-development',
  },
  {
    id: 'mobile-ecosystem',
    title: 'iOS & Android Mobile App',
    kicker: 'TRACK 02 • MOBILE ECOSYSTEM',
    icon: Smartphone,
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    accent: '#7c3aed',
    summary:
      'Engineered with Flutter for silky 60fps performance across both Apple iOS and Google Android from a single codebase.',
    nodes: [
      { stage: '01 APP UI', name: 'Flutter Native Interface', detail: 'Custom gestures & smooth motion' },
      { stage: '02 CLOUD API', name: 'REST APIs & Firebase', detail: 'Realtime sync & push notifications' },
      { stage: '03 LAUNCH', name: 'Store Deployment & Care', detail: 'Play Store + App Store publishing' },
    ],
    deliverable: 'Dual-Platform Mobile Application',
    serviceSlug: 'mobile-app-development',
  },
  {
    id: 'enterprise-erp',
    title: 'Custom Enterprise ERP',
    kicker: 'TRACK 03 • OPERATIONS AUTOMATION',
    icon: Cpu,
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    accent: '#2563eb',
    summary:
      'Tailor-made ERP software for real estate plots, transport dispatch, educational institutes, and finance.',
    nodes: [
      { stage: '01 WORKFLOW', name: 'Role-Based Dashboards', detail: 'Admin, staff & client portals' },
      { stage: '02 CORE ENGINE', name: 'Automated Ledger & Billing', detail: 'Invoices, bookings & reporting' },
      { stage: '03 DATABASE', name: 'Encrypted Cloud SQL', detail: 'Automated backups & audit logs' },
    ],
    deliverable: 'End-to-End Custom ERP System',
    serviceSlug: 'desktop-software-erp',
  },
  {
    id: 'digital-growth',
    title: 'SEO & Digital Growth',
    kicker: 'TRACK 04 • TRAFFIC & REVENUE',
    icon: TrendingIcon,
    gradient: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
    accent: '#059669',
    summary:
      'Data-driven Google Ads, social media campaigns, and technical SEO audits that turn searches into qualified leads.',
    nodes: [
      { stage: '01 AUDIT', name: 'Technical & Keyword Radar', detail: 'Competitor & Core Vitals analysis' },
      { stage: '02 CAMPAIGNS', name: 'Targeted Paid & Organic', detail: 'Google Ads, Meta & On-Page SEO' },
      { stage: '03 CONVERSION', name: 'Lead Funnel Optimization', detail: 'Measurable ROI & ranking growth' },
    ],
    deliverable: 'Sustained Search & Lead Pipeline',
    serviceSlug: 'seo-optimization',
  },
]

function TrendingIcon(props) {
  return <BarChart3 {...props} />
}

/* Industry Verticals Powered by Ultoxy */
const INDUSTRY_VERTICALS = [
  {
    id: 'real-estate',
    icon: Building2,
    title: 'Real Estate & Developers',
    proof: 'Sai Land Developers Web & ERP',
    desc: 'Interactive plot booking portals, customer ledger ERPs, and installment automation.',
    accent: '#0284c7',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & EdTech',
    proof: 'Saint Monica, IMS ERP & ExamTrax',
    desc: 'School portals, institute management ERPs, and automated online examination engines.',
    accent: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Transport & Fleet Logistics',
    proof: 'Patel Transport ERP',
    desc: 'Consignment booking, fleet dispatch tracking, and automated transport billing software.',
    accent: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-Commerce & Events',
    proof: 'GYA E-Commerce Platform',
    desc: 'High-volume event ticketing, member registration, and seamless checkout platforms.',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'FinTech & Industrial B2B',
    proof: 'Money Trust & Dynaxcel',
    desc: 'High-trust financial portals, manufacturing catalogs, and B2B lead capture systems.',
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
  },
]

const HERO_DOMAINS = [
  {
    code: '01',
    shortLabel: 'WEB',
    title: 'Web & Cloud Platforms',
    topologyName: 'GEODESIC LATTICE',
    color: '#00FFC6',
    slug: 'website-development',
  },
  {
    code: '02',
    shortLabel: 'APPS',
    title: 'iOS & Android Ecosystems',
    topologyName: 'KINETIC TWIN-HELIX',
    color: '#006CFF',
    slug: 'mobile-app-development',
  },
  {
    code: '03',
    shortLabel: 'ERP',
    title: 'Custom ERP & Automation',
    topologyName: '4D TESSERACT CORE',
    color: '#00FFC6',
    slug: 'desktop-software-erp',
  },
  {
    code: '04',
    shortLabel: 'GROWTH',
    title: 'Digital Growth & Funnels',
    topologyName: 'VECTOR WAVEFIELD',
    color: '#FF6EC7',
    slug: 'digital-marketing',
  },
  {
    code: '05',
    shortLabel: 'SEO',
    title: 'Technical SEO Authority',
    topologyName: 'ASTROLABE RADAR',
    color: '#00FFC6',
    slug: 'seo-optimization',
  },
]

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

export default function Services() {
  const [searchParams] = useSearchParams()
  const categorySlug = searchParams.get('category')

  /* Active 3D Computational Topology in Hero (0..4) */
  const [heroServiceIdx, setHeroServiceIdx] = useState(() => {
    if (!categorySlug) return 0
    const idx = serviceCategories.findIndex((s) => s.slug === categorySlug)
    return idx !== -1 ? idx : 0
  })

  /* Active track in Section 3 (3D Solution Configurator) */
  const [activeTrackIdx, setActiveTrackIdx] = useState(0)

  /* Sync URL ?category=slug to highlight & scroll to that service */
  useEffect(() => {
    if (!categorySlug) return undefined
    const matchIdx = serviceCategories.findIndex((s) => s.slug === categorySlug)
    if (matchIdx === -1) return undefined
    const timer = setTimeout(() => {
      setHeroServiceIdx(matchIdx)
      const el = document.getElementById(`service-${categorySlug}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 180)
    return () => clearTimeout(timer)
  }, [categorySlug])

  /* Auto-evolve the 3D computational topology unless the visitor is interacting with the rail */
  const [isHeroPaused, setIsHeroPaused] = useState(false)
  useEffect(() => {
    if (isHeroPaused) return undefined
    const timer = setInterval(() => {
      setHeroServiceIdx((prev) => (prev + 1) % HERO_DOMAINS.length)
    }, 5400)
    return () => clearInterval(timer)
  }, [isHeroPaused])

  const scrollToServiceCard = (slug, idx) => {
    setHeroServiceIdx(idx)
    const el = document.getElementById(`service-${slug}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const activeDomain = HERO_DOMAINS[heroServiceIdx] || HERO_DOMAINS[0]
  const currentTrack = SOLUTION_TRACKS[activeTrackIdx]

  return (
    <div className="ultoxy-services-page">
      <SEO
        title={seoConfig.pages.services.title}
        description={seoConfig.pages.services.description}
      />

      {/* Ambient Blurry Aurora Background Canvas (for lower sections) */}
      <div className="srv-ambient-canvas" aria-hidden="true">
        <div className="srv-blur-orb srv-orb-cyan" />
        <div className="srv-blur-orb srv-orb-violet" />
        <div className="srv-blur-orb srv-orb-rose" />
        <div className="srv-perspective-grid" />
      </div>

      {/* ===================================================================
          SECTION 1: THE ARCHITECTURAL NEXUS — LIVE 3D COMPUTATIONAL STAGE
          =================================================================== */}
      <section
        className="srv-nexus-hero"
        id="services-hero"
        style={{
          '--nexus-active-color': activeDomain.color,
        }}
      >
        {/* Architectural Hairline Grid & Vignette */}
        <div className="srv-nexus-backdrop" aria-hidden="true">
          <div className="srv-nexus-grid-lines" />
          <div className="srv-nexus-vignette" />
        </div>

        {/* Live Interactive 3D Morphing Computational Canvas */}
        <div className="srv-nexus-canvas-stage">
          <ServicesHeroCanvas activeMode={heroServiceIdx} />
        </div>

        {/* Center-Stage Monumental Typography & Actions */}
        <div className="container srv-nexus-stage-container">
          <motion.div
            className="srv-nexus-centerpiece"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          >
            <h1 className="srv-nexus-headline">
              <span className="srv-nexus-headline-top">WE ENGINEER</span>
              <span className="srv-nexus-headline-accent">WHAT’S NEXT.</span>
            </h1>

            <p className="srv-nexus-subline">
              Web. Apps. Software. Engineered for what comes next.
            </p>

            <div className="srv-nexus-cta-group">
              <Link to="/contact" className="srv-nexus-cta-primary">
                <span>Start a Project</span>
                <ArrowUpRight size={17} />
              </Link>
              <a href="#practice-deck" className="srv-nexus-cta-secondary">
                <span>Explore Capabilities</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Bottom Horizon: Interactive 5-Node Spatial Coordinate Rail */}
          <motion.div
            className="srv-nexus-horizon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: EASE_OUT_EXPO }}
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
          >
            {/* Minimal Live Active Domain Telemetry Line */}
            <div className="srv-nexus-telemetry-bar">
              <AnimatePresence mode="wait">
                <motion.button
                  key={activeDomain.slug}
                  type="button"
                  className="srv-nexus-telemetry-trigger"
                  onClick={() =>
                    scrollToServiceCard(activeDomain.slug, heroServiceIdx)
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                >
                  <span className="srv-nexus-telemetry-dot" />
                  <span className="srv-nexus-telemetry-code">
                    {activeDomain.code} // {activeDomain.topologyName}
                  </span>
                  <span className="srv-nexus-telemetry-sep">—</span>
                  <span className="srv-nexus-telemetry-title">
                    {activeDomain.title}
                  </span>
                  <span className="srv-nexus-telemetry-jump">
                    Inspect <ArrowUpRight size={13} />
                  </span>
                </motion.button>
              </AnimatePresence>
            </div>

            {/* 5-Node Interactive Coordinate Axis */}
            <div
              className="srv-nexus-axis"
              role="tablist"
              aria-label="Core Engineering Domains"
            >
              <div className="srv-nexus-axis-line" aria-hidden="true" />
              {HERO_DOMAINS.map((domain, idx) => {
                const isSelected = idx === heroServiceIdx
                return (
                  <button
                    key={domain.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`srv-nexus-node ${isSelected ? 'is-active' : ''}`}
                    style={{ '--node-color': domain.color }}
                    onMouseEnter={() => setHeroServiceIdx(idx)}
                    onFocus={() => setHeroServiceIdx(idx)}
                    onClick={() => scrollToServiceCard(domain.slug, idx)}
                  >
                    <span className="srv-nexus-node-marker">
                      <span className="srv-nexus-node-core" />
                      {isSelected && (
                        <motion.span
                          layoutId="nexusNodeHalo"
                          className="srv-nexus-node-halo"
                          transition={{
                            type: 'spring',
                            stiffness: 320,
                            damping: 28,
                          }}
                        />
                      )}
                    </span>
                    <span className="srv-nexus-node-code">{domain.code}</span>
                    <span className="srv-nexus-node-label">
                      {domain.shortLabel}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: 3D SCROLL-DRIVEN PRACTICE DECK (5 FLAGSHIP SERVICES)
          =================================================================== */}
      <section className="srv-deck-sec" id="practice-deck">
        <div className="container">
          <motion.div
            className="srv-sec-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="srv-eyebrow-pill">
              <Layers size={14} className="srv-eyebrow-icon" />
              <span>3D SPATIAL CAPABILITY DECK • END-TO-END DELIVERY</span>
            </div>
            <h2 className="srv-sec-title">
              Five Specialized Practices.{' '}
              <span className="gradient-text">Zero Compromise.</span>
            </h2>
            <p className="srv-sec-subtitle">
              Each practice is engineered with dedicated architecture, clean
              code, and measurable business outcomes.
            </p>
          </motion.div>

          <div className="srv-3d-deck-list">
            {serviceCategories.map((srv, idx) => {
              const IconComp = SERVICE_ICONS[srv.iconType] || Globe
              const theme = SERVICE_THEMES[idx % SERVICE_THEMES.length]
              const blueprint =
                SERVICE_BLUEPRINTS[srv.slug] ||
                SERVICE_BLUEPRINTS['website-development']
              const isReversed = idx % 2 === 1

              return (
                <motion.article
                  key={srv.id}
                  id={`service-${srv.slug}`}
                  className={`srv-3d-showcase-card ${
                    isReversed ? 'is-reversed' : ''
                  }`}
                  style={{
                    '--card-accent': theme.accent,
                    '--card-gradient': theme.gradient,
                    '--card-soft': theme.soft,
                    '--card-glow': theme.glow,
                  }}
                  initial={{
                    opacity: 0,
                    y: 44,
                    rotateX: 8,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.18, margin: '-40px' }}
                  transition={{ duration: 0.68, ease: EASE_OUT_EXPO }}
                >
                  {/* Left / Primary Dossier Column */}
                  <div className="srv-card-dossier">
                    <div className="srv-card-top-meta">
                      <span className="srv-card-number">{srv.number}</span>
                      <span className="srv-card-badge">{srv.badge}</span>
                      <span className="srv-card-metric">
                        {srv.metrics.value} • {srv.metrics.label}
                      </span>
                    </div>

                    <div className="srv-card-heading-row">
                      <div className="srv-card-icon-box">
                        <IconComp size={24} />
                      </div>
                      <h3 className="srv-card-title">{srv.title}</h3>
                    </div>

                    <p className="srv-card-desc">{srv.description}</p>

                    {/* 2x2 Crisp Deliverables Grid */}
                    <div className="srv-card-deliverables">
                      {srv.deliverables.map((item) => (
                        <div key={item} className="srv-deliverable-pill">
                          <CheckCircle2
                            size={15}
                            className="srv-deliverable-icon"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="srv-card-footer">
                      <div className="srv-card-tech-tags">
                        {srv.techTags.map((tag) => (
                          <span key={tag} className="srv-tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/contact?service=${srv.slug}`}
                        className="srv-card-cta"
                      >
                        <span>Start {srv.shortTitle}</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Right / 3D Architectural Blueprint Stage */}
                  <div className="srv-card-blueprint-stage">
                    <div className="blueprint-3d-frame">
                      <div className="blueprint-frame-header">
                        <span className="blueprint-code-tag">
                          <Terminal size={13} /> {blueprint.mode}
                        </span>
                        <span className="blueprint-live-dot" />
                      </div>

                      {/* 3D Floating Architecture Stack */}
                      <div className="blueprint-3d-layers">
                        {blueprint.layers.map((layer, lIdx) => (
                          <div
                            key={layer.label}
                            className="blueprint-3d-plate"
                            style={{
                              '--plate-index': lIdx,
                            }}
                          >
                            <span className="plate-step">0{lIdx + 1}</span>
                            <div className="plate-info">
                              <strong>{layer.label}</strong>
                              <span>{layer.value}</span>
                            </div>
                            <span className="plate-pct">{layer.pct}</span>
                          </div>
                        ))}
                      </div>

                      {/* Verified Production Case Study Footer */}
                      <div className="blueprint-case-box">
                        <span className="blueprint-case-kicker">
                          PRODUCTION BENCHMARK
                        </span>
                        <strong className="blueprint-case-client">
                          {srv.caseStudy.client}
                        </strong>
                        <span className="blueprint-case-result">
                          {srv.caseStudy.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: INTERACTIVE 3D SOLUTION ARCHITECTURE CONFIGURATOR
          =================================================================== */}
      <section className="srv-configurator-sec" id="solution-blueprint">
        <div className="container">
          <motion.div
            className="srv-sec-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="srv-eyebrow-pill">
              <Sliders size={14} className="srv-eyebrow-icon" />
              <span>INTERACTIVE ARCHITECTURE MATRIX • CUSTOM STACKS</span>
            </div>
            <h2 className="srv-sec-title">
              Select Your Goal.{' '}
              <span className="gradient-text">Inspect The Blueprint.</span>
            </h2>
            <p className="srv-sec-subtitle">
              Choose your business objective below to preview how our
              engineering team structures your solution.
            </p>
          </motion.div>

          <motion.div
            className="srv-configurator-shell"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            style={{
              '--cfg-accent': currentTrack.accent,
              '--cfg-gradient': currentTrack.gradient,
            }}
          >
            {/* Top Track Selector Tabs */}
            <div className="cfg-tabs-row" role="tablist">
              {SOLUTION_TRACKS.map((track, idx) => {
                const TrackIcon = track.icon
                const isSelected = idx === activeTrackIdx
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`cfg-tab-btn ${isSelected ? 'active' : ''}`}
                    style={{
                      '--tab-accent': track.accent,
                      '--tab-gradient': track.gradient,
                    }}
                    onClick={() => setActiveTrackIdx(idx)}
                  >
                    <span className="cfg-tab-icon">
                      <TrackIcon size={18} />
                    </span>
                    <span className="cfg-tab-title">{track.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Dynamic 3-Stage 3D Pipeline Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                className="cfg-stage-body"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.34, ease: EASE_OUT_EXPO }}
              >
                <div className="cfg-stage-intro">
                  <div>
                    <span className="cfg-kicker">{currentTrack.kicker}</span>
                    <h3 className="cfg-title">{currentTrack.title}</h3>
                    <p className="cfg-summary">{currentTrack.summary}</p>
                  </div>

                  <div className="cfg-deliverable-badge">
                    <span>TARGET OUTPUT</span>
                    <strong>{currentTrack.deliverable}</strong>
                  </div>
                </div>

                {/* 3D Connected Architecture Nodes */}
                <div className="cfg-pipeline-grid">
                  {currentTrack.nodes.map((node, nIdx) => (
                    <div key={node.stage} className="cfg-node-card">
                      <div className="cfg-node-top">
                        <span className="cfg-node-stage">{node.stage}</span>
                        <span className="cfg-node-num">0{nIdx + 1}</span>
                      </div>
                      <h4 className="cfg-node-name">{node.name}</h4>
                      <p className="cfg-node-detail">{node.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="cfg-stage-footer">
                  <div className="cfg-guarantees">
                    <span>
                      <ShieldCheck size={15} /> 100% Custom Source Code
                    </span>
                    <span>
                      <Zap size={15} /> Agile Weekly Sprints
                    </span>
                    <span>
                      <Lock size={15} /> Enterprise Cloud Security
                    </span>
                  </div>

                  <Link
                    to={`/contact?service=${currentTrack.serviceSlug}`}
                    className="cfg-launch-btn"
                  >
                    <span>Request This Architecture</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: 3D PERSPECTIVE INDUSTRY ECOSYSTEMS
          =================================================================== */}
      <section className="srv-industries-sec" id="industries-served">
        <div className="container">
          <motion.div
            className="srv-sec-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="srv-eyebrow-pill">
              <Compass size={14} className="srv-eyebrow-icon" />
              <span>DOMAIN EXPERTISE • PROVEN ACROSS INDUSTRIES</span>
            </div>
            <h2 className="srv-sec-title">
              Tailored Software For{' '}
              <span className="gradient-text">Every High-Growth Sector</span>
            </h2>
            <p className="srv-sec-subtitle">
              Backed by 11+ live production deployments across Maharashtra and
              beyond.
            </p>
          </motion.div>

          <div className="srv-industries-grid">
            {INDUSTRY_VERTICALS.map((ind, idx) => {
              const IndIcon = ind.icon
              return (
                <motion.div
                  key={ind.id}
                  className="srv-industry-3d-card"
                  style={{
                    '--ind-accent': ind.accent,
                    '--ind-gradient': ind.gradient,
                  }}
                  initial={{ opacity: 0, y: 30, rotateY: -6 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.07,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <div className="ind-card-top">
                    <div className="ind-icon-badge">
                      <IndIcon size={21} />
                    </div>
                    <span className="ind-num">0{idx + 1}</span>
                  </div>

                  <h3 className="ind-title">{ind.title}</h3>
                  <p className="ind-desc">{ind.desc}</p>

                  <div className="ind-proof-pill">
                    <CheckCircle2 size={13} />
                    <span>{ind.proof}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: ROYAL EXECUTIVE LAUNCHPAD CTA
          =================================================================== */}
      <section className="srv-cta-sec" id="services-cta">
        <div className="container">
          <motion.div
            className="srv-royal-launchpad"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="srv-cta-glow srv-cta-glow-1" aria-hidden="true" />
            <div className="srv-cta-glow srv-cta-glow-2" aria-hidden="true" />

            <div className="srv-cta-content">
              <div className="srv-eyebrow-pill">
                <Rocket size={14} className="srv-eyebrow-icon" />
                <span>READY TO ELEVATE EVERYTHING WITH ULTOXY?</span>
              </div>

              <h2 className="srv-cta-title">
                Let’s Architect Your Next{' '}
                <span className="gradient-text">Flagship Digital Product</span>
              </h2>

              <p className="srv-cta-desc">
                Connect directly with our Pune engineering leadership for a
                custom roadmap, transparent pricing, and rapid delivery.
              </p>

              <div className="srv-cta-actions">
                <Link to="/contact" className="srv-btn-primary">
                  <span>Book Free Technical Consultation</span>
                  <ArrowUpRight size={18} />
                </Link>
                <a
                  href={`tel:${companyInfo.contact.phones[0].raw}`}
                  className="srv-btn-secondary"
                >
                  <PhoneCall size={16} />
                  <span>Call {companyInfo.contact.phones[0].number}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
