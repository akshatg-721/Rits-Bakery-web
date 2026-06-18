# Project State: The Rits Baker

## 1. Core Tech Stack
- **Framework**: Next.js 16.2.6 (App Router) with TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0 + Lucide icons + Radix UI primitives (Shadcn)
- **State Management**: React Context API for cart, coupon logic, and delivery details
- **Integrations**: Google Sheets CSV API, Nodemailer, WhatsApp/LINE checkout routing
- **Package Manager**: pnpm

## 2. Recently Completed Features
- **Homepage Hero Slider UX & Visual Redesign** (`components/hero-slider.tsx`):
  - Removed operational/delivery subtitle text from hero slides to keep the section editorial and product-led.
  - Refined eyebrow, heading, description, and CTA spacing for a cleaner premium bakery presentation.
  - Reworked hero CTAs into a single warm ivory pill button per slide with subtle hover lift/shadow and content-width sizing.
  - Preserved existing hero imagery, slide order, core slider behavior, and primary routing targets.
- **Google Sheets CSV Promo Code System**: Backend validation at `app/api/check-coupon/route.ts`. Supports `flat` and `percent` discounts, case-insensitive code matching, and expiry date checks.
- **Coupon Math Logic Fix**: Enforced strict percent vs flat calculation in `lib/cart-context.tsx`. Percentage = Math.floor((subtotal × value) / 100), Flat = value directly. Discount is capped at subtotal — can never exceed what the customer owes.
- **Minimum Order Threshold (฿300)**: Coupons cannot be applied or auto-clear when cart subtotal drops below ฿300. Clear error message in cart UI.
- **Per-Coupon MinAmount Support**: Added a 5th column `MinAmount` to the Google Sheets CSV schema. API parses it with strict `parseInt` + `isNaN` guard. Cart context enforces it: if `minAmount > 0`, it overrides the global ฿300 floor. The same threshold logic is used in both `applyCoupon` and the auto-clear `useEffect`.
- **Bulletproof Promo Code System Refactor** (`app/api/check-coupon/route.ts`):
  - `cache: 'no-store'` — always fetches fresh data, no stale coupons.
  - Input sanitized to `.trim().toUpperCase()` before matching.
  - Returned `code` is always uppercased.
  - `type` strictly validated — only `'percent'`/`'percentage'` or `'flat'`/`'fixed'` accepted; others return an error.
  - `value` validated with `isFinite()` to catch edge cases.
  - Expiry check uses **Asia/Bangkok (UTC+7) timezone** — same-day codes valid until midnight Bangkok time. Returns distinct `"This promo code has expired."` message.
- **VIP Promo Terms UI**: Compact VIP notice in cart-drawer.tsx, only visible when promo input is expanded.
- **Ekadashi Special & High Protein Menu Updates**: Added high-protein badges to specific items. Balanced badge layout (High Protein top-left, Vegan top-right, Top Seller adjusts).
- **Optional Delivery Details**: Added `deliveryDetails` to cart context with localStorage persistence. Textarea for address and input for Google Maps link. Conditionally rendered in the cart drawer.
- **Optional 24-Hour Buffer Delivery Time Slots**: Added `deliveryDate` and `deliveryTime` to cart context. Time slot logic in `lib/delivery-utils.ts` uses Asia/Bangkok timezone. Cutoff rules disable past slots for tomorrow. Hydration-safe initialization.
- **Premium Masonry Gallery Overhaul**: Rebuilt gallery grid with columns-2/3/4, rounded-2xl cards, scale-105 hover, gradient scrim, and short captions.
- **Search Routing & Menu UI Polish**:
  - Fixed desktop header search to use strict Next.js client-side navigation with `e.preventDefault()` and `router.push()`.
  - Menu page reads `q` param via `useSearchParams` (wrapped in Suspense) and auto-filters products.
  - `app/menu/page.tsx` fixed to `async` + `await searchParams` (Next.js 16 async API).
  - MenuProductCard upgraded to `rounded-2xl`, hover:-translate-y-1, hover:shadow-lg, smooth button hover states.
- **Menu Page Spacing Overhaul**: Refined all vertical and horizontal spacing on the menu page — title area, search bar, category pills, and product grid — to match premium e-commerce UI standards. Title is flex-centered in the space between the header and the search bar.
- **Fixed Glassmorphic Header & Mobile Bottom Nav**: Added a fixed glassmorphic header and a dedicated mobile bottom navigation bar (`components/mobile-bottom-nav.tsx`) for a better mobile experience. Fixed spacing in `app/layout.tsx`.
- **Checkout Payload Formatting**: Refined checkout payload formatting for WhatsApp/LINE to include all optional fields (address, maps link, delivery date/time, promo code details) in a clean Markdown structure.
- **Vegan Pricing Updates**: Updated pricing for vegan menu items in `lib/menu-data.ts`.

## 3. Current / Upcoming Feature
- Potential: Adding a "Featured Products" carousel on the homepage to highlight new arrivals.

## 4. Key Active Files
- `components/hero-slider.tsx` (Homepage Embla hero slider with premium single-CTA treatment and refined spacing)
- `app/api/check-coupon/route.ts` (Bulletproof promo code validation — no-store, Bangkok TZ, strict types)
- `components/cart-drawer.tsx` (Cart UI, delivery details, promo codes, time slots)
- `components/header.tsx` (Fixed glassmorphic header)
- `components/mobile-bottom-nav.tsx` (Mobile bottom navigation bar)
- `components/shop-section.tsx` (Menu page with search and category filters)
- `components/menu-product-card.tsx` (Product card with badges and hover states)
- `lib/cart-context.tsx` (Cart state, coupon logic with MinAmount enforcement, delivery state)
- `lib/menu-data.ts` (Menu data, high-protein items, vegan items)
- `lib/delivery-utils.ts` (Asia/Bangkok time slot logic)
- `lib/checkout.ts` (WhatsApp/LINE message payload generator)
- `app/gallery/page.tsx` (Premium masonry gallery)
- `app/menu/page.tsx` (Async Server Component with awaited searchParams)
- `app/layout.tsx` (Root layout with updated spacing for fixed header)

## 5. Google Sheets CSV Schema
| Column | Header | Notes |
|---|---|---|
| 1 | `Code` | Promo code string (matched case-insensitively, returned uppercase) |
| 2 | `Type` | `percent` / `percentage` or `flat` / `fixed` |
| 3 | `Value` | Numeric discount amount or percentage |
| 4 | `ExpiryDate` | `YYYY-MM-DD` format. Checked against Asia/Bangkok midnight. |
| 5 | `MinAmount` | Optional. Per-coupon minimum spend (฿). If `> 0`, overrides the global ฿300 floor. |

## 6. Known Issues / Tech Debt
- Verify the Google Sheets CSV URL is correctly set in `.env.local` (variable: `GOOGLE_SHEET_CSV_URL`).
- No other critical issues at this time.
