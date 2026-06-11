# Project State: The Rits Baker

## 1. Core Tech Stack
- **Framework**: Next.js 16.2.6 (App Router) with TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0 + Lucide icons + Radix UI primitives (Shadcn)
- **State Management**: React Context API for cart, coupon logic, and delivery details
- **Integrations**: Google Sheets CSV API, Nodemailer, WhatsApp/LINE checkout routing
- **Package Manager**: pnpm

## 2. Recently Completed Features
- **Google Sheets CSV Promo Code System**: Backend validation at `app/api/check-coupon/route.ts`. Supports `flat` and `percent` discounts, case-insensitive code matching, and expiry date checks.
- **Coupon Math Logic Fix**: Enforced strict percent vs flat calculation in `lib/cart-context.tsx`. Percentage = (subtotal × value) / 100, Flat = value directly.
- **Minimum Order Threshold (฿300)**: Coupons cannot be applied or auto-clear when cart subtotal drops below ฿300. Clear error message in cart UI.
- **VIP Promo Terms UI**: Compact VIP notice in cart-drawer.tsx, only visible when promo input is expanded.
- **Ekadashi Special & High Protein Menu Updates**: Added high-protein badges to specific items. Balanced badge layout (High Protein top-left, Vegan top-right, Top Seller adjusts).
- **Optional Delivery Details**: Added `deliveryDetails` to cart context with localStorage persistence. Textarea for address and input for Google Maps link. Conditionally rendered in the cart drawer.
- **Optional 24-Hour Buffer Delivery Time Slots**: Added `deliveryDate` and `deliveryTime` to cart context. Time slot logic in `lib/delivery-utils.ts` uses Asia/Bangkok timezone. Cutoff rules disable past slots for tomorrow. Hydration-safe initialization.
- **Tightened Vertical Spacing**: Updated section paddings from `py-12 lg:py-20` to `py-10 md:py-16` across homepage sections.
- **Premium Masonry Gallery Overhaul**: Rebuilt gallery grid with columns-2/3/4, rounded-2xl cards, scale-105 hover, gradient scrim, and short captions.
- **Banana Loaf Image Fix**: Both regular and vegan banana loaves now correctly point to `/menu/authentic_banana_loaf_menu.png`. Vegan version explicitly named "Authentic Thai Banana Loaf (Vegan)" to prevent cart confusion.
- **Search Routing & Menu UI Polish**:
  - Fixed desktop header search to use strict Next.js client-side navigation with `e.preventDefault()` and `router.push()`.
  - Menu page reads `q` param via `useSearchParams` (wrapped in Suspense) and auto-filters products.
  - Constrained search bar to `max-w-2xl` for better desktop viewing.
  - Premium category pill styling (zinc-50/emerald-800).
  - MenuProductCard upgraded to `rounded-2xl`, hover:-translate-y-1, hover:shadow-lg, smooth button hover states.

## 3. Current / Upcoming Feature
- Refining checkout payload formatting for WhatsApp/LINE to include all optional fields (address, maps link, delivery date/time, promo code details) in a clean Markdown structure.
- Potential: Adding a "Featured Products" carousel on the homepage to highlight new arrivals.

## 4. Key Active Files
- `components/cart-drawer.tsx` (Cart UI, delivery details, promo codes, time slots)
- `components/shop-section.tsx` (Menu page with search and category filters)
- `components/menu-product-card.tsx` (Product card with badges and hover states)
- `lib/cart-context.tsx` (Cart state, coupon logic, delivery state)
- `lib/menu-data.ts` (Menu data, high-protein items, vegan items)
- `lib/delivery-utils.ts` (Asia/Bangkok time slot logic)
- `lib/checkout.ts` (WhatsApp/LINE message payload generator)
- `app/gallery/page.tsx` (Premium masonry gallery)
- `app/menu/page.tsx` (Menu page with Suspense-wrapped ShopSection)

## 5. Known Issues / Tech Debt
- Verify the Google Sheets CSV URL is correctly set in `.env.local` (variable: `GOOGLE_SHEET_CSV_URL`).
- No other critical issues at this time.
