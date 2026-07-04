import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/site-settings'
import { getArticles } from '@/lib/articles'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'משרד עו"ד מיכל גלר-עבאדי | ייעוץ משפטי מקצועי',
  description: 'משרד עורכי דין מיכל גלר-עבאדי — ייעוץ משפטי מקצועי, אישי ומסור בתחומי מקרקעין, דיני משפחה, צוואות וליטיגציה אזרחית.',
}

export default async function HomePage() {
  const [settings, articles] = await Promise.all([getSiteSettings(), getArticles(3)])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'משרד עו"ד מיכל גלר-עבאדי',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: settings.contact_phone,
    email: settings.contact_email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.contact_address,
      addressCountry: 'IL',
    },
    description: settings.office_description,
    priceRange: '₪₪',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeroSection settings={settings} />
      <AboutSection settings={settings} />
      <ServicesSection settings={settings} />
      <WhyUsSection settings={settings} articles={articles} />
      <TestimonialsSection settings={settings} />
      <ContactSection settings={settings} />
    </>
  )
}
