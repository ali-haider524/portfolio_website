import { skills } from '../../../data/portfolioData'
import styles from './Skills.module.css'

const meta = {
  'Frontend':        { icon: '🎨', bg: '#eef2ff', accent: '#6366f1' },
  'Backend':         { icon: '⚙️', bg: '#f0fdf4', accent: '#10b981' },
  'AI & Automation': { icon: '🤖', bg: '#fff7ed', accent: '#f59e0b' },
  'Tools & Others':  { icon: '🛠️', bg: '#fdf4ff', accent: '#8b5cf6' },
}

export default function Skills() {
  return (
    <section className={styles.skills}>
      <div className={styles.header}>
        <span className="secTag">Technical Skills</span>
        <h2 className="secHeading">What I Work With</h2>
        <p className="secSub">Technologies and tools across my stack</p>
      </div>

      <div className={styles.grid}>
        {skills.map((group) => {
          const m = meta[group.category] || { icon: '💡', bg: '#f8fafc', accent: '#6366f1' }
          return (
            <div key={group.category} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardIcon} style={{ background: m.bg }}>
                  {m.icon}
                </div>
                <span className={styles.cardTitle}>{group.category}</span>
              </div>
              <div className={styles.pills}>
                {group.items.map((skill) => (
                  <span key={skill} className={styles.pill}
                    style={{ '--pill-accent': m.accent }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
