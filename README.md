# Mechnovate ’26 — Next.js Landing Page

Production-oriented Next.js App Router scaffold based on the supplied Mechnovate ’26 reference design.

## Stack

- Next.js 16 + App Router
- React 19 + TypeScript
- Motion for React
- Lucide icons
- Spline React integration
- Plain CSS for the visual system (keeps pixel-level control easy)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Spline

The community page URL is a reference page, not the production `scene.splinecode` URL used by the React integration. In Spline, open the scene and use **Export → Code → Next.js/React**, then paste the generated production URL into:

```env
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/XXXXXXXX/scene.splinecode
```

The scene component is isolated in `src/components/home/SplineHero.tsx`, so swapping the scene later does not affect the rest of the page.

## Where future client assets go

- `public/images/logos/`
- `public/images/gallery/`
- `public/images/team/`
- `public/images/events/`
- `public/videos/`

The current landing page intentionally uses code-built placeholders for imagery that has not yet been supplied by the client.

## Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    home/
      AboutSection.tsx
      CtaBanner.tsx
      DisciplinesSection.tsx
      Hero.tsx
      HomePage.tsx
      SplineHero.tsx
      StatsStrip.tsx
      TeamSection.tsx
    layout/
      Footer.tsx
      Header.tsx
    ui/
      SectionLabel.tsx
  data/
    home.ts
  types/
    home.ts
public/
  images/
    placeholders/
```
