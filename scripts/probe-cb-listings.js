const url =
  'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn';

const html = await fetch(url).then((r) => r.text());
const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (!m) {
  console.log('no __NEXT_DATA__');
  process.exit(1);
}
const data = JSON.parse(m[1]);
const { activeListings, soldListings } = data.props?.pageProps || {};
console.log(JSON.stringify({ activeListings, soldListings }, null, 2));
