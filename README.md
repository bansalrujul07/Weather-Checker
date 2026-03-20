# Weather-Checker

A Weather App in React + Vite. It shows temperature, humidity, and condition for a searched city using OpenWeatherMap API.

## Setup

1. Create `.env` from `.env.example`:
   - `cp .env.example .env`
2. Put your API key:
   - `VITE_OPENWEATHER_API_KEY=YOUR_API_KEY`
3. Install dependencies:
   - `npm install`
4. Run dev server:
   - `npm run dev`

## Environment

- `VITE_OPENWEATHER_API_KEY` is used in `src/App.jsx` to call OpenWeatherMap.
- `.gitignore` includes `.env`, `.env.local`, `.env.*.local` so secrets are not committed.

## Build

- `npm run build`
- `npm run preview`

## Notes

- Keep `.env` private and do not commit it.
- Use GitHub Actions secrets / pipeline env variables for production builds.

