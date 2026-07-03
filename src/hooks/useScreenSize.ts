import { useEffect, useState } from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const mediaMap = {
  mobile: {
    min: 0,
    max: 539,
  },
  tablet: {
    min: 540,
    max: 767,
  },
  desktop: {
    min: 768,
    max: Infinity,
  },
}

function getMediaQuery(viewport: Viewport) {
  const { min, max } = mediaMap[viewport]

  return max < Infinity
    ? `(min-width: ${min}px) and (max-width: ${max}px)`
    : `(max-width: ${max}px)`
}

// Built once, but only where a `window` exists. Under server-side rendering the
// module still loads (Next evaluates it on the server), so guarding here is what
// prevents the `window is not defined` crash. In the browser it captures the
// MediaQueryList objects up front, exactly as before.
const watchMedia: Partial<Record<Viewport, MediaQueryList>> =
  typeof window === 'undefined'
    ? {}
    : (Object.keys(mediaMap) as Viewport[]).reduce((listeners, viewport) => {
        listeners[viewport] = window.matchMedia(getMediaQuery(viewport))

        return listeners
      }, {} as Record<Viewport, MediaQueryList>)

export function useScreenSize(viewport: Viewport) {
  const [matchedMedia, setMatchedMedia] = useState(false)

  useEffect(() => {
    const matchMedia = watchMedia[viewport]

    // Missing only when there is no `window` (SSR) — the effect never runs there.
    if (!matchMedia) {
      return
    }

    setMatchedMedia(matchMedia.matches)

    const queryMatchedMedia = (mql: MediaQueryListEvent) => {
      setMatchedMedia(mql.matches)
    }

    matchMedia.addEventListener('change', queryMatchedMedia)

    return () => {
      matchMedia.removeEventListener('change', queryMatchedMedia)
    }
  }, [viewport])

  return matchedMedia
}
