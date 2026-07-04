'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Resets scroll to top on every page navigation,
 * unless the URL has a hash anchor (e.g. /#contact).
 * Fixes mobile browsers that restore scroll position from previous visits.
 */
export default function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  return null
}
