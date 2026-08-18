# DAFTRIFY

Turn messy work into clear workflows.

Document & Workflow Operations — the public website of DAFTRIFY. One continuous visual narrative in five acts: the mess, the method, the guarantee, the trust, the ask.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (design tokens via CSS variables + `@theme`)
- motion (Framer Motion) for animation
- Resend (REST) for intake form email delivery

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (free tier) |
| `CONTACT_EMAIL_FROM` | Verified sender address |
| `CONTACT_EMAIL_TO` | Delivery inbox for intake submissions |
| `SITE_URL` | Canonical URL for metadata, OG and sitemap |

## Deployment

1. Push this folder to a private GitHub repository.
2. In Vercel, import the repository (framework is auto-detected as Next.js).
3. Add the four environment variables under Project Settings → Environment Variables.
4. Deploy. Add `public/og-image.png` (1200x630) before sharing anywhere.

## Structure

```
src/
  app/          routing, metadata, page assembly, contact API
  components/
    layout/     header, scroll progress, mobile menu, footer
    primitives/ animation vocabulary: Reveal, Sheet, Stamp, Signature, DrawLine, Counter, CheckItem, MonoLabel, Scene, PinScene
    scenes/     one component per section (SEC-01 … SEC-09)
  content/      all copy and data as typed modules
  hooks/        viewport + reduced-motion aware scroll helpers
  lib/          easing/duration tokens, class merge, email sender
  styles/       design tokens, paper and ink art-direction layers
```

## Design system

Two voices: a grotesque display/body face (Schibsted Grotesk) and a monospace technical voice (IBM Plex Mono) for file codes and labels. One accent — the stamp — used only for human-review marks. Paper (light) and ink (dark) scenes carry the narrative rhythm.