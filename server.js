import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fetchCbAgentListings } from './server/cb-agent-listings.js';
import { getSupabaseAdmin, isSupabaseConfigured } from './server/supabase-admin.js';
import { sendContactNotification, isSmtpConfigured } from './server/send-contact-email.js';

// Load environment variables from .env.local or .env
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' });

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

if (!isProduction) {
  console.log('Supabase configured:', isSupabaseConfigured());
  console.log('SMTP configured:', isSmtpConfigured());
}

app.post('/api/inquiries', rateLimit(60000, 15), async (req, res) => {
  try {
    const { name, email, phone, message, context, listingId } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!isSupabaseConfigured()) {
      return res.status(503).json({
        error: 'Contact storage unavailable',
        message: 'Server is missing Supabase configuration.',
      });
    }

    const contextText =
      context?.trim() ||
      (listingId ? `Legacy property reference: ${listingId}` : null) ||
      null;

    const emailResult = await sendContactNotification({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
      context: contextText,
    });

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        message: message.trim(),
        context: contextText,
        is_read: false,
        email_delivered: emailResult.delivered,
        email_error: emailResult.error || null,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert failed:', error);
      return res.status(500).json({
        error: 'Error saving message',
        message: isProduction ? 'Please try again later' : error.message,
      });
    }

    return res.json({
      success: true,
      id: data.id,
      message: 'Thank you — your message was received.',
      emailSent: emailResult.delivered,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({
      error: 'Error submitting inquiry',
      message: isProduction ? 'An unexpected error occurred' : error.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabase: isSupabaseConfigured(),
    smtp: isSmtpConfigured(),
  });
});

app.get('/api/cb-listings', async (req, res) => {
  try {
    const data = await fetchCbAgentListings();
    res.set('Cache-Control', 'public, max-age=300');
    return res.json(data);
  } catch (error) {
    console.error('Error syncing CB listings:', error);
    return res.status(502).json({
      error: 'Unable to load listings from Coldwell Banker',
      message: isProduction ? 'Please try again later' : error.message,
      profileUrl:
        'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn',
    });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server running in ${isProduction ? 'production' : 'development'} mode on port ${PORT}`);
});

export default app;
