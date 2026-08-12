import { getSiteSettings } from '@/lib/site-settings'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingFab from '@/components/layout/FloatingFab'
import AccessibilityWidget from '@/components/layout/AccessibilityWidget'
import CookieConsent from '@/components/layout/CookieConsent'
import ScrollReset from '@/components/layout/ScrollReset'
import PreviewBanner from '@/components/layout/PreviewBanner'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <>
      <ScrollReset />
      <PreviewBanner />
      <Header logoImage={settings.logo_image} />
      <main className="flex-1 site-main" style={{ paddingTop: 100 }}>{children}</main>
      <Footer settings={settings} />
      <FloatingFab />
      <AccessibilityWidget />
      <CookieConsent gaId={settings.ga_id || undefined} />
    </>
  )
}
