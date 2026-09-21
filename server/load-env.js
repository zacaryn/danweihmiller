import dotenv from 'dotenv';

/** Vercel injects env at runtime; local dev uses .env files */
export function loadEnv() {
  if (process.env.VERCEL) return;
  dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  });
}
