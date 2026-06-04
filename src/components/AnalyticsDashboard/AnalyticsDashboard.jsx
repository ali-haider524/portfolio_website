import { useState, useEffect } from 'react'
import { analyticsService } from '../../services/analyticsService'
import styles from './AnalyticsDashboard.module.css'

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState(null)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const ADMIN_PASSWORD = 'admin123'

  useEffect(() => {
    if (isAuthenticated) {
      const data = analyticsService.getSummary()
      setSummary(data)
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      setPassword('')
    } else {
      setError('❌ Incorrect password')
      setPassword('')
    }
  }

  const handleExport = () => {
    const data = analyticsService.exportAnalytics()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    if (window.confirm('⚠️ Are you sure? This will clear all analytics data.')) {
      analyticsService.clearAnalytics()
      const data = analyticsService.getSummary()
      setSummary(data)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>📊 Analytics Dashboard</h1>
          <p>Admin Access Required</p>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className={styles.passwordInput}
            />
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </form>

          {error && <div className={styles.error}>{error}</div>}

          <p className={styles.hint}>💡 Hint: Look for a simple password starting with "admin"</p>
        </div>
      </div>
    )
  }

  if (!summary) {
    return <div className={styles.loading}>Loading analytics...</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>📊 Analytics Dashboard</h1>
        <div className={styles.actions}>
          <button onClick={handleExport} className={styles.exportBtn} title="Download analytics as JSON">
            📥 Export
          </button>
          <button onClick={handleClear} className={styles.clearBtn} title="Clear all analytics data">
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👁️</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total Page Views</div>
            <div className={styles.statValue}>{summary.totalViews}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🚀</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Project Clicks</div>
            <div className={styles.statValue}>{summary.totalProjectClicks}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Events Today</div>
            <div className={styles.statValue}>{summary.todayEvents}</div>
          </div>
        </div>
      </div>

      {/* Top Projects & Sections */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>🔝 Top Projects</h2>
          {summary.topProjects.length > 0 ? (
            <div className={styles.list}>
              {summary.topProjects.map((p, i) => (
                <div key={i} className={styles.listItem}>
                  <span className={styles.rank}>{i + 1}</span>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.count}>{p.clicks} clicks</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No project clicks yet</p>
          )}
        </div>

        <div className={styles.card}>
          <h2>📍 Top Sections</h2>
          {summary.topSections.length > 0 ? (
            <div className={styles.list}>
              {summary.topSections.map((s, i) => (
                <div key={i} className={styles.listItem}>
                  <span className={styles.rank}>{i + 1}</span>
                  <span className={styles.name}>{s.name}</span>
                  <span className={styles.count}>{s.views} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No page views yet</p>
          )}
        </div>
      </div>

      {/* Views Trend */}
      <div className={styles.card}>
        <h2>📈 Views (Last 7 Days)</h2>
        <div className={styles.chartContainer}>
          {summary.viewsTrend.map((day, i) => (
            <div key={i} className={styles.chartBar}>
              <div className={styles.barLabel}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    height: `${Math.max(30, (day.views / Math.max(...summary.viewsTrend.map((d) => d.views), 1)) * 100)}px`,
                  }}
                  title={`${day.views} views`}
                />
              </div>
              <div className={styles.barValue}>{day.views}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p>💡 Analytics data is stored locally in your browser (localStorage)</p>
        <p>Data persists across sessions but is lost if you clear browser storage</p>
      </div>
    </div>
  )
}
