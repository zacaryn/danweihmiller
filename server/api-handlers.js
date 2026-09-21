import { fetchCbAgentListings } from './cb-agent-listings.js';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase-admin.js';
import { sendContactNotification, isSmtpConfigured } from './send-contact-email.js';
import { loadEnv } from './load-env.js';

loadEnv();

const isProduction = process.env.NODE_ENV === 'production';

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

export async function handlePostInquiry(req, res) {
  try {
    const body = parseBody(req);
    if (!body) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const { name, email, phone, message, context, listingId } = body;

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

    return res.status(200).json({
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
}

export async function handleHealth(req, res) {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabase: isSupabaseConfigured(),
    smtp: isSmtpConfigured(),
  });
}

export async function handleCbListings(req, res) {
  try {
    const data = await fetchCbAgentListings();
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error syncing CB listings:', error);
    return res.status(502).json({
      error: 'Unable to load listings from Coldwell Banker',
      message: isProduction ? 'Please try again later' : error.message,
      profileUrl:
        'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn',
    });
  }
}
