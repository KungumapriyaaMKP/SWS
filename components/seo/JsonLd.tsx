'use client';

export function JsonLd() {
  const baseUrl = 'https://sumyawebstudio.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Sumya Web Studio',
    alternateName: ['SWS', 'Sumya Web Studio Digital Agency'],
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description:
      'Sumya Web Studio designs and engineers high-performance 3D WebGL websites, AI solutions, web applications, custom software, and executive portfolios built to move businesses forward in 7-day engineering sprints.',
    telephone: '+91 7867896369',
    email: 'sumyawebstudio@gmail.com',
    priceRange: '₹10,000 - ₹3,00,000+',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.instagram.com/sumya.web.studio?igsi=ejlhYzg2dWliaDh4&utm_source=qr',
      'https://www.linkedin.com/in/kungumapriyaa-m/?skipRedirect=true',
    ],
    knowsAbout: [
      'Web Development',
      'Next.js Full-Stack Engineering',
      '3D WebGL & Three.js Architecture',
      'AI Agent & Business Automation',
      'Executive Brand Portfolios',
      'Custom SaaS & Web Applications',
      'UI/UX System Design',
      'Sub-second Performance Optimization',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Products & Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development',
            description: 'High-performance Next.js websites engineered for sub-second load speeds and maximum conversion.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal & Executive Portfolios',
            description: 'Awwwards-grade personal & executive portfolio websites crafted to build authority and secure clients.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Solutions & Automation',
            description: 'Intelligent 24/7 AI customer assistants, automated lead support, and custom RAG knowledge search.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software & SaaS Applications',
            description: 'Scalable cloud web applications, secure client portals, and automated business workflows.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3D WebGL & Interactive Experience',
            description: 'Immersive spatial Three.js product visualizers and 60fps WebGL interactive canvases.',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Sumya Web Studio',
    description: 'Digital Products Built to Move Businesses Forward',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Sumya Web Studio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sumya Web Studio is a premium digital product studio specializing in high-performance Next.js websites, 3D WebGL interactive experiences, AI solutions, custom software, and executive portfolios built to move ambitious businesses forward.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast can Sumya Web Studio launch a digital product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sumya Web Studio offers a signature 7-Day Engineering Sprint model that guarantees rapid launch predictability: Day 1 Blueprinting, Day 2 UI/UX, Days 3-4 Full-Stack Build, Days 5-6 QA & Lighthouse 90+ Optimization, and Day 7 Global Edge Deployment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does Sumya Web Studio provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sumya Web Studio provides Website Development, Executive & Personal Portfolios, AI Solutions & Chatbots, Custom Software & SaaS Applications, UI/UX Design, Business Automation, E-Commerce Storefronts, and 3D WebGL Interactive Experiences.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I start a project with Sumya Web Studio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can submit a project inquiry via the website contact form, email sumyawebstudio@gmail.com, or call/WhatsApp +91 7867896369 directly.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
