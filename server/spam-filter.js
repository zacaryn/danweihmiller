/**
 * Content-based spam scoring for contact form messages ("SEO", "Leads", marketing pitches).
 *
 * Each rule adds its weight once if it matches anywhere in the name / email / message.
 * A message is flagged when the total reaches SPAM_THRESHOLD. Strong rules are phrases a
 * real buyer or seller essentially never writes ("SEO services", "exclusive seller leads"),
 * so one is enough. Weaker hints ("I came across your website", "digital marketing") only
 * flag a message in combination, so a real client who says "I found your site on Google" or
 * "I work in SEO and am relocating" still gets through.
 *
 * Flagged messages are still saved to the inbox (marked read) — they just don't trigger the
 * email/text alerts — so a false positive is never lost.
 */

export const SPAM_THRESHOLD = 4;

const RULES = [
  // ── Strong (one is enough) ──────────────────────────────────────────────────
  [4, 'search engine optimization', /search[- ]engine optimi[sz]ation/],
  [4, 'SEO pitch', /\bseo (services?|agency|agencies|company|companies|firm|experts?|specialists?|consultants?|audit|packages?|reports?|team|strategy|plans?|optimi[sz]ation|campaigns?|work)\b/],
  [4, 'first page of Google', /\b(first|1st|top|front|page one|page 1)( page)? (of|on|in) (google|bing|search)/],
  [4, 'ranking pitch', /\brank(ing)? (your |you )?(website|site|business|company|listings?|page|brand)\b/],
  [4, 'link building', /\b(backlinks?|link[- ]building|guest[- ]post(s|ing)?|domain authority)\b/],
  [4, 'lead generation', /\blead[- ]?gen(eration)?\b/],
  [4, 'leads pitch', /\b(exclusive|qualified|pre-?qualified|verified|targeted|warm|hot|fresh|quality|steady|consistent|guaranteed|motivated[- ]seller|seller|buyer|listing|real estate|homeowner|mortgage|refinance|business|b2b|sales|inbound|organic) leads\b/],
  [4, 'leads offer', /\bleads (for|to) (your|you)\b|\b(get|getting|generate|generating|send|sending|deliver|delivering|provide|providing|buy|buying) (you )?(more |new |extra |free |quality )?(\d+\+? )?leads\b/],
  [4, 'appointment setting', /\bappointment[- ]sett(ing|ers?)\b|\b(appointments?|calls?|meetings?) (booked |set )?(on|into|onto) your calendar\b/],
  [4, 'growth pitch', /\b(increase|boost|improve|drive|grow|double|triple|skyrocket|maximi[sz]e) your (website |site |organic |online |web )?(traffic|rankings?|visibility|online presence|sales|revenue|conversions?|leads|roi|reach)\b/],
  [4, 'web design pitch', /\b(web|website|site) (design|redesign|development|developer|designer)s? (services?|agency|company|team|packages?|expert)\b/],
  [4, 'Google profile pitch', /\b(google|gmb|google business|google maps) (business )?(profiles?|listings?|rankings?) (optimi[sz]ation|management|ranking|services?)\b/],
  [4, 'white label', /\bwhite[- ]label(ed)?\b/],

  // ── Medium ──────────────────────────────────────────────────────────────────
  [3, 'SEO', /\bs\.?e\.?o\b/],
  [3, 'unsubscribe line', /\b(unsubscribe|opt[- ]?out|remove you from (our|my|the) list|not interested\?? (just )?(reply|let me know))\b|\b(reply|respond|text) (back )?(with )?["'“]?(stop|no|yes|unsubscribe|remove)["'”]?( to| if| and|\.|!|,|$)/],
  [3, 'not ranking on Google', /\b(not|isn'?t|aren'?t|wasn'?t|never) (showing up|ranking|appearing|visible|found)( well)? (on|in) (google|search|bing)\b/],
  [3, 'site critique', /\b(your )?(website|site) (is|looks|seems) (outdated|slow|old|not mobile|broken|not optimi[sz]ed)\b/],
  [3, 'agent-targeting pitch', /\b(we|i) (can )?help (local |other )?(real estate |small )?(agents|realtors|brokers|brokerages|businesses|business owners|companies|teams) (to )?(get|grow|close|generate|find|win|book|land|scale|increase|attract)\b/],
  [3, 'volume pitch', /\b\d+\+?( \w+)? (homeowners|sellers|buyers|clients|customers|appointments|listings|closings|leads)\s*(per|a|each|every|\/)\s*(month|week|mo)\b/],
  [2, 'paid ads', /\b(ppc|pay[- ]per[- ]click|google ads|adwords|facebook ads|meta ads|ad campaigns?)\b/],
  [2, 'digital marketing', /\b(digital|online|internet|social media|content) marketing\b|\bmarketing (agency|agencies|firm|services|company)\b/],
  [2, 'web traffic', /\b(web|website|site|organic|search) traffic\b/],
  [2, 'outsourcing', /\b(virtual assistants?|outsourc\w+|offshore team)\b/],
  [2, 'business funding', /\b(business|working capital|merchant cash|sba) (loans?|funding|advance|line of credit)\b/],
  [2, 'cold opener', /\b(i|we) (just )?(came across|found|stumbled (up)?on|was (checking|looking) (out|at)|were (checking|looking) (out|at)|noticed|visited|reviewed|analy[sz]ed|audited|looked at) your (website|site|web ?site|business|company|online presence|google (business )?profile)\b/],
  [2, 'free audit', /\bfree (seo |website |site |marketing |digital )?(audit|analysis|website review|mockup|mock-up|proposal|strategy (session|call)|trial)\b/],
  [1, 'quick call ask', /\b(quick|brief|short|15[- ]?min(ute)?|10[- ]?min(ute)?) (call|chat|zoom|meeting)\b|\bcalendly\b|\bbook a (call|time|slot)\b/],
  [2, 'grow your business', /\b(grow|scale|expand) your (business|brokerage|team|company|agency)\b/],
  [2, 'crypto', /\b(crypto|bitcoin|forex|binary options|nft)\b/],
  [2, 'AI tools pitch', /\bai[- ](powered )?(chat ?bots?|agents?|receptionists?|voice|assistants?|calling)\b/],
  [2, 'social media management', /\bsocial media (management|manager|services|growth|followers)\b/],

  // ── Weak (only count alongside other signals) ───────────────────────────────
  [1, 'your business', /\byour (business|company|brand|online presence|agency|brokerage)\b/],
  [1, 'we offer', /\b(we|our team|our agency|our company) (help|helps|specialize|specializes|offer|offers|provide|provides)\b/],
  [1, 'marketing jargon', /\b(roi|cpl|cpa|ctr|kpis?|conversion rates?|crm)\b/],
  [1, 'off-platform contact', /\b(whatsapp|telegram|skype)\b/],
];

function countLinks(text) {
  return (text.match(/https?:\/\/|www\./gi) || []).length;
}

/**
 * @param {{ name?: string, email?: string, phone?: string, message?: string }} fields
 * @returns {{ isSpam: boolean, score: number, reasons: string[] }}
 */
export function scoreSpam({ name = '', email = '', message = '' } = {}) {
  const text = [name, email, message]
    .map((v) => String(v || ''))
    .join('\n')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ');

  let score = 0;
  const reasons = [];
  for (const [weight, label, pattern] of RULES) {
    if (pattern.test(text)) {
      score += weight;
      reasons.push(label);
    }
  }

  const links = countLinks(message);
  if (links >= 1) {
    score += 1;
    reasons.push(links >= 3 ? 'many links' : 'link');
  }
  if (links >= 3) score += 2;

  // A website/URL in the name field is a classic bot pattern.
  if (countLinks(name) > 0) {
    score += 4;
    reasons.push('link in name');
  }

  return { isSpam: score >= SPAM_THRESHOLD, score, reasons };
}
