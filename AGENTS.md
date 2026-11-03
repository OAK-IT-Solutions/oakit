# AGENTS.md — OAK IT Solutions Marketing Website & Customer Portal

## Project Overview

Repository containing two Next.js 14 App Router applications for OAK IT Solutions (Kampala, Uganda):
1. **Marketing Website (`/` root)**: Deployed on **Vercel** at `https://oakitsolutionsandsupplies.com`. Next.js 14 App Router, TypeScript, Tailwind CSS 3, shadcn/ui (slate theme), Ghost CMS blog integration, Resend email.
2. **Customer Portal (`client-dashboard/`)**: Deployed in **Docker (`:3004`)** at `https://dashboard.oakitsolutionsandsupplies.com` (Dokploy container `compose-compress-primary-panel-52okxe-client-dashboard-1`). Connects to the ClassicPOS Laravel 12 API (`https://posapp.oakitsolutionsandsupplies.com/api/v1/client/*`).

*(Note: Platform Super-Admin SPA was extracted to `/home/apps/codebases/kilo/kilo/admin-dashboard/` so it does not interfere with the root Vercel build.)*

---

## Commands

### Root Marketing Site (`oakit/`)
```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build
npm run lint       # ESLint
bun install        # install (bun.lock present; npm also works)
```

### Client Dashboard (`oakit/client-dashboard/`)
```bash
cd client-dashboard
npm run dev                # dev server
npm run build              # production build
npx playwright test        # run E2E tests (tests/auth.spec.ts, tests/currency.spec.ts — 6/6 passing)
```

---

## Architecture

- `app/` — Root Marketing Site Next.js App Router pages. Server components by default unless client interactivity is needed.
- `components/` — Reusable marketing UI (`ServicesPricing.tsx`, `ServicesList.tsx`, `DesktopDownload.tsx`, `ContactUs.tsx`, `ui/*`).
- `lib/` — Server-side logic & config (`ghost.ts`, `email.ts`, `pricing.ts`, `services.ts`).
- `scripts/` — CLI scripts (`push-blog-content.js` for Ghost Admin API).
- `client-dashboard/` — Separate Next.js 14 customer portal app (excluded from root `tsconfig.json`; has its own `package.json`, `Dockerfile`, and Playwright suite).

---

## Marketing Site Routes (`app/`)

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero → Pricing (3-day trial CTAs) → Services → Testimonials → Blog → Mission → FAQ → Bootcamp → Desktop Download → Contact |
| `/products` | `app/products/page.tsx` | ClassicPOS, QuizApp, Blog |
| `/about-us` | `app/about-us/page.tsx` | Company info |
| `/blog` | `app/blog/page.tsx` | Ghost CMS listing |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual post (DOMPurify-sanitized) |
| `/backend-stack` | `app/backend-stack/page.tsx` | Bootcamp curriculum |
| `/frontend-stack` | `app/frontend-stack/page.tsx` | Bootcamp curriculum |
| `/fullstack-learn-more` | `app/fullstack-learn-more/page.tsx` | Fullstack bootcamp |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Dynamic service detail (13 services) |
| `/auth/signup`, `/auth/signin`, `/auth/verify` | `app/auth/*/page.tsx` | Marketing auth pages & email verification proxy (`/api/auth/*`) |

Legacy URLs (`/aboutUs`, `/Backendstack`, etc.) 301-redirect to canonical kebab-case routes in `next.config.mjs`.

---

## Client Dashboard Routes & Features (`client-dashboard/src/`)

| Route | File | Purpose |
|---|---|---|
| `/auth/login` | `src/app/auth/login/page.tsx` | Client login + forgot-password link + `?reason=` session expiry banner |
| `/auth/register` | `src/app/auth/register/page.tsx` | Registration with `?plan=` auto-select, live plan feature preview card, and 3-day free trial messaging |
| `/auth/verify` | `src/app/auth/verify/page.tsx` | Email verification token handler + auto-redirect |
| `/auth/forgot-password` | `src/app/auth/forgot-password/page.tsx` | Request password reset link |
| `/auth/reset-password` | `src/app/auth/reset-password/page.tsx` | Set new password (`<Suspense>` wrapped) |
| `/dashboard` | `src/app/dashboard/page.tsx` | Overview: current subscription, 3-day trial badge, stats, recent tickets, currency switcher, first-login `OnboardingWizard` (`src/components/onboarding/wizard.tsx`) |
| `/dashboard/checkout` | `src/app/dashboard/checkout/page.tsx` | Plan + billing cycle (monthly/annual) + currency checkout via PayPal/PesaPal |
| `/dashboard/subscriptions` | `src/app/dashboard/subscriptions/page.tsx` | Subscription list, Change Plan modal, Cancel confirmation |
| `/dashboard/services` | `src/app/dashboard/services/page.tsx` | Subscribed services vs available upgrade services |
| `/dashboard/tickets` | `src/app/dashboard/tickets/page.tsx` | Support tickets CRUD, message thread, close/reopen |
| `/dashboard/billing` | `src/app/dashboard/billing/page.tsx` | Payment transaction history + printable VAT (18%) invoice modal |
| `/dashboard/profile` | `src/app/dashboard/profile/page.tsx` | Profile & password management |

### Key Client Dashboard Internals
- **`src/features/auth/auth-provider.tsx`**: Sanctum Bearer token (`auth_token` in `localStorage`) + URL token handoff (`?token=xxx&redirect=/path` consumed on mount, stripped from URL via `history.replaceState`).
- **`src/lib/api.ts`**: Central API client for all 31+ `/api/v1/client/*` endpoints. Includes `X-XSRF-TOKEN` cookie forwarding and global `401`/`419` interceptor that clears `auth_token` and redirects to `/auth/login`.
- **`src/lib/format.ts`**: Central `formatMoney(amount, currency)` utility + `getStoredCurrency()` / `setStoredCurrency()` persisted in `localStorage`.

---

## Key Marketing Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — ThemeProvider (dark/light, default dark), Navbar, Footer, ToastProvider |
| `app/globals.css` | Tailwind base + custom section/card/animation classes |
| `components/ContactUs.tsx` | Contact form (client component) — submits to `/api/contact` |
| `components/ServicesPricing.tsx` | 3-tier pricing with monthly/annual toggle, 3-day trial CTAs pointing to `/auth/register?plan=...` |
| `components/ServicesList.tsx` | 13-service grid with Lucide icons |
| `components/DesktopDownload.tsx` | ClassicPOS Desktop download cards pointing to `github.com/OAK-IT-Solutions/classicpos-Lite/releases` |
| `components/ToastProvider.tsx` | Client wrapper around Sonner Toaster (fixes hydration) |
| `lib/ghost.ts` | Ghost Content API client with in-memory cache (1h fresh / 24h stale) |
| `lib/email.ts` | Resend email: admin notification + user auto-reply |
| `lib/pricing.ts` | Pricing config — Basic (UGX 700k/mo), Regular (UGX 1,500k/mo), Advanced (quote-only) |
| `lib/services.ts` | 13 IT services config — auto-generates `/services/[slug]` and sitemap |
| `app/api/contact/route.ts` | POST handler: validation, honeypot, rate limit (5/h per IP), Resend |
| `app/sitemap.ts` | Dynamic sitemap from services + Ghost posts |
| `scripts/push-blog-content.js` | Push blog posts to Ghost Admin API |

---

## Data Sources & Security Notes

- **Ghost CMS**: Content API v5 (`GHOST_URL`, server-only `GHOST_CONTENT_KEY`). Blog HTML is sanitized with `isomorphic-dompurify` before rendering.
- **Resend**: Transactional & contact emails (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` on verified domain `notifications.oakitsolutionsandsupplies.com`).
- **Verification Route Security**: `app/api/auth/send-verification/route.ts` sends the verification link via Resend email and never leaks `verification_url` in the JSON response.
- **`opencode.json`**: Contains a live API key — never echo or commit changes exposing it.

---

## Environment

Required vars (see `.env.local`):
```
GHOST_URL=https://blog.oakitsolutionsandsupplies.com
GHOST_CONTENT_KEY=<26-char hex>
RESEND_API_KEY=re_<key>
CONTACT_EMAIL_TO=admin1@example.com,admin2@example.com
CONTACT_EMAIL_FROM=website-form@notifications.oakitsolutionsandsupplies.com
NEXT_PUBLIC_API_URL=https://posapp.oakitsolutionsandsupplies.com/api/v1/client
```
