// Notifie Bing/IndexNow des URLs du sitemap après chaque déploiement.
// Usage: node scripts/indexnow-submit.mjs
const HOST = 'business.sojori.com';
const KEY = '70379f5cddb44812bb8861ea81e6ebfb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const LOCALES = ['fr', 'en', 'es', 'pt', 'ar'];

const PATHS = [
  '/',
  '/pms',
  '/channel-manager',
  '/whatsapp',
  '/dynamic-pricing',
  '/analytics',
  '/inbox',
  '/teamflow',
  '/owner-portal',
  '/dashboard-app',
  '/guest-experience',
  '/pricing',
  '/integrations',
  '/about',
  '/demo',
  '/demo/rdv',
  '/offre-conciergeries',
  '/brand',
  '/gestion-locative-marrakech',
  '/conciergerie-marrakech',
  '/gestion-locative-casablanca',
  '/conciergerie-casablanca',
  '/gestion-locative-agadir',
  '/conciergerie-agadir',
  '/gestion-locative-tanger',
  '/conciergerie-tanger',
  '/gestion-locative-rabat',
  '/conciergerie-rabat',
  '/terms',
  '/privacy',
];

const urlList = [];
for (const locale of LOCALES) {
  for (const path of PATHS) {
    const suffix = path === '/' ? '' : path;
    urlList.push(`https://${HOST}/${locale}${suffix}`);
  }
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs soumises`);
if (!res.ok) {
  const text = await res.text();
  console.error(text);
  process.exit(1);
}
