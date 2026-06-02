import { useState } from 'react'
import { personalInfo } from '../../../data/portfolioData'
import styles from './Contact.module.css'

const contacts = [
  { icon: '📧', label: 'Email',            value: personalInfo.email,  href: `mailto:${personalInfo.email}`,  bg: '#eef2ff' },
  { icon: '📱', label: 'Phone / WhatsApp', value: personalInfo.phone,  href: `tel:${personalInfo.phone}`,     bg: '#f0fdf4' },
  { icon: '💼', label: 'LinkedIn',         value: 'Ali Haider',        href: personalInfo.linkedin,           bg: '#eff6ff' },
  { icon: '🐙', label: 'GitHub',           value: 'ali-haider524',     href: personalInfo.github,             bg: '#fdf4ff' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const subject = encodeURIComponent(form.subject || 'Portfolio Contact')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 800)
  }

  return (
    <section className={styles.contact}>
      <div className={styles.header}>
        <span className="secTag">Get In Touch</span>
        <h2 className="secHeading">Contact Me</h2>
        <p className="secSub">Open to freelance, full-time roles, and collaborations</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.infoCol}>
          <p className={styles.intro}>
            I'm available for freelance projects, full-time positions, and interesting
            collaborations. Reach out through any channel below.
          </p>
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={styles.infoCard}
            >
              <div className={styles.infoIcon} style={{ background: c.bg }}>{c.icon}</div>
              <div>
                <span className={styles.infoLabel}>{c.label}</span>
                <span className={styles.infoValue}>{c.value}</span>
              </div>
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </div>

        <div className={styles.formBox}>
          <h3 className={styles.formTitle}>Send a Message</h3>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input id="name" name="name" type="text" className={styles.input}
                  placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Your Email</label>
                <input id="email" name="email" type="email" className={styles.input}
                  placeholder="john@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <input id="subject" name="subject" type="text" className={styles.input}
                placeholder="Project inquiry / Job opportunity" value={form.subject} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea id="message" name="message" className={styles.textarea}
                placeholder="Tell me about your project or opportunity..." rows={5}
                value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><span className={styles.spinner} /> Sending...</>
              ) : status === 'sent' ? '✅ Message Sent!' : (
                <>Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
            {status === 'sent' && (
              <p className={styles.successMsg}>Thanks! I'll get back to you soon.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
