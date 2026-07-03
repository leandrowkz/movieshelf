/**
 * Vercel Edge Middleware — restricts every `/api/*` route to the movieshelf.app
 * domain.
 *
 * Requests issued by the app itself (same-origin — which also covers local dev
 * and preview deployments calling their own API) are always allowed. Cross-origin
 * requests are only allowed when their `Origin`/`Referer` host is on the
 * allow-list. Everything else — other websites' JavaScript, hotlinking and
 * header-less clients such as curl/bots — receives a `403`.
 *
 * NOTE: this is browser-grade protection. `Origin`, `Referer` and `Sec-Fetch-*`
 * are attached and honoured by browsers, but can be forged by non-browser
 * clients. For hard guarantees (billing quotas, private data) pair this with a
 * server-side secret or user authentication (see `authorize()` in
 * `src/lib/api.ts`).
 */

// Only invoke the middleware for API routes.
export const config = {
  matcher: '/api/:path*',
}

// Hosts allowed to call the API cross-origin. Extra hosts (e.g. a preview URL)
// can be appended via the `ALLOWED_API_HOSTS` env var, comma-separated.
const ALLOWED_HOSTS = new Set(
  [
    'movieshelf.app',
    'www.movieshelf.app',
    ...(process.env.ALLOWED_API_HOSTS ?? '')
      .split(',')
      .map((host) => host.trim())
      .filter(Boolean),
  ].map((host) => host.toLowerCase())
)

function hostOf(value: string | null): string | null {
  if (!value) {
    return null
  }

  try {
    return new URL(value).hostname.toLowerCase()
  } catch {
    return null
  }
}

function isAllowed(request: Request): boolean {
  // Fetch Metadata: the app calling its own API. `same-origin` means the request
  // was issued by a page served from this very deployment; `same-site` covers the
  // apex <-> www pairing. These are set by the browser and cannot be spoofed by
  // page scripts, so they safely identify first-party traffic.
  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite === 'same-origin' || fetchSite === 'same-site') {
    return true
  }

  // Cross-origin requests (and legacy browsers that don't send Fetch Metadata)
  // must carry an allow-listed host. `Origin` is present on CORS requests and on
  // every non-GET request; `Referer` is the fallback for same-origin GETs from
  // older browsers.
  const host =
    hostOf(request.headers.get('origin')) ??
    hostOf(request.headers.get('referer'))

  return host !== null && ALLOWED_HOSTS.has(host)
}

export default function middleware(request: Request): Response | undefined {
  const { pathname } = new URL(request.url)

  // Defensive guard: only protect API routes even if the matcher is bypassed.
  if (!pathname.startsWith('/api/')) {
    return undefined
  }

  if (isAllowed(request)) {
    return undefined
  }

  return new Response(
    JSON.stringify({
      message:
        'Forbidden — this API is restricted to the movieshelf.app domain',
    }),
    {
      status: 403,
      headers: { 'content-type': 'application/json' },
    }
  )
}
