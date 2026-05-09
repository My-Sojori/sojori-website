/**
 * Fusionne messages/seo-by-locale.json dans messages/{locale}.json (clé seoPages).
 * Exécuter depuis la racine sojori-website : node scripts/merge-seo-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const seoPath = path.join(root, 'messages', 'seo-by-locale.json');
const raw = JSON.parse(fs.readFileSync(seoPath, 'utf8'));

for (const locale of ['fr', 'en', 'es', 'pt', 'ar']) {
  const msgPath = path.join(root, 'messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(msgPath, 'utf8'));
  data.seoPages = raw[locale] || raw.fr;
  fs.writeFileSync(msgPath, JSON.stringify(data, null, 2) + '\n');
  console.log('updated', locale);
}
