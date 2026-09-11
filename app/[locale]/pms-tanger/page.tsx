import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqSection } from '@/components/FaqSection';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('pmsTanger.title'),
    description: t('pmsTanger.description'),
    alternates: { canonical: `/${locale}/pms-tanger` },
  };
}

const FAQ = [
  {
    "q": "Quel PMS choisir pour un hôtel à Tanger ?",
    "a": "Choisissez en pensant au mois d'août, pas à la moyenne annuelle : c'est en pic que l'outil est mis à l'épreuve. Vérifiez surtout ce qui se déclenche automatiquement après la réservation, puisque c'est à ce moment que l'équipe n'a plus le temps de coordonner à la main. Sojori inclut son PMS et se connecte aux PMS existants."
  },
  {
    "q": "Comment intégrer des renforts saisonniers sans les former longuement ?",
    "a": "Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe, sans application à installer ni compte à créer. La tâche indique la chambre, ce qui est attendu et l'échéance, ce qui réduit la part de consignes transmises oralement."
  },
  {
    "q": "Sojori gère-t-il la fiche police marocaine ?",
    "a": "Oui. Elle est collectée avant l'arrivée : le client la remplit depuis WhatsApp avec sa pièce d'identité, dans le cadre du check-in digital — utile quand les arrivées s'accumulent en fin de journée l'été. Sojori prépare les données ; la transmission aux autorités reste votre démarche."
  },
  {
    "q": "Comment éviter la surréservation en haute saison ?",
    "a": "Le channel manager synchronise les disponibilités dans les deux sens avec Booking, Airbnb et les autres canaux, les réservations directes entrant dans le même flux. En pic, c'est le point le plus sensible : aucune chambre de secours n'est disponible pour rattraper une double réservation."
  },
  {
    "q": "Faut-il remplacer le PMS déjà installé ?",
    "a": "Non. Sojori se connecte à Mews et à d'autres PMS, récupère les réservations et les états de chambre, puis orchestre autour. Vous pouvez ajouter l'orchestration avant l'été sans toucher à votre système de réservation."
  },
  {
    "q": "Que faire de la basse saison à Tanger ?",
    "a": "La lire comme un segment distinct, avec ses propres prix et ses propres cibles — affaires, week-ends, séjours longs. Le pilotage mensuel plutôt qu'annuel est la condition pour voir ce qui fonctionne réellement hors été."
  }
];

export default async function PmsPageTanger({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: "PMS Hôtel Tanger", path: `/${locale}/pms-tanger` },
        ]}
        serviceName={"PMS et orchestration hôtelière de Tanger"}
        serviceDescription={"PMS et moteur d'orchestration pour hôtels, riads et résidences à Tanger : forte saisonnalité, housekeeping, maintenance, channel manager, fiche police et taxe de séjour. Se connecte aussi à votre PMS existant."}
        areaServed={"Tanger"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="PMS Hôtel Tanger" />

        <PageHero
          badge="⛵ PMS Hôtel · Tanger"
          title={<>PMS hôtel à Tanger{' '}<br /><span className="gradient-text">et orchestration des opérations</span></>}
          subtitle="Hôtels, riads de la médina et résidences en bord de mer : Sojori centralise les réservations puis orchestre ménage, maintenance et relation client, y compris en plein pic estival. Fiche police au check-in et taxe de séjour incluses."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un PMS hôtel à Tanger doit absorber un écart d&apos;activité considérable entre l&apos;été et le reste de l&apos;année. Sojori enregistre le séjour puis orchestre ce qui suit — ménage, maintenance, messages clients, tarification — et c&apos;est précisément en haute saison, quand l&apos;équipe est saturée, que l&apos;automatisation des tâches change le résultat. La fiche police est collectée par le client avant l&apos;arrivée et la taxe de séjour est paramétrable. Sojori inclut son propre PMS et se connecte aux PMS déjà en place, dont Mews.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Pourquoi la saisonnalité de Tanger change tout</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Tanger vit un été très dense — diaspora marocaine, tourisme espagnol arrivant par le détroit, croisiéristes — puis une longue période creuse. L&apos;écart d&apos;occupation entre août et janvier dépasse ce que connaissent Casablanca ou Rabat.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Cette amplitude a une conséquence concrète : l&apos;équipe d&apos;été est en partie saisonnière. Un fonctionnement qui repose sur l&apos;expérience d&apos;un responsable présent toute l&apos;année s&apos;effondre en juillet, quand ce sont des renforts récents qui exécutent. Des tâches déclenchées automatiquement et envoyées sur WhatsApp ne dépendent pas de cette mémoire.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quelles opérations centraliser à Tanger ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La fiche de séjour porte les dates, la chambre, la source, les voyageurs, les paiements et la facture. En bord de mer s&apos;y ajoutent des services saisonniers — transfert, plage, restauration — qui n&apos;existent que trois mois par an.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le point critique reste la remise en état en haute saison : avec un taux d&apos;occupation proche du maximum, une chambre non prête décale une arrivée, et il n&apos;existe aucune chambre de secours pour absorber le retard.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Arrivées, départs et rotations en pic estival</li>
              <li>Réservations directes, OTA, agences et tour-opérateurs</li>
              <li>Paiements, soldes, factures, TVA et taxe de séjour</li>
              <li>Fiche police marocaine collectée par le client avant l&apos;arrivée</li>
              <li>Ménage et maintenance déclenchés sur les événements réels</li>
              <li>Consignes transmises aux renforts saisonniers sur WhatsApp</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Booking, Airbnb et tour-opérateurs à Tanger</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le mix tangérois bouge avec la saison : les tour-opérateurs et Booking dominent l&apos;été, Airbnb pèse sur les résidences en bord de mer, et le direct porte la clientèle de la diaspora qui revient chaque année au même endroit.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le channel manager tient les disponibilités à jour dans les deux sens — indispensable quand le remplissage frôle le maximum et qu&apos;une surréservation ne peut plus être absorbée.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quels indicateurs suivre pour un hôtel à Tanger ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Avec une telle saisonnalité, la moyenne annuelle n&apos;a aucune valeur de pilotage. Ce qui compte est le rythme de prise de réservations comparé à la même période l&apos;an passé : c&apos;est le seul signal assez précoce pour corriger les prix d&apos;été.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>En basse saison, la lecture bascule sur le point mort et sur la capacité à capter les séjours d&apos;affaires et de week-end.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Rythme de réservation comparé à l&apos;an passé</li>
              <li>Occupation et prix moyen par mois, jamais en moyenne annuelle</li>
              <li>Revenu et annulations par canal</li>
              <li>Part des réservations directes et de la clientèle fidèle</li>
              <li>Délai de remise en état des chambres en pic</li>
            </ul>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Les modules mobilisés de Tanger</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-tanger' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Sojori à Tanger également :{' '}
              <Link href={'/gestion-locative-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>gestion hôtelière de Tanger</Link>
              {' · '}
              <Link href={'/conciergerie-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>conciergerie de Tanger</Link>
              <br />
              Autres villes :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Marrakech</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Casablanca</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Rabat</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Agadir</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": "Été", "l": "Pic d'activité"}, {"k": "24/7", "l": "Support FR/AR/ES"}, {"k": "2-way", "l": "Synchronisation canaux"}, {"k": "WhatsApp", "l": "Équipes saisonnières"}]} />

        <FaqSection badge="PMS hôtel Tanger" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Orchestrez votre établissement de Tanger.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Migration depuis votre outil actuel prise en charge. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
