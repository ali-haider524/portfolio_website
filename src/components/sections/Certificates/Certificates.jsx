import { useState } from 'react'
import { certificates } from '../../../data/portfolioData'
import CertModal from '../../CertModal/CertModal'
import styles from './Certificates.module.css'

export default function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section className={styles.certificates}>
      <div className={styles.header}>
        <span className="secTag">Certifications</span>
        <h2 className="secHeading">Certificates</h2>
        <p className="secSub">
          Click any certificate to view the full image
        </p>
      </div>

      <div className={styles.grid}>
        {certificates.map((cert) => (
          <div key={cert.id} className={styles.card}>
            <div className={styles.topBar} style={{ background: cert.color }} />

            {/* Certificate preview image */}
            <div
              className={styles.previewWrap}
              onClick={() => setSelected(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(cert)}
              aria-label={`View ${cert.title}`}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className={styles.previewImg}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback placeholder */}
              <div className={styles.previewPlaceholder} style={{ display: 'none' }}>
                <span style={{ fontSize: '2rem', opacity: 0.35 }}>📄</span>
                <span className={styles.previewPlaceholderText}>No image yet</span>
              </div>
              {/* Hover overlay */}
              <div className={styles.previewOverlay}>
                <span className={styles.viewLabel}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  View Certificate
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className={styles.body}>
              <div className={styles.iconRow}>
                <div className={styles.iconBox} style={{ background: `${cert.color}18` }}>
                  🏆
                </div>
                <span className={styles.yearBadge}>{cert.year}</span>
              </div>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.issuer} style={{ color: cert.color }}>{cert.issuer}</p>
              <p className={styles.desc}>{cert.description}</p>

              <button
                className={styles.viewBtn}
                style={{ '--cert-color': cert.color }}
                onClick={() => setSelected(cert)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
