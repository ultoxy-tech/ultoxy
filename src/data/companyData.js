/**
 * ULTOXY TECHNOLOGIES — Centralized Business, Portfolio, Testimonials & SEO Data
 * Source of Truth: Extracted directly from the existing Ultoxy Django Website & SQLite DB
 */

export const companyInfo = {
  name: 'Ultoxy Technologies',
  shortName: 'Ultoxy',
  tagline: 'Elevate Everything With Ultoxy',
  secondaryTagline: 'Your Partner in Digital Growth',
  mission:
    'At Ultoxy, we specialize in designing and building high-quality websites, mobile apps, and custom software that help businesses grow and succeed online. Our expert team combines creative design, smart development, and data-driven marketing to deliver solutions that are tailored to your unique goals.',
  shortDescription:
    'We deliver innovative solutions in website development, mobile apps, enterprise ERP software, and digital transformation. Empowering businesses with cutting-edge technology.',
  location: {
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    fullAddress: 'Pune, Maharashtra, India',
  },
  contact: {
    primaryEmail: 'info@ultoxy.com',
    secondaryEmail: 'ultoxy.tech@gmail.com',
    phones: [
      {
        number: '+91 77768 24564',
        raw: '+917776824564',
        person: 'Mr. Rameshwar Pawar',
        role: 'Co-Founder & Software Developer',
      },
      {
        number: '+91 70305 99317',
        raw: '+917030599317',
        person: 'Mr. Krishna Thore',
        role: 'CEO & Founder',
      },
    ],
    responseTime: '24-Hour Response SLA',
  },
  socials: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
  },
  stats: {
    projectsDelivered: '11+',
    coreServices: '5',
    clientSatisfaction: '100%',
  },
}

export const aboutFeatures = [
  {
    title: 'Custom Website & App Development',
    description:
      'Tailor-made web portals, e-commerce platforms, and cross-platform mobile apps engineered for speed and reliability.',
    icon: 'code',
  },
  {
    title: 'Creative UI/UX Design',
    description:
      'Human-centric, conversion-focused interfaces with modern multi-color aesthetics and intuitive user journeys.',
    icon: 'palette',
  },
  {
    title: 'Data-Driven Digital Marketing',
    description:
      'Targeted Google Ads, social media campaigns, and technical SEO strategies that drive measurable business growth.',
    icon: 'trending',
  },
  {
    title: 'Reliable, Scalable Solutions',
    description:
      'Enterprise-grade ERP architecture, secure cloud deployment, and dedicated support built to scale with your business.',
    icon: 'shield',
  },
]

export const whyChooseUltoxy = [
  {
    id: 'experienced-developers',
    title: 'Experienced Developers',
    description: 'A passionate engineering team with proven expertise across web, mobile, and ERP.',
    metric: '100% In-House',
    icon: 'users',
  },
  {
    id: 'scalable-secure',
    title: 'Scalable & Secure',
    description: 'Future-ready software architectures engineered to grow seamlessly with your business.',
    metric: 'Enterprise Grade',
    icon: 'lock',
  },
  {
    id: 'result-oriented',
    title: 'Result-Oriented',
    description: 'Focused on achieving measurable operational efficiency, traffic, and revenue outcomes.',
    metric: 'ROI Focused',
    icon: 'target',
  },
  {
    id: 'affordable-pricing',
    title: 'Competitive Pricing',
    description: 'Premium agency craftsmanship and enterprise engineering at transparent, competitive rates.',
    metric: 'High Value',
    icon: 'award',
  },
]

export const serviceCategories = [
  {
    id: 'website-development',
    slug: 'website-development',
    number: '01',
    title: 'Website Development',
    shortTitle: 'Web Engineering',
    tagline: 'Static, dynamic, and e-commerce websites built with speed, security, and creativity.',
    description:
      'We design and develop responsive, modern, and scalable websites tailored to your brand and business goals—from corporate portals to full-scale e-commerce systems.',
    badge: 'Core Practice',
    deliverables: [
      'Static & Dynamic Websites',
      'E-Commerce Websites',
      'CMS Solutions & Portals',
      'Creative UI/UX Architecture',
    ],
    techTags: ['React', 'Django', 'Next.js', 'REST APIs'],
    caseStudy: {
      client: 'Saint Monica International School & Sai Land Developers',
      result: 'Dynamic web portals & real-time content management systems',
    },
    metrics: { label: 'Page Speed Target', value: '99/100' },
    iconType: 'web',
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    number: '02',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Android and iOS applications designed for usability, performance, and scalability.',
    description:
      'Our team builds user-friendly Android and iOS mobile applications with high performance, intuitive UI/UX design, and seamless cloud backend integration.',
    badge: 'iOS & Android',
    deliverables: [
      'Android App Engineering',
      'iOS App Development',
      'Cross-Platform (Flutter) Apps',
      'UI/UX Design & App Maintenance',
    ],
    techTags: ['Flutter', 'Android', 'iOS', 'Firebase'],
    caseStudy: {
      client: 'Cross-Platform Mobile Ecosystems',
      result: '60fps native performance with single-codebase velocity',
    },
    metrics: { label: 'Time-to-Market', value: '2x Faster' },
    iconType: 'mobile',
  },
  {
    id: 'desktop-software-erp',
    slug: 'desktop-software-erp',
    number: '03',
    title: 'Desktop & ERP Software',
    shortTitle: 'ERP & Software',
    tagline: 'Custom ERP and desktop software solutions to simplify and optimize business operations.',
    description:
      'We create powerful desktop applications and custom enterprise ERP systems tailored to your business processes, ensuring reliability, security, and workflow automation.',
    badge: 'Enterprise ERP',
    deliverables: [
      'Custom ERP Systems',
      'Business & Transport Management Tools',
      'Institute & Exam Software (ExamTrax)',
      'Cross-Platform Software & Support',
    ],
    techTags: ['Custom ERP', 'Python', 'Cloud DB', 'Automation'],
    caseStudy: {
      client: 'Sai Land Developers ERP & Patel Transport ERP',
      result: 'End-to-end operational automation from booking to dispatch',
    },
    metrics: { label: 'Workflow Efficiency', value: '+300%' },
    iconType: 'software',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    number: '04',
    title: 'Digital Marketing',
    shortTitle: 'Digital Growth',
    tagline: 'From social media to campaigns, we craft strategies that drive visibility and results.',
    description:
      'Boost your online presence and reach the right audience with our data-driven digital marketing strategies, performance campaigns, and brand storytelling.',
    badge: 'Growth Engine',
    deliverables: [
      'Social Media Marketing',
      'Content & Brand Strategy',
      'Google Ads & Paid Campaigns',
      'Email & Lead Funnel Marketing',
    ],
    techTags: ['Google Ads', 'Social Media', 'Analytics', 'CRO'],
    caseStudy: {
      client: 'Multi-Industry Brand Campaigns',
      result: 'Measurable lead generation and sustained digital visibility',
    },
    metrics: { label: 'Campaign Focus', value: 'ROI-Driven' },
    iconType: 'marketing',
  },
  {
    id: 'seo-optimization',
    slug: 'seo-optimization',
    number: '05',
    title: 'SEO Optimization',
    shortTitle: 'Technical SEO',
    tagline: 'On-page, off-page, and technical SEO practices that help you rank and grow organically.',
    description:
      'Our comprehensive SEO strategies improve search engine rankings, optimize Core Web Vitals, and ensure long-term organic visibility for your business.',
    badge: 'Organic ROI',
    deliverables: [
      'On-Page SEO Optimization',
      'Off-Page Authority Building',
      'Technical SEO & Schema Setup',
      'Comprehensive SEO Audits',
    ],
    techTags: ['Technical SEO', 'Core Web Vitals', 'Schema', 'Rankings'],
    caseStudy: {
      client: 'Enterprise Organic Search Growth',
      result: 'First-page search visibility & long-term organic acquisition',
    },
    metrics: { label: 'Search Architecture', value: '100% Semantic' },
    iconType: 'seo',
  },
]

export const portfolioProjects = [
  {
    id: 1,
    title: 'Sai Land Developers',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/sld-website.png',
    link: 'https://sailanddevelopers.com/',
    description:
      'Modern real estate brand portal showcasing residential & land development projects with interactive inquiry workflows.',
    tags: ['Real Estate', 'Dynamic Web', 'SEO'],
  },
  {
    id: 4,
    title: 'Sai Land Developers ERP',
    category: 'ERP Software',
    filterGroup: 'erp',
    image: '/projects/sld-website-erp.png',
    link: 'https://sailanddevelopers.com/',
    description:
      'Custom enterprise ERP software for managing land plots, bookings, customer ledgers, installment schedules, and reporting.',
    tags: ['Custom ERP', 'Finance & Plots', 'Dashboard'],
  },
  {
    id: 11,
    title: 'Saint Monica International School',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/smis-website.png',
    link: 'http://www.saintmonicainternationalschool.com',
    description:
      'Engaging, user-friendly educational institution portal representing academic programs, admissions, and campus life.',
    tags: ['Education Portal', 'Dynamic CMS', 'Responsive UI'],
  },
  {
    id: 5,
    title: 'ExamTrax',
    category: 'Exam Management Software',
    filterGroup: 'erp',
    image: '/projects/exam-trax-website.png',
    link: 'https://examtrax.pythonanywhere.com/',
    description:
      'End-to-end online examination, assessment scheduling, automated grading, and student performance analytics platform.',
    tags: ['EdTech SaaS', 'Exam Engine', 'Analytics'],
  },
  {
    id: 6,
    title: 'Gujarati Youth Association (GYA)',
    category: 'E-Commerce Software',
    filterGroup: 'erp',
    image: '/projects/gya-e-commerce.png',
    link: 'https://gya.pythonanywhere.com/',
    description:
      'Seamless e-commerce, event ticketing, and member registration software designed for high-volume community events.',
    tags: ['E-Commerce', 'Event Ticketing', 'Payment Flow'],
  },
  {
    id: 7,
    title: 'Institute Management System',
    category: 'Web Based ERP Software',
    filterGroup: 'erp',
    image: '/projects/ims-erp.png',
    link: 'https://ims.pythonanywhere.com/',
    description:
      'Comprehensive web-based ERP for educational institutes covering admissions, attendance, fee tracking, and staff management.',
    tags: ['Institute ERP', 'Role Access', 'Cloud DB'],
  },
  {
    id: 9,
    title: 'Patel Transport ERP',
    category: 'ERP Software',
    filterGroup: 'erp',
    image: '/projects/patel-transport-website.png',
    link: null,
    description:
      'Transport management software streamlining fleet operations from consignment booking to dispatch, billing, and tracking.',
    tags: ['Logistics ERP', 'Fleet & Dispatch', 'Billing'],
  },
  {
    id: 2,
    title: 'Dynaxcel Engineers',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/dynaxcel-website.png',
    link: 'https://dynaxcel.pythonanywhere.com/',
    description:
      'Industrial engineering showcase website highlighting manufacturing capabilities, precision products, and client inquiries.',
    tags: ['Industrial Web', 'B2B Portal', 'Fast UI'],
  },
  {
    id: 3,
    title: 'Shri Sai Multiservices',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/ssm-website.png',
    link: 'https://ultoxy.pythonanywhere.com/',
    description:
      'Digital service platform built for streamlined customer onboarding, service discovery, and multi-service operations.',
    tags: ['Service Portal', 'Responsive', 'Modern UI'],
  },
  {
    id: 8,
    title: 'Money Trust',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/money-trust-website.png',
    link: 'https://moneytrust.pythonanywhere.com/',
    description:
      'Financial services digital presence crafted with high-trust UI/UX, service calculators, and secure client inquiry capture.',
    tags: ['FinTech Web', 'Trust UI', 'Lead Capture'],
  },
  {
    id: 10,
    title: 'Saiganga Enterprises',
    category: 'Website',
    filterGroup: 'web',
    image: '/projects/se-website.png',
    link: null,
    description:
      'Corporate business website designed to showcase enterprise services, product catalogs, and direct customer communication.',
    tags: ['Corporate Web', 'Catalog', 'SEO Ready'],
  },
  {
    id: 12,
    title: 'Ultra Coach Matrix',
    category: 'School & Coaching Institute ERP',
    filterGroup: 'erp',
    image: '/projects/ultracoachmatrix-logo.png',
    link: 'https://ultracoachmatrix.in/',
    description:
      'All-in-one educational ERP platform managing admissions, fees, attendance, examinations, analytics, and student-teacher mobile apps.',
    tags: ['EdTech ERP', 'Mobile Apps', 'Fees & Exams', 'Cloud Platform'],
  },
  {
    id: 13,
    title: 'Kärcher Industrial Equipment',
    category: 'Industrial B2B Portal',
    filterGroup: 'web',
    image: '/projects/porfolio-karcher.jpg',
    link: null,
    description:
      'Global cleaning machinery & industrial equipment showcase portal featuring precision catalogs, customer inquiries, and documentation.',
    tags: ['Equipment Catalog', 'Industrial B2B', 'Corporate Web'],
  },
]

export const featuredProjectsQuickList = portfolioProjects.slice(0, 6).map((p) => ({
  name: p.title,
  type: p.category,
  url: p.link || '/projects',
}))

export const techStackItems = [
  { name: 'React', category: 'Frontend', badge: 'UI Library', level: 'Core' },
  { name: 'Django', category: 'Backend', badge: 'Python Framework', level: 'Core' },
  { name: 'Flutter', category: 'Mobile', badge: 'iOS & Android', level: 'Core' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', badge: 'Interactive Web', level: 'Core' },
  { name: 'Python', category: 'Backend', badge: 'ERP & AI/Data', level: 'Core' },
  { name: 'Node.js', category: 'Backend', badge: 'Scalable APIs', level: 'Advanced' },
  { name: 'HTML5 & CSS3', category: 'Frontend', badge: 'Semantic & Motion', level: 'Core' },
  { name: 'MySQL & PostgreSQL', category: 'Database', badge: 'Relational DB', level: 'Core' },
  { name: 'Firebase', category: 'Mobile', badge: 'Realtime Cloud', level: 'Core' },
  { name: 'Bootstrap & Tailwind', category: 'Frontend', badge: 'Responsive Systems', level: 'Core' },
  { name: 'RESTful APIs', category: 'Backend', badge: 'System Integration', level: 'Core' },
  { name: 'Git & Cloud DevOps', category: 'Database', badge: 'CI/CD & Hosting', level: 'Core' },
]

export const clientTestimonials = [
  {
    id: 1,
    name: 'Shrikant Ghodekar',
    role: 'CEO, Sai Land Developers',
    projectTag: 'ERP Software & Corporate Website',
    avatar: null,
    initials: 'SG',
    quote:
      'We are extremely satisfied with the ERP software and website developed by Ultoxy Technologies. The team delivered efficient, user-friendly, and highly professional solutions that streamlined our operations and enhanced our online presence. Their dedication, timely support, and attention to detail made the entire experience seamless. Highly recommended!',
  },
  {
    id: 2,
    name: 'Kalyani Vispute',
    role: 'Principal, Saint Monica International School',
    projectTag: 'Dynamic School Portal',
    avatar: '/clients/test-smis.jpg',
    initials: 'KV',
    quote:
      'We are extremely pleased with the dynamic website developed by Ultoxy Technologies. The team created a professional, user-friendly, and engaging platform that effectively represents our school online. Their timely support, creativity, and attention to detail made the entire process smooth and hassle-free. Highly recommended!',
  },
  {
    id: 3,
    name: 'Asif Patel',
    role: 'Founder, Patel Transport',
    projectTag: 'Transport Management ERP',
    avatar: '/clients/test-patel.png',
    initials: 'AP',
    quote:
      'We are extremely satisfied with the Transport Management Software developed by Ultoxy Technologies. The team delivered a highly efficient, user-friendly, and reliable platform that streamlined our operations from booking to dispatch and tracking. Their professionalism, timely support, and attention to detail made the development process seamless. Highly recommended!',
  },
  {
    id: 4,
    name: 'GYA Management',
    role: 'Management, Gujarati Youth Association',
    projectTag: 'E-Commerce & Event Booking Software',
    avatar: '/clients/test-gya.png',
    initials: 'GY',
    quote:
      'We are very pleased with the e-commerce and event booking software developed by Ultoxy Technologies. The team delivered a smooth, user-friendly, and efficient platform that makes ticketing and event management effortless for our members. Their professionalism, support, and timely delivery exceeded our expectations.',
  },
  {
    id: 5,
    name: 'Ganesh Patil',
    role: 'Founder',
    projectTag: 'Dynamic Corporate Website',
    avatar: null,
    initials: 'GP',
    quote:
      "Collaborating with Ultoxy Technologies to develop our dynamic website was an exceptional experience. Their team demonstrated professionalism, creativity, and technical expertise, delivering a platform that truly represents our company's vision. The seamless integration of features and user-friendly design have significantly enhanced our online presence.",
  },
  {
    id: 6,
    name: 'Yogesh Karale',
    role: 'Founder, Saiganga Enterprises',
    projectTag: 'Enterprise Website',
    avatar: null,
    initials: 'YK',
    quote:
      'We are extremely satisfied with the website developed by Ultoxy Technologies. The team delivered a professional, user-friendly, and visually appealing website that perfectly showcases our services. Their support and timely communication made the entire process smooth and hassle-free. Highly recommended!',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    description:
      'We analyze your business workflows, target audience, and technical requirements to blueprint a scalable system.',
  },
  {
    step: '02',
    title: 'Creative UI/UX Prototyping',
    description:
      'Our designers craft interactive, modern interfaces with multi-device responsiveness and high-conversion flows.',
  },
  {
    step: '03',
    title: 'Agile Engineering & ERP Build',
    description:
      'Clean, modular code developed with React, Django, Flutter, and secure cloud databases with continuous testing.',
  },
  {
    step: '04',
    title: 'Launch, SEO & Scale',
    description:
      'Zero-downtime deployment, technical SEO optimization, and dedicated 24/7 engineering support as you grow.',
  },
]

export const mainNavItems = [
  { path: '/', label: 'Home', icon: 'home', exact: true },
  {
    path: '/services',
    label: 'Services',
    icon: 'services',
    hasMegaMenu: true,
  },
  {
    path: '/projects',
    label: 'Projects',
    icon: 'projects',
    badge: '11+',
  },
  { path: '/about', label: 'About', icon: 'about' },
  { path: '/blog', label: 'Insights', icon: 'blog' },
  { path: '/contact', label: 'Contact', icon: 'contact' },
]

export const seoConfig = {
  default: {
    title:
      'Ultoxy Technologies | Custom Software, Web & Mobile App Development Company in Pune, India',
    description:
      'Ultoxy Technologies is a premier IT & software development company in Pune, India specializing in custom website development, Flutter mobile apps, enterprise ERP software, digital marketing, and technical SEO.',
    keywords:
      'Ultoxy Technologies, software development company Pune, website development India, mobile app development Flutter, custom ERP software, digital marketing agency Pune, SEO services India, React Django development',
  },
  pages: {
    home: {
      title:
        'Ultoxy Technologies | Elevate Everything With Cutting-Edge Software & Digital Solutions',
      description:
        'Partner with Ultoxy Technologies in Pune, India for high-performance website development, mobile apps, custom ERP software, digital marketing, and SEO optimization.',
    },
    about: {
      title: 'About Ultoxy Technologies | Innovating the Future with Cutting-Edge IT Solutions',
      description:
        'Meet Ultoxy Technologies—innovators, software engineers, and digital growth partners in Pune, India crafting scalable web, mobile, and enterprise ERP solutions.',
    },
    services: {
      title: 'IT Services & Custom Software Solutions | Ultoxy Technologies',
      description:
        'Explore Ultoxy Technologies’ core services: Website Development, Android & iOS Mobile Apps, Custom ERP & Desktop Software, Digital Marketing, and SEO Optimization.',
    },
    projects: {
      title: 'Portfolio & Case Studies | 11+ Enterprise ERP & Web Projects | Ultoxy Technologies',
      description:
        'Discover real-world software, ERP systems, e-commerce platforms, and websites engineered by Ultoxy Technologies for clients across industries.',
    },
    blog: {
      title: 'Tech Insights & Engineering Blog | Ultoxy Technologies',
      description:
        'Read the latest insights from the Ultoxy Technologies team on scalable React & Django web apps, Flutter mobile development, cloud computing, and digital transformation.',
    },
    contact: {
      title: 'Contact Ultoxy Technologies | Start Your Software or Web Project Today',
      description:
        'Get in touch with Ultoxy Technologies in Pune, Maharashtra, India. Call +91 77768 24564 or email info@ultoxy.com to discuss your web, mobile app, or ERP project.',
    },
  },
}
