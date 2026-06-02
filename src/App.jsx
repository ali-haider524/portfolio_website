import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './components/sections/Home/Home'
import About from './components/sections/About/About'
import Skills from './components/sections/Skills/Skills'
import Experience from './components/sections/Experience/Experience'
import Projects from './components/sections/Projects/Projects'
import Certificates from './components/sections/Certificates/Certificates'
import Contact from './components/sections/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollTop from './components/ScrollTop/ScrollTop'
import styles from './App.module.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest('[data-sidebar]') &&
        !e.target.closest('[data-hamburger]')
      ) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [sidebarOpen])

  // Scroll main content to top on section change
  useEffect(() => {
    const el = document.querySelector('[data-main-content]')
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  const handleNav = (id) => {
    setActiveSection(id)
    setSidebarOpen(false)
    // Update browser tab title per section
    const titles = {
      home:         'Ali Haider | AI Web Developer',
      about:        'About | Ali Haider',
      skills:       'Skills | Ali Haider',
      experience:   'Experience | Ali Haider',
      projects:     'Projects | Ali Haider',
      certificates: 'Certificates | Ali Haider',
      contact:      'Contact | Ali Haider',
    }
    document.title = titles[id] || 'Ali Haider | Portfolio'
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':         return <Home setActiveSection={handleNav} />
      case 'about':        return <About />
      case 'skills':       return <Skills />
      case 'experience':   return <Experience />
      case 'projects':     return <Projects />
      case 'certificates': return <Certificates />
      case 'contact':      return <Contact />
      default:             return <Home setActiveSection={handleNav} />
    }
  }

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Hamburger (mobile) */}
      <button
        className={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        data-hamburger
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${sidebarOpen ? styles.barOpen1 : ''}`} />
        <span className={`${styles.bar} ${sidebarOpen ? styles.barOpen2 : ''}`} />
        <span className={`${styles.bar} ${sidebarOpen ? styles.barOpen3 : ''}`} />
      </button>

      {/* Sidebar */}
      <div data-sidebar>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleNav}
          isOpen={sidebarOpen}
        />
      </div>

      {/* Main scrollable area */}
      <main className={styles.main} data-main-content>
        <div className={styles.content} key={activeSection}>
          {renderSection()}
        </div>
        <Footer />
      </main>

      <ScrollTop />
    </div>
  )
}

export default App
