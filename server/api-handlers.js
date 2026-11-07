import { fetchCbAgentListings, fetchCbListingDetail } from './cb-agent-listings.js';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase-admin.js';
import { sendContactNotification, isSmtpConfigured, mailRecipientsSummary } from './send-contact-email.js';
import { loadEnv } from './load-env.js';
import { scoreSpam } from './spam-filter.js';

loadEnv();

const isProduction = process.env.NODE_ENV === 'production';

/** Marker stored in email_error so the admin inbox can label filtered messages. */
export const SPAM_NOTE_PREFIX = 'Spam filter:';

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
    // optional, e.g. "Fri, Oct 16 · Afternoon"
    const tourDate = typeof body.tourDate === 'string' ? body.tourDate.trim().slice(0, 60) || null : null;

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

    // Content spam filter ("SEO", "Leads" pitches). Flagged messages are still saved to the
    // inbox (already marked read) so nothing real is lost — they just skip the email/text alerts.
    const spam = scoreSpam({ name, email, message });
    let emailResult;
    if (spam.isSpam) {
      console.warn('[inquiries] flagged as spam, alerts skipped', { score: spam.score, reasons: spam.reasons });
      emailResult = {
        delivered: false,
        error: `${SPAM_NOTE_PREFIX} ${spam.reasons.join(', ')} (score ${spam.score})`,
      };
    } else {
      emailResult = await sendContactNotification({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        message: message.trim(),
        context: contextText,
        tourDate,
      });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        message: tourDate ? `${message.trim()}

Preferred tour: ${tourDate}` : message.trim(),
        context: contextText,
        is_read: spam.isSpam,
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
    mailRecipients: mailRecipientsSummary(),
  });
}

export async function handleCbListings(req, res) {
  try {
    const id = req.query?.id;
    if (id) {
      const detail = await fetchCbListingDetail(id);
      if (!detail) return res.status(404).json({ error: 'Listing not found' });
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).json(detail);
    }
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
