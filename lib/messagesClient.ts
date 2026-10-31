type Arbre = Record<string, unknown>;

/** Les pages dont un composant s'exécute dans le navigateur et lit `pageBodies.<page>` / `faqPages.<page>` (voir scripts de contrôle). */
const PAGES_CLIENT = ['channel-manager', 'dashboard-app', 'dynamic-pricing', 'guest-experience', 'inbox', 'integrations', 'teamflow'];

const garder = (src: unknown, cles: string[]): Arbre => {
  const o: Arbre = {};
  if (src && typeof src === 'object') for (const k of cles) if (k in (src as Arbre)) o[k] = (src as Arbre)[k];
  return o;
};

/**
 * Les messages envoyés au navigateur. La page d'accueil ou /demo n'ont aucun besoin des 120 Ko de corps de pages, des 60 Ko de FAQ
 * ni des 25 Ko de pages de rubriques, lus seulement côté serveur : on ne garde que ce que lisent les composants client.
 * (`getTranslations` et les composants serveur lisent toujours tous les messages.)
 */
export function messagesClient<T extends Arbre>(m: T): T {
  const o: Arbre = { ...m };
  delete o.seoPages;
  delete o.metadata;
  if (o.pageBodies) o.pageBodies = garder(o.pageBodies, PAGES_CLIENT);
  if (o.faqPages) o.faqPages = garder(o.faqPages, ['title', ...PAGES_CLIENT]);
  const r = o.refonte as Arbre | undefined;
  if (r) {
    const rr: Arbre = { ...r };
    // `refonte.pages.*` (corps des guides) et `refonte.about` sont rendus côté serveur ; seuls les liens communs servent au pied de page.
    if (rr.pages) rr.pages = garder((rr.pages as Arbre), ['common']);
    delete rr.about;
    o.refonte = rr;
  }
  return o as T;
}
