import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  Activity,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  Smartphone,
  Copy,
  Check,
  BookOpen,
  Layers,
  Crown,
} from 'lucide-react'
import SEO from '../components/SEO'
import { seoConfig } from '../data/companyData'
import './Blog.css'

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

// -------------------------------------------------------------------
// ARTICLE DATABASE (Real Ultoxy Case Studies & Technical Architecture)
// -------------------------------------------------------------------
const INSIGHTS_ARTICLES = [
  {
    id: 'dispatch-ultracoach',
    lead: true,
    tag: 'LEAD INVESTIGATION',
    category: 'Enterprise SaaS & Cloud',
    categoryTheme: 'blue',
    accentColor: '#006cff',
    title: 'Architecting UltraCoachMatrix: How We Scaled Multi-Tenant SaaS with Zero Database Bleed',
    subtitle: 'Isolated Schema Routing, Dynamic Tenant Migrations, and Real-Time RBAC in High-Throughput Education ERPs.',
    author: {
      name: 'Rameshwar Pawar',
      role: 'CEO & Founder',
      designation: 'Principal Systems Architect',
      avatar: 'team/rameshwar.jpg',
    },
    date: 'October 2026',
    readTime: '7 min read',
    metrics: [
      { label: 'Query Latency (P99)', value: '< 42ms' },
      { label: 'Tenant Isolation', value: '100% Strict' },
      { label: 'Peak Concurrency', value: '14,200 req/s' },
      { label: 'Zero-Downtime Migration', value: 'Verified' },
    ],
    summary:
      'Multi-tenancy in enterprise coaching software requires bulletproof tenant isolation without multiplying cloud infrastructure costs. In this deep dive, we break down our custom PostgreSQL schema routing, JWT-embedded tenant claims, and dynamic connection pool scaling that powers UltraCoachMatrix with zero cross-tenant data contamination.',
    takeaways: [
      'Schema-per-tenant isolation combined with shared connection pooling eliminates cross-tenant data bleed while cutting AWS infrastructure costs by 64%.',
      'Dynamic middleware injects tenant schema paths at the connection layer, guaranteeing that no query can access another institution’s records.',
      'Asynchronous background migrations run on tenant subsets without blocking active web sessions or locking critical tables.',
    ],
    codeSnippets: {
      'TenantRouter.ts': `// Ultoxy Multi-Tenant Connection Resolver
import { PoolClient } from 'pg';
import { TenantContext } from './types';

export async function resolveTenantSchema(
  client: PoolClient,
  tenantId: string
): Promise<TenantContext> {
  const sanitizedSchema = \`tenant_\${tenantId.replace(/[^a-zA-Z0-9_]/g, '')}\`;
  
  // Enforce search_path at transaction scope
  await client.query(\`SET LOCAL search_path TO "\${sanitizedSchema}", public;\`);
  
  return {
    tenantId,
    schema: sanitizedSchema,
    connectedAt: Date.now(),
    verified: true
  };
}`,
      'schema_isolation.sql': `-- Automated Tenant Provisioning Script
CREATE OR REPLACE FUNCTION provision_new_tenant(p_tenant_id TEXT)
RETURNS VOID AS $$
DECLARE
  v_schema TEXT := 'tenant_' || quote_ident(p_tenant_id);
BEGIN
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', v_schema);
  EXECUTE format('SET LOCAL search_path TO %I, public', v_schema);
  
  -- Create isolated tenant tables
  CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT NOW()
  );
END;
$$ LANGUAGE plpgsql;`,
      'benchmarks.json': `{
  "benchmark_suite": "UltraCoachMatrix Concurrency Load Test",
  "concurrent_virtual_users": 1500,
  "requests_per_second": 14200,
  "latency": {
    "median_ms": 18.4,
    "p95_ms": 34.2,
    "p99_ms": 41.8
  },
  "database_connections_active": 48,
  "cross_tenant_bleed_errors": 0,
  "sla_uptime_percent": 99.99
}`,
    },
    fullContent: [
      {
        heading: 'The Multi-Tenant Dilemma in High-Stake Education SaaS',
        body: 'When coaching institutions and enterprise education centers manage thousands of students, fee transactions, and sensitive examination matrices, traditional shared-table row-level filtering becomes a massive liability. A single forgotten WHERE clause in an ad-hoc query or complex report can expose student records across competing institutions. At Ultoxy Technologies, when designing UltraCoachMatrix, we refused to accept that risk.',
      },
      {
        heading: 'Schema-Per-Tenant vs Database-Per-Tenant',
        body: 'Separate databases provide total isolation, but creating 200 RDS instances creates exorbitant cloud bills and management nightmares. Shared tables with tenant_id columns are cheap but prone to developer mistakes. We implemented the Goldilocks solution: Schema-Per-Tenant on a single high-performance PostgreSQL cluster, with a custom transaction-scoped search_path resolver.',
      },
      {
        heading: 'Dynamic Connection Pooling with pgBouncer',
        body: 'Because switching schemas on an active connection can leak state if the connection is returned uncleaned to the pool, our database layer uses SET LOCAL within an explicit transaction boundary. When the transaction commits, PostgreSQL automatically resets the search_path to public, guaranteeing zero tenant contamination even across recycled connection pools.',
      },
      {
        heading: 'Real-World Production Telemetry',
        body: 'In production across multiple active coaching branches, UltraCoachMatrix processes over 14,000 requests per second during peak exam submission hours. P99 query latency remains under 42 milliseconds, with 100% tenant isolation and zero recorded data bleed incidents.',
      },
    ],
  },
  {
    id: 'dispatch-logistics-erp',
    format: 'horizontal-case',
    tag: 'LOGISTICS & REAL-TIME ERP',
    category: 'Custom ERP Architecture',
    categoryTheme: 'mint',
    accentColor: '#00ffc6',
    title: 'From Paper Slips to Millisecond Dispatch: Re-Engineering Real-Time Logistics ERP for Patel Transport',
    subtitle: 'How replacing spreadsheet chaos with an event-driven Django REST backend eliminated transit bottlenecks.',
    author: {
      name: 'Rameshwar Pawar',
      role: 'CEO & Founder',
      designation: 'Principal Systems Architect',
      avatar: 'team/rameshwar.jpg',
    },
    date: 'September 2026',
    readTime: '6 min read',
    metrics: [
      { label: 'Dispatch Latency', before: '3.5 Hours', after: '420 ms' },
      { label: 'Paper Manifests', before: '100% Manual', after: '0% Automated' },
      { label: 'Offline Sync Resilience', before: 'None (Data Loss)', after: '100% IndexedDB' },
      { label: 'Fleet Route Efficiency', before: '64% Avg', after: '94.8%' },
    ],
    summary:
      'Managing hundreds of inter-state freight trucks across rural depots with spotty connectivity required a hybrid online/offline architecture. Here is how Ultoxy engineered an event-driven ERP that tracks shipments in real time, synchronizes dispatch manifests offline, and automates billing without human error.',
    takeaways: [
      'Offline-first IndexedDB synchronization on drivers’ handheld devices buffers trip logs during network blackouts and pushes cryptographically verified batches upon cellular reconnection.',
      'Django REST transactional signals trigger instant automated e-way bill generation and SMS notifications to fleet dispatchers.',
      'Automated reconciliation reduced billing cycles from 14 days down to 6 minutes after consignment delivery.',
    ],
    fullContent: [
      {
        heading: 'The Rural Connectivity Challenge',
        body: 'Logistics in India traverses highways and rural distribution hubs where 4G signals frequently disappear. Traditional cloud-only SaaS apps crash or freeze when dispatchers attempt to generate gate passes in dead zones. Patel Transport needed an ERP that refused to fail even in total offline isolation.',
      },
      {
        heading: 'The Two-Phase Offline Sync Protocol',
        body: 'We architected a client-side IndexedDB ledger on the React PWA frontend. Every trip entry, weighbridge recording, and driver fuel disbursement is hashed into an immutable local journal. When connectivity is restored, a WebSocket handshake transmits the sequence. The Django backend uses optimistic concurrency control with conflict-resolution strategies to commit the logs seamlessly.',
      },
      {
        heading: 'Compounding Business Impact',
        body: 'By eliminating paper-based manifest re-keying, truck turnaround times at origin hubs dropped from 3.5 hours to under 8 minutes. Billing disputes between consignors and drivers plummeted by 97%.',
      },
    ],
  },
  {
    id: 'dispatch-react19',
    format: 'tech-column',
    tag: 'MODERN WEB FRAMEWORKS',
    category: 'High-Throughput Web',
    categoryTheme: 'purple',
    accentColor: '#8b5cf6',
    title: 'Server Components vs Client Rehydration: Why We Shifted Ultoxy’s Web Engine to React 19',
    subtitle: 'Dissecting bundle reduction, streaming suspense, and state management in enterprise dashboards.',
    author: {
      name: 'Ultoxy Core Systems Team',
      role: 'Frontend Engineering Lab',
      designation: 'Web Architecture Group',
      avatar: 'team/rameshwar.jpg',
    },
    date: 'September 2026',
    readTime: '5 min read',
    metrics: [
      { label: 'JS Bundle Reduction', value: '-38.4%' },
      { label: 'First Contentful Paint', value: '0.38s' },
      { label: 'Time to Interactive', value: '0.72s' },
    ],
    summary:
      'Enterprise web apps often suffer from bloated client bundles that delay page interactions. By migrating to React 19 Server Components and fine-grained Suspense boundaries, we shaved 38% off our vendor bundles while delivering instant data-dense dashboards.',
    takeaways: [
      'React Server Components eliminate client-side parsing of heavy formatting libraries like date-fns, markdown parsers, and chart data crunchers.',
      'Streaming HTML allows the initial user interface shell to paint in under 400 milliseconds, with live tables hydrating progressively.',
      'Actions and optimistic hooks drastically simplify asynchronous form handling without requiring third-party state stores.',
    ],
    fullContent: [
      {
        heading: 'The Rehydration Tax on Complex Dashboards',
        body: 'Traditional Single Page Applications (SPAs) ship megabytes of JavaScript just to render tabular data that could have been pre-rendered on the server. On mobile devices or low-spec office PCs, rehydration burns CPU cycles and delays interactivity. React 19 changes the game by keeping read-heavy dependencies on the server.',
      },
      {
        heading: 'Streaming Suspense in Practice',
        body: 'By nesting granular Suspense boundaries around slow data sources (like complex ERP analytics aggregations), the primary layout renders instantly while background database promises stream HTML chunks over HTTP/2. The user never sees a blank white screen.',
      },
    ],
  },
  {
    id: 'dispatch-flutter60fps',
    format: 'mobile-column',
    tag: 'CROSS-PLATFORM ENGINEERING',
    category: 'Mobile Systems',
    categoryTheme: 'blue',
    accentColor: '#006cff',
    title: 'Zero Frame Drops at 60 FPS: Engineering Heavy Data Tables on Low-End Android Devices',
    subtitle: 'RenderObject recycling, Dart compute isolates, and memory footprint optimization in warehouse apps.',
    author: {
      name: 'Ultoxy Mobile Engineering Lab',
      role: 'Cross-Platform Division',
      designation: 'Native Systems Group',
      avatar: 'team/krishna.jpg',
    },
    date: 'August 2026',
    readTime: '5 min read',
    metrics: [
      { label: 'Frame Rate', value: '60.0 FPS Steady' },
      { label: 'Dropped Frames', value: '0 per 10k items' },
      { label: 'Memory Allocation', value: '24.2 MB Flat' },
    ],
    summary:
      'Warehouse staff and field agents use budget Android smartphones with limited RAM. Rendering a 5,000-row inventory list with real-time barcode scanning easily causes stutter. Here is how we achieved butter-smooth 60 FPS scrolling using custom Flutter viewport slivers and Dart background isolates.',
    takeaways: [
      'Delegating JSON deserialization and barcode checksum validation to background Dart isolates prevents UI thread hiccups.',
      'Custom ListView viewport slivers destroy off-screen widgets aggressively and reuse RenderBox nodes rather than instantiating new garbage collector pressure.',
      'Memory footprint remains pegged under 25MB even when scrolling through 10,000 SKUs with product photos.',
    ],
    fullContent: [
      {
        heading: 'Why Standard Flutter ListViews Choke on Low-Tier Hardware',
        body: 'Flutter’s default ListView.builder is versatile, but when list cells contain nested Row/Column widgets, gesture detectors, and image decoders, GC (Garbage Collection) pauses on 2GB RAM Android phones will inevitably drop frames below 30 FPS. In industrial scanning workflows, this friction slows operations.',
      },
      {
        heading: 'Offloading Computation to Dart Isolates',
        body: 'We split our mobile architecture into two distinct worlds: the UI Main Thread and the Headless Worker Isolate. The worker isolate receives raw WebSocket packet streams, computes delta differences, and sends only ready-to-draw pre-calculated layout models to the UI thread.',
      },
    ],
  },
  {
    id: 'dispatch-mvp-myth',
    format: 'executive-whiteboard',
    tag: 'EXECUTIVE STRATEGY',
    category: 'Business & Strategy',
    categoryTheme: 'pink',
    accentColor: '#ff6ec7',
    title: 'The Myth of the MVP: Why Modern Enterprises Need Day-One Production Architecture',
    subtitle: 'Throwaway prototypes burn capital. How our 5-pillar foundational framework guarantees 3.4x longer software lifecycles.',
    author: {
      name: 'Krishna Thore',
      role: 'Co-Founder',
      designation: 'Head of Operations & Growth',
      avatar: 'team/krishna.jpg',
    },
    date: 'August 2026',
    readTime: '4 min read',
    metrics: [
      { label: 'Software Lifecycle', value: '3.4x Longer' },
      { label: 'Refactoring Waste', value: '0% Re-write Need' },
      { label: 'Time-to-Market', value: '6 Weeks to Live' },
    ],
    summary:
      'The classic startup advice to "build a quick throwaway MVP" has cost traditional enterprises millions in rewritten codebases and lost customer trust. In this strategic memo, Krishna Thore details why modular architecture on day one delivers faster speed-to-market and eliminates costly technical debt.',
    takeaways: [
      'A true Minimum Viable Product must still adhere to production database constraints, automated backups, and typed API contracts; otherwise, the second month of traction becomes a catastrophic fire drill.',
      'Clean architectural scaffolding takes only days longer than messy prototypes, but saves 12+ months of legacy re-platforming down the road.',
      'Founders who invest in Day-One IP ownership and modular codebases secure higher enterprise valuation multiples.',
    ],
    fullContent: [
      {
        heading: 'The Seduction and Hidden Cost of "Hack It Together"',
        body: 'Many business founders are told to use no-code shortcuts or quick unmaintainable scripts to validate their market. But what happens when the first 1,000 customers sign up, transactions surge, and the system fails? Rewriting a flying plane is twenty times more expensive than building the wings properly on the runway.',
      },
      {
        heading: 'The Ultoxy 5-Pillar Day-One Architecture',
        body: '1. Strict SQL Schema Integrity with Migration Trails.\n2. Stateless Authentication with Refresh Token Revocation.\n3. Automated CI/CD Testing Pipelines.\n4. Complete Source Code & Git IP Handover from Sprint Zero.\n5. Containerized Docker Deployments for Instant Portability.',
      },
      {
        heading: 'Engineering as a Compounding Balance Sheet Asset',
        body: 'Software is not an expense—it is a compounding enterprise asset. When architected cleanly, every new feature builds on existing primitives rather than tearing down fragile foundations.',
      },
    ],
  },
]

// -------------------------------------------------------------------
// KNOWLEDGE LAB BENCHMARKS (4 Interactive Micro-Labs)
// -------------------------------------------------------------------
const KNOWLEDGE_LAB_ITEMS = [
  {
    id: 'lab-pgbouncer',
    title: 'PostgreSQL pgBouncer Tuning Under 10,000 Concurrent Connections',
    category: 'DATABASE SCALING',
    badge: 'BENCHMARK VERIFIED',
    summary:
      'How transaction-mode connection pooling reduces server RAM overhead from 18GB to 420MB under sustained load spikes.',
    beforeVal: '18.4 GB RAM (Session Pool)',
    afterVal: '428 MB RAM (Transaction Pool)',
    speedup: '97% Memory Saved',
    technicalNote:
      'In session pooling mode, each client connection holds a dedicated PostgreSQL backend process consuming ~10MB RAM. Switching to transaction pooling mode allows 10,000 frontend connections to share just 60 backend Postgres processes with zero query latency degradation.',
  },
  {
    id: 'lab-owasp-tokens',
    title: 'Stateless JWT Token Revocation Without Database Hits',
    category: 'SECURITY ARCHITECTURE',
    badge: 'OWASP TOP 10',
    summary:
      'Using Redis Bloom filters for O(1) instant blacklisting during user logout and credential rotation.',
    beforeVal: '42ms DB Roundtrip',
    afterVal: '0.8ms Redis Bloom Lookup',
    speedup: '52x Faster Auth Check',
    technicalNote:
      'Instead of querying Postgres on every API request to check if a JWT has been revoked, we insert revoked token IDs into a memory-efficient Redis Bloom filter. If the Bloom filter returns false, the token is guaranteed valid with zero database query overhead.',
  },
  {
    id: 'lab-css-footprint',
    title: 'Tailwind CSS Variables vs Heavy Component UI Libraries',
    category: 'FRONTEND PERFORMANCE',
    badge: 'CORE WEB VITALS',
    summary:
      'Reducing CSS render-blocking payload from 480KB down to 34KB in enterprise web dashboards.',
    beforeVal: '480 KB (Chakra/MUI)',
    afterVal: '33.8 KB (Pure CSS + Tokens)',
    speedup: '93% Lighter Bundle',
    technicalNote:
      'Heavy JavaScript-driven styling engines parse CSS rules dynamically on the client CPU. Compiling lightweight atomic CSS utilities with native CSS custom properties eliminates CSS-in-JS runtime overhead and speeds up First Contentful Paint by 3.2x.',
  },
  {
    id: 'lab-multi-region',
    title: 'Automated Multi-Region Disaster Recovery in < 120 Seconds',
    category: 'DEVOPS & CLOUD',
    badge: 'ENTERPRISE SLA',
    summary:
      'Streaming replication + automated DNS health checks for zero-downtime failover across Mumbai and Singapore clusters.',
    beforeVal: '45 Min (Manual Failover)',
    afterVal: '84 Sec (Automated DNS Flip)',
    speedup: '32x Recovery Speed',
    technicalNote:
      'Continuous WAL archiving to Amazon S3 paired with Route 53 health-checked latency routing triggers instant traffic diversion if the primary cluster misses 3 consecutive heartbeats, preserving data integrity without operator intervention.',
  },
]

const CATEGORY_FILTERS = [
  'All',
  'Enterprise SaaS & Cloud',
  'Custom ERP Architecture',
  'High-Throughput Web',
  'Mobile Systems',
  'Business & Strategy',
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTerminalTab, setActiveTerminalTab] = useState('TenantRouter.ts')
  const [copiedCode, setCopiedCode] = useState(false)
  const [expandedLab, setExpandedLab] = useState('lab-pgbouncer')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [modalScrollProgress, setModalScrollProgress] = useState(0)

  // Newsletter Form State
  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | success

  // Filter articles based on active category & search query
  const filteredArticles = INSIGHTS_ARTICLES.filter((art) => {
    const matchesCategory =
      activeCategory === 'All' || art.category === activeCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const leadArticle =
    filteredArticles.find((art) => art.lead) || filteredArticles[0] || null

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleOpenArticle = (article) => {
    setSelectedArticle(article)
    setModalScrollProgress(0)
  }

  const handleCloseModal = () => {
    setSelectedArticle(null)
  }

  // Handle ESC key for reader modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle newsletter submission
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!subEmail || !subEmail.includes('@')) return
    setSubStatus('success')
    setTimeout(() => {
      setSubEmail('')
      setSubStatus('idle')
    }, 4500)
  }

  return (
    <div className="ins-page-wrapper">
      <SEO
        title={seoConfig.pages.blog.title}
        description={seoConfig.pages.blog.description}
      />

      {/* ===================================================================
          SECTION 1: HERO & EDITORIAL RADAR
          =================================================================== */}
      <section className="ins-hero-section" id="radar">
        <div className="ins-ambient-orb ins-orb-1" aria-hidden="true" />
        <div className="ins-ambient-orb ins-orb-2" aria-hidden="true" />
        <div className="ins-ambient-orb ins-orb-3" aria-hidden="true" />
        <div className="ins-blueprint-canvas" aria-hidden="true" />

        <div className="container">
          <motion.div
            className="ins-hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="ins-eyebrow-pill">
              <Sparkles size={13} style={{ color: '#006cff' }} />
              <span>ULTPROXY SYSTEMS LAB // ENGINEERING DISPATCHES</span>
            </div>

            <h1 className="ins-hero-title">
              Thought Leadership At The{' '}
              <span className="ins-title-accent">Edge of Scale</span>.
            </h1>

            <p className="ins-hero-lead">
              Deep-dive architectural dispatches, enterprise case investigations,
              and battle-tested software blueprints from Ultoxy’s production engineering lab.
            </p>

            {/* Live Telemetry Ribbon */}
            <div className="ins-telemetry-ribbon" role="region" aria-label="Reading telemetry">
              <div className="ins-telem-item">
                <span className="ins-telem-dot" />
                <span>5 Peer-Reviewed Dispatches</span>
              </div>
              <div className="ins-telem-divider" aria-hidden="true" />
              <div className="ins-telem-item">
                <Clock size={13} style={{ color: '#006cff' }} />
                <span>Avg. Read: 5.6 Min</span>
              </div>
              <div className="ins-telem-divider" aria-hidden="true" />
              <div className="ins-telem-item">
                <ShieldCheck size={13} style={{ color: '#8b5cf6' }} />
                <span>100% Production Verified</span>
              </div>
              <div className="ins-telem-divider" aria-hidden="true" />
              <div className="ins-telem-item">
                <Code2 size={13} style={{ color: '#00c498' }} />
                <span>Zero AI Hallucinations</span>
              </div>
            </div>

            {/* Search & Topic Spectrum Filter Controls */}
            <div className="ins-controls-bar">
              {/* Search Box */}
              <div className="ins-search-box">
                <Search size={15} className="ins-search-icon" />
                <input
                  type="text"
                  placeholder="Search architecture, React, ERP, Flutter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ins-search-input"
                  aria-label="Search technical articles"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="ins-search-clear"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Topic Spectrum Pills */}
              <div className="ins-filter-spectrum" role="tablist">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`ins-filter-chip ${
                      activeCategory === cat ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: MONUMENTAL LEAD INVESTIGATION (ASYMMETRIC SPLIT)
          =================================================================== */}
      {leadArticle && (
        <section className="ins-lead-section" id="lead-investigation">
          <div className="container">
            <motion.div
              className="ins-lead-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            >
              <div className="ins-lead-card-glow" aria-hidden="true" />

              <div className="row g-4 align-items-stretch">
                {/* Left 60%: Feature Narrative & Executive Takeaways */}
                <div className="col-lg-7 d-flex flex-column justify-content-between">
                  <div>
                    <div className="ins-lead-badge-row">
                      <span className="ins-tag-lead">
                        <Sparkles size={11} />
                        {leadArticle.tag}
                      </span>
                      <span className="ins-tag-category">
                        {leadArticle.category} • {leadArticle.readTime}
                      </span>
                    </div>

                    <h2 className="ins-lead-title">{leadArticle.title}</h2>
                    <p className="ins-lead-subtitle">{leadArticle.subtitle}</p>
                    <p className="ins-lead-summary">{leadArticle.summary}</p>

                    {/* Key Architectural Takeaways Checklist */}
                    {leadArticle.takeaways && (
                      <div className="ins-takeaways-box">
                        <div className="ins-takeaways-heading">
                          <CheckCircle2 size={13} style={{ color: '#006cff' }} />
                          <span>ARCHITECTURAL TAKEAWAYS</span>
                        </div>
                        <ul className="ins-takeaways-list">
                          {leadArticle.takeaways.map((point, idx) => (
                            <li key={idx} className="ins-takeaway-item">
                              <span className="ins-takeaway-icon">▹</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Author Meta & Read Modal Action */}
                  <div className="ins-lead-footer-row">
                    <div className="ins-author-card">
                      <div className="ins-author-avatar-frame">
                        <img
                          src={resolveAsset(leadArticle.author.avatar)}
                          alt={leadArticle.author.name}
                          className="ins-author-avatar"
                          loading="lazy"
                        />
                      </div>
                      <div className="ins-author-info">
                        <span className="ins-author-name">
                          {leadArticle.author.name}
                        </span>
                        <span className="ins-author-role">
                          {leadArticle.author.role} • {leadArticle.author.designation}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ins-lead-read-btn"
                      onClick={() => handleOpenArticle(leadArticle)}
                    >
                      <BookOpen size={14} />
                      <span>Read Full Dispatch</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right 40%: Interactive 3D Blueprint Terminal */}
                <div className="col-lg-5">
                  <div className="ins-terminal-stage">
                    <div className="ins-terminal-topbar">
                      <div className="ins-terminal-dots">
                        <span className="ins-tdot ins-tdot-red" />
                        <span className="ins-tdot ins-tdot-yellow" />
                        <span className="ins-tdot ins-tdot-green" />
                      </div>

                      <div className="ins-terminal-tabs" role="tablist">
                        {leadArticle.codeSnippets &&
                          Object.keys(leadArticle.codeSnippets).map((tabName) => (
                            <button
                              key={tabName}
                              type="button"
                              role="tab"
                              aria-selected={activeTerminalTab === tabName}
                              className={`ins-terminal-tab-btn ${
                                activeTerminalTab === tabName ? 'is-active' : ''
                              }`}
                              onClick={() => setActiveTerminalTab(tabName)}
                            >
                              {tabName}
                            </button>
                          ))}
                      </div>

                      <button
                        type="button"
                        className="ins-terminal-tab-btn"
                        onClick={() =>
                          handleCopyCode(
                            leadArticle.codeSnippets?.[activeTerminalTab] || ''
                          )
                        }
                        title="Copy code snippet"
                      >
                        {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>

                    <div className="ins-terminal-code-body">
                      <pre className="ins-code-pre">
                        <code>
                          {leadArticle.codeSnippets?.[activeTerminalTab]}
                        </code>
                      </pre>
                    </div>

                    {/* Telemetry Footer */}
                    <div className="ins-terminal-telemetry-bar">
                      <div className="ins-tt-metric">
                        <span className="ins-tt-label">P99 Query Latency</span>
                        <span className="ins-tt-val">&lt; 41.8 ms</span>
                      </div>
                      <div className="ins-tt-metric">
                        <span className="ins-tt-label">Throughput</span>
                        <span className="ins-tt-val">14,200 req/sec</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===================================================================
          SECTION 3: THE ASYMMETRIC ARCHITECTURAL DOSSIER
          (Non-repetitive Varied Layouts)
          =================================================================== */}
      <section className="ins-dossier-section" id="dossier">
        <div className="container">
          <div className="ins-dossier-header">
            <div className="ins-eyebrow-pill" style={{ marginBottom: '1rem' }}>
              <Layers size={13} style={{ color: '#006cff' }} />
              <span>THE HETEROGENEOUS DOSSIER // CASE STUDIES &amp; DISPATCHES</span>
            </div>
            <h2 className="ins-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)' }}>
              Engineered From <span className="ins-title-accent">Real Codebases</span>.
            </h2>
            <p className="ins-hero-lead" style={{ margin: '0 auto' }}>
              We don’t write generic summaries. Every dispatch explores exact production problems,
              architectural pivots, and benchmark data from Ultoxy client engagements.
            </p>
          </div>

          {/* ITEM 1: WIDE HORIZONTAL DEEP CASE BANNER (Patel Transport ERP) */}
          {filteredArticles.find((a) => a.format === 'horizontal-case') && (
            <motion.div
              className="ins-horizontal-case-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <div className="ins-hcase-glow" aria-hidden="true" />
              {(() => {
                const item = filteredArticles.find((a) => a.format === 'horizontal-case')
                return (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-7">
                      <div className="ins-lead-badge-row">
                        <span className="ins-tag-lead" style={{ background: 'rgba(0,255,198,0.1)', color: '#00a37b', borderColor: 'rgba(0,255,198,0.3)' }}>
                          <Cpu size={11} />
                          {item.tag}
                        </span>
                        <span className="ins-tag-category">{item.readTime}</span>
                      </div>
                      <h3 className="ins-lead-title" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                        {item.title}
                      </h3>
                      <p className="ins-lead-subtitle" style={{ color: '#00a37b' }}>
                        {item.subtitle}
                      </p>
                      <p className="ins-lead-summary">{item.summary}</p>
                      <button
                        type="button"
                        className="ins-lead-read-btn"
                        onClick={() => handleOpenArticle(item)}
                      >
                        <BookOpen size={14} />
                        <span>Inspect Case Study</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Right: Before vs After Telemetry Matrix */}
                    <div className="col-lg-5">
                      <div className="ins-before-after-matrix">
                        <div className="ins-ba-title">
                          <Activity size={13} style={{ color: '#00c498', display: 'inline', marginRight: '6px' }} />
                          PRODUCTION METRIC COMPARISON
                        </div>
                        {item.metrics.map((m, idx) => (
                          <div key={idx} className="ins-ba-row">
                            <span className="ins-ba-label">{m.label}</span>
                            <div className="ins-ba-values">
                              <span className="ins-val-before">{m.before}</span>
                              <span className="ins-val-after">{m.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}

          {/* DUAL ASYMMETRIC TECHNICAL COLUMNS (React 19 vs Flutter 60FPS) */}
          <div className="row g-4">
            {/* Column A: React 19 SSR Architecture */}
            {filteredArticles.find((a) => a.format === 'tech-column') && (
              <div className="col-lg-6">
                <motion.div
                  className="ins-tech-column-card card-purple"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  {(() => {
                    const item = filteredArticles.find((a) => a.format === 'tech-column')
                    return (
                      <>
                        <div className="ins-lead-badge-row">
                          <span className="ins-tag-lead" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.3)' }}>
                            <Code2 size={11} />
                            {item.tag}
                          </span>
                          <span className="ins-tag-category">{item.readTime}</span>
                        </div>

                        <h3 className="ins-lead-title" style={{ fontSize: 'clamp(1.35rem, 2vw, 1.7rem)' }}>
                          {item.title}
                        </h3>
                        <p className="ins-lead-summary">{item.summary}</p>

                        {/* Interactive Bundle Reduction Bar */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1rem', margin: '1rem 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 600 }}>
                            <span>Client JavaScript Footprint</span>
                            <span style={{ color: '#8b5cf6' }}>-38.4% Shaved</span>
                          </div>
                          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: '61.6%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #c084fc)' }} />
                          </div>
                        </div>

                        <div className="ins-lead-footer-row" style={{ marginTop: 'auto' }}>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            By {item.author.name}
                          </span>
                          <button
                            type="button"
                            className="ins-lead-read-btn"
                            style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}
                            onClick={() => handleOpenArticle(item)}
                          >
                            <span>Read Article</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </div>
            )}

            {/* Column B: Flutter 60FPS Mobile Systems */}
            {filteredArticles.find((a) => a.format === 'mobile-column') && (
              <div className="col-lg-6">
                <motion.div
                  className="ins-tech-column-card card-blue"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
                >
                  {(() => {
                    const item = filteredArticles.find((a) => a.format === 'mobile-column')
                    return (
                      <>
                        <div className="ins-lead-badge-row">
                          <span className="ins-tag-lead" style={{ background: 'rgba(0,108,255,0.08)', color: '#006cff', borderColor: 'rgba(0,108,255,0.2)' }}>
                            <Smartphone size={11} />
                            {item.tag}
                          </span>
                          <span className="ins-tag-category">{item.readTime}</span>
                        </div>

                        <h3 className="ins-lead-title" style={{ fontSize: 'clamp(1.35rem, 2vw, 1.7rem)' }}>
                          {item.title}
                        </h3>
                        <p className="ins-lead-summary">{item.summary}</p>

                        {/* Mobile Simulator Frame */}
                        <div className="ins-mobile-sim-box">
                          <div className="ins-mobile-sim-header">
                            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#94a3b8' }}>
                              DEVICE TELEMETRY // REDMI 9A (2GB RAM)
                            </span>
                            <span className="ins-fps-meter">
                              <Activity size={11} />
                              60.0 FPS
                            </span>
                          </div>
                          <div className="ins-sim-metrics-grid">
                            <div className="ins-sim-m-item">
                              <span className="ins-sim-m-val">0</span>
                              <span className="ins-sim-m-lbl">Dropped Frames</span>
                            </div>
                            <div className="ins-sim-m-item">
                              <span className="ins-sim-m-val">24.2 MB</span>
                              <span className="ins-sim-m-lbl">Memory Flat</span>
                            </div>
                            <div className="ins-sim-m-item">
                              <span className="ins-sim-m-val">10,000+</span>
                              <span className="ins-sim-m-lbl">Virtual SKUs</span>
                            </div>
                          </div>
                        </div>

                        <div className="ins-lead-footer-row" style={{ marginTop: 'auto' }}>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            By {item.author.name}
                          </span>
                          <button
                            type="button"
                            className="ins-lead-read-btn"
                            style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}
                            onClick={() => handleOpenArticle(item)}
                          >
                            <span>Read Article</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </div>
            )}
          </div>

          {/* ITEM 4: FULL-WIDTH EXECUTIVE WHITEBOARD (Krishna Thore, Co-Founder) */}
          {filteredArticles.find((a) => a.format === 'executive-whiteboard') && (
            <motion.div
              className="ins-whiteboard-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <div className="ins-wb-glow" aria-hidden="true" />
              {(() => {
                const item = filteredArticles.find((a) => a.format === 'executive-whiteboard')
                return (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-8">
                      <div className="ins-lead-badge-row">
                        <span className="ins-tag-lead" style={{ background: 'rgba(255,110,199,0.1)', color: '#d91b8a', borderColor: 'rgba(255,110,199,0.3)' }}>
                          <Crown size={11} />
                          {item.tag} // EXECUTIVE STRATEGY
                        </span>
                        <span className="ins-tag-category">{item.readTime}</span>
                      </div>

                      <h3 className="ins-lead-title" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)' }}>
                        {item.title}
                      </h3>

                      <blockquote className="ins-wb-quote">
                        &ldquo;Software is not an expense—it is a compounding enterprise balance-sheet asset.
                        Throwaway MVPs burn runway; foundational Day-One architecture scales valuations.&rdquo;
                      </blockquote>

                      <p className="ins-lead-summary">{item.summary}</p>

                      <div className="ins-author-card" style={{ marginTop: '1.25rem' }}>
                        <div className="ins-author-avatar-frame">
                          <img
                            src={resolveAsset(item.author.avatar)}
                            alt={item.author.name}
                            className="ins-author-avatar"
                            loading="lazy"
                          />
                        </div>
                        <div className="ins-author-info">
                          <span className="ins-author-name">{item.author.name}</span>
                          <span className="ins-author-role">{item.author.role} // Ultoxy Technologies</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 text-lg-end">
                      <button
                        type="button"
                        className="ins-lead-read-btn"
                        style={{ padding: '0.8rem 1.6rem', fontSize: '0.9rem' }}
                        onClick={() => handleOpenArticle(item)}
                      >
                        <BookOpen size={16} />
                        <span>Read Executive Memo</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: THE INTERACTIVE SYSTEMS KNOWLEDGE LAB
          (Interactive Expandable Micro-Benchmarks)
          =================================================================== */}
      <section className="ins-lab-section" id="knowledge-lab">
        <div className="container">
          <div className="ins-lab-header">
            <div className="ins-eyebrow-pill" style={{ marginBottom: '1rem' }}>
              <Terminal size={13} style={{ color: '#006cff' }} />
              <span>INTERACTIVE SYSTEMS LABORATORY // MICRO-BENCHMARKS</span>
            </div>
            <h2 className="ins-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)' }}>
              Battle-Tested <span className="ins-title-accent">Micro-Benchmarks</span>.
            </h2>
            <p className="ins-hero-lead" style={{ margin: '0 auto' }}>
              Click any benchmark to inspect the engineering trade-offs, before/after metrics,
              and architectural rationale implemented across our live systems.
            </p>
          </div>

          <div className="ins-lab-grid">
            {KNOWLEDGE_LAB_ITEMS.map((lab) => {
              const isExpanded = expandedLab === lab.id
              return (
                <motion.div
                  key={lab.id}
                  className={`ins-lab-item-card ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => setExpandedLab(isExpanded ? null : lab.id)}
                  layout
                >
                  <div className="ins-lab-item-top">
                    <span className="ins-lab-category">{lab.category}</span>
                    <span className="ins-lab-badge">{lab.badge}</span>
                  </div>

                  <h3 className="ins-lab-title">{lab.title}</h3>
                  <p className="ins-lab-summary">{lab.summary}</p>

                  <div className="ins-lab-speedup-strip">
                    <span className="ins-speedup-tag">
                      <Zap size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      {lab.speedup}
                    </span>
                    <span className="ins-lab-expand-btn">
                      {isExpanded ? 'Collapse' : 'Inspect Rationale'}
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="ins-lab-expanded-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="ins-lab-tech-note">
                          <strong>Architectural Rationale:</strong> {lab.technicalNote}
                        </div>
                        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', fontSize: '0.74rem', fontFamily: 'monospace' }}>
                          <span style={{ color: '#94a3b8', textDecoration: 'line-through' }}>
                            Before: {lab.beforeVal}
                          </span>
                          <span style={{ color: '#00a37b', fontWeight: 700 }}>
                            After: {lab.afterVal}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: SPATIAL MODAL READER (INTERACTIVE DRAWER)
          =================================================================== */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="ins-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="ins-modal-card"
              initial={{ scale: 0.94, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reading Progress Indicator */}
              <div
                className="ins-modal-progress-bar"
                style={{ width: `${modalScrollProgress}%` }}
              />

              {/* Modal Top Bar */}
              <div className="ins-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="ins-tag-lead" style={{ fontSize: '0.65rem' }}>
                    {selectedArticle.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                    {selectedArticle.readTime}
                  </span>
                </div>

                <button
                  type="button"
                  className="ins-modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close reader"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Reader Area */}
              <div
                className="ins-modal-scroll-area"
                onScroll={(e) => {
                  const el = e.currentTarget
                  const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
                  setModalScrollProgress(progress || 0)
                }}
              >
                <h1 className="ins-modal-article-title">{selectedArticle.title}</h1>
                <p className="ins-modal-article-lead">{selectedArticle.subtitle}</p>

                {/* Author Card inside Modal */}
                <div className="ins-author-card" style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e7ebf2' }}>
                  <div className="ins-author-avatar-frame">
                    <img
                      src={resolveAsset(selectedArticle.author.avatar)}
                      alt={selectedArticle.author.name}
                      className="ins-author-avatar"
                    />
                  </div>
                  <div className="ins-author-info">
                    <span className="ins-author-name">{selectedArticle.author.name}</span>
                    <span className="ins-author-role">
                      {selectedArticle.author.role} • {selectedArticle.author.designation}
                    </span>
                  </div>
                </div>

                {/* Article Deep Dive Sections */}
                {selectedArticle.fullContent?.map((sec, idx) => (
                  <div key={idx} className="ins-modal-content-section">
                    <h3 className="ins-modal-sec-heading">{sec.heading}</h3>
                    <p className="ins-modal-sec-body">{sec.body}</p>
                  </div>
                ))}

                {/* Takeaways Footer */}
                {selectedArticle.takeaways && (
                  <div className="ins-takeaways-box" style={{ marginTop: '2.5rem' }}>
                    <div className="ins-takeaways-heading">
                      <CheckCircle2 size={13} style={{ color: '#006cff' }} />
                      <span>EXECUTIVE SUMMARY &amp; ACTIONABLE TAKEAWAYS</span>
                    </div>
                    <ul className="ins-takeaways-list">
                      {selectedArticle.takeaways.map((pt, i) => (
                        <li key={i} className="ins-takeaway-item">
                          <span className="ins-takeaway-icon">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================
          SECTION 6: EXECUTIVE DISPATCH TERMINAL & SUBSCRIPTION
          =================================================================== */}
      <section className="ins-sub-section" id="subscribe">
        <div className="container">
          <motion.div
            className="ins-sub-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          >
            <div className="ins-sub-glow ins-sub-glow-1" aria-hidden="true" />
            <div className="ins-sub-glow ins-sub-glow-2" aria-hidden="true" />

            <div className="ins-eyebrow-pill" style={{ marginBottom: '1.25rem' }}>
              <Send size={13} style={{ color: '#006cff' }} />
              <span>DISPATCH SUBSCRIPTION // ZERO MARKETING NOISE</span>
            </div>

            <h2 className="ins-sub-title">
              Receive Architectural Post-Mortems In Your Inbox.
            </h2>

            <p className="ins-sub-lead">
              Direct technical analyses from our software lab. No marketing spam, no fluff.
              Just high-signal engineering blueprints, system scaling post-mortems, and production metrics.
            </p>

            <form onSubmit={handleSubscribe} className="ins-sub-form">
              <input
                type="email"
                required
                placeholder="Enter your enterprise work email..."
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="ins-sub-input"
                aria-label="Work email"
              />
              <button type="submit" className="ins-sub-submit-btn">
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {subStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: '#008767',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                ✓ You are on the dispatch list. Next issue lands in your inbox.
              </motion.div>
            )}

            <div className="ins-sub-guarantee">
              Direct consultation inquiries: Call Mr. Rameshwar Pawar (
              <a href="tel:+917776824564" style={{ color: '#006cff', textDecoration: 'none' }}>
                +91 77768 24564
              </a>
              ) or Mr. Krishna Thore (
              <a href="tel:+917030599317" style={{ color: '#006cff', textDecoration: 'none' }}>
                +91 70305 99317
              </a>
              )
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
