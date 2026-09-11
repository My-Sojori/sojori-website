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
    title: t('pmsRabat.title'),
    description: t('pmsRabat.description'),
    alternates: { canonical: `/${locale}/pms-rabat` },
  };
}

const FAQ = [
  {
    "q": "Quel PMS choisir pour un hôtel à Rabat ?",
    "a": "Le point de vigilance propre à Rabat est la double clientèle : institutionnelle en semaine, loisir le week-end. Vérifiez que le logiciel sépare ces segments dans la tarification et le reporting, plutôt que de les fondre dans une moyenne. Sojori inclut son PMS et se connecte aux PMS existants."
  },
  {
    "q": "Sojori gère-t-il la facturation d'un organisme ou d'une administration ?",
    "a": "Oui. Le séjour porte l'organisme de rattachement, la TVA s'applique selon le paramétrage, et les factures peuvent être regroupées ou éditées par séjour selon ce que demande le service comptable."
  },
  {
    "q": "Sojori gère-t-il la fiche police marocaine ?",
    "a": "Oui. Elle est collectée avant l'arrivée : le client la remplit depuis WhatsApp avec sa pièce d'identité, dans le cadre du check-in digital. C'est particulièrement utile sur une arrivée de groupe, où la saisie à la réception crée un goulot. Sojori prépare les données ; la transmission aux autorités reste votre démarche."
  },
  {
    "q": "Comment préparer une arrivée de groupe ?",
    "a": "Les chambres concernées sont regroupées dans une même vague de ménage plutôt que traitées au fil de l'eau, et l'avancement remonte en temps réel. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe."
  },
  {
    "q": "Faut-il remplacer le PMS déjà installé ?",
    "a": "Non. Sojori se connecte à Mews et à d'autres PMS, récupère les réservations et les états de chambre, puis orchestre autour — accueil, ménage, maintenance, messages clients, tarification."
  },
  {
    "q": "Comment valoriser le week-end touristique à Rabat ?",
    "a": "En ouvrant le week-end à la distribution large pendant que l'inventaire de semaine reste protégé pour les comptes institutionnels. La tarification s'ajuste par jour sur la demande réelle, ce qui suppose de suivre les deux segments séparément."
  }
];

export default async function PmsPageRabat({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: "PMS Hôtel Rabat", path: `/${locale}/pms-rabat` },
        ]}
        serviceName={"PMS et orchestration hôtelière de Rabat"}
        serviceDescription={"PMS et moteur d'orchestration pour hôtels, riads et résidences à Rabat : clientèle institutionnelle, housekeeping, maintenance, channel manager, fiche police et taxe de séjour. Se connecte aussi à votre PMS existant."}
        areaServed={"Rabat"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="PMS Hôtel Rabat" />

        <PageHero
          badge="🏛️ PMS Hôtel · Rabat"
          title={<>PMS hôtel à Rabat{' '}<br /><span className="gradient-text">et orchestration des opérations</span></>}
          subtitle="Hôtels, riads de la médina et résidences à Rabat : Sojori centralise réservations et facturation, puis orchestre ménage, maintenance et relation client. Fiche police au check-in et taxe de séjour incluses."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un PMS hôtel à Rabat sert un marché mixte : administrations, ambassades, délégations et institutions d&apos;un côté, tourisme culturel de l&apos;autre. Sojori enregistre le séjour puis orchestre ce qui suit — ménage, maintenance, messages clients, tarification. La facturation institutionnelle, la fiche police collectée avant l&apos;arrivée et la taxe de séjour paramétrable sont prises en charge. Sojori inclut son propre PMS et se connecte aux PMS déjà en place, dont Mews.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Pourquoi Rabat combine deux clientèles</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Capitale administrative, Rabat reçoit des délégations, des missions institutionnelles et des séjours d&apos;ambassade, avec des exigences de facturation et de justificatifs strictes. En parallèle, la médina et le Chellah attirent un tourisme culturel de week-end.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Ces deux clientèles n&apos;ont ni le même rythme, ni les mêmes attentes. Faire cohabiter un groupe institutionnel en semaine et des séjours loisir le week-end demande de piloter deux logiques de tarification et deux niveaux de service dans le même établissement.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quelles opérations centraliser à Rabat ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La fiche de séjour porte les dates, la chambre, la source, les voyageurs, les paiements et la facture. Pour les séjours institutionnels s&apos;y ajoutent le rattachement à l&apos;organisme, les justificatifs et parfois une prise en charge partielle.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Les réservations de groupe changent la donne opérationnelle : dix arrivées simultanées supposent que les chambres soient prêtes ensemble, et non au fil de la journée.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Arrivées individuelles et arrivées de groupe</li>
              <li>Réservations directes, OTA, agences et organismes</li>
              <li>Facturation institutionnelle, TVA et taxe de séjour</li>
              <li>Fiche police marocaine collectée par le client avant l&apos;arrivée</li>
              <li>Ménage coordonné sur les arrivées groupées</li>
              <li>Demandes clients WhatsApp transformées en tâches assignées</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Direct, agences et OTA : le mix canaux à Rabat</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>À Rabat, la part du direct est structurellement plus forte qu&apos;ailleurs : les organismes réservent en direct ou via des agences référencées, rarement sur une OTA. Booking et Airbnb captent surtout le week-end et le tourisme culturel.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le channel manager tient les disponibilités à jour sur les canaux ouverts. L&apos;arbitrage consiste à protéger l&apos;inventaire de semaine pour les comptes institutionnels tout en ouvrant le week-end à la distribution large.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quels indicateurs suivre pour un hôtel à Rabat ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Comme à Casablanca, la moyenne mensuelle trompe : l&apos;activité institutionnelle se concentre en semaine et le loisir sur le week-end. Il faut lire les deux segments séparément.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>S&apos;y ajoute une spécificité locale : le poids des séjours de groupe, dont l&apos;annulation tardive pèse bien plus lourd qu&apos;une annulation individuelle.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Occupation semaine et week-end séparées</li>
              <li>Prix moyen et revenu par chambre disponible</li>
              <li>Part des séjours institutionnels et de groupe</li>
              <li>Taux et délai d&apos;annulation sur les groupes</li>
              <li>Part des réservations directes</li>
            </ul>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Les modules mobilisés de Rabat</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-rabat' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Sojori à Rabat également :{' '}
              <Link href={'/gestion-locative-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>gestion hôtelière de Rabat</Link>
              {' · '}
              <Link href={'/conciergerie-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>conciergerie de Rabat</Link>
              <br />
              Autres villes :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Marrakech</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Casablanca</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Tanger</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Agadir</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": "2", "l": "Clientèles distinctes"}, {"k": "24/7", "l": "Support FR/AR"}, {"k": "2-way", "l": "Synchronisation canaux"}, {"k": "Groupe", "l": "Arrivées coordonnées"}]} />

        <FaqSection badge="PMS hôtel Rabat" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Orchestrez votre établissement de Rabat.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Migration depuis votre outil actuel prise en charge. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
