import { personalInfo } from '../../data/portfolioData'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>Ali Haider</span>
          <span className={styles.sep}>·</span>
          <span className={styles.role}>AI Web Developer &amp; Automation Specialist</span>
        </div>
        <div className={styles.right}>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href={`mailto:${personalInfo.email}`} className={styles.link}>Email</a>
        </div>
      </div>
      <div className={styles.copy}>
        © {year} Ali Haider. Built with React &amp; Vite.
      </div>
    </footer>
  )
}
