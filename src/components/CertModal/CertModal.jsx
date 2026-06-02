import { useEffect } from 'react'
import styles from './CertModal.module.css'

export default function CertModal({ cert, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header} style={{ borderTopColor: cert.color }}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon} style={{ background: `${cert.color}18`, color: cert.color }}>
              🏆
            </div>
            <div>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.issuer} style={{ color: cert.color }}>{cert.issuer} · {cert.year}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Certificate image */}
        <div className={styles.imgWrap}>
          <img
            src={cert.image}
            alt={cert.title}
            className={styles.certImg}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback when image not uploaded yet */}
          <div className={styles.placeholder} style={{ display: 'none' }}>
            <span className={styles.placeholderIcon}>📄</span>
            <p className={styles.placeholderText}>Certificate image not uploaded yet</p>
            <p className={styles.placeholderHint}>
              Place your image at:<br />
              <code>public{cert.image}</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.desc}>{cert.description}</p>
          <a
            href={cert.image}
            download
            className={styles.downloadBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </a>
        </div>

      </div>
    </div>
  )
}
