#!/usr/bin/env node
/**
 * Sojori — Publication Instagram (API with Instagram Login)
 * Publie les visuels du dossier insta/ sur @sojoriapp.
 *
 * PRÉREQUIS
 *  - Node 18+ (fetch intégré)
 *  - Les médias doivent être accessibles à une URL PUBLIQUE (l'API les récupère par URL).
 *    Ex: déploie sojori-website -> https://sojori.com/brand/social/insta/01-hero.png
 *  - Un token d'accès valide (jamais en dur : variable d'environnement)
 *
 * VARIABLES D'ENVIRONNEMENT (à définir avant de lancer)
 *    IG_USER_ID        = ton Instagram user ID (le long numéro)
 *    IG_ACCESS_TOKEN   = ton token (NE PAS le committer, NE PAS le coller ailleurs)
 *    IG_MEDIA_BASE_URL = URL publique du dossier, ex: https://sojori.com/brand/social/insta
 *    INSTA_DIR         = (optionnel) chemin local du dossier insta/ pour lire les légendes .txt
 *                        défaut: ./public/brand/social/insta
 *
 * LANCER
 *    export IG_USER_ID="..."; export IG_ACCESS_TOKEN="..."; export IG_MEDIA_BASE_URL="https://sojori.com/brand/social/insta"
 *    node publish_instagram.js            # DRY RUN par défaut (ne publie rien, montre ce qui serait fait)
 *    node publish_instagram.js --go       # publie réellement
 *    node publish_instagram.js --go --only=01-hero   # publie un seul post
 */

const fs = require('fs');
const path = require('path');

const API = 'https://graph.instagram.com/v21.0';
const IG_USER_ID = process.env.IG_USER_ID;
const TOKEN = process.env.IG_ACCESS_TOKEN;
const BASE = (process.env.IG_MEDIA_BASE_URL || '').replace(/\/$/, '');
const INSTA_DIR = process.env.INSTA_DIR || './public/brand/social/insta';

const GO = process.argv.includes('--go');
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1] || null;

if (!IG_USER_ID || !TOKEN || !BASE) {
  console.error('❌ Définis IG_USER_ID, IG_ACCESS_TOKEN et IG_MEDIA_BASE_URL en variables d\'environnement.');
  process.exit(1);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Lit la légende jumelle (NN-nom.txt) si présente
function caption(slug) {
  const p = path.join(INSTA_DIR, slug + '.txt');
  try { return fs.readFileSync(p, 'utf8').trim(); } catch { return ''; }
}

// Construit la liste des posts à partir du dossier (ordre alphabétique)
function buildPosts() {
  let files = [];
  try { files = fs.readdirSync(INSTA_DIR); } catch (e) {
    console.error(`❌ Dossier introuvable: ${INSTA_DIR} (définis INSTA_DIR).`); process.exit(1);
  }
  const posts = [];
  for (const f of files.sort()) {
    const ext = path.extname(f).toLowerCase();
    const slug = path.basename(f, ext);
    if (ONLY && slug !== ONLY) continue;
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      posts.push({ slug, type: 'IMAGE', url: `${BASE}/${f}`, caption: caption(slug) });
    } else if (ext === '.mp4') {
      posts.push({ slug, type: 'REELS', url: `${BASE}/${f}`, caption: caption(slug) });
    }
  }
  return posts;
}

async function post(url, params) {
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = await fetch(`${API}/${url}`, { method: 'POST', body });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
}

async function getStatus(containerId) {
  const res = await fetch(`${API}/${containerId}?fields=status_code&access_token=${TOKEN}`);
  return (await res.json()).status_code;
}

async function publishOne(p) {
  // 1) créer le container média
  const params = p.type === 'REELS'
    ? { media_type: 'REELS', video_url: p.url, caption: p.caption }
    : { image_url: p.url, caption: p.caption };
  // Image d'arrêt (poster) du reel, optionnelle : URL publique via IG_REEL_COVER_URL
  if (p.type === 'REELS' && process.env.IG_REEL_COVER_URL) {
    params.cover_url = process.env.IG_REEL_COVER_URL;
  }
  const container = await post(`${IG_USER_ID}/media`, params);
  const creationId = container.id;

  // 2) attendre que le traitement du container soit FINISHED (images comme reels :
  //    publier trop tôt provoque l'erreur 9007 "Media ID is not available")
  for (let i = 0; i < 30; i++) {
    const st = await getStatus(creationId);
    if (st === 'FINISHED') break;
    if (st === 'ERROR') throw new Error('Traitement média en erreur');
    await sleep(p.type === 'REELS' ? 5000 : 2000);
  }

  // 3) publier
  const published = await post(`${IG_USER_ID}/media_publish`, { creation_id: creationId });
  return published.id;
}

(async () => {
  const posts = buildPosts();
  console.log(`\n${posts.length} média(s) trouvé(s) dans ${INSTA_DIR}\n`);
  for (const p of posts) {
    console.log(`• ${p.slug} [${p.type}]  ${p.url}`);
    console.log(`   légende: ${(p.caption || '(vide)').slice(0, 80).replace(/\n/g, ' ')}...`);
    if (!GO) { console.log('   → DRY RUN (rien publié)\n'); continue; }
    try {
      const id = await publishOne(p);
      console.log(`   ✅ publié (id ${id})\n`);
    } catch (e) {
      console.log(`   ❌ échec: ${e.message}\n`);
    }
    await sleep(4000); // espacement entre publications
  }
  if (!GO) console.log('DRY RUN terminé. Relance avec --go pour publier réellement.');
})();
