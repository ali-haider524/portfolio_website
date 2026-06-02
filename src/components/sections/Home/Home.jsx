import { useState } from 'react'
import styles from './Home.module.css'

const quickInfo = [
  { icon: '🎓', bg: '#eef2ff', label: 'Education', value: 'BS Computer Science' },
  { icon: '📍', bg: '#f0fdf4', label: 'Location', value: 'Pakistan' },
  { icon: '💼', bg: '#fff7ed', label: 'Experience', value: '2 Companies' },
]

export default function Home({ setActiveSection }) {
  const [photoError, setPhotoError] = useState(false)

  return (
    <section className={styles.home}>

      {/* ── Hero Card ── */}
      <div className={styles.heroCard}>
        <div className={styles.heroBanner} />

        <div className={styles.heroBody}>
          <div className={styles.profilePhotoWrap}>
            <div className={styles.profilePhoto}>
              {!photoError ? (
                <img
                  src="/profile.jpg"
                  alt="Ali Haider"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <span>AH</span>
              )}
            </div>
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Available for hire
            </span>
          </div>

          <h1 className={styles.heroName}>
            Ali <span className={styles.heroNameAccent}>Haider</span>
          </h1>
          <p className={styles.heroTitle}>AI Web Developer &amp; Automation Specialist</p>
          <p className={styles.heroDesc}>
            I build intelligent web solutions — custom websites, management systems,
            AI chatbots, and automation workflows. From clean UI to solid backend,
            I deliver results that work.
          </p>

          <div className={styles.techRow}>
            {['React', 'PHP', 'Node.js', 'AI Agents', 'MySQL', 'n8n', 'Botpress'].map((t) => (
              <span key={t} className={styles.pill}>{t}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => setActiveSection('projects')}>
              View Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className={styles.btnSecondary} onClick={() => setActiveSection('contact')}>
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsRow}>
        {[
          { num: '10+', label: 'Projects Built' },
          { num: '2',   label: 'Companies' },
          { num: '2',   label: 'Certifications' },
          { num: '2026', label: 'CS Graduate' },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Quick info ── */}
      <div className={styles.quickRow}>
        {quickInfo.map((q) => (
          <div key={q.label} className={styles.quickCard}>
            <div className={styles.quickIcon} style={{ background: q.bg }}>{q.icon}</div>
            <div>
              <span className={styles.quickLabel}>{q.label}</span>
              <span className={styles.quickValue}>{q.value}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
