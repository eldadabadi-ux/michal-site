'use client'
import { useRef, useEffect } from 'react'
import type { SiteSettings } from '@/lib/site-settings'

export default function TestimonialsSection({ settings }: { settings: SiteSettings }) {
  const swipeRef = useRef<HTMLDivElement>(null)

  /* Desktop: doubled list for seamless CSS-animation loop */
  const desktopItems = [...settings.testimonials, ...settings.testimonials]
  const duration = Math.max(settings.testimonials.length * 6, 12)

  /* Mobile: tripled list — user always navigates the middle set;
     the outer sets act as buffers so the "teleport" is invisible. */
  const mobileItems = [
    ...settings.testimonials,
    ...settings.testimonials,
    ...settings.testimonials,
  ]
  const n = settings.testimonials.length

  useEffect(() => {
    const el = swipeRef.current
    if (!el || n === 0) return

    // Only activate the infinite logic on mobile
    const mq = window.matchMedia('(max-width: 768px)')
    if (!mq.matches) return

    const CARD_W = window.innerWidth * 0.78  // 78vw
    const GAP    = 12
    const setW   = n * (CARD_W + GAP)        // snap-distance of one full set

    // Jump to middle set on mount (no transition)
    const jumpToMiddle = () => { el.scrollLeft = setW }
    requestAnimationFrame(() => requestAnimationFrame(jumpToMiddle))

    // After the user stops swiping, silently teleport to the equivalent
    // position in the middle set if they drifted into the first or third set.
    const reset = () => {
      const sl = el.scrollLeft
      if (sl >= 2 * setW) {
        el.scrollLeft = sl - setW   // was in third set → jump to middle set
      } else if (sl < setW) {
        el.scrollLeft = sl + setW   // was in first set → jump to middle set
      }
    }

    // 1️⃣ Modern browsers: scrollend fires after snap animation completes
    el.addEventListener('scrollend', reset)

    // 2️⃣ Fallback: debounce scroll for older iOS Safari
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(reset, 120) }
    el.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      el.removeEventListener('scrollend', reset)
      el.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [n])

  return (
    <section className="testimonials-section" style={{
      padding: '90px 0 100px',
      background: 'var(--paper-cool)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--rule)',
    }}>
      {/* ── Section header ── */}
      <div className="testimonials-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 48,
        padding: '0 clamp(20px, 12vw, 220px)',
        position: 'relative',
        flexWrap: 'wrap',
        gap: 24,
      }}>
        <div>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.testimonials_label}
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(30px, 4vw, 44px)',
            margin: '14px 0 0',
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>
            {settings.testimonials_heading}
          </h2>
        </div>
      </div>

      {/* ── Desktop: infinite auto-scroll carousel ── */}
      <div className="testimonials-carousel-wrap" style={{
        overflow: 'hidden',
        position: 'relative',
        direction: 'ltr',
        margin: '0 clamp(20px, 12vw, 220px)',
      }}>
        <div
          style={{ display: 'flex', width: 'max-content', animation: `carousel-scroll ${duration}s linear infinite` }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {desktopItems.map((t, i) => (
            <article key={i} dir="rtl" style={{
              width: 400, height: 500, flexShrink: 0, marginRight: 30,
              background: 'var(--paper)', border: '1px solid var(--gold-soft)',
              padding: '32px 28px 26px', display: 'flex', flexDirection: 'column',
              borderTop: '2px solid var(--gold)', boxShadow: '0 1px 3px rgba(11,47,87,0.06)',
              overflow: 'hidden', boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {[0,1,2,3,4].map(j => <span key={j} style={{ color: 'var(--gold)', fontSize: 22 }}>★</span>)}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.65, color: 'var(--ink)', flex: 1, overflowY: 'auto' }}>
                {t.q}
              </div>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--gold-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0, height: 106, overflow: 'hidden', gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 26, color: 'var(--ink)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                  <div style={{ fontSize: 22, color: 'var(--ink-mute)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.role}</div>
                </div>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gold-deep)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {t.area}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Mobile: infinite swipe carousel with peek ── */}
      <div
        ref={swipeRef}
        className="testimonials-swipe-wrap"
        /* direction:ltr keeps left=prev / right=next even in RTL page */
        style={{ direction: 'ltr' }}
      >
        {mobileItems.map((t, i) => (
          <article key={i} dir="rtl" className="testimonials-swipe-card" style={{
            background: 'var(--paper)',
            border: '1px solid var(--gold-soft)',
            borderTop: '2px solid var(--gold)',
            padding: '20px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(11,47,87,0.06)',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
              {[0,1,2,3,4].map(j => <span key={j} style={{ color: 'var(--gold)', fontSize: 17 }}>★</span>)}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink)', flex: 1, overflow: 'hidden' }}>
              {t.q}
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--gold-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexShrink: 0 }}>
              <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 19, color: 'var(--ink)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                <div style={{ fontSize: 16, color: 'var(--ink-mute)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.role}</div>
              </div>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gold-deep)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {t.area}
              </span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Mobile swipe — hidden on desktop */
        .testimonials-swipe-wrap { display: none; }
        .testimonials-swipe-card {
          width: 78vw;
          height: 360px;
          flex-shrink: 0;
          scroll-snap-align: start;
        }

        @media (max-width: 768px) {
          .testimonials-section   { padding-top: 30px !important; padding-bottom: 36px !important; }
          .testimonials-header    { margin-bottom: 18px !important; }
          .testimonials-carousel-wrap { display: none !important; }

          /* Swipe container: peek = 11vw on both sides via padding + scroll-padding */
          .testimonials-swipe-wrap {
            display: flex !important;
            gap: 12px;
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 11vw;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-left: 11vw;
            padding-right: 4px;
          }
          .testimonials-swipe-wrap::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  )
}
