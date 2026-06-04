/**
 * SEO - Structured Data (JSON-LD)
 * Adds schema.org markup for better search engine understanding
 */

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Haider',
    jobTitle: 'AI Web Developer & Automation Specialist',
    url: 'https://ali-haider.dev',
    sameAs: [
      'https://github.com/ali-haider524',
      'https://linkedin.com/in/ali-haider-developer',
    ],
    image: '/profile.jpg',
    description: 'AI Web Developer, Automation Specialist & AI Solutions Builder. Expert in PHP, Node.js, React, Botpress, and n8n.',
    knowsLanguage: ['en', 'ur'],
    workLocation: {
      '@type': 'Place',
      name: 'Pakistan',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PortfolioSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ali Haider | AI Web Developer',
    url: 'https://ali-haider.dev',
    description: 'Professional portfolio of Ali Haider - AI Web Developer, Automation Specialist & Solutions Builder',
    creator: {
      '@type': 'Person',
      name: 'Ali Haider',
    },
    inLanguage: 'en-US',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ali Haider - Development & Automation',
    description: 'AI Web Development, Automation, and Solutions Services',
    url: 'https://ali-haider.dev',
    telephone: '+92-321-8724280',
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    knowsAbout: [
      'Web Development',
      'Automation',
      'AI Integration',
      'PHP',
      'Node.js',
      'React',
      'Botpress',
      'n8n',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
