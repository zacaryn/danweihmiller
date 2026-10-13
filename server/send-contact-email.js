import nodemailer from 'nodemailer';

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.MAIL_TO_AGENT
  );
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      // Google shows app passwords in groups of four; spaces are not part of the password
      pass: String(process.env.SMTP_PASS).replace(/\s+/g, ''),
    },
  });
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** "Showing request: 6724 Harvey Lane, Colorado Springs, CO 80923 (MLS# 6629102)" -> "6724 Harvey Lane" */
function showingAddress(context) {
  const m = /^showing request:\s*([^,(]+)/i.exec(context || '');
  return m ? m[1].trim() : null;
}

function buildHtml({ name, email, phone, message, context, tourDate }) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;color:#5b6475;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>` +
        `<td style="padding:6px 0;color:#1a2b45;font-size:15px">${value}</td></tr>`
      : '';
  const safeEmail = escapeHtml(email);
  const phoneLink = phone
    ? `<a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ''))}" style="color:#1B3366">${escapeHtml(phone)}</a>`
    : '';
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:6px;overflow:hidden">
<tr><td style="background:#0E1F45;color:#ffffff;padding:18px 24px;font-size:16px;font-weight:bold">New message from danweihmiller.com</td></tr>
<tr><td style="padding:20px 24px">
<table role="presentation">
${row('Name', escapeHtml(name))}
${row('Email', `<a href="mailto:${safeEmail}" style="color:#1B3366">${safeEmail}</a>`)}
${row('Phone', phoneLink)}
${row('Topic / property', context ? escapeHtml(context) : '')}
${row('Preferred tour', tourDate ? `<strong>${escapeHtml(tourDate)}</strong>` : '')}
</table>
<div style="margin-top:16px;padding:16px;background:#f4f5f7;border-radius:4px;color:#1a2b45;font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(message)}</div>
<p style="margin:20px 0 0"><a href="mailto:${safeEmail}" style="display:inline-block;background:#0E1F45;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:3px;font-size:14px">Reply to ${escapeHtml(name)}</a></p>
</td></tr>
</table></body></html>`;
}

/**
 * Sends the contact notification when SMTP is configured. No-op otherwise.
 * To: MAIL_TO_AGENT · Cc: MAIL_CC (optional, comma-separated) · Bcc: MAIL_BCC_ARCHIVE (optional).
 * Replies go straight to the visitor.
 * @returns {{ delivered: boolean, error?: string }}
 */
export async function sendContactNotification({ name, email, phone, message, context, tourDate }) {
  if (!isSmtpConfigured()) {
    return { delivered: false, error: 'SMTP not configured' };
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    context ? `Topic / property: ${context}` : null,
    tourDate ? `Preferred tour: ${tourDate}` : null,
    '',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const address = showingAddress(context);
  const subject = address ? `Showing request: ${address} — ${name}` : `Website contact from ${name}`;

  try {
    const transport = createTransport();
    const info = await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO_AGENT,
      cc: process.env.MAIL_CC || undefined,
      bcc: process.env.MAIL_BCC_ARCHIVE || undefined,
      replyTo: email,
      subject,
      text,
      html: buildHtml({ name, email, phone, message, context, tourDate }),
    });
    // Gmail can accept the message but refuse individual recipients; record any it refused
    const rejected = (info?.rejected || []).map(String);
    const smsError = await sendSmsAlert({ name, phone, email, context, message, tourDate, transport });
    const problems = [rejected.length ? `Rejected recipients: ${rejected.join(', ')}` : null, smsError].filter(Boolean);
    return problems.length ? { delivered: true, error: problems.join(' | ') } : { delivered: true };
  } catch (err) {
    console.error('Contact email failed:', err);
    return { delivered: false, error: err.message };
  }
}

/**
 * Short text-message alert via a carrier email-to-SMS gateway, e.g. MAIL_SMS_TO=7195551234@tmomail.net
 * (comma-separated for several phones). Sent separately from the full email: gateways turn long HTML
 * emails into truncated picture messages, so phones get a plain one-liner that fits a single SMS.
 * Returns an error string, or null when sent or not configured. Never blocks the main email.
 */
async function sendSmsAlert({ name, phone, email, context, message, tourDate, transport }) {
  const to = process.env.MAIL_SMS_TO;
  if (!to) return null;
  const address = showingAddress(context);
  const what = address ? `Showing req ${address}` : 'Website msg';
  const contact = phone || email;
  const when = tourDate ? ` Tour: ${tourDate}.` : '';
  let body = `${what}: ${name} ${contact}.${when} ${String(message).replace(/\s+/g, ' ')}`;
  if (body.length > 155) body = `${body.slice(0, 152)}...`;
  try {
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: '',
      text: body,
    });
    return null;
  } catch (err) {
    console.error('SMS alert failed:', err);
    return `SMS alert failed: ${err.message}`;
  }
}

/** Checks the SMTP login without sending anything. */
export async function verifySmtp() {
  if (!isSmtpConfigured()) return { ok: false, error: 'SMTP not configured' };
  try {
    await createTransport().verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const mask = (addr) => {
  const [user, domain] = String(addr).trim().split('@');
  return domain ? `${user.slice(0, 1)}…@${domain}` : '(invalid address)';
};
const list = (value) => (value ? String(value).split(',').map((a) => a.trim()).filter(Boolean) : []);

/** Masked summary of who notifications go to, for /api/health (no full addresses are exposed). */
export function mailRecipientsSummary() {
  return {
    to: list(process.env.MAIL_TO_AGENT).map(mask),
    cc: list(process.env.MAIL_CC).map(mask),
    bcc: list(process.env.MAIL_BCC_ARCHIVE).map(mask),
    sms: list(process.env.MAIL_SMS_TO).map((a) => a.replace(/^(\d{3})\d+(\d{2})@/, '$1…$2@')),
  };
}
