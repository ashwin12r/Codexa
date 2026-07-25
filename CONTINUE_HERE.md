# Codexa Handoff

This project is a Vite + React + Tailwind app for an AI Coding Assistant.

## What is already done

- Project scaffolded with React, Vite, Tailwind CSS, React Router DOM, Axios, Monaco Editor, Framer Motion, React Icons, and Recharts.
- Global theme support added with dark/light mode persistence.
- Main sections are built:
  - Landing page with hero, features, technologies, and how-it-works sections.
  - Analyze page with Monaco editor, file upload, language switcher, loader, and results flow.
  - Results panel with collapsible cards, corrected code, diff viewer, and personalized learning cards.
  - Dashboard page with recent analyses, stats, charts, and learning recommendations.
  - About page with architecture, model explanation, stack badges, and team cards.
- Mock API service layers added for analysis and dashboard data.
- Simple toast utility added for error/success feedback.
- Shared layout includes Navbar, Footer, and toast host.

## Dependencies already installed

These packages are already in `package.json` and should be available after running `npm install`:

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `@monaco-editor/react`
- `framer-motion`
- `react-icons`
- `recharts`
- `vite`
- `tailwindcss`
- `postcss`
- `@tailwindcss/postcss`
- `autoprefixer`
- `@vitejs/plugin-react`

## What a new contributor should do first

1. Run `npm install` if dependencies are not already installed.
2. Copy `.env.example` to `.env`.
3. Set `VITE_API_BASE_URL` if connecting to a backend.
4. Keep `VITE_USE_MOCK=true` until the backend endpoints are ready.
5. Run `npm run dev` to start the app.

## Environment variables

- `VITE_API_BASE_URL` - Base URL for the API server.
- `VITE_USE_MOCK` - Set to `true` for mock data, `false` for real API calls.

## Current implementation notes

- Analysis and dashboard services currently return mock data when `VITE_USE_MOCK=true`.
- The Analyze page uses mock loading, mock results, and a reusable results panel.
- The dashboard uses Recharts and is already responsive.
- The About page reuses the shared tech badge component.

## Suggested next work

- Replace mock analysis and dashboard data with real backend responses.
- Connect the Apply Fix action to actually update the editor state.
- Split large dashboard charts into lazy-loaded chunks if bundle size becomes a concern.
- Add form validation and richer result rendering once the backend schema is finalized.
