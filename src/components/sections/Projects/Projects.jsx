import { useState } from 'react'
import { projects } from '../../../data/portfolioData'
import ProjectCard from '../../ProjectCard/ProjectCard'
import styles from './Projects.module.css'

const categories = ['All', 'Web App', 'Business Website', 'E-Commerce', 'Portfolio', 'AI Chatbot', 'Desktop App', 'IoT']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active)

  return (
    <section className={styles.projects}>
      <div className={styles.header}>
        <span className="secTag">My Work</span>
        <h2 className="secHeading">Projects</h2>
        <p className="secSub">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} — web, AI, automation &amp; more
        </p>
      </div>

      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.active : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
            {cat !== 'All' && (
              <span className={styles.count}>
                {projects.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No projects in this category.</p>
      )}
    </section>
  )
}
