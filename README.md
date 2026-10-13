# Knock-IT Solution & Service: Next.js website

Next.js 14 (App Router, TypeScript). All copy that changes lives in `content/`, and all images are real files in `public/images/`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

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
