# The Rits Baker

A responsive bakery storefront for **The Rits Baker**, a Bangkok-based bakery specializing in handcrafted eggless desserts.

[Visit Website](https://theritsbaker.com)

## About

The website allows customers to explore the bakery menu, search for products, add items to a cart, and place an order through LINE or WhatsApp.

All items are eggless. Vegan and other customized options are available upon request.

## Features

- Responsive design for mobile and desktop
- Product categories and menu search
- Cart with quantity controls and subtotal calculation
- LINE and WhatsApp order handoff
- Gallery with lightbox preview
- Contact form with email delivery
- SEO metadata and structured data
- Production security headers
- Vercel Analytics

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI
- Nodemailer
- pnpm

## Getting Started

### Requirements

- Node.js `20.9.0` or newer
- pnpm

### Installation

```bash
git clone <your-repository-url>
cd rits-bakers-web/bakery-website-frontend
pnpm install
```

### Environment Variables

Create a `.env.local` file inside `bakery-website-frontend`:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Use a Gmail App Password for `EMAIL_PASS`. These values are required for the contact form.

### Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/menu` | Searchable bakery menu |
| `/gallery` | Product gallery |
| `/about` | Bakery story |
| `/contact` | Contact form |

## Project Structure

```text
bakery-website-frontend/
├── app/                 # Pages and API routes
├── components/          # Storefront and UI components
├── hooks/               # React hooks
├── lib/                 # Menu data, cart state, and checkout helpers
└── public/              # Images, gallery assets, and logos
```

## Ordering Flow

1. Browse the menu.
2. Add products to the cart.
3. Adjust quantities.
4. Send the generated order summary through LINE or WhatsApp.
5. Confirm availability, delivery time, and final total in chat.

Online payment is not processed directly by the website.

## Updating Products

Menu categories, products, prices, and images are managed in:

```text
lib/menu-data.ts
```

Contact details and the WhatsApp number are configured in:

```text
lib/data.ts
```

## Deployment

The project can be deployed on Vercel or any Next.js-compatible platform.

Before deploying, configure `EMAIL_USER` and `EMAIL_PASS` in the hosting provider's environment variables.

## Contact

**The Rits Baker**  
Bangkok, Thailand  
Delivery only · Pre-order 24 hours in advance  
[theritsbaker@gmail.com](mailto:theritsbaker@gmail.com)
