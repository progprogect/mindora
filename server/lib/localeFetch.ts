import {
  bypassesLocalePrefix,
  DEFAULT_LOCALE,
  LOCALE_REQUEST_HEADER,
  splitLocalePrefix,
  withLocalePrefix,
  type AppLocale,
} from './localePath.js'

type FetchHandler = (request: Request, env?: unknown) => Response | Promise<Response>

function redirectToDefaultLocale(pathname: string, search: string): Response {
  const location = withLocalePrefix(DEFAULT_LOCALE, `${pathname}${search}`)
  return new Response(null, { status: 302, headers: { Location: location } })
}

function requestWithLocaleHeader(request: Request, url: string, locale: AppLocale): Request {
  const headers = new Headers(request.headers)
  headers.set(LOCALE_REQUEST_HEADER, locale)
  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: request.redirect,
    signal: request.signal,
  }
  if (request.body) {
    init.body = request.body
    init.duplex = 'half'
  }
  return new Request(url, init)
}

function rewriteRequestForLocale(request: Request, locale: AppLocale, strippedPath: string): Request {
  const url = new URL(request.url)
  url.pathname = strippedPath
  return requestWithLocaleHeader(request, url.toString(), locale)
}

/** Redirect bare HTML paths to `/en/...` and strip `en`/`ru` before Hono route matching. */
export function withLocaleAwareFetch(inner: FetchHandler): FetchHandler {
  return async (request, env) => {
    const url = new URL(request.url)
    const pathname = url.pathname
    const search = url.search

    if (bypassesLocalePrefix(pathname)) {
      return inner(request, env)
    }

    const { locale, path } = splitLocalePrefix(pathname)
    if (!locale) {
      return redirectToDefaultLocale(pathname, search)
    }

    return inner(rewriteRequestForLocale(request, locale, path), env)
  }
}
