import type { Metadata } from 'next'
import './globals.css'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'

export const metadata: Metadata = {
  title: 'אורבך · ירדן — משרד עורכי דין',
  description: 'משרד בוטיק מוביל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'אורבך ירדן עורכי דין',
  alternateName: 'Auerbach Yarden Law Offices',
  telephone: '+97237201898',
  email: 'office@auerbach-yarden.co.il',
  foundingDate: '1998',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'רחוב ויצמן 2, קומה 32',
    addressLocality: 'תל אביב',
    postalCode: '6423902',
    addressCountry: 'IL',
  },
  areaServed: 'IL',
  availableLanguage: ['Hebrew', 'English'],
  priceRange: '₪₪₪',
  openingHours: 'Mo-Th 08:30-19:00 Fr 08:30-14:00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Assistant:wght@300;400;500;600;700&family=Heebo:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  )
}
