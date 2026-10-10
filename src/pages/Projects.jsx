import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  ArrowUpRight,
  ArrowDown,
  Search,
  Lock,
  Sparkles,
  Compass,
  PhoneCall,
  Smartphone,
  CreditCard,
  UserCheck,
  GraduationCap,
  CheckCircle2,
  Layers,
  Building2,
  Truck,
  ShoppingBag,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import SEO from '../components/SEO'
import { seoConfig, portfolioProjects, companyInfo } from '../data/companyData'
import './Projects.css'

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

// 3D Spatial Deck and Card Animation Variants for Exhibition Track Switching
const DECK_3D_VARIANTS = {
  initial: (dir) => ({
    opacity: 0,
    rotateY: dir > 0 ? 14 : dir < 0 ? -14 : 0,
    rotateX: -4,
    scale: 0.94,
    z: -70,
    filter: 'blur(5px)',
  }),
  animate: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    rotateY: dir > 0 ? -16 : 16,
    rotateX: 4,
    scale: 0.92,
    z: -110,
    filter: 'blur(8px)',
    transition: {
      duration: 0.36,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
}

const CENTER_CARD_3D_VARIANTS = {
  initial: (dir) => ({
    opacity: 0,
    y: 35,
    z: -120,
    scale: 0.82,
    rotateX: -14,
    rotateY: dir > 0 ? 12 : dir < 0 ? -12 : 0,
  }),
  animate: {
    opacity: 1,
    y: 0,
    z: 45,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir) => ({
    opacity: 0,
    y: -30,
    z: -150,
    scale: 0.86,
    rotateX: 14,
    rotateY: dir > 0 ? -16 : 16,
    transition: {
      duration: 0.34,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
}

const LEFT_CARD_3D_VARIANTS = {
  initial: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 90 : -110,
    y: 25,
    z: -140,
    scale: 0.84,
    rotateY: dir > 0 ? 28 : -32,
    rotateX: 8,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 12,
    scale: 1,
    rotateY: 12,
    rotateX: 2,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -110 : 90,
    y: -20,
    z: -180,
    scale: 0.82,
    rotateY: dir > 0 ? -32 : 28,
    rotateX: -8,
    transition: {
      duration: 0.34,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
}

const RIGHT_CARD_3D_VARIANTS = {
  initial: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 110 : -90,
    y: 25,
    z: -140,
    scale: 0.84,
    rotateY: dir > 0 ? 32 : -28,
    rotateX: 8,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 12,
    scale: 1,
    rotateY: -12,
    rotateX: 2,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -90 : 110,
    y: -20,
    z: -180,
    scale: 0.82,
    rotateY: dir > 0 ? -28 : 32,
    rotateX: -8,
    transition: {
      duration: 0.34,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
}

// 4 Signature Exhibition Tracks for the 3D Constellation
const EXHIBITION_TRACKS = [
  {
    id: 'track-real-estate',
    code: '01',
    label: 'Real Estate Web & ERP',
    tagline: 'Dual-System Architecture',
    center: {
      title: 'Sai Land Developers',
      category: 'Web Architecture',
      code: 'SLD-WEB-01',
      url: 'sailanddevelopers.com',
      image: '/projects/sld-website.png',
      tags: ['React 19', 'Django REST', 'Dynamic CMS'],
      badge: 'PRODUCTION WEB',
    },
    left: {
      title: 'Sai Land ERP',
      category: 'Enterprise ERP',
      code: 'SLD-ERP-04',
      url: 'sailanddevelopers.com/erp',
      image: '/projects/sld-website-erp.png',
      tags: ['Ledger Engine', 'Plot Booking', 'Role RBAC'],
      badge: 'CUSTOM ERP',
    },
    right: {
      title: 'Saint Monica Portal',
      category: 'Academic Web',
      code: 'SMIS-PORTAL-11',
      url: 'saintmonicainternationalschool.com',
      image: '/projects/smis-website.png',
      tags: ['School CMS', 'Admissions', 'Responsive UI'],
      badge: 'EDTECH WEB',
    },
  },
  {
    id: 'track-edtech',
    code: '02',
    label: 'UltraCoach & EdTech SaaS',
    tagline: 'School & Coaching ERP Matrix',
    center: {
      title: 'Ultra Coach Matrix',
      category: 'Institute ERP & Mobile',
      code: 'UCM-ERP-12',
      url: 'ultracoachmatrix.in',
      image: '/projects/ultracoachmatrix-logo.png',
      tags: ['Web & Mobile Apps', 'Fees Automation', 'Exams & Results', 'Cloud DB'],
      badge: 'FLAGSHIP ERP',
    },
    left: {
      title: 'ExamTrax SaaS',
      category: 'Exam Management',
      code: 'EXAMTRAX-05',
      url: 'examtrax.pythonanywhere.com',
      image: '/projects/exam-trax-website.png',
      tags: ['Timed Tests', 'Auto Grading', 'Analytics'],
      badge: 'EDTECH SAAS',
    },
    right: {
      title: 'Institute Management (IMS)',
      category: 'Academic ERP',
      code: 'IMS-ERP-07',
      url: 'ims.pythonanywhere.com',
      image: '/projects/ims-erp.png',
      tags: ['Attendance', 'Fee Tracking', 'Cloud DB'],
      badge: 'CLOUD ERP',
    },
  },
  {
    id: 'track-logistics',
    code: '03',
    label: 'Fleet Logistics & Industry',
    tagline: 'Real-Time Dispatch & B2B',
    center: {
      title: 'Patel Transport ERP',
      category: 'Logistics Software',
      code: 'PATEL-LOG-09',
      url: 'pateltransport.internal',
      image: '/projects/patel-transport-website.png',
      tags: ['Fleet Tracking', 'Dispatch Queue', 'B2B Billing'],
      badge: 'LOGISTICS ERP',
    },
    left: {
      title: 'Dynaxcel Engineers',
      category: 'Industrial Web',
      code: 'DYNAXCEL-02',
      url: 'dynaxcel.pythonanywhere.com',
      image: '/projects/dynaxcel-website.png',
      tags: ['Precision B2B', 'Manufacturing', 'Inquiry Flow'],
      badge: 'INDUSTRIAL',
    },
    right: {
      title: 'Saiganga Enterprises',
      category: 'Corporate B2B',
      code: 'SE-CORP-10',
      url: 'saigangaenterprises.internal',
      image: '/projects/se-website.png',
      tags: ['Catalog Engine', 'Enterprise', 'Fast UI'],
      badge: 'B2B PORTAL',
    },
  },
  {
    id: 'track-ecommerce',
    code: '04',
    label: 'B2B Commerce & FinTech',
    tagline: 'Enterprise Products & Portals',
    center: {
      title: 'Kärcher Industrial Equipment',
      category: 'Industrial Equipment Portal',
      code: 'KARCHER-B2B-13',
      url: 'karcher.enterprise.portal',
      image: '/projects/porfolio-karcher.jpg',
      tags: ['Equipment Catalog', 'Industrial B2B', 'Corporate Web'],
      badge: 'GLOBAL BRAND',
    },
    left: {
      title: 'Gujarati Youth Association (GYA)',
      category: 'E-Commerce Platform',
      code: 'GYA-ECOMM-06',
      url: 'gya.pythonanywhere.com',
      image: '/projects/gya-e-commerce.png',
      tags: ['Event Ticketing', 'Member Sync', 'Payment Gateway'],
      badge: 'EVENT COMMERCE',
    },
    right: {
      title: 'Money Trust FinTech',
      category: 'FinTech Platform',
      code: 'M-TRUST-08',
      url: 'moneytrust.pythonanywhere.com',
      image: '/projects/money-trust-website.png',
      tags: ['Trust UI/UX', 'Financial Services', 'Lead Capture'],
      badge: 'FINTECH',
    },
  },
]

// UltraCoachMatrix Core Modules Breakdown
const ULTRACOACH_MODULES = [
  {
    id: 'fees',
    code: '01',
    name: 'Fees & Dues Engine',
    icon: CreditCard,
    title: 'Automated Fee Collection & Online Invoicing',
    desc: 'Complete financial automation for schools and coaching institutes. Supports custom installment schedules, automated WhatsApp/SMS fee alerts, instant online payment links, and downloadable GST receipts.',
    features: [
      'Multi-Installment Schedule Builder',
      'Automated WhatsApp/SMS Reminders',
      'Instant Payment Gateway & QR Checkout',
      'Real-Time Collection & Due Ledgers',
    ],
    badge: 'ZERO REVENUE LEAKAGE',
    status: 'LIVE PRODUCTION',
  },
  {
    id: 'attendance',
    code: '02',
    name: 'Smart Attendance',
    icon: UserCheck,
    title: 'Real-Time Biometric & RFID Check-In',
    desc: 'Eliminates paper registers with instant biometric device and mobile app synchronization. Automatically dispatches arrival and departure SMS notifications to parents the instant a student scans in.',
    features: [
      'Biometric Machine Hardware Sync',
      'Instant Parent Arrival & Exit Alerts',
      'Subject & Lecture-Wise Tracking',
      'Automated Monthly Defaulter Lists',
    ],
    badge: 'INSTANT PARENT ALERTS',
    status: 'LIVE PRODUCTION',
  },
  {
    id: 'exams',
    code: '03',
    name: 'Exams & Results',
    icon: GraduationCap,
    title: 'Automated Examination & Grade Cards',
    desc: 'End-to-end examination management from test paper scheduling to automated marks calculation. Generates digital CBSE/State Board format report cards with rank benchmarking and percentile graphs.',
    features: [
      'Automated Marks & Grade Computations',
      'Class Rank & Percentile Matrix',
      '1-Click PDF Report Card Generator',
      'Historical Academic Growth Graphs',
    ],
    badge: 'AUTOMATED GRADING',
    status: 'LIVE PRODUCTION',
  },
  {
    id: 'mobile',
    code: '04',
    name: 'Mobile Apps (Flutter)',
    icon: Smartphone,
    title: 'Dual Native Apps for iOS & Android',
    desc: 'Silky 60fps mobile applications engineered with Google Flutter for teachers, parents, and students. Enables real-time homework updates, fee payment, notice boards, and instant push notifications.',
    features: [
      'Single Codebase Flutter 60FPS UI',
      'Teacher Classroom & Attendance App',
      'Parent & Student Progress Portal App',
      'Cloud Realtime Push Notification Hub',
    ],
    badge: '60FPS IOS & ANDROID',
    status: 'NATIVE APPS',
  },
]

// Industry Vertical Matrix Tabs
const INDUSTRY_VERTICALS = [
  {
    id: 'real-estate',
    name: 'Real Estate & Land',
    badge: '2 Systems',
    icon: Building2,
    projects: [
      {
        title: 'Sai Land Developers (Web)',
        category: 'Residential & Commercial Portal',
        image: '/projects/sld-website.png',
        link: 'https://sailanddevelopers.com/',
        summary: 'Dynamic real estate portal showcasing residential plots, layout maps, and customer lead inquiries.',
        tech: ['React', 'Django REST', 'Dynamic CMS'],
      },
      {
        title: 'Sai Land Developers (ERP)',
        category: 'Custom Enterprise ERP Software',
        image: '/projects/sld-website-erp.png',
        link: 'https://sailanddevelopers.com/',
        summary: 'Comprehensive plot booking, installment schedule tracking, customer ledgers, and reporting software.',
        tech: ['Custom ERP', 'Python SQL', 'Financial Ledger'],
      },
    ],
  },
  {
    id: 'edtech',
    name: 'EdTech & Academics',
    badge: '4 Systems',
    icon: GraduationCap,
    projects: [
      {
        title: 'Ultra Coach Matrix',
        category: 'School & Coaching Institute ERP',
        image: '/projects/ultracoachmatrix-logo.png',
        link: 'https://ultracoachmatrix.in/',
        summary: 'All-in-one institute ERP managing admissions, fees, biometric attendance, exams, and student-teacher mobile apps.',
        tech: ['React 19', 'Django REST', 'Flutter Mobile'],
      },
      {
        title: 'ExamTrax Examination SaaS',
        category: 'Timed Online Testing Software',
        image: '/projects/exam-trax-website.png',
        link: 'https://examtrax.pythonanywhere.com/',
        summary: 'End-to-end online examination, question bank scheduling, automated grading, and student performance analytics.',
        tech: ['EdTech SaaS', 'Exam Engine', 'Analytics'],
      },
      {
        title: 'Saint Monica International School',
        category: 'Academic Institution Portal',
        image: '/projects/smis-website.png',
        link: 'http://www.saintmonicainternationalschool.com',
        summary: 'User-friendly educational portal representing academic programs, online admissions, and campus activities.',
        tech: ['Education CMS', 'Responsive UI', 'SEO Schema'],
      },
      {
        title: 'Institute Management System (IMS)',
        category: 'Web-Based Academic ERP',
        image: '/projects/ims-erp.png',
        link: 'https://ims.pythonanywhere.com/',
        summary: 'Cloud-based academic ERP covering student admissions, fee registers, timetable scheduling, and staff records.',
        tech: ['Role-Based RBAC', 'Cloud Database', 'Django'],
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Fleet Logistics & B2B',
    badge: '3 Systems',
    icon: Truck,
    projects: [
      {
        title: 'Patel Transport ERP',
        category: 'Transport & Fleet Management',
        image: '/projects/patel-transport-website.png',
        link: null,
        summary: 'Fleet dispatch software streamlining consignment booking, trip manifests, driver allowances, and B2B billing.',
        tech: ['Fleet Dispatch', 'Automated Invoicing', 'Cloud ERP'],
      },
      {
        title: 'Dynaxcel Engineers',
        category: 'Industrial Engineering Showcase',
        image: '/projects/dynaxcel-website.png',
        link: 'https://dynaxcel.pythonanywhere.com/',
        summary: 'B2B engineering showcase highlighting precision heavy manufacturing, equipment catalogs, and client inquiries.',
        tech: ['Industrial Portal', 'B2B Catalog', 'Django'],
      },
      {
        title: 'Saiganga Enterprises',
        category: 'Corporate B2B Catalog Portal',
        image: '/projects/se-website.png',
        link: null,
        summary: 'Corporate enterprise website showcasing industrial product catalogs, specifications, and customer orders.',
        tech: ['Corporate Web', 'Fast Responsive UI', 'Catalog'],
      },
    ],
  },
  {
    id: 'commerce',
    name: 'Commerce & FinTech',
    badge: '4 Systems',
    icon: ShoppingBag,
    projects: [
      {
        title: 'Kärcher Industrial Equipment',
        category: 'Global Cleaning Machinery Portal',
        image: '/projects/porfolio-karcher.jpg',
        link: null,
        summary: 'Heavy-duty industrial cleaning machinery showcase with customer inquiry workflows and product documentation.',
        tech: ['Equipment Showcase', 'Industrial B2B', 'Corporate'],
      },
      {
        title: 'Gujarati Youth Association (GYA)',
        category: 'Event E-Commerce & Ticketing',
        image: '/projects/gya-e-commerce.png',
        link: 'https://gya.pythonanywhere.com/',
        summary: 'High-volume community event registration, online ticketing, member directory sync, and automated receipts.',
        tech: ['E-Commerce', 'Payment Gateway', 'QR Ticketing'],
      },
      {
        title: 'Money Trust FinTech',
        category: 'Financial Services Portal',
        image: '/projects/money-trust-website.png',
        link: 'https://moneytrust.pythonanywhere.com/',
        summary: 'High-trust financial digital platform with loan calculators, service discovery, and secure inquiry workflows.',
        tech: ['FinTech UI/UX', 'Trust Architecture', 'Security'],
      },
      {
        title: 'Shri Sai Multiservices',
        category: 'Digital Service Gateway',
        image: '/projects/ssm-website.png',
        link: 'https://ultoxy.pythonanywhere.com/',
        summary: 'Multi-service customer intake platform built for rapid onboarding, service discovery, and operations.',
        tech: ['Service Gateway', 'Responsive Design', 'Django'],
      },
    ],
  },
]

// Technical Rigor Pillars
const RIGOR_STANDARDS = [
  {
    num: '01',
    title: 'Clean Source Code',
    desc: 'Modular, well-documented architecture with zero vendor lock-in and complete intellectual property handover.',
  },
  {
    num: '02',
    title: 'Sub-Second Velocity',
    desc: 'Targeting 99/100 Google Core Web Vitals with GPU acceleration, dynamic asset bundling, and instant responsiveness.',
  },
  {
    num: '03',
    title: 'Enterprise Security',
    desc: 'Role-based access control (RBAC), TLS 1.3 encryption, sanitized SQL queries, and automated cloud backups.',
  },
  {
    num: '04',
    title: 'Post-Deploy Care',
    desc: 'Dedicated technical support, ongoing performance audits, and rapid agile sprint feature extensions.',
  },
]

export default function Projects() {
  const [[activeTrackIdx, trackDirection], setTrackState] = useState([0, 0])
  const [activeArtifactFocus, setActiveArtifactFocus] = useState('center') // 'left' | 'center' | 'right'
  const [activeModuleIdx, setActiveModuleIdx] = useState(0)
  const [activeVerticalIdx, setActiveVerticalIdx] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 1024 : true
  )

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const changeTrack = (newIdx) => {
    if (newIdx === activeTrackIdx) return
    const dir = newIdx > activeTrackIdx ? 1 : -1
    setTrackState([newIdx, dir])
    setActiveVerticalIdx(newIdx)
  }

  // 3D Pointer Parallax for the Constellation Stage
  const stageRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleStageMouseMove = (e) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({
      x: Math.max(-0.5, Math.min(0.5, xPct)),
      y: Math.max(-0.5, Math.min(0.5, yPct)),
    })
  }

  const handleStageMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setActiveArtifactFocus('center')
  }

  const currentTrack = EXHIBITION_TRACKS[activeTrackIdx]
  const currentModule = ULTRACOACH_MODULES[activeModuleIdx]
  const currentVertical = INDUSTRY_VERTICALS[activeVerticalIdx]

  // Filtered portfolio list
  const filteredProjects = portfolioProjects.filter((item) => {
    const matchesFilter =
      activeFilter === 'all' ||
      item.filterGroup === activeFilter ||
      (activeFilter === 'web' && item.category.toLowerCase().includes('website')) ||
      (activeFilter === 'erp' && item.category.toLowerCase().includes('erp'))

    const q = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))

    return matchesFilter && matchesSearch
  })

  const filterCounts = {
    all: portfolioProjects.length,
    web: portfolioProjects.filter((p) => p.filterGroup === 'web').length,
    erp: portfolioProjects.filter((p) => p.filterGroup === 'erp').length,
  }

  return (
    <div className="ultoxy-projects-page">
      <SEO
        title={seoConfig.pages.projects.title}
        description={seoConfig.pages.projects.description}
      />

      {/* ===================================================================
          HERO SECTION: "THE LIVING PORTFOLIO" DIGITAL EXHIBITION (WHITE THEME)
          =================================================================== */}
      <section className="prj-hero-section" id="projects-hero">
        {/* Micro-dot matrix canvas + delicate ambient colored light glows */}
        <div className="prj-hero-canvas-bg" aria-hidden="true">
          <div className="prj-dot-matrix" />
          <div className="prj-ambient-light prj-light-mint" />
          <div className="prj-ambient-light prj-light-blue" />
          <div className="prj-ambient-light prj-light-pink" />
        </div>

        <div className="container prj-hero-container">
          {/* Top Swiss Editorial Eyebrow */}
          <motion.div
            className="prj-eyebrow-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="prj-eyebrow-pill">
              <span className="prj-beacon-dot" />
              <span>SELECTED WORKS / DIGITAL ENGINEERING</span>
              <span className="prj-eyebrow-sep">/</span>
              <span className="prj-eyebrow-meta">13+ PRODUCTION DEPLOYMENTS</span>
            </div>
          </motion.div>

          {/* Monumental Editorial Headline */}
          <motion.div
            className="prj-headline-group"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
          >
            <h1 className="prj-headline">
              IDEAS, <span className="prj-headline-gradient">ENGINEERED</span> INTO REALITY.
            </h1>
            <p className="prj-subtitle">
              Digital products, intelligent systems, and experiences built to move
              businesses forward.
            </p>

            <div className="prj-cta-row">
              <Link to="/contact" className="prj-btn-primary">
                <span>Start a Project</span>
                <ArrowUpRight size={17} />
              </Link>
              <a href="#all-projects" className="prj-btn-secondary">
                <span>Explore All 13+ Works</span>
                <ArrowDown size={16} />
              </a>
            </div>
          </motion.div>

          {/* Signature Visual: Interactive 3D Multi-Planar Project Constellation */}
          <motion.div
            ref={stageRef}
            className="prj-constellation-stage"
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            initial={{ opacity: 0, scale: 0.96, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: EASE_OUT_EXPO }}
          >
            {/* Sector World HUD Telemetry Strip */}
            <div className="prj-telemetry-hud" aria-hidden="true">
              <span className="prj-hud-coord">SYS.COORDINATE // 3D-STAGE-0{activeTrackIdx + 1}</span>
              <span className="prj-hud-status">
                <span className="prj-hud-pulse" />
                ACTIVE TRACK: {currentTrack.code} / 04 — {currentTrack.label}
              </span>
              <span className="prj-hud-mode">3D PERSPECTIVE: 1400PX</span>
            </div>

            {/* Floating 3D Navigation Controls */}
            <button
              type="button"
              className="prj-stage-nav-btn prj-nav-prev"
              onClick={() =>
                changeTrack(
                  (activeTrackIdx - 1 + EXHIBITION_TRACKS.length) %
                    EXHIBITION_TRACKS.length
                )
              }
              aria-label="Previous Track"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="prj-stage-nav-btn prj-nav-next"
              onClick={() =>
                changeTrack((activeTrackIdx + 1) % EXHIBITION_TRACKS.length)
              }
              aria-label="Next Track"
            >
              <ChevronRight size={18} />
            </button>

            {/* SVG Connecting Neural Vectors & Coordinate Marks */}
            <svg
              className="prj-constellation-lines"
              viewBox="0 0 1200 600"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 220 280 Q 420 180 600 240 T 980 280"
                className="prj-vector-line"
              />
              <path
                d="M 240 340 C 440 420 760 420 960 340"
                className="prj-vector-line"
                style={{ animationDirection: 'reverse' }}
              />
              <circle cx="220" cy="280" r="4.5" className="prj-vector-node" />
              <circle cx="600" cy="240" r="5.5" className="prj-vector-node" />
              <circle cx="980" cy="280" r="4.5" className="prj-vector-node" />
            </svg>

            {/* Parallax Outer Wrapper (Receives cursor tilt) */}
            <div
              className="prj-parallax-deck-wrapper"
              style={{
                transform: isDesktop
                  ? `rotateX(${-mousePos.y * 7}deg) rotateY(${mousePos.x * 9}deg)`
                  : 'none',
              }}
            >
              <AnimatePresence mode="wait" custom={trackDirection}>
                <motion.div
                  key={currentTrack.id}
                  custom={trackDirection}
                  variants={DECK_3D_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="prj-spatial-deck"
                >
                  {/* Left Flank Artifact */}
                  <motion.div
                    custom={trackDirection}
                    variants={LEFT_CARD_3D_VARIANTS}
                    whileHover={
                      isDesktop
                        ? {
                            scale: 1.04,
                            rotateY: 4,
                            z: 40,
                            transition: { duration: 0.32, ease: EASE_OUT_EXPO },
                          }
                        : undefined
                    }
                    className={`prj-artifact-card prj-artifact-left ${
                      activeArtifactFocus === 'left' ? 'is-active' : ''
                    }`}
                    onMouseEnter={() => setActiveArtifactFocus('left')}
                  >
                    <div className="prj-window-chrome">
                      <div className="prj-chrome-dots">
                        <span className="prj-chrome-dot dot-red" />
                        <span className="prj-chrome-dot dot-yellow" />
                        <span className="prj-chrome-dot dot-green" />
                      </div>
                      <span className="prj-chrome-address-bar">
                        <Lock size={10} /> {currentTrack.left.url}
                      </span>
                      <span className="prj-chrome-tag">{currentTrack.left.badge}</span>
                    </div>

                    <div className="prj-screen-wrap">
                      <img
                        src={currentTrack.left.image}
                        alt={currentTrack.left.title}
                        className="prj-screen-img"
                        loading="eager"
                      />
                      <div className="prj-screen-glass" />
                      <div className="prj-screen-scanline" />
                    </div>

                    <div className="prj-dossier-bar">
                      <div className="prj-dossier-meta">
                        <span className="prj-dossier-kicker">
                          {currentTrack.left.category}
                        </span>
                        <span className="prj-dossier-code">
                          {currentTrack.left.code}
                        </span>
                      </div>
                      <h3 className="prj-dossier-title">{currentTrack.left.title}</h3>
                      <div className="prj-dossier-tags">
                        {currentTrack.left.tags.map((t) => (
                          <span key={t} className="prj-tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Focal Artifact */}
                  <motion.div
                    custom={trackDirection}
                    variants={CENTER_CARD_3D_VARIANTS}
                    whileHover={
                      isDesktop
                        ? {
                            scale: 1.03,
                            z: 70,
                            transition: { duration: 0.32, ease: EASE_OUT_EXPO },
                          }
                        : undefined
                    }
                    className={`prj-artifact-card prj-artifact-center ${
                      activeArtifactFocus === 'center' ? 'is-active' : ''
                    }`}
                    onMouseEnter={() => setActiveArtifactFocus('center')}
                  >
                    <div className="prj-window-chrome">
                      <div className="prj-chrome-dots">
                        <span className="prj-chrome-dot dot-red" />
                        <span className="prj-chrome-dot dot-yellow" />
                        <span className="prj-chrome-dot dot-green" />
                      </div>
                      <span className="prj-chrome-address-bar">
                        <Lock size={10} /> {currentTrack.center.url}
                      </span>
                      <span className="prj-chrome-tag">{currentTrack.center.badge}</span>
                    </div>

                    <div className="prj-screen-wrap">
                      <img
                        src={currentTrack.center.image}
                        alt={currentTrack.center.title}
                        className="prj-screen-img"
                        loading="eager"
                      />
                      <div className="prj-screen-glass" />
                      <div className="prj-screen-scanline" />
                    </div>

                    <div className="prj-dossier-bar">
                      <div className="prj-dossier-meta">
                        <span className="prj-dossier-kicker">
                          {currentTrack.center.category}
                        </span>
                        <span className="prj-dossier-code">
                          {currentTrack.center.code}
                        </span>
                      </div>
                      <h3 className="prj-dossier-title">
                        {currentTrack.center.title}
                      </h3>
                      <div className="prj-dossier-tags">
                        {currentTrack.center.tags.map((t) => (
                          <span key={t} className="prj-tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Flank Artifact */}
                  <motion.div
                    custom={trackDirection}
                    variants={RIGHT_CARD_3D_VARIANTS}
                    whileHover={
                      isDesktop
                        ? {
                            scale: 1.04,
                            rotateY: -4,
                            z: 40,
                            transition: { duration: 0.32, ease: EASE_OUT_EXPO },
                          }
                        : undefined
                    }
                    className={`prj-artifact-card prj-artifact-right ${
                      activeArtifactFocus === 'right' ? 'is-active' : ''
                    }`}
                    onMouseEnter={() => setActiveArtifactFocus('right')}
                  >
                    <div className="prj-window-chrome">
                      <div className="prj-chrome-dots">
                        <span className="prj-chrome-dot dot-red" />
                        <span className="prj-chrome-dot dot-yellow" />
                        <span className="prj-chrome-dot dot-green" />
                      </div>
                      <span className="prj-chrome-address-bar">
                        <Lock size={10} /> {currentTrack.right.url}
                      </span>
                      <span className="prj-chrome-tag">{currentTrack.right.badge}</span>
                    </div>

                    <div className="prj-screen-wrap">
                      <img
                        src={currentTrack.right.image}
                        alt={currentTrack.right.title}
                        className="prj-screen-img"
                        loading="eager"
                      />
                      <div className="prj-screen-glass" />
                      <div className="prj-screen-scanline" />
                    </div>

                    <div className="prj-dossier-bar">
                      <div className="prj-dossier-meta">
                        <span className="prj-dossier-kicker">
                          {currentTrack.right.category}
                        </span>
                        <span className="prj-dossier-code">
                          {currentTrack.right.code}
                        </span>
                      </div>
                      <h3 className="prj-dossier-title">{currentTrack.right.title}</h3>
                      <div className="prj-dossier-tags">
                        {currentTrack.right.tags.map((t) => (
                          <span key={t} className="prj-tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interactive Exhibition Horizon Dock */}
          <div className="prj-horizon-dock">
            <div className="prj-horizon-meta-header">
              <span className="prj-horizon-caption">
                <Compass size={14} /> Interactive Exhibition Sector • Select Track
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTrack.id}
                  className="prj-horizon-active-desc"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="prj-desc-tagline">{currentTrack.tagline}</span>
                </motion.span>
              </AnimatePresence>
            </div>

            <div
              className="prj-horizon-pills"
              role="tablist"
              aria-label="Portfolio Exhibition Tracks"
            >
              {EXHIBITION_TRACKS.map((track, idx) => {
                const isActive = idx === activeTrackIdx
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`prj-horizon-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => changeTrack(idx)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeHorizonGlider"
                        className="prj-horizon-glider"
                        transition={{
                          type: 'spring',
                          stiffness: 440,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="prj-btn-inner">
                      <span className="prj-btn-num">{track.code}</span>
                      <span className="prj-btn-label">{track.label}</span>
                      {isActive && <span className="prj-btn-pulse-dot" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          NEW SECTION: FLAGSHIP SPOTLIGHT — ULTRACOACHMATRIX ECOSYSTEM
          =================================================================== */}
      <section className="prj-spotlight-section" id="ultracoach-spotlight">
        <div className="prj-spotlight-glow prj-spotlight-glow-1" aria-hidden="true" />
        <div className="prj-spotlight-glow prj-spotlight-glow-2" aria-hidden="true" />

        <div className="container">
          <motion.div
            className="prj-spotlight-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="prj-spotlight-badge">
              <Sparkles size={13} />
              <span>FLAGSHIP ENTERPRISE DEPLOYMENT • SAAS ARCHITECTURE</span>
            </div>
            <h2 className="prj-spotlight-title">
              UltraCoachMatrix — School &amp; Coaching ERP
            </h2>
            <p className="prj-spotlight-desc">
              Engineered by Ultoxy Technologies as a complete educational operating
              system: web administration command console paired with dual native
              Flutter mobile apps for faculty, parents, and students.
            </p>
          </motion.div>

          <div className="prj-spotlight-grid">
            {/* Left Column: Interactive Module Selector Tabs & Dossier */}
            <div className="prj-suite-panel">
              <div className="prj-suite-nav" role="tablist">
                {ULTRACOACH_MODULES.map((mod, idx) => {
                  const IconComp = mod.icon
                  const isActive = idx === activeModuleIdx
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`prj-suite-tab ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveModuleIdx(idx)}
                    >
                      <div className="prj-tab-icon-box">
                        <IconComp size={18} />
                      </div>
                      <div className="prj-tab-label-group">
                        <span className="prj-tab-code">MODULE {mod.code}</span>
                        <span className="prj-tab-name">{mod.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Active Module Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModule.id}
                  className="prj-module-dossier"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                >
                  <div className="prj-module-header">
                    <span className="prj-module-kicker">
                      MODULE {currentModule.code} // {currentModule.badge}
                    </span>
                    <span className="prj-module-status">
                      <span className="prj-beacon-dot" style={{ width: 6, height: 6 }} />
                      {currentModule.status}
                    </span>
                  </div>

                  <h3 className="prj-module-title">{currentModule.title}</h3>
                  <p className="prj-module-desc">{currentModule.desc}</p>

                  <div className="prj-module-features">
                    {currentModule.features.map((feat) => (
                      <div key={feat} className="prj-feature-bullet">
                        <CheckCircle2 size={15} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="prj-module-cta-row">
                    <a
                      href="https://ultracoachmatrix.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="prj-launch-btn"
                    >
                      <span>Explore UltraCoachMatrix Live</span>
                      <ExternalLink size={15} />
                    </a>
                    <Link
                      to="/contact?service=desktop-software-erp"
                      className="prj-btn-secondary"
                    >
                      <span>Architect a Similar ERP</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: 3D Holographic System Plate */}
            <div className="prj-spotlight-visual">
              <div className="prj-holo-stage">
                <div className="prj-holo-topline">
                  <div className="prj-holo-brand">
                    <img
                      src="/projects/ultracoachmatrix-logo.png"
                      alt="Ultra Coach Matrix"
                      className="prj-holo-logo"
                    />
                    <div className="prj-holo-brand-text">
                      <strong>Ultra Coach Matrix</strong>
                      <span>ultracoachmatrix.in</span>
                    </div>
                  </div>
                  <span className="prj-chrome-tag">FLUTTER &amp; DJANGO</span>
                </div>

                <div className="prj-holo-preview-window">
                  <div className="prj-holo-meta-row">
                    <span className="prj-holo-pill">
                      <Zap size={11} /> 60FPS MOBILE APPS
                    </span>
                    <span className="prj-holo-pill" style={{ borderColor: '#00ffc6', color: '#00ffc6' }}>
                      ONLINE &amp; ACTIVE
                    </span>
                  </div>

                  <div className="prj-holo-main-text">
                    <h4 className="prj-holo-headline">
                      All-In-One Institutional Operating System
                    </h4>
                    <p className="prj-holo-sub">
                      Centralizing student attendance, examination results, fee ledgers,
                      and teacher communication into a single unified cloud database.
                    </p>
                  </div>

                  <div className="prj-holo-meta-row">
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                      ENGINEERED BY ULTOXY TECHNOLOGIES
                    </span>
                  </div>
                </div>

                <div className="prj-holo-metrics-grid">
                  <div className="prj-holo-metric-item">
                    <strong>+300%</strong>
                    <span>Admin Speed</span>
                  </div>
                  <div className="prj-holo-metric-item">
                    <strong>100%</strong>
                    <span>Fee Sync</span>
                  </div>
                  <div className="prj-holo-metric-item">
                    <strong>60 FPS</strong>
                    <span>Native UX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          NEW SECTION: INDUSTRY VERTICAL MATRIX
          =================================================================== */}
      <section className="prj-verticals-section" id="industry-matrix">
        <div className="container">
          <motion.div
            className="prj-verticals-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="prj-eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
              <Layers size={13} />
              <span>INDUSTRY ARCHITECTURES • 4 SPECIALIZED SECTORS</span>
            </div>
            <h2 className="prj-grid-title">
              Specialized Software Engineered By Domain
            </h2>
            <p className="prj-grid-subtitle">
              Explore how Ultoxy crafts bespoke architectures tailored to the exact
              workflows, compliances, and scaling requirements of each industry.
            </p>
          </motion.div>

          {/* Vertical Selector Tabs */}
          <div className="prj-verticals-tabs" role="tablist">
            {INDUSTRY_VERTICALS.map((vert, idx) => {
              const IconComp = vert.icon
              const isActive = idx === activeVerticalIdx
              return (
                <button
                  key={vert.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`prj-vertical-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveVerticalIdx(idx)}
                >
                  <IconComp size={16} />
                  <span>{vert.name}</span>
                  <span className="prj-filter-count">{vert.badge}</span>
                </button>
              )
            })}
          </div>

          {/* Active Vertical Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVertical.id}
              className="prj-vertical-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            >
              {currentVertical.projects.map((item) => (
                <div key={item.title} className="prj-vertical-card">
                  <div className="prj-vertical-thumb-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="prj-vertical-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="prj-vertical-content">
                    <div>
                      <span className="prj-vertical-kicker">{item.category}</span>
                      <h4 className="prj-vertical-name">{item.title}</h4>
                      <p className="prj-vertical-summary">{item.summary}</p>
                    </div>

                    <div className="prj-vertical-link-row">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="prj-vertical-btn-link"
                        >
                          <span>Visit System</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="prj-vertical-btn-link" style={{ opacity: 0.65 }}>
                          <span>Internal ERP</span>
                          <Lock size={12} />
                        </span>
                      )}

                      <Link
                        to={`/contact?project=${encodeURIComponent(item.title)}`}
                        className="prj-inquire-link"
                      >
                        <span>Inquire</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: COMPLETE 13+ PRODUCTION PORTFOLIO GRID & SEARCH
          =================================================================== */}
      <section className="prj-filter-section" id="all-projects">
        <div className="container">
          <div className="prj-filter-bar">
            {/* Filter Tabs */}
            <div className="prj-filter-tabs" role="tablist">
              <button
                type="button"
                className={`prj-filter-tab ${
                  activeFilter === 'all' ? 'is-active' : ''
                }`}
                onClick={() => setActiveFilter('all')}
              >
                <span>All Deployments</span>
                <span className="prj-filter-count">{filterCounts.all}</span>
              </button>
              <button
                type="button"
                className={`prj-filter-tab ${
                  activeFilter === 'web' ? 'is-active' : ''
                }`}
                onClick={() => setActiveFilter('web')}
              >
                <span>Web Platforms</span>
                <span className="prj-filter-count">{filterCounts.web}</span>
              </button>
              <button
                type="button"
                className={`prj-filter-tab ${
                  activeFilter === 'erp' ? 'is-active' : ''
                }`}
                onClick={() => setActiveFilter('erp')}
              >
                <span>Enterprise ERP &amp; SaaS</span>
                <span className="prj-filter-count">{filterCounts.erp}</span>
              </button>
            </div>

            {/* Keyword Search Box */}
            <div className="prj-search-box">
              <Search size={15} className="prj-search-icon" />
              <input
                type="text"
                placeholder="Search 13+ projects by keyword, tech, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="prj-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All Filtered Projects */}
      <section className="prj-grid-section">
        <div className="container">
          <div className="prj-portfolio-grid">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                className="prj-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: EASE_OUT_EXPO }}
              >
                <div className="prj-card-thumb-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="prj-card-thumb"
                    loading="lazy"
                  />
                  <span className="prj-card-badge">PROD #{project.id}</span>
                </div>

                <div className="prj-card-body">
                  <span className="prj-card-category">{project.category}</span>
                  <h3 className="prj-card-title">{project.title}</h3>
                  <p className="prj-card-desc">{project.description}</p>

                  <div className="prj-card-tags-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="prj-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="prj-card-actions">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="prj-live-link"
                      >
                        <span>Visit Live System</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="prj-live-link" style={{ opacity: 0.7 }}>
                        <span>Enterprise Internal</span>
                        <Lock size={13} />
                      </span>
                    )}

                    <Link
                      to={`/contact?project=${encodeURIComponent(project.title)}`}
                      className="prj-inquire-link"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}

            {filteredProjects.length === 0 && (
              <div className="prj-empty-state">
                <h3 className="prj-empty-title">No matching projects found</h3>
                <p className="prj-empty-desc">
                  Try adjusting your search query or switching to &ldquo;All
                  Deployments&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: TECHNICAL RIGOR & PRODUCTION STANDARDS
          =================================================================== */}
      <section className="prj-standards-section">
        <div className="container">
          <div className="prj-standards-grid">
            {RIGOR_STANDARDS.map((std) => (
              <div key={std.num} className="prj-standard-box">
                <span className="prj-standard-num">PILLAR {std.num}</span>
                <h3 className="prj-standard-title">{std.title}</h3>
                <p className="prj-standard-desc">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: WHITE THEME EXECUTIVE LAUNCHPAD CTA
          =================================================================== */}
      <section className="prj-cta-section">
        <div className="container">
          <motion.div
            className="prj-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="prj-cta-glow prj-cta-glow-1" aria-hidden="true" />
            <div className="prj-cta-glow prj-cta-glow-2" aria-hidden="true" />

            <div className="prj-cta-body">
              <div className="prj-eyebrow-row" style={{ marginBottom: '1rem' }}>
                <div className="prj-eyebrow-pill">
                  <Sparkles size={13} style={{ color: '#006cff' }} />
                  <span>CUSTOM SOFTWARE • COMMERCE • ERP</span>
                </div>
              </div>

              <h2 className="prj-cta-title">
                Have a Custom Product or ERP in Mind?
              </h2>

              <p className="prj-cta-desc">
                Consult with our Pune engineering team for a transparent roadmap,
                modern architecture review, and fixed-cost delivery proposal.
              </p>

              <div className="prj-cta-actions">
                <Link to="/contact" className="prj-btn-primary">
                  <span>Start Your Project</span>
                  <ArrowUpRight size={17} />
                </Link>
                <a
                  href={`tel:${companyInfo.contact.phones[0].raw}`}
                  className="prj-btn-secondary"
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
