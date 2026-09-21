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
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Sends contact notification when SMTP is configured. No-op otherwise.
 * @returns {{ delivered: boolean, error?: string }}
 */
export async function sendContactNotification({ name, email, phone, message, context }) {
  if (!isSmtpConfigured()) {
    return { delivered: false, error: 'SMTP not configured' };
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    context ? `Topic / property: ${context}` : null,
    '',
    message,
  ].filter(Boolean);

  const text = lines.join('\n');

  try {
    const transport = createTransport();
    await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO_AGENT,
      bcc: process.env.MAIL_BCC_ARCHIVE || undefined,
      replyTo: email,
      subject: `Website contact from ${name}`,
      text,
    });
    return { delivered: true };
  } catch (err) {
    console.error('Contact email failed:', err);
    return { delivered: false, error: err.message };
  }
}
