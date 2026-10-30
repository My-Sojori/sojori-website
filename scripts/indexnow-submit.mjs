/**
 * Notifie IndexNow des URLs du site après un déploiement.
 *
 * IndexNow couvre Bing, Yandex, Seznam et Naver — pas Google, qui ne l'a
 * jamais adopté. Pour Google, le sitemap et les demandes d'indexation dans
 * Search Console restent les seuls leviers.
 *
 * 2026-09-16 : le script pointait encore sur business.sojori.com, un domaine
 * qui n'existe plus depuis la bascule, et portait une liste de chemins figée
 * qui ignorait les 23 pages créées depuis. Il était donc sans effet. Il lit
 * désormais le sitemap : plus de liste à maintenir en double.
 *
 * Usage : node scripts/indexnow-submit.mjs
 */
const HOST = 'sojori.com';
const KEY = '70379f5cddb44812bb8861ea81e6ebfb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

const xml = await fetch(SITEMAP).then((r) => {
  if (!r.ok) throw new Error(`sitemap ${r.status}`);
  return r.text();
});

const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.error('Aucune URL dans le sitemap — rien à soumettre.');
  process.exit(1);
}

// IndexNow plafonne à 10 000 URLs par requête ; on est très en dessous.
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log(`IndexNow : ${res.status} ${res.statusText} — ${urlList.length} URLs soumises`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
