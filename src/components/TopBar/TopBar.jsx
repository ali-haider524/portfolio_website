import { useTheme } from '../../context/ThemeContext'
import styles from './TopBar.module.css'

export default function TopBar({ activeSection }) {
  const { theme, toggleTheme } = useTheme()

  const sectionTitles = {
    home:         'Home',
    about:        'About Me',
    skills:       'Skills',
    experience:   'Experience',
    projects:     'Projects',
    certificates: 'Certificates',
    contact:      'Contact',
    analytics:    'Analytics',
  }

  return (
    <div className={styles.topbar}>
      <span className={styles.breadcrumb}>
        {sectionTitles[activeSection] || 'Home'}
      </span>

      <button
        className={styles.themeBtn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className={styles.themeBtnIcon}>
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className={styles.themeBtnLabel}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      </button>
    </div>
  )
}
