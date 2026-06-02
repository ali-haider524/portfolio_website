import { personalInfo } from '../../../data/portfolioData'
import styles from './About.module.css'

const services = [
  { icon: '🌐', bg: '#eef2ff', title: 'Web Development',       desc: 'Custom websites and apps using PHP, Node.js, React, and WordPress.' },
  { icon: '🤖', bg: '#f0fdf4', title: 'AI & Chatbots',         desc: 'AI chatbots and agents with Botpress, n8n, and API integrations.' },
  { icon: '⚙️', bg: '#fff7ed', title: 'Automation',            desc: 'Business workflow automation with n8n and custom API connections.' },
  { icon: '🗄️', bg: '#fdf4ff', title: 'Backend & Databases',   desc: 'Solid backend systems with PHP, Node.js, and MySQL.' },
]

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.header}>
        <span className="secTag">About Me</span>
        <h2 className="secHeading">Who I Am</h2>
        <p className="secSub">Developer, problem-solver, and lifelong learner</p>
      </div>

      <div className={styles.grid}>

        {/* ── Profile card ── */}
        <div className={styles.profileCard}>
          <div className={styles.profileBanner} />
          <div className={styles.profileCardBody}>
            <div className={styles.profileAvatar}>
              <img src="/profile.jpg" alt="Ali Haider" onError={(e) => { e.target.style.display = 'none' }} />
              
            </div>
            <div className={styles.profileName}>{personalInfo.name}</div>
            <div className={styles.profileRole}>{personalInfo.title}</div>

            <div className={styles.profileDivider} />

            {[
              { icon: '🎓', label: 'Degree',   value: 'BS Computer Science' },
              { icon: '📅', label: 'Graduated', value: '2026' },
              { icon: '📍', label: 'Location',  value: 'Pakistan' },
              { icon: '📱', label: 'Phone',     value: personalInfo.phone },
            ].map((r) => (
              <div key={r.label} className={styles.profileInfoRow}>
                <span className={styles.profileInfoIcon}>{r.icon}</span>
                <div>
                  <span className={styles.profileInfoLabel}>{r.label}</span>
                  <span className={styles.profileInfoValue}>{r.value}</span>
                </div>
              </div>
            ))}

            <div className={styles.profileInfoRow}>
              <span className={styles.profileInfoIcon}>📧</span>
              <div>
                <span className={styles.profileInfoLabel}>Email</span>
                <a href={`mailto:${personalInfo.email}`} className={styles.profileInfoLink}>
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className={styles.profileDivider} />

            <div className={styles.profileSocials}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.profileSocialBtn} title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.profileSocialBtn} title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div className={styles.right}>
          <div className={styles.bioCard}>
            <h3>✍️ About Me</h3>
            <p className={styles.para}>
              I'm Ali Haider — an AI Web Developer and Automation Specialist based in Pakistan.
              I build custom web solutions, from business websites and management systems to
              AI-powered chatbots and automation workflows.
            </p>
            <p className={styles.para}>
              I've worked at WeConnect Software House building client websites and integrating
              AI agents, and completed a remote Node.js internship at Nexium Software House.
              I graduated with a BS in Computer Science in 2026 and hold Google certifications
              in Cybersecurity and AI Prompt Engineering.
            </p>
            <p className={styles.para}>
              I care about clean code, practical solutions, and delivering on time. Whether it's
              a PHP backend, a React frontend, or an n8n automation — I get it done.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <div key={s.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon} style={{ background: s.bg }}>{s.icon}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
