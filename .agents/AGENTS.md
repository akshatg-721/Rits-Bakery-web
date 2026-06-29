# The Rits Baker — Project Brain

> This file is the single source of truth for any AI agent working on this project.
> Read this before analyzing any files. Update this file whenever significant changes are made.

---

## 1. Project Overview

**The Rits Baker** is a Bangkok-based premium eggless bakery. This is their customer-facing storefront website.

- **Live site**: https://theritsbaker.com
- **Business model**: Pre-order only (24-hour notice), delivery only. No online payment — customers order via LINE or WhatsApp.
- **Speciality**: All items are eggless. Vegan options available upon request.
- **Currency**: Thai Baht (฿)
- **Timezone for all business logic**: `Asia/Bangkok` (UTC+7)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5.7.3 |
| Styling | Tailwind CSS 4.2.0 |
| UI Primitives | Radix UI (via Shadcn) |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Email | Nodemailer (Gmail App Password) |
| Analytics | Vercel Analytics |
| Package Manager | **pnpm** (always use pnpm, never npm/yarn) |
| Deployment | Vercel |

### Fonts
- **Sans**: `Inter` → CSS var `--font-sans`
- **Serif**: `Cormorant Garamond` → CSS var `--font-serif`

### Design Language
- Background: `#F9F9F9`
- Primary text: `#111111`
- Glassmorphic fixed header, mobile bottom nav
- Premium, minimal, bakery-editorial aesthetic

---

## 3. Directory Structure

```
rits-bakers-web/
├── .agents/                    ← Agent customizations (this file lives here)
├── bakery-website-frontend/    ← THE ENTIRE APP lives here
│   ├── app/                    ← Next.js App Router pages + API routes
│   │   ├── page.tsx            ← Homepage
│   │   ├── layout.tsx          ← Root layout (fonts, metadata, CartProvider, Header, Footer)
│   │   ├── globals.css         ← Global styles
│   │   ├── menu/               ← /menu route (async Server Component, awaits searchParams)
│   │   ├── gallery/            ← /gallery route (masonry gallery)
│   │   ├── about/              ← /about route
│   │   ├── contact/            ← /contact route
│   │   ├── our-story/          ← /our-story route
│   │   └── api/
│   │       ├── check-coupon/   ← Promo code validation (Google Sheets CSV)
│   │       └── contact/        ← Contact form email via Nodemailer
│   ├── components/             ← All React components
│   │   ├── header.tsx          ← Fixed glassmorphic header with search
│   │   ├── footer.tsx          ← Site footer
│   │   ├── hero-slider.tsx     ← Homepage Embla hero slider (single CTA per slide)
│   │   ├── hero-section.tsx    ← Static hero section
│   │   ├── cart-drawer.tsx     ← Cart UI (promo codes, delivery details, time slots)
│   │   ├── mobile-bottom-nav.tsx ← Mobile-only bottom navigation bar
│   │   ├── shop-section.tsx    ← Menu page with search + category filter
│   │   ├── menu-section.tsx    ← Homepage menu preview section
│   │   ├── menu-product-card.tsx ← Product card (badges, hover states)
│   │   ├── menu-search-bar.tsx ← Search bar component
│   │   ├── product-card.tsx    ← Generic product card
│   │   ├── featured-carousel.tsx ← Featured products carousel
│   │   ├── gallery-page-client.tsx ← Gallery client component
│   │   ├── curations.tsx       ← Curated collections section
│   │   ├── testimonials.tsx    ← Customer testimonials
│   │   ├── social-hub.tsx      ← Social media links
│   │   ├── newsletter.tsx      ← Newsletter signup
│   │   ├── whatsapp-fab.tsx    ← Floating WhatsApp button
│   │   ├── theme-provider.tsx  ← next-themes provider
│   │   └── ui/                 ← Shadcn/Radix UI primitives
│   ├── lib/
│   │   ├── menu-data.ts        ← ALL menu categories + products (source of truth for menu)
│   │   ├── cart-context.tsx    ← React Context: cart state, coupon logic, delivery details
│   │   ├── checkout.ts         ← WhatsApp/LINE message payload generator
│   │   ├── delivery-utils.ts   ← Time slot logic (Asia/Bangkok timezone)
│   │   ├── search-engine.ts    ← Product search engine
│   │   ├── seo.ts              ← SEO metadata + JSON-LD schemas
│   │   ├── data.ts             ← Site config (name, WhatsApp number)
│   │   └── utils.ts            ← cn() classnames helper
│   ├── hooks/
│   │   ├── use-toast.ts        ← Toast notification hook
│   │   └── use-mobile.ts       ← Mobile breakpoint detection hook
│   ├── public/
│   │   ├── logo.png            ← Bakery logo
│   │   ├── og-image.jpg        ← Open Graph social share image
│   │   ├── line-qr.jpg         ← LINE QR code
│   │   ├── gallery/            ← Gallery images
│   │   └── menu/               ← Product images
│   ├── styles/                 ← Additional stylesheets
│   ├── next.config.mjs         ← Next.js config (security headers, image config)
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
└── PROJECT_STATE.md            ← Feature changelog (update when adding features)
```

---

## 4. Key Files — What Each Does

### `lib/menu-data.ts`
The **single source of truth** for all menu content. Contains categories (Brownies, Cakes, Cookies, Vegan, etc.) and every product with:
- `id`, `name`, `price`, `displayPrice`, `description`, `image`, `vegan`, `highProtein`, `topSeller`, `badges`
- To add/edit/remove menu items: edit this file only.

### `lib/cart-context.tsx`
React Context providing the entire cart system:
- `CartProvider` wraps the whole app (in `layout.tsx`)
- `useCart()` hook for all cart interactions
- State: `cartItems`, `appliedCoupon`, `deliveryDetails`, `deliveryDate`, `deliveryTime`, `isCartOpen`
- **Coupon math**: `percent` → `Math.floor((subtotal × value) / 100)`, `flat` → value directly. Discount capped at subtotal.
- **Minimum order**: Global floor ฿300. Per-coupon `minAmount` overrides global floor when set.
- Delivery details persisted to `localStorage` key: `rits-baker-delivery-details`

### `lib/checkout.ts`
Generates the order message string sent to WhatsApp/LINE. Includes: items, subtotal, discount, final total, address, maps link, delivery date/time, promo code.

### `lib/delivery-utils.ts`
- `getValidDeliveryDates()` — returns 7 valid delivery dates (starts tomorrow; if after 9 PM BKK, starts day after tomorrow)
- `getAvailableTimeSlots(date)` — returns morning/afternoon/evening slots, disabling past slots for tomorrow
- Time slots: Morning (9am–12pm), Afternoon (1pm–4pm), Evening (5pm–9pm)

### `app/api/check-coupon/route.ts`
Fetches Google Sheets CSV (`GOOGLE_SHEET_CSV_URL` env var), validates promo codes:
- `cache: 'no-store'` (always fresh)
- Input sanitised: `.trim().toUpperCase()`
- Returns `{ valid, code, type, value, minAmount }` or `{ valid: false, error }`
- Expiry checked against Asia/Bangkok midnight

### `lib/data.ts`
```ts
export const siteConfig = {
  name: 'The Rits Baker',
  whatsappNumber: '+66-972932849',
}
```

### `app/layout.tsx`
- Wraps everything in `<CartProvider>`
- Renders: `<Header>`, `<main className="pt-20">`, `<Footer>`, `<WhatsAppFAB>`, `<Toaster>`
- `pt-20` accounts for the fixed header height

---

## 5. Promo Code System (Google Sheets CSV)

**Env var**: `GOOGLE_SHEET_CSV_URL` (in `bakery-website-frontend/.env.local`)

| Column | Header | Notes |
|---|---|---|
| 1 | `Code` | Matched case-insensitively, returned uppercase |
| 2 | `Type` | `percent`/`percentage` or `flat`/`fixed` |
| 3 | `Value` | Numeric discount |
| 4 | `ExpiryDate` | `YYYY-MM-DD` — checked vs Asia/Bangkok midnight |
| 5 | `MinAmount` | Optional. Per-coupon minimum spend. `> 0` overrides global ฿300 floor |

---

## 6. Environment Variables

File: `bakery-website-frontend/.env.local`

| Variable | Purpose |
|---|---|
| `EMAIL_USER` | Gmail address for contact form |
| `EMAIL_PASS` | Gmail App Password |
| `GOOGLE_SHEET_CSV_URL` | Public Google Sheets CSV URL for promo codes |

---

## 7. Running Locally

```bash
cd bakery-website-frontend
pnpm install      # install deps
pnpm dev          # start dev server at http://localhost:3000
pnpm build        # production build
pnpm lint         # ESLint
```

---

## 8. Ordering Flow

1. Customer browses `/menu`, adds items to cart
2. Cart drawer opens (floating cart button in header/mobile nav)
3. Customer optionally applies a promo code (validated against Google Sheets)
4. Customer optionally fills in delivery address + Google Maps link
5. Customer selects delivery date and time slot (24-hour advance booking)
6. Customer taps "Send via WhatsApp" or "Send via LINE"
7. A pre-formatted message is generated and opened in the messaging app
8. Bakery confirms in chat, collects payment separately (no online payments)

---

## 9. Badge System (Menu Products)

Products can have multiple visual badges rendered by `menu-product-card.tsx`:
- `topSeller: true` → "Top Seller" badge
- `vegan: true` → "Vegan" badge (top-right)
- `highProtein: true` → "High Protein" badge (top-left)
- Custom `badges?: string[]` array for any additional labels

---

## 10. SEO & Structured Data

Managed in `lib/seo.ts`. Root layout injects:
- `OrganizationSchema` (JSON-LD)
- `LocalBusinessSchema` / `BakeryOrBakingCompany` (JSON-LD)
- Open Graph + Twitter card metadata
- Site URL: `https://theritsbaker.com`

---

## 11. Security Headers (Production Only)

Configured in `next.config.mjs`. Applied only in production. Includes:
- CSP (Content Security Policy)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy
- Permissions-Policy

---

## 12. Known Issues / Tech Debt

- Verify `GOOGLE_SHEET_CSV_URL` is correctly set in `.env.local`
- Images use `unoptimized: true` in next.config.mjs (no Next.js Image Optimization)
- No online payment processing — all payments handled offline in chat

---

## 13. Agent Guidelines for This Project

- **Always use `pnpm`**, never `npm` or `yarn`
- **Run from `bakery-website-frontend/`** — this is where `package.json` lives
- **Menu changes** → edit `lib/menu-data.ts` only
- **Contact/WhatsApp config** → edit `lib/data.ts`
- **New pages** → create under `app/` using Next.js App Router conventions
- **`app/menu/page.tsx` is async** — `searchParams` must be `await`ed (Next.js 16 async API)
- **All time/date logic** must use `Asia/Bangkok` timezone (UTC+7)
- **Coupon logic** lives entirely in `lib/cart-context.tsx` + `app/api/check-coupon/route.ts`
- **Styling**: Tailwind CSS 4 utility classes. Global styles in `app/globals.css`
- **Path aliases**: `@/` maps to `bakery-website-frontend/` (set in `tsconfig.json`)
- **Do not** add new global state outside `cart-context.tsx` without good reason
- **Update `PROJECT_STATE.md`** in the project root after completing any significant feature

---

*Last updated: 2026-06-29*
