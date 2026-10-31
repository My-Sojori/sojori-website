import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';

/**
 * llms-full.txt : tout l'accueil en Markdown, en français puis en anglais, pour les moteurs de réponse.
 * Généré à partir des mêmes messages que la page : le texte ne diverge jamais. Aucun prix.
 */
export const dynamic = 'force-static';

type PageSeo = { title: string; answer: string; sections: { title: string; text?: string; points?: string[] }[]; faq: { q: string; a: string }[] };
type Pages = Record<string, PageSeo | unknown>;
const PAGES = ['pmsMaroc', 'conciergerieMaroc', 'agents', 'checkin']; // les deux guides (fichePolice, taxeSejour) restent hors llms tant qu'ils ont des « à confirmer »
const URLS: Record<string, string> = { pmsMaroc: 'pms-maroc', conciergerieMaroc: 'conciergerie-maroc', agents: 'agents', checkin: 'check-in-whatsapp', fichePolice: 'fiche-de-police-maroc', taxeSejour: 'taxe-de-sejour-maroc' };

type Home = {
  hero: { keywords: string; sub: string };
  socle: { title: string; lead: string; pmsTitle: string; pms: { name: string; desc: string }[]; ownTitle: string; own: string[]; pricing: { eyebrow: string; title: string; lead: string; points: string[] } };
  agents: { title: string; lead: string; status: Record<string, string>; list: Record<string, { name: string; resume: string; points: string[] }> };
  modules: { title: string; lead: string; list: Record<string, { name: string; resume: string; points: string[]; agents: string[] }> };
  stay: { title: string; lead: string; list: { name: string; agent: string; what: string }[] };
  control: { title: string; cards: { title: string; text: string }[] };
  offer: { title: string; lead: string; steps: { name: string; desc: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
};

const AGENTS = ['booking', 'service', 'operations', 'pricing', 'assistant', 'studio', 'site', 'commercial', 'prospecting', 'marketingFinance', 'calls'];
const MODULES = ['checkin', 'stay', 'concierge', 'staff', 'admin', 'owner'];

function pagesDeRecherche(lang: 'fr' | 'en', pages: Pages): string {
  const L: string[] = [];
  PAGES.forEach((id) => {
    const p = pages[id] as PageSeo;
    L.push(`## ${p.title}`, '', `Source : https://sojori.com/${lang}/${URLS[id]}`, '', p.answer, '');
    p.sections.forEach((s) => {
      L.push(`### ${s.title}`, '');
      if (s.text) L.push(s.text, '');
      (s.points ?? []).forEach((x) => L.push(`- ${x}`));
      if (s.points) L.push('');
    });
    p.faq.forEach((x) => L.push(`### ${x.q}`, '', x.a, ''));
  });
  return L.join('\n');
}

function page(lang: 'fr' | 'en', h: Home): string {
  const L: string[] = [];
  L.push(`# Sojori · AI workforce for hospitality (${lang})`, '', h.hero.keywords, '', h.hero.sub, '');
  L.push(`## ${h.socle.title}`, '', h.socle.lead, '', `### ${h.socle.pmsTitle}`, '');
  h.socle.pms.forEach((m) => L.push(`- **${m.name}** : ${m.desc}`));
  L.push('', `### ${h.socle.ownTitle}`, '');
  h.socle.own.forEach((x) => L.push(`- ${x}`));
  L.push('', `### ${h.socle.pricing.title}`, '', h.socle.pricing.lead, '');
  h.socle.pricing.points.forEach((x) => L.push(`- ${x}`));
  L.push('', `## ${h.agents.title}`, '', h.agents.lead, '');
  AGENTS.forEach((id) => {
    const a = h.agents.list[id];
    L.push(`### ${a.name}`, '', a.resume, '');
    a.points.forEach((x) => L.push(`- ${x}`));
    L.push('');
  });
  L.push(`## ${h.modules.title}`, '', h.modules.lead, '');
  MODULES.forEach((id) => {
    const m = h.modules.list[id];
    L.push(`### ${m.name}`, '', m.resume, '');
    m.points.forEach((x) => L.push(`- ${x}`));
    L.push('', m.agents.join(' · '), '');
  });
  L.push(`## ${h.stay.title}`, '', h.stay.lead, '');
  h.stay.list.forEach((e, i) => L.push(`${i + 1}. **${e.name}** (${e.agent}) : ${e.what}`));
  L.push('', `## ${h.control.title}`, '');
  h.control.cards.forEach((c) => L.push(`- **${c.title}** : ${c.text}`));
  L.push('', `## ${h.offer.title}`, '', h.offer.lead, '');
  h.offer.steps.forEach((s) => L.push(`- **${s.name}** : ${s.desc}`));
  L.push('', `## ${h.faq.title}`, '');
  h.faq.items.forEach((x) => L.push(`### ${x.q}`, '', x.a, ''));
  return L.join('\n');
}

export function GET() {
  const fr = (frMessages as unknown as { refonte: { home: Home } }).refonte.home;
  const en = (enMessages as unknown as { refonte: { home: Home } }).refonte.home;
  const pf = (frMessages as unknown as { refonte: { pages: Pages } }).refonte.pages;
  const pe = (enMessages as unknown as { refonte: { pages: Pages } }).refonte.pages;
  const body = `${page('fr', fr)}\n${pagesDeRecherche('fr', pf)}\n\n---\n\n${page('en', en)}\n${pagesDeRecherche('en', pe)}\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
