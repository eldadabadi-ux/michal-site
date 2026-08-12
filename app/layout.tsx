import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'משרד עו"ד מיכל גלר-עבאדי', template: '%s | עו"ד מיכל גלר-עבאדי' },
  description: 'משרד עורכי דין מיכל גלר-עבאדי — ייעוץ משפטי מקצועי, אישי ומסור.',
  // Fallback must be a URL that actually resolves — the previous one (michal-law
  // .vercel.app) 404s, which would put dead absolute URLs in the OG/canonical tags.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://michal-website.vercel.app'),
  openGraph: { locale: 'he_IL', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" className="h-full">
      <body className="min-h-full">
        <div id="rtl-root" className="flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
