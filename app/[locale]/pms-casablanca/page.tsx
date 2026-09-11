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
    title: t('pmsCasablanca.title'),
    description: t('pmsCasablanca.description'),
    alternates: { canonical: `/${locale}/pms-casablanca` },
  };
}

const FAQ = [
  {
    "q": "Quel PMS choisir pour un hôtel d'affaires à Casablanca ?",
    "a": "Regardez d'abord la facturation entreprise et la rotation quotidienne des chambres : ce sont les deux points où un hôtel casablancais perd du temps. Ensuite, ce que le logiciel déclenche après la réservation. Sojori inclut son PMS et se connecte aux PMS existants, donc l'orchestration peut s'ajouter sans remplacer votre système actuel."
  },
  {
    "q": "Sojori gère-t-il la facturation au nom d'une entreprise ?",
    "a": "Oui. Le séjour porte la société de rattachement, la TVA s'applique selon le paramétrage, et les factures peuvent être regroupées. Pour les clients récurrents, l'historique et les conditions négociées restent attachés au compte."
  },
  {
    "q": "Sojori gère-t-il la fiche police marocaine ?",
    "a": "Oui. Elle est collectée avant l'arrivée : le client la remplit depuis WhatsApp avec sa pièce d'identité, dans le cadre du check-in digital. Vous récupérez les informations sans les saisir à la réception. Sojori prépare les données ; la transmission aux autorités reste votre démarche."
  },
  {
    "q": "Comment tenir la rotation des chambres avec des départs groupés le matin ?",
    "a": "Les tâches de ménage se déclenchent au départ constaté, pas sur un planning théorique. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe, et l'état de chaque chambre remonte en temps réel — vous savez ce qui est prêt avant l'arrivée de l'après-midi."
  },
  {
    "q": "Faut-il remplacer le PMS déjà installé ?",
    "a": "Non. Sojori se connecte à Mews et à d'autres PMS, récupère les réservations et les états de chambre, puis orchestre autour. Le remplacement ne se justifie que si votre PMS actuel ne suit plus."
  },
  {
    "q": "Comment remplir les week-ends à Casablanca ?",
    "a": "En traitant le week-end comme un segment distinct plutôt qu'une moyenne. La tarification s'ajuste sur la demande réelle par jour, et les habitués de la semaine constituent la base à qui adresser une offre loisir. Encore faut-il que l'historique client soit exploitable — c'est le point que Sojori centralise."
  }
];

export default async function PmsPageCasablanca({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: "PMS Hôtel Casablanca", path: `/${locale}/pms-casablanca` },
        ]}
        serviceName={"PMS et orchestration hôtelière de Casablanca"}
        serviceDescription={"PMS et moteur d'orchestration pour hôtels et résidences à Casablanca : clientèle affaires, facturation entreprise, housekeeping, channel manager, fiche police et taxe de séjour. Se connecte aussi à votre PMS existant."}
        areaServed={"Casablanca"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="PMS Hôtel Casablanca" />

        <PageHero
          badge="🏙️ PMS Hôtel · Casablanca"
          title={<>PMS hôtel à Casablanca{' '}<br /><span className="gradient-text">et orchestration des opérations</span></>}
          subtitle="Hôtels d&apos;affaires, résidences et appart-hôtels : Sojori centralise réservations et facturation entreprise, puis orchestre le ménage, la maintenance et la relation client. Fiche police au check-in et taxe de séjour incluses."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un PMS hôtel à Casablanca doit tenir un rythme différent de celui des villes touristiques : séjours courts, réservations tardives, clientèle affaires récurrente, facturation au nom de l&apos;entreprise. Sojori enregistre le séjour puis orchestre ce qui suit — remise en état rapide entre deux nuitées, maintenance, messages clients, tarification en semaine. La fiche police marocaine est collectée par le client avant l&apos;arrivée et la taxe de séjour est calculée selon votre paramétrage. Sojori inclut son propre PMS et se connecte aux PMS déjà en place, dont Mews.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Pourquoi Casablanca impose un autre rythme</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Casablanca est le marché d&apos;affaires du Maroc. Le séjour type dure une à trois nuits, se réserve tard, et se répète : le même client revient tous les mois. Le remplissage se joue du lundi au jeudi, et le week-end devient le creux à combler.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Ce rythme change les priorités opérationnelles. La rotation des chambres est quotidienne, la remise en état doit être bouclée avant l&apos;arrivée suivante, et la facturation part souvent à un service comptable qui exige un format précis. Le PMS enregistre ; l&apos;orchestration fait tenir le tempo.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quelles opérations centraliser à Casablanca ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La fiche de séjour porte les dates, la chambre, la source, le voyageur, les paiements et la facture. À Casablanca s&apos;y ajoute la dimension entreprise : société de rattachement, bon de commande, conditions négociées, facturation mensuelle regroupée.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>L&apos;historique client compte autant que le séjour en cours. Un habitué qui réserve la même catégorie de chambre chaque mois ne devrait pas redonner ses informations à chaque passage.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Arrivées, départs et rotations quotidiennes</li>
              <li>Réservations directes, OTA, agences et comptes entreprise</li>
              <li>Facturation société, TVA et taxe de séjour</li>
              <li>Fiche police marocaine collectée par le client avant l&apos;arrivée</li>
              <li>Housekeeping cadencé sur les départs de la matinée</li>
              <li>Historique et préférences des clients récurrents</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Booking, comptes entreprise et direct à Casablanca</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le mix casablancais est particulier : Booking capte le voyageur d&apos;affaires ponctuel, les comptes entreprise et les agences couvrent le récurrent, et le direct progresse sur les habitués. Airbnb pèse surtout sur les résidences et appart-hôtels.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le channel manager tient les disponibilités à jour dans les deux sens. La question stratégique est de savoir combien coûte réellement chaque canal une fois la commission déduite, et sur lesquels reporter le volume.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quels indicateurs suivre pour un hôtel à Casablanca ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La saisonnalité est faible mais l&apos;effet semaine est fort. Lire les indicateurs en moyenne mensuelle masque justement ce qu&apos;il faut corriger : le creux du week-end.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La lecture pertinente sépare les jours de semaine des week-ends, et suit le poids des comptes entreprise dans le revenu total.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Occupation semaine et week-end séparées</li>
              <li>Prix moyen et revenu par chambre disponible</li>
              <li>Revenu par compte entreprise</li>
              <li>Part des réservations directes et des habitués</li>
              <li>Délai de remise en état entre deux séjours</li>
            </ul>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Les modules mobilisés de Casablanca</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-casablanca' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Sojori à Casablanca également :{' '}
              <Link href={'/gestion-locative-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>gestion hôtelière de Casablanca</Link>
              {' · '}
              <Link href={'/conciergerie-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>conciergerie de Casablanca</Link>
              <br />
              Autres villes :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Marrakech</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Rabat</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Tanger</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Agadir</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": "1-3", "l": "Nuits par séjour type"}, {"k": "24/7", "l": "Support FR/AR"}, {"k": "2-way", "l": "Synchronisation canaux"}, {"k": "J+1", "l": "Facturation entreprise"}]} />

        <FaqSection badge="PMS hôtel Casablanca" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Orchestrez votre établissement de Casablanca.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Migration depuis votre outil actuel prise en charge. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
