import { experience } from '../../../data/portfolioData'
import styles from './Experience.module.css'

const edu = {
  role: 'BS Computer Science',
  company: 'University',
  type: 'Full-time',
  period: '2022 – 2026',
  description: 'Graduated with a Bachelor of Science in Computer Science. Covered software engineering, databases, algorithms, AI fundamentals, and networking.',
  tags: ['Software Engineering', 'Databases', 'Algorithms', 'AI', 'Networking'],
  green: true,
  periodStyle: { color: '#065f46', background: '#d1fae5', border: '1px solid #6ee7b7' },
}

// Assign period styles per experience entry
const periodStyles = {
  'Summer (Internship)': { color: '#92400e', background: '#fef3c7', border: '1px solid #fcd34d' },
  'Remote':              { color: '#0f4c5c', background: '#ccfbf1', border: '1px solid #5eead4' },
}

export default function Experience() {
  const all = [...experience, edu]

  return (
    <section className={styles.experience}>
      <div className={styles.header}>
        <span className="secTag">Experience</span>
        <h2 className="secHeading">Where I've Worked</h2>
        <p className="secSub">Professional experience and education</p>
      </div>

      <div className={styles.timeline}>
        {all.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.lineCol}>
              <div className={`${styles.dot} ${item.green ? styles.dotGreen : ''}`} />
              {i < all.length - 1 && <div className={styles.line} />}
            </div>

            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <div className={styles.role}>{item.role}</div>
                  <div className={styles.companyRow}>
                    <span className={`${styles.company} ${item.green ? styles.companyGreen : ''}`}>{item.company}</span>
                    <span className={styles.sep}>·</span>
                    <span className={styles.type}>{item.type}</span>
                  </div>
                </div>
                <span
                  className={styles.period}
                  style={item.periodStyle || periodStyles[item.period] || {}}
                >
                  {item.period}
                </span>
              </div>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tags}>
                {item.tags.map((t) => (
                  <span key={t} className={`${styles.tag} ${item.green ? styles.tagGreen : ''}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
