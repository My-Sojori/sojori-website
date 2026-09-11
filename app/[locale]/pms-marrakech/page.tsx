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
    title: t('pmsMarrakech.title'),
    description: t('pmsMarrakech.description'),
    alternates: { canonical: `/${locale}/pms-marrakech` },
  };
}

const FAQ = [
  {
    "q": "Quel PMS choisir pour un hôtel ou un riad à Marrakech ?",
    "a": "Le critère décisif n'est pas le nombre de modules mais ce que le logiciel fait après la réservation. Un PMS enregistre le séjour ; l'orchestration déclenche le ménage, la maintenance et les messages clients qui en découlent. Sojori inclut son PMS et se connecte aux PMS existants : si le vôtre vous convient, gardez-le et ajoutez la couche d'orchestration."
  },
  {
    "q": "Sojori gère-t-il la fiche police marocaine ?",
    "a": "Oui. La fiche police est collectée avant l'arrivée : le client la remplit lui-même depuis WhatsApp, avec sa pièce d'identité, dans le cadre du check-in digital. Vous récupérez les informations complètes du séjour sans les saisir à la réception. Sojori prépare les données ; la transmission aux autorités reste votre démarche."
  },
  {
    "q": "Comment la taxe de séjour est-elle calculée ?",
    "a": "Elle se paramètre par établissement : montant par adulte et par nuit, avec un calcul au séjour, à la nuit ou par personne et par nuit. Le mode de collecte se règle aussi — espèces à l'arrivée, carte à l'arrivée, ou inclus dans le prix affiché. Le montant est reporté sur la facture."
  },
  {
    "q": "Faut-il remplacer Mews ou un PMS déjà installé ?",
    "a": "Non. Sojori se connecte à Mews et récupère les réservations et les états de chambre, puis orchestre autour — accueil, ménage, maintenance, messages clients, tarification. Le remplacement n'a de sens que pour un établissement sans PMS, ou dont le PMS actuel ne suit plus."
  },
  {
    "q": "Comment le housekeeping est-il organisé dans un riad sans réception permanente ?",
    "a": "Les tâches se déclenchent sur les événements réels : départ constaté, arrivée anticipée, chambre signalée en panne. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe, sans application à installer. L'état de chaque chambre est visible en temps réel plutôt que reconstitué en fin de journée."
  },
  {
    "q": "Combien de temps prend la mise en route à Marrakech ?",
    "a": "Comptez quelques jours pour un établissement seul, davantage si plusieurs riads et des historiques de réservation sont à reprendre. L'accompagnement se fait en français, et la migration depuis un outil existant est prise en charge."
  }
];

export default async function PmsPageMarrakech({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: "PMS Hôtel Marrakech", path: `/${locale}/pms-marrakech` },
        ]}
        serviceName={"PMS et orchestration hôtelière de Marrakech"}
        serviceDescription={"PMS et moteur d'orchestration pour hôtels, riads et maisons d'hôtes à Marrakech : réservations, housekeeping, maintenance, channel manager, fiche police et taxe de séjour. Se connecte aussi à votre PMS existant."}
        areaServed={"Marrakech"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="PMS Hôtel Marrakech" />

        <PageHero
          badge="🏛️ PMS Hôtel · Marrakech"
          title={<>PMS hôtel à Marrakech{' '}<br /><span className="gradient-text">et orchestration des opérations</span></>}
          subtitle="Hôtels de charme, riads de la médina et maisons d&apos;hôtes : Sojori centralise le planning et les réservations, puis orchestre ce qui suit — ménage, maintenance, messages clients, tarification. Fiche police au check-in et taxe de séjour incluses."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un PMS hôtel à Marrakech centralise les chambres, les réservations, la réception, les paiements et les indicateurs. Sojori va plus loin : une fois la réservation enregistrée, le moteur d&apos;orchestration déclenche les tâches de ménage au départ constaté, ouvre un ticket de maintenance sur une chambre signalée, envoie au client les messages de son séjour et adapte le prix selon la demande. La fiche police marocaine est collectée par le client lui-même avant l&apos;arrivée, et la taxe de séjour est calculée par nuit, par personne ou par séjour selon votre paramétrage. Sojori inclut son propre PMS et se connecte aux PMS déjà en place, dont Mews : vous n&apos;êtes pas obligé de remplacer l&apos;existant.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Pourquoi Marrakech demande une orchestration, pas seulement un PMS</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Marrakech juxtapose des riads de médina de six chambres, des villas de la Palmeraie et des hôtels urbains. Les rythmes d&apos;arrivée, les profils clients et les conditions commerciales n&apos;ont rien de commun d&apos;un établissement à l&apos;autre.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Cette diversité se paie sur la coordination plus que sur la saisie. Un riad de médina n&apos;a pas de réception permanente : l&apos;arrivée du client, la disponibilité de la chambre et le passage du ménage doivent se synchroniser sans qu&apos;un responsable les rapproche à la main. C&apos;est ce travail-là que le PMS seul ne fait pas.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quelles opérations centraliser à Marrakech ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La fiche de séjour reste le point de référence : dates, chambre, source, voyageurs, paiements, facture, demandes particulières. À Marrakech s&apos;y ajoutent presque systématiquement des services annexes — transfert aéroport, dîner au riad, excursion, hammam — qui doivent rester attachés au séjour.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Mais la centralisation ne suffit pas si chaque service demande ensuite une relance manuelle. Dans Sojori, la demande client arrivée par WhatsApp devient une tâche assignée, avec son responsable et son échéance, sans ressaisie.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Arrivées, départs, prolongations et changements de chambre</li>
              <li>Réservations directes, OTA, agences, téléphone et walk-in</li>
              <li>Paiements, soldes, factures, TVA et taxe de séjour</li>
              <li>Fiche police marocaine collectée par le client avant l&apos;arrivée</li>
              <li>Ménage et maintenance déclenchés sur les événements réels du séjour</li>
              <li>Demandes clients WhatsApp transformées en tâches assignées</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Booking, Airbnb et direct : le mix canaux à Marrakech</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>À Marrakech, Booking et Airbnb pèsent différemment selon le type d&apos;établissement : un riad de médina vit souvent d&apos;Airbnb et du direct, un hôtel urbain davantage de Booking et des agences réceptives.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le channel manager synchronise disponibilités et tarifs dans les deux sens. L&apos;enjeu n&apos;est pas seulement d&apos;éviter la surréservation, mais de mesurer la contribution nette de chaque canal — commission déduite — pour arbitrer où pousser le direct.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quels indicateurs suivre pour un établissement à Marrakech ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La saisonnalité de Marrakech est brutale : festivals, marathon, vacances scolaires européennes, Ramadan. Le taux de remplissage seul ne dit rien si le prix moyen s&apos;effondre pour l&apos;atteindre.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La lecture utile croise l&apos;occupation à venir, le prix moyen, le revenu par chambre disponible et la part du direct — par période, par catégorie et par canal.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Occupation à 7, 30 et 60 jours</li>
              <li>Prix moyen et revenu par chambre disponible</li>
              <li>Revenu et annulations par canal</li>
              <li>Part des réservations directes</li>
              <li>Délai moyen de remise en état des chambres</li>
            </ul>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Les modules mobilisés de Marrakech</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-marrakech' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Sojori à Marrakech également :{' '}
              <Link href={'/gestion-locative-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>gestion hôtelière de Marrakech</Link>
              {' · '}
              <Link href={'/conciergerie-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>conciergerie de Marrakech</Link>
              <br />
              Autres villes :{' '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Casablanca</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Rabat</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Tanger</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Agadir</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": "500+", "l": "Chambres orchestrées"}, {"k": "70+", "l": "Établissements"}, {"k": "13M", "l": "Visiteurs/an à Marrakech"}, {"k": "FR/AR/EN", "l": "Langues natives"}]} />

        <FaqSection badge="PMS hôtel Marrakech" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Orchestrez votre établissement de Marrakech.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Migration depuis votre outil actuel prise en charge. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
