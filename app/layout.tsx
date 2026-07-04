import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'משרד עו"ד מיכל גלר-עבאדי', template: '%s | עו"ד מיכל גלר-עבאדי' },
  description: 'משרד עורכי דין מיכל גלר-עבאדי — ייעוץ משפטי מקצועי, אישי ומסור.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://michal-law.vercel.app'),
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
