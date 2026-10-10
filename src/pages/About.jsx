import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Compass,
  ShieldCheck,
  Code2,
  Gauge,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Lock,
  Layers,
  Cpu,
  Zap,
  Users,
  Target,
  Eye,
  Heart,
  Award,
  TrendingUp,
  Terminal,
  GitBranch,
  Laptop,
  Smartphone,
  Database,
  Server,
  Globe,
  Mail,
  PhoneCall,
  Clock,
  Play,
  Check,
} from 'lucide-react'
import SEO from '../components/SEO'
import { seoConfig, companyInfo } from '../data/companyData'
import './About.css'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

// Safe asset resolution for GitHub Pages subpath and local development
const resolveAsset = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}

// 4 Signature Core Values
const ABOUT_VALUES = [
  {
    num: '01',
    theme: 'mint',
    accentColor: '#00ffc6',
    icon: Code2,
    badge: '100% IP HANDOVER',
    metric: 'ZERO VENDOR LOCK-IN',
    title: 'Architectural Mastery',
    desc: 'Self-documenting, clean codebases engineered with strict linting, typed schemas, and modular component hierarchy. Complete source code and Git repository handover on day one.',
    highlights: [
      'Modular React 19 & Django REST Engines',
      'Zero Vendor Lock-In & Open Source Integrity',
      'Comprehensive Technical Architecture Documentation',
    ],
  },
  {
    num: '02',
    theme: 'blue',
    accentColor: '#006cff',
    icon: Gauge,
    badge: '99/100 CORE WEB VITALS',
    metric: '< 0.8s GLOBAL CONTENT SPEED',
    title: 'Velocity Obsession',
    desc: 'We treat performance as a foundational feature, not an afterthought. Every interaction is GPU hardware-accelerated with dynamic code-splitting and global CDN caching.',
    highlights: [
      '60FPS Fluid UI & Layout Transitions',
      'Dynamic Tree-Shaking & WebP/AVIF Optimization',
      'Sub-Second First Contentful Paint (<0.8s)',
    ],
  },
  {
    num: '03',
    theme: 'purple',
    accentColor: '#8b5cf6',
    icon: ShieldCheck,
    badge: 'BANK-GRADE TLS 1.3',
    metric: 'OWASP TOP 10 SANITIZED',
    title: 'Ironclad Security',
    desc: 'Enterprise multi-tier defensive architecture featuring granular role-based access control (RBAC), parameterized SQL inputs, and automated multi-zone cloud snapshots.',
    highlights: [
      'Granular Role-Based Permissions (RBAC)',
      'Automated Encrypted Cloud Snapshots',
      'Strict OWASP Top 10 Security Protocol',
    ],
  },
  {
    num: '04',
    theme: 'pink',
    accentColor: '#ff6ec7',
    icon: Activity,
    badge: '99.98% UPTIME SLA',
    metric: '24/7 PROACTIVE TELEMETRY',
    title: 'Radical Partnership',
    desc: 'We don’t just deploy and disappear. We function as technical co-founders, providing real-time production telemetry, continuous security patches, and agile monthly sprint extensions.',
    highlights: [
      'Direct Architect-to-Client Communication',
      'Real-Time Error Telemetry & Instant Alerts',
      'Agile Rapid-Response Feature Sprints',
    ],
  },
]

// Evolutionary Timeline Milestones
const TIMELINE_MILESTONES = [
  {
    phase: 'PHASE 01',
    year: '2024',
    title: 'The Genesis in Pune',
    badge: 'FOUNDING ERA',
    theme: 'mint',
    desc: 'Ultoxy Technologies was established in Pune, India, driven by a mission to bridge the gap between creative visual design and rock-solid enterprise backend engineering.',
    deliverables: ['Custom Dynamic Websites', 'Responsive UI/UX Engineering', 'SEO & Organic Growth Systems'],
  },
  {
    phase: 'PHASE 02',
    year: '2024 - 2025',
    title: 'Enterprise ERP & Fleet Dispatch',
    badge: 'ENTERPRISE EXPANSION',
    theme: 'blue',
    desc: 'Scaled into mission-critical business automation with the custom Sai Land Developers ERP and Patel Transport Fleet Logistics dispatch platform.',
    deliverables: ['Custom Land Plot Finance ERP', 'Fleet Consignment Logistics', 'Automated GST Billing Engine'],
  },
  {
    phase: 'PHASE 03',
    year: '2025',
    title: 'UltraCoachMatrix Flagship SaaS',
    badge: 'FLAGSHIP PRODUCT',
    theme: 'purple',
    desc: 'Engineered our comprehensive coaching and academic management SaaS platform featuring real-time biometric sync, automated fees ledgers, and Google Flutter mobile apps.',
    deliverables: ['Dual Flutter iOS & Android Apps', 'Hardware Biometric Synchronization', 'Instant Parent Alert Engine'],
  },
  {
    phase: 'PHASE 04',
    year: '2025 - 2026',
    title: 'Industrial & Global Commerce',
    badge: 'GLOBAL PRODUCTION',
    theme: 'pink',
    desc: 'Expanded into international machinery showcases for Kärcher Industrial Equipment, precision engineering for Dynaxcel, and high-trust FinTech platforms for Money Trust.',
    deliverables: ['Industrial Equipment Showcase', 'High-Trust FinTech Calculators', '13+ Live Production Deployments'],
  },
  {
    phase: 'PHASE 05',
    year: '2026 & BEYOND',
    title: 'The Next Spatial Horizon',
    badge: 'NEXT-GEN ROADMAP',
    theme: 'mint',
    desc: 'Pioneering generative spatial web interfaces, edge-computed APIs, autonomous microservices, and AI-accelerated business workflows.',
    deliverables: ['Spatial 3D Digital Galleries', 'Sub-Second Edge Computing', 'Autonomous AI Workflow Hubs'],
  },
]

// Technical Weaponry / Living Laboratory
const TECH_WEAPONRY = [
  { name: 'React 19', category: 'frontend', role: 'Reactive Virtual DOM UI', level: 'Core' },
  { name: 'Django REST', category: 'backend', role: 'Enterprise Python API Engine', level: 'Core' },
  { name: 'Google Flutter', category: 'mobile', role: '60FPS Cross-Platform Apps', level: 'Core' },
  { name: 'PostgreSQL', category: 'database', role: 'ACID Relational Cloud DB', level: 'Core' },
  { name: 'Framer Motion', category: 'frontend', role: 'Hardware-Accelerated 3D Motion', level: 'Specialty' },
  { name: 'Python (3.12+)', category: 'backend', role: 'Data Automation & ERP Logic', level: 'Core' },
  { name: 'Docker & Compose', category: 'cloud', role: 'Containerized Microservices', level: 'DevOps' },
  { name: 'Redis Cache', category: 'database', role: 'Sub-Millisecond In-Memory Store', level: 'High-Velocity' },
  { name: 'Vite 8 & ES6+', category: 'frontend', role: 'Instant Lightning Build Engine', level: 'Core' },
  { name: 'Tailwind & Modern CSS', category: 'frontend', role: 'Fluid Responsive Architecture', level: 'Core' },
  { name: 'Nginx & TLS 1.3', category: 'cloud', role: 'Edge Reverse Proxy & Security', level: 'Infrastructure' },
  { name: 'GitHub CI/CD', category: 'cloud', role: 'Automated Build & Deployment', level: 'DevOps' },
]

export default function About() {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState('mission') // 'mission' | 'vision' | 'philosophy'
  const [activeTechFilter, setActiveTechFilter] = useState('all')

  // Mouse Parallax for Hero Console
  const heroConsoleRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleConsoleMouseMove = (e) => {
    if (!heroConsoleRef.current) return
    const rect = heroConsoleRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({
      x: Math.max(-0.5, Math.min(0.5, xPct)),
      y: Math.max(-0.5, Math.min(0.5, yPct)),
    })
  }

  const handleConsoleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  // Filtered Tech Items
  const filteredTech = TECH_WEAPONRY.filter(
    (item) => activeTechFilter === 'all' || item.category === activeTechFilter
  )

  return (
    <div className="ultoxy-about-page">
      <SEO
        title={seoConfig.pages.about.title}
        description={seoConfig.pages.about.description}
      />

      {/* ===================================================================
          HERO SECTION: THE DIGITAL ENGINEERING MANIFESTO (WHITE THEME)
          =================================================================== */}
      <section className="abt-hero-section" id="about-hero">
        {/* Ambient atmospheric colored light canvas */}
        <div className="abt-hero-ambient-bg" aria-hidden="true">
          <div className="abt-dot-matrix" />
          <div className="abt-ambient-orb abt-orb-mint" />
          <div className="abt-ambient-orb abt-orb-blue" />
          <div className="abt-ambient-orb abt-orb-purple" />
          <div className="abt-ambient-orb abt-orb-pink" />
        </div>

        <div className="container abt-hero-container">
          {/* Eyebrow Pill */}
          <motion.div
            className="abt-eyebrow-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-eyebrow-pill">
              <span className="abt-beacon-dot" />
              <span>ABOUT ULTOXY TECHNOLOGIES</span>
              <span className="abt-eyebrow-sep">/</span>
              <span className="abt-eyebrow-meta">PUNE, INDIA • GLOBAL PRODUCTION</span>
            </div>
          </motion.div>

          {/* Monumental Editorial Headline */}
          <motion.div
            className="abt-headline-group"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
          >
            <h1 className="abt-headline">
              WE DON’T JUST BUILD CODE.{' '}
              <span className="abt-headline-gradient">WE ARCHITECT DIGITAL EMPIRES.</span>
            </h1>
            <p className="abt-subtitle">
              At Ultoxy Technologies, we are more than just an IT company — we are
              innovators, systems architects, and co-founders in your digital journey.
              From high-throughput web applications and Flutter mobile experiences to custom
              enterprise ERPs and algorithmic growth, we engineer software that propels
              businesses forward.
            </p>

            <div className="abt-cta-row">
              <Link to="/services" className="abt-btn-primary">
                <span>Explore Our Capabilities</span>
                <ArrowUpRight size={17} />
              </Link>
              <a href="#philosophy" className="abt-btn-secondary">
                <span>Our Engineering DNA</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Quick Metrics Ribbon */}
          <motion.div
            className="abt-metrics-ribbon"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-metric-box">
              <span className="abt-metric-number">13+</span>
              <span className="abt-metric-caption">Live Production Deployments</span>
            </div>
            <div className="abt-metric-divider" />
            <div className="abt-metric-box">
              <span className="abt-metric-number">99.98%</span>
              <span className="abt-metric-caption">High-Availability Uptime SLA</span>
            </div>
            <div className="abt-metric-divider" />
            <div className="abt-metric-box">
              <span className="abt-metric-number">100%</span>
              <span className="abt-metric-caption">IP & Source Code Ownership Handover</span>
            </div>
            <div className="abt-metric-divider" />
            <div className="abt-metric-box">
              <span className="abt-metric-number">&lt; 0.8s</span>
              <span className="abt-metric-caption">Global Content Velocity Benchmarks</span>
            </div>
          </motion.div>

          {/* Interactive 3D Spatial Holographic Console */}
          <motion.div
            ref={heroConsoleRef}
            className="abt-spatial-stage"
            onMouseMove={handleConsoleMouseMove}
            onMouseLeave={handleConsoleMouseLeave}
            initial={{ opacity: 0, scale: 0.95, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE_OUT_EXPO }}
          >
            {/* Ambient Telemetry HUD */}
            <div className="abt-console-hud" aria-hidden="true">
              <span className="abt-hud-chip">
                <span className="abt-hud-pulse" />
                STUDIO STATUS // ACTIVE 60FPS
              </span>
              <span className="abt-hud-chip">LATENCY: 12MS // PUNE CLUSTER</span>
              <span className="abt-hud-chip">TECH: REACT 19 • DJANGO REST • FLUTTER</span>
            </div>

            <div
              className="abt-console-card"
              style={{
                transform: `rotateX(${-mousePos.y * 6}deg) rotateY(${
                  mousePos.x * 8
                }deg) translateZ(10px)`,
              }}
            >
              {/* Window Chrome Header */}
              <div className="abt-window-chrome">
                <div className="abt-chrome-dots">
                  <span className="abt-chrome-dot dot-red" />
                  <span className="abt-chrome-dot dot-yellow" />
                  <span className="abt-chrome-dot dot-green" />
                </div>
                <span className="abt-chrome-address-bar">
                  <Lock size={11} /> ultoxy.com/engineering-manifesto
                </span>
                <span className="abt-chrome-tag">PROD // VERIFIED</span>
              </div>

              {/* Console Media Window */}
              <div className="abt-console-media-wrap">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="abt-console-video"
                  poster={resolveAsset('about/about-hero.png')}
                >
                  <source src={resolveAsset('videos/about_intro.mp4')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="abt-console-glass-sheen" />
                <div className="abt-console-scanline" />

                <div className="abt-console-floating-tag">
                  <Sparkles size={13} style={{ color: '#00ffc6' }} />
                  <span>Innovating the Future of Business</span>
                </div>
              </div>

              {/* Console Bottom Dossier Bar */}
              <div className="abt-console-footer">
                <div className="abt-console-footer-left">
                  <span className="abt-footer-kicker">CORE COMMITMENT</span>
                  <h3 className="abt-footer-title">
                    Digital Excellence Engineered with Human Purpose
                  </h3>
                </div>
                <div className="abt-console-footer-chips">
                  <span className="abt-chip-pill">Custom ERP</span>
                  <span className="abt-chip-pill">Flutter Apps</span>
                  <span className="abt-chip-pill">Web Portals</span>
                  <span className="abt-chip-pill">SEO &amp; Growth</span>
                </div>
              </div>
            </div>

            {/* Orbiting Satellite Badges */}
            <div className="abt-orbit-badge badge-top-left" aria-hidden="true">
              <Code2 size={15} style={{ color: '#00ffc6' }} />
              <span>Full-Stack Scalability</span>
            </div>
            <div className="abt-orbit-badge badge-top-right" aria-hidden="true">
              <Smartphone size={15} style={{ color: '#006cff' }} />
              <span>Native Flutter 60FPS</span>
            </div>
            <div className="abt-orbit-badge badge-bottom-left" aria-hidden="true">
              <ShieldCheck size={15} style={{ color: '#8b5cf6' }} />
              <span>OWASP Top 10 Secured</span>
            </div>
            <div className="abt-orbit-badge badge-bottom-right" aria-hidden="true">
              <Zap size={15} style={{ color: '#ff6ec7' }} />
              <span>Sub-Second Response</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: THE ORIGIN & DIGITAL PHILOSOPHY (INTERACTIVE DOSSIER)
          =================================================================== */}
      <section className="abt-philosophy-section" id="philosophy">
        <div className="container">
          <div className="row align-items-center abt-philosophy-row">
            {/* Left Column: Interactive Dossier Tabs */}
            <div className="col-lg-6">
              <div className="abt-philosophy-content">
                <div className="abt-eyebrow-pill" style={{ marginBottom: '1rem' }}>
                  <Compass size={13} style={{ color: '#006cff' }} />
                  <span>THE ULTOXY MANIFESTO // CORE PHILOSOPHY</span>
                </div>
                <h2 className="abt-section-title">
                  Crafted for <span className="abt-title-accent">Impact</span>. Built for{' '}
                  <span className="abt-title-gradient">Global Scale</span>.
                </h2>
                <p className="abt-section-lead">
                  Technology should eliminate business friction, not create it.
                  Here is the architectural foundation that guides every line of code we ship.
                </p>

                {/* 3-Way Tab Switcher */}
                <div className="abt-tab-switcher" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePhilosophyTab === 'mission'}
                    className={`abt-tab-btn ${
                      activePhilosophyTab === 'mission' ? 'is-active' : ''
                    }`}
                    onClick={() => setActivePhilosophyTab('mission')}
                  >
                    <Target size={15} />
                    <span>Our Mission</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePhilosophyTab === 'vision'}
                    className={`abt-tab-btn ${
                      activePhilosophyTab === 'vision' ? 'is-active' : ''
                    }`}
                    onClick={() => setActivePhilosophyTab('vision')}
                  >
                    <Eye size={15} />
                    <span>Our Vision</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activePhilosophyTab === 'philosophy'}
                    className={`abt-tab-btn ${
                      activePhilosophyTab === 'philosophy' ? 'is-active' : ''
                    }`}
                    onClick={() => setActivePhilosophyTab('philosophy')}
                  >
                    <Heart size={15} />
                    <span>Engineering Ethos</span>
                  </button>
                </div>

                {/* Tab Content Display with Animation */}
                <div className="abt-tab-display-card">
                  <AnimatePresence mode="wait">
                    {activePhilosophyTab === 'mission' && (
                      <motion.div
                        key="mission"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                        className="abt-tab-content-panel"
                      >
                        <h4 className="abt-tab-headline">
                          Empowering Enterprise Growth with Frictionless Digital Engineering
                        </h4>
                        <p className="abt-tab-desc">
                          Our mission is to engineer high-velocity digital ecosystems,
                          bespoke business automation, and native mobile experiences that
                          transform complex operations into competitive advantages for our partners.
                        </p>
                        <ul className="abt-tab-checklist">
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-mint" />
                            <span>100% Bespoke Code tailored to your unique operational workflow</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-mint" />
                            <span>Complete Intellectual Property and Git repository handover on day one</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-mint" />
                            <span>Zero vendor lock-in with open, self-documenting technical architecture</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    {activePhilosophyTab === 'vision' && (
                      <motion.div
                        key="vision"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                        className="abt-tab-content-panel"
                      >
                        <h4 className="abt-tab-headline">
                          Recognized Globally for Uncompromising Architectural Rigor
                        </h4>
                        <p className="abt-tab-desc">
                          Our vision is to stand as India’s premier high-velocity digital product
                          studio—revered worldwide for aesthetic clarity, sub-second latency,
                          and transformative business software.
                        </p>
                        <ul className="abt-tab-checklist">
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-blue" />
                            <span>Targeting 99/100 Google Core Web Vitals on every production build</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-blue" />
                            <span>Pioneering spatial user interfaces and edge computing workflows</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-blue" />
                            <span>Continuous research and adoption of next-generation tech standards</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    {activePhilosophyTab === 'philosophy' && (
                      <motion.div
                        key="philosophy"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                        className="abt-tab-content-panel"
                      >
                        <h4 className="abt-tab-headline">
                          We Engineer Software as if Our Own Capital Was at Stake
                        </h4>
                        <p className="abt-tab-desc">
                          We reject bloatware and superficial templates. We believe in lean
                          computational models, sanitized inputs, scalable database indexing,
                          and direct architect-to-client partnership throughout the product lifecycle.
                        </p>
                        <ul className="abt-tab-checklist">
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-purple" />
                            <span>Radical transparency with direct senior engineer collaboration</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-purple" />
                            <span>Strict OWASP Top 10 sanitization &amp; bank-grade encryption</span>
                          </li>
                          <li>
                            <CheckCircle2 size={16} className="abt-check-icon text-purple" />
                            <span>Continuous 24/7 production health telemetry &amp; proactive patches</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural DNA Card */}
            <div className="col-lg-6">
              <div className="abt-dna-card">
                <div className="abt-dna-header">
                  <div className="abt-dna-icon-wrap">
                    <Terminal size={20} className="abt-dna-icon" />
                  </div>
                  <div>
                    <span className="abt-dna-kicker">SYSTEM TELEMETRY</span>
                    <h3 className="abt-dna-title">The Ultoxy Technical DNA</h3>
                  </div>
                </div>

                <div className="abt-dna-specs-grid">
                  <div className="abt-dna-spec-item">
                    <span className="abt-spec-label">SOURCE REPO</span>
                    <span className="abt-spec-val text-mint">100% CLIENT IP</span>
                    <span className="abt-spec-sub">Zero Vendor Lock-In</span>
                  </div>
                  <div className="abt-dna-spec-item">
                    <span className="abt-spec-label">RUNTIME VELOCITY</span>
                    <span className="abt-spec-val text-blue">&lt; 0.8S FIRST PAINT</span>
                    <span className="abt-spec-sub">GPU 60FPS UI Layer</span>
                  </div>
                  <div className="abt-dna-spec-item">
                    <span className="abt-spec-label">SECURITY PROTOCOL</span>
                    <span className="abt-spec-val text-purple">TLS 1.3 / OWASP</span>
                    <span className="abt-spec-sub">Sanitized Parameterized SQL</span>
                  </div>
                  <div className="abt-dna-spec-item">
                    <span className="abt-spec-label">UPTIME BENCHMARK</span>
                    <span className="abt-spec-val text-pink">99.98% SLA</span>
                    <span className="abt-spec-sub">Redundant Multi-Zone Cloud</span>
                  </div>
                </div>

                <div className="abt-dna-code-block">
                  <div className="abt-code-header">
                    <span>ultoxy-architecture-manifesto.ts</span>
                    <span className="abt-code-dot" />
                  </div>
                  <pre className="abt-code-body">
                    <code>
{`export const UltoxyStandard = {
  philosophy: "Digital Excellence Without Compromise",
  architecture: "Modular React 19 + Python Django REST",
  mobile: "Google Flutter High-Performance UI",
  security: "Bank-Grade Encryption + Strict RBAC",
  deliverable: "100% Clean Code & Full IP Handover",
  partnerSupport: "24/7 Proactive SLA Telemetry",
};`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: THE 4 CORE VALUES OF ULTOXY CULTURE (MULTICOLOR 3D CARDS)
          =================================================================== */}
      <section className="abt-values-section" id="culture">
        {/* Subtle ambient light canvas */}
        <div className="abt-values-ambient-bg" aria-hidden="true">
          <div className="abt-values-orb abt-orb-mint" />
          <div className="abt-values-orb abt-orb-blue" />
          <div className="abt-values-orb abt-orb-purple" />
          <div className="abt-values-orb abt-orb-pink" />
        </div>

        <div className="container abt-values-container">
          <motion.div
            className="abt-values-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-eyebrow-pill">
              <span className="abt-beacon-dot" />
              <span>THE 4 FOUNDATIONAL PILLARS // ENGINEERING CULTURE</span>
            </div>
            <h2 className="abt-section-headline">
              Uncompromising Standards.{' '}
              <span className="abt-headline-gradient">Multicolor Innovation.</span>
            </h2>
            <p className="abt-section-subtitle">
              Every system we engineer adheres to four foundational commitments that
              safeguard our clients&apos; intellectual property, security, and velocity.
            </p>
          </motion.div>

          <div className="abt-values-grid">
            {ABOUT_VALUES.map((val, idx) => {
              const IconComp = val.icon
              return (
                <motion.div
                  key={val.num}
                  className={`abt-value-card abt-card-${val.theme}`}
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.1,
                    ease: EASE_OUT_EXPO,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.32, ease: EASE_OUT_EXPO },
                  }}
                >
                  <div className="abt-card-laser-beam" />

                  <div className="abt-card-top-row">
                    <div className="abt-card-icon-pedestal">
                      <IconComp size={22} className="abt-card-icon" />
                      <span className="abt-card-icon-aura" />
                    </div>
                    <div className="abt-card-badges">
                      <span className="abt-card-badge-num">PILLAR {val.num}</span>
                      <span className="abt-card-pulse-dot" />
                    </div>
                  </div>

                  <div className="abt-card-heading-block">
                    <span className="abt-card-metric-tag">{val.badge}</span>
                    <h3 className="abt-card-title">{val.title}</h3>
                  </div>

                  <p className="abt-card-desc">{val.desc}</p>

                  <div className="abt-card-features">
                    {val.highlights.map((item) => (
                      <div key={item} className="abt-card-feature-item">
                        <CheckCircle2 size={13} className="abt-card-check-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="abt-card-bottom-bar">
                    <span className="abt-card-telemetry-label">VERIFIED BENCHMARK</span>
                    <span className="abt-card-telemetry-val">{val.metric}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: EVOLUTIONARY TIMELINE (INTERACTIVE JOURNEY MATRIX)
          =================================================================== */}
      <section className="abt-timeline-section" id="timeline">
        <div className="container">
          <motion.div
            className="abt-timeline-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-eyebrow-pill">
              <Clock size={13} style={{ color: '#006cff' }} />
              <span>THE ULTOXY CHRONOLOGY // EVOLUTIONARY JOURNEY</span>
            </div>
            <h2 className="abt-section-headline">
              From Pune Roots to{' '}
              <span className="abt-headline-gradient">Global Enterprise Scale</span>
            </h2>
            <p className="abt-section-subtitle">
              Follow our technical progression across landmark milestones—from our
              founding dynamic web engines to multi-vertical enterprise ERPs and beyond.
            </p>
          </motion.div>

          {/* Interactive Timeline Track */}
          <div className="abt-timeline-track">
            <div className="abt-timeline-center-line" aria-hidden="true" />

            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={milestone.phase}
                  className={`abt-timeline-node ${isEven ? 'is-left' : 'is-right'}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
                >
                  {/* Central Node Orb */}
                  <div className={`abt-node-orb abt-orb-${milestone.theme}`}>
                    <span className="abt-node-inner-dot" />
                  </div>

                  {/* Content Card */}
                  <div className={`abt-milestone-card abt-card-${milestone.theme}`}>
                    <div className="abt-milestone-top">
                      <span className="abt-milestone-phase">{milestone.phase}</span>
                      <span className="abt-milestone-year">{milestone.year}</span>
                      <span className="abt-milestone-badge">{milestone.badge}</span>
                    </div>

                    <h3 className="abt-milestone-title">{milestone.title}</h3>
                    <p className="abt-milestone-desc">{milestone.desc}</p>

                    <div className="abt-milestone-tags">
                      {milestone.deliverables.map((tag) => (
                        <span key={tag} className="abt-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: THE LIVING TECHNICAL LABORATORY
          =================================================================== */}
      <section className="abt-tech-section" id="tech-stack">
        <div className="container">
          <motion.div
            className="abt-tech-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-eyebrow-pill">
              <Cpu size={13} style={{ color: '#006cff' }} />
              <span>THE TECHNICAL ENGINE // PRODUCTION STACK</span>
            </div>
            <h2 className="abt-section-headline">
              Our Modern <span className="abt-headline-gradient">Architectural Arsenal</span>
            </h2>
            <p className="abt-section-subtitle">
              We leverage production-hardened frameworks and cutting-edge paradigms
              selected strictly for velocity, zero bloat, and enterprise resilience.
            </p>

            {/* Filter Pills */}
            <div className="abt-tech-filter-pills" role="tablist">
              {[
                { id: 'all', label: 'All Technologies' },
                { id: 'frontend', label: 'Frontend & 3D UI' },
                { id: 'backend', label: 'Backend & ERP Engines' },
                { id: 'mobile', label: 'Mobile Engineering' },
                { id: 'database', label: 'Databases & In-Memory' },
                { id: 'cloud', label: 'Cloud & Infrastructure' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTechFilter === f.id}
                  className={`abt-filter-pill ${
                    activeTechFilter === f.id ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveTechFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tech Grid */}
          <div className="abt-tech-grid">
            {filteredTech.map((tech, idx) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="abt-tech-item-card"
              >
                <div className="abt-tech-card-top">
                  <span className="abt-tech-level">{tech.level}</span>
                  <span className="abt-tech-cat">{tech.category}</span>
                </div>
                <h4 className="abt-tech-name">{tech.name}</h4>
                <p className="abt-tech-role">{tech.role}</p>
                <div className="abt-tech-status-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6: FOUNDING LEADERSHIP & SYSTEMS ARCHITECTS
          =================================================================== */}
      <section className="abt-leadership-section" id="leadership">
        <div className="container">
          <motion.div
            className="abt-leader-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="row align-items-center">
              {/* Leader Photo with Frame */}
              <div className="col-lg-5 text-center">
                <div className="abt-leader-photo-stage">
                  <div className="abt-leader-photo-frame">
                    <img
                      src={resolveAsset('team/rameshwar.jpg')}
                      alt="Rameshwar Pawar - Founder & Systems Architect"
                      className="abt-leader-photo"
                      loading="lazy"
                    />
                    <div className="abt-leader-photo-glass" />
                  </div>
                  <div className="abt-leader-photo-glow" aria-hidden="true" />
                </div>
              </div>

              {/* Leader Narrative */}
              <div className="col-lg-7">
                <div className="abt-leader-narrative">
                  <div className="abt-eyebrow-pill" style={{ marginBottom: '1rem' }}>
                    <Award size={13} style={{ color: '#006cff' }} />
                    <span>LEADERSHIP &amp; FOUNDING ARCHITECT</span>
                  </div>
                  <h3 className="abt-leader-name">Rameshwar Pawar</h3>
                  <span className="abt-leader-role">
                    Founder &amp; Principal Systems Architect // Ultoxy Technologies
                  </span>

                  <blockquote className="abt-leader-quote">
                    &ldquo;Software engineering is not merely about typing syntax—it is about
                    transforming ambitious human vision into resilient, scalable digital engines
                    that create compounding enterprise value.&rdquo;
                  </blockquote>

                  <p className="abt-leader-bio">
                    Leading technology and product architecture at Ultoxy, Rameshwar oversees
                    the engineering of custom ERP frameworks, high-throughput cloud portals, and
                    mission-critical mobile applications across logistics, education, and commerce.
                  </p>

                  <div className="abt-leader-credentials">
                    <div className="abt-cred-chip">
                      <Code2 size={14} style={{ color: '#00ffc6' }} />
                      <span>Full-Stack Cloud Architect</span>
                    </div>
                    <div className="abt-cred-chip">
                      <Server size={14} style={{ color: '#006cff' }} />
                      <span>Django &amp; React Specialist</span>
                    </div>
                    <div className="abt-cred-chip">
                      <Smartphone size={14} style={{ color: '#8b5cf6' }} />
                      <span>Flutter Native Engineer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7: EXECUTIVE LAUNCHPAD CTA
          =================================================================== */}
      <section className="abt-cta-section" id="launchpad">
        <div className="container">
          <motion.div
            className="abt-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="abt-cta-glow abt-cta-glow-1" aria-hidden="true" />
            <div className="abt-cta-glow abt-cta-glow-2" aria-hidden="true" />

            <div className="abt-cta-body">
              <div className="abt-eyebrow-row" style={{ marginBottom: '1rem' }}>
                <div className="abt-eyebrow-pill">
                  <Sparkles size={13} style={{ color: '#006cff' }} />
                  <span>START YOUR DIGITAL JOURNEY WITH ULTOXY</span>
                </div>
              </div>

              <h2 className="abt-cta-title">
                Ready to Architect Something Extraordinary?
              </h2>

              <p className="abt-cta-subtitle">
                Whether you need a full enterprise ERP, a silky 60fps Flutter mobile application,
                or a high-impact web presence, our engineering studio is prepared to build.
              </p>

              <div className="abt-cta-actions">
                <Link to="/contact" className="abt-btn-primary">
                  <span>Schedule an Architectural Call</span>
                  <ArrowUpRight size={17} />
                </Link>
                <Link to="/projects" className="abt-btn-secondary">
                  <span>Explore Our 13+ Deployments</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="abt-cta-meta-strip">
                <span className="abt-meta-item">
                  <PhoneCall size={14} style={{ color: '#006cff' }} />
                  <span>{companyInfo.phone}</span>
                </span>
                <span className="abt-meta-dot">•</span>
                <span className="abt-meta-item">
                  <Mail size={14} style={{ color: '#00ffc6' }} />
                  <span>{companyInfo.email}</span>
                </span>
                <span className="abt-meta-dot">•</span>
                <span className="abt-meta-item">
                  <Globe size={14} style={{ color: '#8b5cf6' }} />
                  <span>Pune, Maharashtra, India</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
