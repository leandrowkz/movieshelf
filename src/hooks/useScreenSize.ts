import { useLayoutEffect, useState } from 'react'

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

const watchMedia = (Object.keys(mediaMap) as (keyof typeof mediaMap)[]).reduce(
  (listeners, key) => {
    listeners[key] = window.matchMedia(
      mediaMap[key].max < Infinity
        ? `(min-width: ${mediaMap[key].min}px) and (max-width: ${mediaMap[key].max}px)`
        : `(max-width: ${mediaMap[key].max}px)`
    )

    return listeners
  },
  {} as Record<Viewport, MediaQueryList>
)

export function useScreenSize(viewport: Viewport) {
  const [matchedMedia, setMatchedMedia] = useState(false)

  useLayoutEffect(() => {
    const matchMedia = watchMedia[viewport]

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
