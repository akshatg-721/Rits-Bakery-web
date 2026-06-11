# Project State: The Rits Baker

## 1. Core Tech Stack
- **Framework**: Next.js 16.2.6 (App Router) with TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0 + Lucide icons + Radix UI primitives (Shadcn)
- **State Management**: React Context API for cart and coupon logic
- **Integrations**: Google Sheets CSV API, Nodemailer, WhatsApp/LINE checkout routing
- **Package Manager**: pnpm

## 2. Recently Completed Features
- **Google Sheets CSV Promo Code System**: Implemented backend validation at `app/api/check-coupon/route.ts`. Supports `flat` and `percent` discounts, case-insensitive code matching, and expiry date checks with caching for 60 seconds.
- **VIP Promo Terms UI**: Refined the cart-drawer.tsx component to display a compact VIP notice ("Spend ฿5,000/month to unlock VIP codes. Email us to claim.") only when the promo code input is expanded. The email link uses `mailto:` and the copy is optimized for space.
- **Ekadashi Special & High Protein Menu Updates**:
  - Updated "Gluten Free Nuts Cookies (Ekadashi Special)" price to ฿299 and added "225gms" to the name.
  - Added `isHighProtein` property to `MenuProduct` interface and UI badges in `menu-product-card.tsx`.
  - Applied high-protein badges to 3 items: cookies, ekadashi cake, and date & walnut cake (both regular and vegan versions). Balanced badge layout: High Protein on top-left, Vegan on top-right, Top Seller adjusts to avoid overlap.

## 3. Current / Upcoming Feature
Implementing strict `Asia/Bangkok` timezone delivery clock logic and a `getEstimatedDeliveryTime()` utility to display in the cart and append to LINE/WhatsApp payloads.

## 4. Key Active Files
- `components/cart-drawer.tsx`
- `lib/cart-context.tsx`
- `lib/menu-data.ts`
- `lib/checkout.ts`
- `app/api/check-coupon/route.ts`

## 5. Known Issues / Tech Debt
- (No known critical issues documented at this time)
