import { useState, useEffect } from 'react'
import styles from './ScrollTop.module.css'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.querySelector('[data-main-content]')
    if (!el) return
    const onScroll = () => setVisible(el.scrollTop > 300)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    const el = document.querySelector('[data-main-content]')
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button className={styles.btn} onClick={scrollUp} aria-label="Scroll to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  )
}
