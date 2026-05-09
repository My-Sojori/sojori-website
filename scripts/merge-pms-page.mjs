import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pms = JSON.parse(fs.readFileSync(path.join(root, 'messages', 'pms-page-by-locale.json'), 'utf8'));

for (const locale of ['fr', 'en', 'es', 'pt', 'ar']) {
  const msgPath = path.join(root, 'messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(msgPath, 'utf8'));
  const block = pms[locale] && Object.keys(pms[locale]).length ? pms[locale] : pms.en;
  data.pmsPage = block;
  fs.writeFileSync(msgPath, JSON.stringify(data, null, 2) + '\n');
  console.log('pmsPage ->', locale);
}
