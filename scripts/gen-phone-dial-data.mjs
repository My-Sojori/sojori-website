import https from 'https';
import fs from 'fs';

const url =
  'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json';

const SKIP = new Set(['EH']);

const PRIORITY = [
  'FR', 'ES', 'US', 'MA', 'PT', 'IT', 'AE', 'SA', 'GB', 'BE', 'CH', 'CA', 'DE', 'NL', 'LU', 'IE',
  'TN', 'DZ', 'SN', 'CI', 'CM', 'GA', 'GP', 'MQ', 'RE', 'GF', 'YT', 'MF', 'BL', 'PM', 'WF', 'PF',
  'NC', 'AD', 'MC', 'GI', 'SM', 'VA', 'LI', 'AT', 'CZ', 'PL', 'HU', 'RO', 'BG', 'GR', 'TR', 'EG',
  'JO', 'LB', 'IL', 'IN', 'CN', 'JP', 'KR', 'AU', 'NZ', 'BR', 'MX', 'AR', 'CL', 'CO', 'ZA', 'NG',
  'KE', 'RU', 'UA', 'SE', 'NO', 'DK', 'FI', 'IS', 'EE', 'LV', 'LT', 'SK', 'SI', 'HR', 'RS', 'BA',
  'MK', 'AL', 'ME', 'XK', 'CY', 'MT', 'IQ', 'IR', 'PK', 'BD', 'LK', 'NP', 'TH', 'VN', 'MY', 'SG',
  'ID', 'PH', 'TW', 'HK', 'MO', 'KZ', 'UZ', 'GE', 'AM', 'AZ', 'BY', 'MD', 'CR', 'PA', 'PE', 'EC',
  'BO', 'PY', 'UY', 'VE', 'CU', 'JM', 'TT', 'DO', 'HT', 'PR', 'BZ', 'GT', 'SV', 'HN', 'NI',
];

https
  .get(url, (res) => {
    let buf = '';
    res.on('data', (c) => (buf += c));
    res.on('end', () => {
      const arr = JSON.parse(buf);
      const rows = [];
      for (const c of arr) {
        if (SKIP.has(c.iso2)) continue;
        const pc = String(c.phonecode || '').trim();
        if (!pc) continue;
        const dial = '+' + pc.replace(/^\+/, '');
        const nameFr = (c.translations && c.translations.fr) || c.name;
        rows.push({
          iso: c.iso2,
          dial,
          nameFr: String(nameFr),
          emoji: c.emoji || '🌐',
        });
      }
      const priMap = new Map();
      PRIORITY.forEach((iso, i) => priMap.set(iso, i));
      rows.sort((a, b) => {
        const pa = priMap.has(a.iso) ? priMap.get(a.iso) : 999;
        const pb = priMap.has(b.iso) ? priMap.get(b.iso) : 999;
        if (pa !== pb) return pa - pb;
        return a.nameFr.localeCompare(b.nameFr, 'fr', { sensitivity: 'base' });
      });
      const header = `/** Indicatifs (source: dr5hn/countries-states-cities-database). ISO EH exclu. */\nexport type PhoneDialRow = { iso: string; dial: string; nameFr: string; emoji: string };\n\nexport const PHONE_DIAL_ROWS: PhoneDialRow[] = `;
      const body = JSON.stringify(rows, null, 2);
      fs.writeFileSync(new URL('../lib/phoneDialCodesData.ts', import.meta.url), header + body + ';\n');
      console.log('rows', rows.length);
    });
  })
  .on('error', (e) => {
    console.error(e);
    process.exit(1);
  });
