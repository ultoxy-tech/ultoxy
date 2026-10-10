import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  PhoneCall,
  MapPin,
  User,
  Briefcase,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Globe,
  Smartphone,
  Cpu,
  Megaphone,
  Search,
  HelpCircle,
  Layers,
  RefreshCw,
  Award,
  UserCheck,
} from 'lucide-react'
import SEO from '../components/SEO'
import { seoConfig, companyInfo } from '../data/companyData'
import './Contact.css'

const INQUIRY_SERVICE_OPTIONS = [
  {
    id: 'website-development',
    label: 'Website Development',
    subjectPreset: 'Website Development Inquiry',
    icon: Globe,
    accent: '#0284c7',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
  },
  {
    id: 'mobile-app',
    label: 'Mobile App (Flutter)',
    subjectPreset: 'Mobile App Development Inquiry',
    icon: Smartphone,
    accent: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  {
    id: 'custom-erp',
    label: 'Custom ERP Software',
    subjectPreset: 'Custom ERP Software Inquiry',
    icon: Cpu,
    accent: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    subjectPreset: 'Digital Marketing Inquiry',
    icon: Megaphone,
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
  },
  {
    id: 'seo-optimization',
    label: 'SEO Optimization',
    subjectPreset: 'SEO Optimization Inquiry',
    icon: Search,
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
  },
  {
    id: 'general',
    label: 'General Consultation',
    subjectPreset: 'General Business Consultation',
    icon: Layers,
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
  },
]

const CONTACT_FAQS = [
  {
    id: 'faq-1',
    question: 'How quickly does Ultoxy Technologies respond to new inquiries?',
    answer:
      'We maintain a strict 24-hour response SLA. Most inquiries received during business hours (Mon–Sat, 9:30 AM – 7:30 PM IST) receive a direct response from our engineering leadership within 2 to 4 hours.',
  },
  {
    id: 'faq-2',
    question: 'Can I speak directly with the founders or lead software architects?',
    answer:
      'Yes. At Ultoxy Technologies you collaborate directly with Co-Founder Mr. Rameshwar Pawar (+91 77768 24564) and CEO Mr. Krishna Thore (+91 70305 99317) from day one.',
  },
  {
    id: 'faq-3',
    question: 'Do you develop custom ERP software tailored to our exact workflow?',
    answer:
      'Absolutely. We have delivered production ERP platforms for real estate developers, logistics companies, educational institutions, and e-commerce organizations tailored to their exact business rules.',
  },
  {
    id: 'faq-4',
    question: 'Do you provide ongoing maintenance, hosting, and SEO support after launch?',
    answer:
      'Yes. We offer end-to-end post-launch support including cloud deployment, security updates, performance monitoring, technical SEO optimization, and feature expansion.',
  },
]

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1]

export default function Contact() {
  const [selectedService, setSelectedService] = useState('website-development')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Website Development Inquiry',
    mobile: '',
    message: '',
  })

  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedItem, setCopiedItem] = useState(null)
  const [openFaqId, setOpenFaqId] = useState('faq-1')

  const handleServiceSelect = (srv) => {
    setSelectedService(srv.id)
    setFormData((prev) => ({
      ...prev,
      subject: srv.subjectPreset,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formError) setFormError('')
  }

  const handleCopyValue = (key, text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedItem(key)
      setTimeout(() => setCopiedItem(null), 2200)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.message.trim()
    ) {
      setFormError(
        'Please fill in your Full Name, Mobile Number, and Project Message.'
      )
      return
    }

    setIsSubmitting(true)
    setFormError('')

    setTimeout(() => {
      try {
        const existing = JSON.parse(
          localStorage.getItem('ultoxy_inquiries') || '[]'
        )
        existing.unshift({
          ...formData,
          serviceCategory: selectedService,
          submittedAt: new Date().toISOString(),
        })
        localStorage.setItem(
          'ultoxy_inquiries',
          JSON.stringify(existing.slice(0, 20))
        )
      } catch {
        // Ignore storage errors
      }
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  const handleResetForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      subject: 'Website Development Inquiry',
      mobile: '',
      message: '',
    })
  }

  return (
    <div className="ultoxy-contact-page">
      <SEO
        title={seoConfig.pages.contact.title}
        description={seoConfig.pages.contact.description}
      />

      {/* Ambient Blurry Aurora Background */}
      <div className="contact-ambient-bg" aria-hidden="true">
        <div className="contact-blur-shape shape-cyan" />
        <div className="contact-blur-shape shape-violet" />
        <div className="contact-blur-shape shape-rose" />
        <div className="contact-grid-mesh" />
      </div>

      {/* ===================================================================
          SECTION 1: CLEAN EXECUTIVE HERO HEADER
          =================================================================== */}
      <section className="contact-hero-sec">
        <div className="container">
          <motion.div
            className="contact-hero-header"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <div className="contact-eyebrow-pill">
              <Sparkles size={14} className="contact-eyebrow-icon" />
              <span>
                DIRECT LEADERSHIP ACCESS • {companyInfo.contact.responseTime}
              </span>
            </div>

            <h1 className="contact-hero-title">
              Let’s Connect &amp; Build Your{' '}
              <span className="gradient-text">Digital Future</span>
            </h1>

            <p className="contact-hero-subtitle">
              Speak directly with our founders and engineering team in Pune,
              Maharashtra to launch your website, mobile app, or custom ERP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: SPACIOUS 2-COLUMN CONTACT DESK & INQUIRY STUDIO
          =================================================================== */}
      <section className="contact-hub-sec" id="inquiry-studio">
        <div className="container">
          <div className="contact-hub-grid">
            {/* LEFT COLUMN: Clean, Easy-to-Read Executive Contact Desk */}
            <div className="contact-details-column" id="executive-contacts">
              <div className="contact-col-intro">
                <span className="contact-col-kicker">
                  DIRECT COMMUNICATION CHANNELS
                </span>
                <h2 className="contact-col-title">
                  Executive <span className="gradient-text">Contact Desk</span>
                </h2>
                <p className="contact-col-desc">
                  Reach our leadership team directly by phone or email for fast
                  technical consultation.
                </p>
              </div>

              <div className="contact-cards-stack">
                {/* Channel 1: Co-Founder Phone */}
                <motion.div
                  className="creative-contact-card"
                  style={{
                    '--cc-gradient':
                      'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    '--cc-accent': '#7c3aed',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <div className="cc-icon-badge">
                    <UserCheck size={22} />
                  </div>

                  <div className="cc-body">
                    <span className="cc-label">
                      {companyInfo.contact.phones[0].person.toUpperCase()} •
                      CO-FOUNDER
                    </span>
                    <a
                      href={`tel:${companyInfo.contact.phones[0].raw}`}
                      className="cc-primary-value"
                    >
                      {companyInfo.contact.phones[0].number}
                    </a>
                    <span className="cc-secondary-value">
                      Software Architecture &amp; Technical Delivery
                    </span>
                  </div>

                  <div className="cc-quick-actions">
                    <a
                      href={`tel:${companyInfo.contact.phones[0].raw}`}
                      className="cc-primary-btn"
                      title="Call Mr. Rameshwar Pawar"
                    >
                      <PhoneCall size={14} />
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyValue(
                          'phone1',
                          companyInfo.contact.phones[0].number
                        )
                      }
                      className="cc-icon-btn"
                      aria-label="Copy phone number"
                      title="Copy number"
                    >
                      {copiedItem === 'phone1' ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Channel 2: CEO & Founder Phone */}
                <motion.div
                  className="creative-contact-card"
                  style={{
                    '--cc-gradient':
                      'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    '--cc-accent': '#2563eb',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <div className="cc-icon-badge">
                    <Award size={22} />
                  </div>

                  <div className="cc-body">
                    <span className="cc-label">
                      {companyInfo.contact.phones[1].person.toUpperCase()} • CEO
                      &amp; FOUNDER
                    </span>
                    <a
                      href={`tel:${companyInfo.contact.phones[1].raw}`}
                      className="cc-primary-value"
                    >
                      {companyInfo.contact.phones[1].number}
                    </a>
                    <span className="cc-secondary-value">
                      Executive Strategy &amp; Enterprise Partnerships
                    </span>
                  </div>

                  <div className="cc-quick-actions">
                    <a
                      href={`tel:${companyInfo.contact.phones[1].raw}`}
                      className="cc-primary-btn"
                      title="Call Mr. Krishna Thore"
                    >
                      <PhoneCall size={14} />
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyValue(
                          'phone2',
                          companyInfo.contact.phones[1].number
                        )
                      }
                      className="cc-icon-btn"
                      aria-label="Copy phone number"
                      title="Copy number"
                    >
                      {copiedItem === 'phone2' ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Channel 3: Official Email Desk */}
                <motion.div
                  className="creative-contact-card"
                  style={{
                    '--cc-gradient':
                      'linear-gradient(135deg, #00c6ff 0%, #2563eb 100%)',
                    '--cc-accent': '#0284c7',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <div className="cc-icon-badge">
                    <Mail size={22} />
                  </div>

                  <div className="cc-body">
                    <span className="cc-label">
                      OFFICIAL EMAIL DESK • REPLIES WITHIN 24H
                    </span>
                    <a
                      href={`mailto:${companyInfo.contact.primaryEmail}`}
                      className="cc-primary-value"
                    >
                      {companyInfo.contact.primaryEmail}
                    </a>
                    <span className="cc-secondary-value">
                      Secondary: {companyInfo.contact.secondaryEmail}
                    </span>
                  </div>

                  <div className="cc-quick-actions">
                    <a
                      href={`mailto:${companyInfo.contact.primaryEmail}`}
                      className="cc-primary-btn"
                      title="Send Email"
                    >
                      <span>Email</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyValue(
                          'email',
                          companyInfo.contact.primaryEmail
                        )
                      }
                      className="cc-icon-btn"
                      aria-label="Copy email address"
                      title="Copy email"
                    >
                      {copiedItem === 'email' ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Channel 4: Pune Headquarters */}
                <motion.div
                  className="creative-contact-card"
                  style={{
                    '--cc-gradient':
                      'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                    '--cc-accent': '#ec4899',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <div className="cc-icon-badge">
                    <MapPin size={22} />
                  </div>

                  <div className="cc-body">
                    <span className="cc-label">
                      HEADQUARTERS • INDIA &amp; GLOBAL DELIVERY
                    </span>
                    <span className="cc-primary-value">
                      Pune, Maharashtra, India
                    </span>
                    <span className="cc-secondary-value">
                      Mon – Sat • 09:30 AM – 07:30 PM IST
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT COLUMN: Clean, Uncrowded Project Inquiry Form */}
            <motion.div
              className="contact-form-studio-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            >
              <div className="studio-card-top-glow" />

              <div className="studio-form-header">
                <div className="studio-form-badge-row">
                  <span className="studio-live-badge">
                    <span className="studio-pulse-dot" />
                    PROJECT INQUIRY STUDIO
                  </span>
                  <span className="studio-encryption-tag">
                    <ShieldCheck size={14} /> 100% Confidential
                  </span>
                </div>

                <h2 className="studio-form-title">
                  Send Us a <span className="gradient-text">Message</span>
                </h2>
                <p className="studio-form-subtitle">
                  Choose a service track below and share your project details —
                  our engineering team will respond within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted-success"
                    className="inquiry-success-panel"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                  >
                    <div className="success-icon-ring">
                      <CheckCircle2 size={38} />
                    </div>
                    <h3 className="success-title">
                      Your Message Has Been Sent!
                    </h3>
                    <p className="success-desc">
                      Thank you, <strong>{formData.name}</strong>. We have
                      received your inquiry regarding{' '}
                      <strong>{formData.subject || 'your project'}</strong> and
                      will contact you at <strong>{formData.mobile}</strong>{' '}
                      shortly.
                    </p>

                    <div className="success-action-buttons">
                      <a
                        href={`mailto:${companyInfo.contact.primaryEmail}?subject=${encodeURIComponent(
                          formData.subject || 'Project Inquiry'
                        )}&body=${encodeURIComponent(
                          `Name: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                        )}`}
                        className="success-mailto-btn"
                      >
                        <Mail size={16} />
                        <span>Open in Email Client</span>
                        <ArrowUpRight size={15} />
                      </a>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="success-reset-btn"
                      >
                        <RefreshCw size={15} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="inquiry-form"
                    className="creative-inquiry-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Service Track Selector */}
                    <div className="form-section-block">
                      <label className="form-group-label">
                        Select Service Interest
                      </label>
                      <div className="service-interest-pills">
                        {INQUIRY_SERVICE_OPTIONS.map((srv) => {
                          const SrvIcon = srv.icon
                          const isSelected = selectedService === srv.id
                          return (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => handleServiceSelect(srv)}
                              className={`service-interest-pill ${
                                isSelected ? 'active' : ''
                              }`}
                              style={{
                                '--pill-gradient': srv.gradient,
                                '--pill-accent': srv.accent,
                              }}
                            >
                              <SrvIcon size={15} />
                              <span>{srv.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Row 1: Full Name & Mobile Number */}
                    <div className="form-two-col-grid">
                      <div className="form-field-wrap">
                        <label htmlFor="id_name" className="form-field-label">
                          Full Name <span className="req-star">*</span>
                        </label>
                        <div className="input-icon-shell">
                          <User size={17} className="field-prefix-icon" />
                          <input
                            type="text"
                            id="id_name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="studio-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-field-wrap">
                        <label htmlFor="id_mobile" className="form-field-label">
                          Mobile Number <span className="req-star">*</span>
                        </label>
                        <div className="input-icon-shell">
                          <PhoneCall size={17} className="field-prefix-icon" />
                          <input
                            type="tel"
                            id="id_mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="studio-input"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email Address & Inquiry Subject */}
                    <div className="form-two-col-grid">
                      <div className="form-field-wrap">
                        <label htmlFor="id_email" className="form-field-label">
                          Email Address
                        </label>
                        <div className="input-icon-shell">
                          <Mail size={17} className="field-prefix-icon" />
                          <input
                            type="email"
                            id="id_email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@company.com"
                            className="studio-input"
                          />
                        </div>
                      </div>

                      <div className="form-field-wrap">
                        <label
                          htmlFor="id_subject"
                          className="form-field-label"
                        >
                          Inquiry Subject
                        </label>
                        <div className="input-icon-shell">
                          <Briefcase size={17} className="field-prefix-icon" />
                          <input
                            type="text"
                            id="id_subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Project subject"
                            className="studio-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Clean Project Message Textarea */}
                    <div className="form-field-wrap">
                      <label htmlFor="id_message" className="form-field-label">
                        Your Message <span className="req-star">*</span>
                      </label>
                      <div className="input-icon-shell textarea-shell">
                        <MessageSquare
                          size={17}
                          className="field-prefix-icon textarea-icon"
                        />
                        <textarea
                          id="id_message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project goals, timeline, or requirements..."
                          className="studio-input studio-textarea"
                          required
                        />
                      </div>
                    </div>

                    {formError && (
                      <div className="studio-form-error" role="alert">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="studio-submit-btn"
                    >
                      <span>
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </span>
                      <Send size={17} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: CLEAN FAQ ACCORDION
          =================================================================== */}
      <section className="contact-faq-sec" id="contact-faq">
        <div className="container">
          <div className="contact-faq-header">
            <div className="contact-eyebrow-pill">
              <HelpCircle size={14} className="contact-eyebrow-icon" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="contact-faq-title">
              Everything You Need to Know Before{' '}
              <span className="gradient-text">Starting With Ultoxy</span>
            </h2>
          </div>

          <div className="contact-faq-list">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id
              return (
                <motion.div
                  key={faq.id}
                  className={`contact-faq-item ${isOpen ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <button
                    type="button"
                    className="contact-faq-trigger"
                    onClick={() =>
                      setOpenFaqId((prev) => (prev === faq.id ? null : faq.id))
                    }
                    aria-expanded={isOpen}
                  >
                    <div className="faq-trigger-left">
                      <span className="faq-num-badge">0{idx + 1}</span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>

                    <span
                      className={`faq-arrow-indicator ${isOpen ? 'open' : ''}`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="contact-faq-body-wrap"
                      >
                        <p className="contact-faq-answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
