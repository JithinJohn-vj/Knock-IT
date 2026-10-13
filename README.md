# Knock-IT Solution & Service: Next.js website

Next.js 15 (App Router, TypeScript). All copy that changes lives in `content/`, and all images are real files in `public/images/`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy on Hostinger (Next.js / Node.js web app hosting)

1. hPanel -> **Websites -> Add Website -> Node.js app**, then import this GitHub repo (or upload a zip without `node_modules` and `.next`).
2. Build settings: Node.js **20.x or 22.x**, build command `npm run build`, start command `npm start`.
3. Deploy. Hostinger provides the SSL certificate; keep HTTPS on, the site sends HSTS.

Security headers come from `next.config.mjs` and rate limiting from `middleware.ts`, both active automatically. Optional environment variables (hPanel app settings):

| Variable | Default | Purpose |
| --- | --- | --- |
| `RATE_LIMIT_MAX` | `300` | Requests allowed per IP per window (pages and data, not images) |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Window length in ms |
| `RATE_LIMIT_IP_HEADER` | unset | Header the host's proxy fills with the real visitor IP |
| `RATE_LIMIT_PROXY_HOPS` | unset | Number of proxies appending to `X-Forwarded-For` |
| `RATE_LIMIT_DEBUG` | unset | `1` adds an `X-Debug-Client-IP` response header for checking the above |

**After the first deploy, check visitor-IP detection:** set `RATE_LIMIT_DEBUG=1`, redeploy, open the site and look at the `X-Debug-Client-IP` response header (browser DevTools -> Network -> the page request). Compare it with your own public IP (search "what is my ip"):
- If `x-real-ip` (or `cf-connecting-ip`) shows your IP, set `RATE_LIMIT_IP_HEADER` to that header name.
- Otherwise, if your IP is in `x-forwarded-for` followed by N proxy addresses, set `RATE_LIMIT_PROXY_HOPS` to N + 1.
- If `used=` shows `unknown` or a Hostinger/proxy address instead of yours, fix this before going live: every visitor would share one limit.

Then remove `RATE_LIMIT_DEBUG`. Counts are kept in memory, so they reset on restart and assume a single app instance.

## Where things live

| What | Where |
| --- | --- |
| Site info (email, WhatsApp, nav links) | `content/site.json` |
| Projects (cards, detail pages, gallery) | `content/projects.json` |
| Services list and categories | `content/services.json`, `content/service-categories.json` |
| Product categories and items | `content/products.json` |
| Solutions explorer on the home page | `content/solutions.json` |
| Partners, brand logo strip | `content/partners.json`, `content/brands.json` |
| Arabic translations | `content/ar.json` (exact English text -> Arabic) |
| Image key -> file path | `content/images.json` |
| Images | `public/images/` (`logos/`, `projects/<slug>/`, `solutions/`) |
| Styles | `app/globals.css` |

## Add a project

1. Put photos in `public/images/projects/<slug>/`.
2. Add an object to `content/projects.json` (copy the Hyundai entry). A card appears on `/projects` and the page `/projects/<slug>` is generated automatically.
3. Optional: add Arabic text for any new sentences to `content/ar.json` -> `AR2`.

## Add a product item

Edit `content/products.json`: add the name under a category's `items` with its image path.

## Structure

- `app/` routes: `/`, `/solutions`, `/products`, `/projects`, `/projects/[slug]`, `/about`, `/contact`
- `components/` Header, Footer, quote list, language switch (`LangProvider` + `lib/translate.ts`), data-driven explorers (products, services, solutions), project gallery, scroll/slider behaviors (`Behaviors.tsx`)
- Home, About and Contact page copy is in their `app/*/page.tsx` files as JSX.
