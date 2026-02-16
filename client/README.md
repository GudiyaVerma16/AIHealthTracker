# 🏋️ AI HealthTracker – Frontend

React frontend for the **AI HealthTracker** app. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – build tool and dev server
- **Tailwind CSS** – styling
- **React Router** – routing
- **Axios** – API calls to Strapi
- **Recharts** – dashboard charts
- **Lucide React** – icons

## Setup

```bash
npm install
cp .env.example .env
# Set VITE_STRAPI_API_URL=http://localhost:1337/api in .env
npm run dev
```

Runs at `http://localhost:5173` (or next free port).

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## Environment

| Variable              | Description                    |
|-----------------------|--------------------------------|
| `VITE_STRAPI_API_URL` | Strapi API base (e.g. `http://localhost:1337/api`) |

Ensure the Strapi server is running before using the app.
