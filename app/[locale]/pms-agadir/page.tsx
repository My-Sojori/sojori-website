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
    title: t('pmsAgadir.title'),
    description: t('pmsAgadir.description'),
    alternates: { canonical: `/${locale}/pms-agadir` },
  };
}

const FAQ = [
  {
    "q": "Quel PMS choisir pour un hôtel ou une résidence à Agadir ?",
    "a": "Le critère propre à Agadir est la gestion du séjour long : ménage récurrent en cours d'occupation, maintenance suivie, paiements échelonnés. Beaucoup de PMS traitent bien l'arrivée et le départ, mais mal ce qui se passe entre les deux. Sojori inclut son PMS et se connecte aux PMS existants."
  },
  {
    "q": "Comment organiser le ménage pendant un séjour de plusieurs semaines ?",
    "a": "La cadence se paramètre par logement et les tâches se génèrent automatiquement à chaque échéance, avec le change du linge. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe, et l'avancement remonte en temps réel."
  },
  {
    "q": "Sojori gère-t-il les allotements tour-opérateur ?",
    "a": "L'inventaire engagé reste distinct des disponibilités ouvertes à la distribution, et le reporting sépare le revenu par canal pour que vous voyiez ce que rapporte réellement le volume négocié. Le paramétrage précis se règle à la mise en route, selon vos contrats."
  },
  {
    "q": "Sojori gère-t-il la fiche police marocaine ?",
    "a": "Oui, pour la partie collecte. L'obligation vient du dahir du 14 janvier 1953, reprise par la loi 80-14 : un bulletin individuel par personne hébergée. Sojori fait remplir la fiche par le client lui-même avant son arrivée, depuis WhatsApp, avec sa pièce d'identité — vous récupérez des données complètes sans saisie au comptoir, et vous voyez quels séjours sont en règle. La déclaration aux autorités, aujourd'hui dématérialisée via la plateforme STDN, reste la démarche de l'établissement."
  },
  {
    "q": "Faut-il remplacer le PMS déjà installé ?",
    "a": "Non. Sojori se connecte à Mews et à d'autres PMS, récupère les réservations et les états de chambre, puis orchestre autour — ménage, maintenance, messages clients, tarification."
  },
  {
    "q": "Comment suivre la maintenance sur un parc en bord de mer ?",
    "a": "Un signalement — par le client sur WhatsApp ou par un intervenant — ouvre un ticket rattaché au logement, avec son responsable et son échéance. L'historique par logement rend visible ce qui revient sans cesse, ce qui est le point de départ pour arbitrer entre réparer et remplacer."
  }
];

export default async function PmsPageAgadir({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: "PMS Hôtel Agadir", path: `/${locale}/pms-agadir` },
        ]}
        serviceName={"PMS et orchestration hôtelière d'Agadir"}
        serviceDescription={"PMS et moteur d'orchestration pour hôtels, résidences et appart-hôtels à Agadir : séjours longs, tour-opérateurs, housekeeping, channel manager, fiche police et taxe de séjour. Se connecte aussi à votre PMS existant."}
        areaServed={"Agadir"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="PMS Hôtel Agadir" />

        <PageHero
          badge="🌊 PMS Hôtel · Agadir"
          title={<>PMS hôtel à Agadir{' '}<br /><span className="gradient-text">et orchestration des opérations</span></>}
          subtitle="Hôtels balnéaires, résidences et appart-hôtels : Sojori centralise les réservations puis orchestre ménage, maintenance et relation client sur des séjours longs. Fiche police au check-in et taxe de séjour incluses."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un PMS hôtel à Agadir travaille sur des séjours nettement plus longs qu&apos;ailleurs au Maroc : une à deux semaines, souvent réservées par un tour-opérateur, parfois plusieurs mois pour la clientèle hivernante européenne. Sojori enregistre le séjour puis orchestre ce qui suit — ménage en cours de séjour, maintenance, messages clients, tarification. La fiche police est collectée avant l&apos;arrivée et la taxe de séjour est paramétrable. Sojori inclut son propre PMS et se connecte aux PMS déjà en place, dont Mews.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Pourquoi le séjour long change l&apos;exploitation à Agadir</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Agadir vit du balnéaire et du long séjour : semaines réservées via tour-opérateur, et une clientèle européenne qui passe l&apos;hiver sur place, parfois plusieurs mois d&apos;affilée en résidence ou appart-hôtel.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Un séjour long déplace la charge opérationnelle. Le ménage n&apos;intervient plus seulement entre deux clients mais pendant l&apos;occupation, selon une fréquence convenue. La maintenance devient visible : sur trois mois, tout ce qui fonctionne mal finit par être signalé. Et la relation client s&apos;étend bien au-delà de l&apos;arrivée.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quelles opérations centraliser à Agadir ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La fiche de séjour porte les dates, le logement, la source, les voyageurs, les paiements et la facture. Sur un long séjour s&apos;y ajoutent la cadence de ménage convenue, le change du linge et les interventions techniques successives.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Les contrats tour-opérateur imposent leur propre logique : allotements, conditions négociées, échéances de libération. Ils doivent rester lisibles à côté des réservations individuelles.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Arrivées, départs et séjours de plusieurs semaines</li>
              <li>Réservations directes, OTA, agences et tour-opérateurs</li>
              <li>Allotements et conditions négociées</li>
              <li>Paiements échelonnés, factures, TVA et taxe de séjour</li>
              <li>Fiche police marocaine collectée par le client avant l&apos;arrivée</li>
              <li>Ménage récurrent en cours de séjour et maintenance suivie</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Tour-opérateurs, OTA et direct à Agadir</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Agadir reste l&apos;un des marchés marocains les plus dépendants des tour-opérateurs, qui apportent du volume à prix négocié. Booking, Expedia et Airbnb portent l&apos;individuel, et le direct progresse sur les hivernants qui reviennent chaque année.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le channel manager tient les disponibilités à jour sur les canaux ouverts, en tenant compte de l&apos;inventaire déjà engagé en allotement. L&apos;enjeu est de mesurer ce que rapporte réellement chaque canal une fois les conditions négociées prises en compte.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Quels indicateurs suivre pour un hôtel à Agadir ?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Avec des séjours longs, le taux d&apos;occupation devient moins parlant : il varie peu. Ce qui bouge, c&apos;est le revenu par chambre disponible, et surtout la part de l&apos;inventaire engagée à prix négocié.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>La saison hivernale mérite sa propre lecture : c&apos;est là que se joue la clientèle de long séjour, avec un revenu au mois plutôt qu&apos;à la nuit.</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Revenu par chambre disponible plutôt qu&apos;occupation seule</li>
              <li>Part de l&apos;inventaire en allotement tour-opérateur</li>
              <li>Durée moyenne de séjour par canal</li>
              <li>Revenu mensuel sur la clientèle hivernante</li>
              <li>Coût du ménage récurrent rapporté au séjour</li>
            </ul>
          </div>
        </section>


        {/* Fiche de police — ajouté le 2026-09-11. C'est un sujet à fort
            volume de recherche que les concurrents traitent peu, et une
            obligation réelle des hôteliers marocains. Rédigé prudemment :
            Sojori collecte et prépare, il ne télé-déclare pas à la place de
            l'établissement. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Conformité</div>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Fiche de police : l&apos;obligation, et comment Sojori l&apos;orchestre à Agadir
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              Tout établissement d&apos;hébergement touristique au Maroc — hôtel, riad,
              maison d&apos;hôtes, résidence — doit établir un bulletin individuel pour
              chaque personne hébergée, marocaine ou étrangère. L&apos;obligation remonte
              au dahir du 14 janvier 1953 et a été reprise par la loi 80-14 relative
              aux établissements touristiques. Elle ne connaît pas d&apos;exception de
              taille : un riad de quatre chambres y est tenu comme un hôtel de deux
              cents.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              La déclaration s&apos;est dématérialisée. Le ministère du Tourisme, le
              ministère de l&apos;Intérieur, la DGSN et la Gendarmerie Royale ont mis en
              place la plateforme de télé-déclaration des nuitées (STDN), qui remplace
              le dépôt des bulletins papier par une déclaration quotidienne en ligne.
              Les manquements exposent, selon les sources professionnelles du secteur,
              à des amendes de l&apos;ordre de 2 000 à 10 000 dirhams, et à une fermeture
              administrative en cas de récidive.
            </p>
            <div className="card" style={{ padding: 22, marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Ce que Sojori fait</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 12 }}>
                Sojori orchestre la <strong style={{ color: 'var(--text-2)' }}>collecte</strong> de la fiche,
                pas la déclaration. Avant l&apos;arrivée, le client reçoit sur WhatsApp
                son parcours de check-in : il renseigne lui-même son identité et
                dépose sa pièce d&apos;identité. Les données arrivent complètes et
                structurées dans le dossier du séjour, prêtes à être déclarées.
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                <li>La saisie se fait en amont, pas au comptoir à l&apos;arrivée</li>
                <li>Le client remplit en français, en anglais ou en arabe</li>
                <li>Les relances sont automatiques tant que la fiche est incomplète</li>
                <li>Vous voyez d&apos;un coup d&apos;œil quels séjours sont en règle et lesquels ne le sont pas</li>
              </ul>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Sojori prépare les données ; la déclaration aux autorités reste la
              démarche de l&apos;établissement. Les modalités exactes et les montants
              applicables à votre catégorie sont à confirmer auprès de la DGSN et du
              ministère du Tourisme, seuls habilités à les fixer.
            </p>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Les modules mobilisés d&apos;Agadir</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Expedia, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-agadir' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Sojori à Agadir également :{' '}
              <Link href={'/gestion-locative-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>gestion hôtelière d&apos;Agadir</Link>
              {' · '}
              <Link href={'/conciergerie-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>conciergerie d&apos;Agadir</Link>
              <br />
              <br />
              <br />
              Comparer :{' '}
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Sojori face aux autres PMS du Maroc</Link>
              Financement :{' '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Go Siyaha, la subvention digitalisation</Link>
              <br />
              Comprendre :{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>Qu&apos;est-ce que l&apos;orchestration hôtelière ?</Link>
              Autres villes :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Marrakech</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Casablanca</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Rabat</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Tanger</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": "1-2 sem.", "l": "Séjour type"}, {"k": "Hiver", "l": "Saison longue durée"}, {"k": "24/7", "l": "Support FR/AR/EN"}, {"k": "2-way", "l": "Synchronisation canaux"}]} />

        <FaqSection badge="PMS hôtel Agadir" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Orchestrez votre établissement d&apos;Agadir.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Migration depuis votre outil actuel prise en charge. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
