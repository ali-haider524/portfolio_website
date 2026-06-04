// Analytics tracking service using localStorage
const STORAGE_KEY = 'portfolio_analytics'

const defaultAnalytics = {
  events: [],
  lastSessionStart: Date.now(),
}

export const analyticsService = {
  // Get analytics data
  getAnalytics() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultAnalytics
  },

  // Save analytics to localStorage
  saveAnalytics(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  // Track an event
  trackEvent(eventType, data = {}) {
    const analytics = this.getAnalytics()
    analytics.events.push({
      type: eventType,
      timestamp: Date.now(),
      data,
    })
    this.saveAnalytics(analytics)
  },

  // Track page view
  trackPageView(sectionId) {
    this.trackEvent('page_view', { section: sectionId })
  },

  // Track project click
  trackProjectClick(projectId, projectTitle) {
    this.trackEvent('project_click', { projectId, projectTitle })
  },

  // Track contact form submission
  trackContactSubmission() {
    this.trackEvent('contact_submit', {})
  },

  // Get top projects by clicks
  getTopProjects(limit = 5) {
    const analytics = this.getAnalytics()
    const projectClicks = {}

    analytics.events
      .filter((e) => e.type === 'project_click')
      .forEach((e) => {
        const key = e.data.projectTitle || `Project ${e.data.projectId}`
        projectClicks[key] = (projectClicks[key] || 0) + 1
      })

    return Object.entries(projectClicks)
      .map(([name, clicks]) => ({ name, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, limit)
  },

  // Get top sections by views
  getTopSections(limit = 5) {
    const analytics = this.getAnalytics()
    const sectionViews = {}

    analytics.events
      .filter((e) => e.type === 'page_view')
      .forEach((e) => {
        const section = e.data.section || 'unknown'
        sectionViews[section] = (sectionViews[section] || 0) + 1
      })

    return Object.entries(sectionViews)
      .map(([name, views]) => ({ name, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
  },

  // Get total events today
  getTodayEvents() {
    const analytics = this.getAnalytics()
    const today = new Date().setHours(0, 0, 0, 0)
    return analytics.events.filter((e) => e.timestamp > today).length
  },

  // Get total page views
  getTotalPageViews() {
    const analytics = this.getAnalytics()
    return analytics.events.filter((e) => e.type === 'page_view').length
  },

  // Get total project clicks
  getTotalProjectClicks() {
    const analytics = this.getAnalytics()
    return analytics.events.filter((e) => e.type === 'project_click').length
  },

  // Get views over last 7 days
  getViewsTrend() {
    const analytics = this.getAnalytics()
    const trend = {}

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      trend[dateStr] = 0
    }

    analytics.events
      .filter((e) => e.type === 'page_view')
      .forEach((e) => {
        const dateStr = new Date(e.timestamp).toISOString().split('T')[0]
        if (trend[dateStr] !== undefined) {
          trend[dateStr]++
        }
      })

    return Object.entries(trend).map(([date, views]) => ({ date, views }))
  },

  // Clear all analytics
  clearAnalytics() {
    localStorage.removeItem(STORAGE_KEY)
  },

  // Export analytics as JSON
  exportAnalytics() {
    const analytics = this.getAnalytics()
    return JSON.stringify(analytics, null, 2)
  },

  // Get analytics summary
  getSummary() {
    return {
      totalViews: this.getTotalPageViews(),
      totalProjectClicks: this.getTotalProjectClicks(),
      todayEvents: this.getTodayEvents(),
      topProjects: this.getTopProjects(5),
      topSections: this.getTopSections(5),
      viewsTrend: this.getViewsTrend(),
    }
  },
}
