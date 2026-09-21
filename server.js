import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './server/load-env.js';
import {
  handlePostInquiry,
  handleHealth,
  handleCbListings,
} from './server/api-handlers.js';

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const redirectUrl = `https://${req.headers.host.slice(4)}${req.url}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

app.use((req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/') && !req.path.includes('.')) {
    const redirectUrl =
      req.protocol + '://' + req.get('host') + req.path.slice(0, -1) + req.url.slice(req.path.length);
    return res.redirect(301, redirectUrl);
  }
  next();
});

const rateLimit = (windowMs = 60000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    requests.forEach((timestamp, key) => {
      if (timestamp < windowStart) {
        requests.delete(key);
      }
    });

    const requestTimes = requests.get(ip) || [];
    requestTimes.push(now);
    requests.set(
      ip,
      requestTimes.filter(time => time > windowStart)
    );

    if (requests.get(ip).length > max) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please try again later',
      });
    }

    next();
  };
};

app.use('/api', rateLimit(60000, 120));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
    );
  });
  next();
});

app.post('/api/inquiries', rateLimit(60000, 15), (req, res) => handlePostInquiry(req, res));
app.get('/api/health', (req, res) => handleHealth(req, res));
app.get('/api/cb-listings', (req, res) => handleCbListings(req, res));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: isProduction ? 'An unexpected error occurred' : err.message,
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${isProduction ? 'production' : 'development'} mode on port ${PORT}`);
  });
}

export default app;
