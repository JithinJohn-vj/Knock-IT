import { NextResponse, type NextRequest } from 'next/server'

// Per-IP fixed-window rate limiter. State lives in this server process's memory,
// which is correct for a single `next start` instance. Behind several instances or
// on serverless/edge hosting each instance counts separately, so use a shared
// store (e.g. Redis) or the host's built-in rate limiting there.
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 300
const MAX_TRACKED_IPS = 10_000

const hits = new Map<string, { count: number; reset: number }>()

// How to find the visitor's IP behind the host's proxy (e.g. Hostinger):
// - RATE_LIMIT_IP_HEADER: read this header, if the proxy overwrites it with the
//   real client IP (e.g. x-real-ip or cf-connecting-ip).
// - RATE_LIMIT_PROXY_HOPS: number of proxies that append to X-Forwarded-For; the
//   entry that many places from the right is the client (anything further left can
//   be forged by the client).
// - Neither set: leftmost X-Forwarded-For entry. Never lumps real visitors
//   together, but a client can forge it to dodge the limit.
// RATE_LIMIT_DEBUG=1 echoes what was seen in an X-Debug-Client-IP response header,
// to check the setup after deploying; turn it off afterwards.
const IP_HEADER = process.env.RATE_LIMIT_IP_HEADER?.toLowerCase()
const PROXY_HOPS = Number(process.env.RATE_LIMIT_PROXY_HOPS) || 0
const DEBUG = process.env.RATE_LIMIT_DEBUG === '1'

function clientIp(req: NextRequest) {
  if (IP_HEADER) {
    const v = req.headers.get(IP_HEADER)?.split(',')[0].trim()
    if (v) return v
  }
  const fwd = (req.headers.get('x-forwarded-for') ?? '').split(',').map((x) => x.trim()).filter(Boolean)
  if (PROXY_HOPS > 0 && fwd.length) return fwd[Math.max(0, fwd.length - PROXY_HOPS)]
  return fwd[0] || req.headers.get('x-real-ip') || 'unknown'
}

function prune(now: number) {
  for (const [ip, e] of hits) if (e.reset <= now) hits.delete(ip)
  // Still full of live entries (e.g. a spoofed-IP flood): drop the oldest ones.
  for (const ip of hits.keys()) {
    if (hits.size < MAX_TRACKED_IPS) break
    hits.delete(ip)
  }
}

export function middleware(req: NextRequest) {
  const now = Date.now()
  const ip = clientIp(req)
  let e = hits.get(ip)
  if (!e || e.reset <= now) {
    if (hits.size >= MAX_TRACKED_IPS) prune(now)
    e = { count: 0, reset: now + WINDOW_MS }
    hits.set(ip, e)
  }
  e.count++

  const remaining = Math.max(0, MAX_REQUESTS - e.count)
  const resetSec = Math.ceil((e.reset - now) / 1000)
  if (e.count > MAX_REQUESTS) {
    return new NextResponse('Too many requests. Please try again shortly.', {
      status: 429,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': String(resetSec),
        'RateLimit-Limit': String(MAX_REQUESTS),
        'RateLimit-Remaining': '0',
        'RateLimit-Reset': String(resetSec),
      },
    })
  }
  const res = NextResponse.next()
  res.headers.set('RateLimit-Limit', String(MAX_REQUESTS))
  res.headers.set('RateLimit-Remaining', String(remaining))
  res.headers.set('RateLimit-Reset', String(resetSec))
  if (DEBUG) {
    const h = req.headers
    res.headers.set('X-Debug-Client-IP', `used=${ip}; x-forwarded-for=${h.get('x-forwarded-for')}; x-real-ip=${h.get('x-real-ip')}; cf-connecting-ip=${h.get('cf-connecting-ip')}`)
  }
  return res
}

// Rate-limit pages and data requests; skip static build assets and images.
export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|favicon.ico).*)'],
}
