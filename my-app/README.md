    
# Payment Mode Web App

Manage and administer payment modes efficiently with a modern Next.js 15, React 19, and Tailwind CSS 4 web application.

## Features
- CRUD operations for payment modes (create, read, update)
- Modern UI with Radix UI, Lucide icons, and custom components
- API integration (configurable via `.env`)
- Responsive and accessible design

## Project Structure

- `app/` — Next.js app directory (pages, API routes)
- `components/ui/` — Reusable UI components (Button, Card, Dialog, etc.)
- `components/paymentmode/` — (Reserved for payment mode-specific components)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (already present):

```
NEXT_PUBLIC_API_URL=https://paymentmodeapi-production.up.railway.app
```

You can change the API URL as needed.

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Tech Stack
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)

## Folder Overview

- `app/` — Main app, API routes
- `components/ui/` — UI primitives
- `hooks/` — Custom hooks
- `lib/` — Utilities

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API endpoint

## License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
