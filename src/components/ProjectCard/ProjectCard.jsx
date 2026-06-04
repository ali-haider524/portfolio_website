import { analyticsService } from '../../services/analyticsService'
import styles from './ProjectCard.module.css'

const catStyle = {
  'Web App':          { color: '#6366f1', bg: '#eef2ff', placeholderBg: 'linear-gradient(135deg,#eef2ff,#c7d2fe)', icon: '🖥️' },
  'Business Website': { color: '#0d9488', bg: '#f0fdf4', placeholderBg: 'linear-gradient(135deg,#f0fdf4,#99f6e4)', icon: '🏢' },
  'E-Commerce':       { color: '#f59e0b', bg: '#fffbeb', placeholderBg: 'linear-gradient(135deg,#fffbeb,#fde68a)', icon: '🛒' },
  'Portfolio':        { color: '#8b5cf6', bg: '#f5f3ff', placeholderBg: 'linear-gradient(135deg,#f5f3ff,#ddd6fe)', icon: '👤' },
  'AI Chatbot':       { color: '#0ea5e9', bg: '#f0f9ff', placeholderBg: 'linear-gradient(135deg,#f0f9ff,#bae6fd)', icon: '🤖' },
  'Desktop App':      { color: '#2563eb', bg: '#eff6ff', placeholderBg: 'linear-gradient(135deg,#eff6ff,#bfdbfe)', icon: '💻' },
  'IoT':              { color: '#16a34a', bg: '#f0fdf4', placeholderBg: 'linear-gradient(135deg,#f0fdf4,#bbf7d0)', icon: '📡' },
}

const placeholderImg = (id) => null // use local colored placeholders instead of external picsum

// GitHub SVG icon
// Code icon
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

// External link icon
const LiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function ProjectCard({ project }) {
  const style = catStyle[project.category] || catStyle['Web App']

  const handleProjectClick = () => {
    analyticsService.trackProjectClick(project.id, project.title)
  }

  return (
    <article className={styles.card}>
      {/* Image — shows colored placeholder with icon. Replace with real screenshot by adding
           project.image = "/projects/my-project.jpg" in portfolioData.js */}
      <div className={styles.imgWrap}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className={styles.imgPlaceholder}
          style={{ background: style.placeholderBg, display: project.image ? 'none' : 'flex' }}
        >
          <span style={{ fontSize: '2.5rem' }}>{style.icon}</span>
          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, marginTop: '0.25rem' }}>
            {project.category}
          </span>
        </div>
        <div className={styles.imgOverlay} />
        {project.featured && (
          <span className={styles.featuredBadge}>★ Featured</span>
        )}
        {project.wip && (
          <span className={styles.wipBadge}>🔧 In Progress</span>
        )}
        <span
          className={styles.catBadge}
          style={{ color: style.color, borderColor: `${style.color}60`, background: 'rgba(255,255,255,0.92)' }}
        >
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        {/* Links row */}
        <div className={styles.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtnCode}
              title="View source code"
              onClick={handleProjectClick}
            >
              <CodeIcon />
              View Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtnLive}
              title="Open live project"
              onClick={handleProjectClick}
            >
              <LiveIcon />
              Live Preview
            </a>
          )}
          {!project.github && !project.live && (
            <span className={styles.privateLabel}>🔒 Private Project</span>
          )}
        </div>
      </div>
    </article>
  )
}
