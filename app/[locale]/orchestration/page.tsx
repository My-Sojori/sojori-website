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
    title: t('orchestration.title'),
    description: t('orchestration.description'),
    alternates: { canonical: `/${locale}/orchestration` },
  };
}

/**
 * Page pilier de l'orchestration.
 *
 * 2026-09-12 — Constat qui a motivé cette page : le mot « orchestration »
 * n'apparaissait sur AUCUNE des 11 pages produit, et aucune page
 * n'expliquait ce qu'est l'orchestration. Le positionnement ne vivait que
 * sur la page d'accueil ; dès le premier clic, le visiteur retombait sur un
 * catalogue de modules juxtaposés — précisément ce dont Sojori dit se
 * distinguer. La chose que Sojori vend n'avait pas de page.
 *
 * Elle sert aussi de cible SEO sur « orchestration hôtelière », requête
 * qu'aucun concurrent n'occupe — contrairement à « PMS », disputée entre
 * Cloudbeds, Pluriel, Nozoul et Welcomax.
 */

/** Les trois domaines orchestrés, dans l'ordre où le positionnement les énonce. */
const DOMAINS = [
  {
    key: 'guest',
    label: 'Expérience client',
    color: '#06b6d4',
    lead: "Ce que le client vit, de la réservation à l'avis.",
    body: "Messages avant l'arrivée, check-in digital, fiche de police remplie à distance, demandes pendant le séjour, instructions de départ, demande d'avis. Le client écrit sur WhatsApp, dans sa langue, et n'installe rien.",
    links: [
      { t: 'Guest Experience', href: '/guest-experience' as const },
      { t: 'WhatsApp', href: '/whatsapp' as const },
      { t: 'Inbox unifiée', href: '/inbox' as const },
    ],
  },
  {
    key: 'ops',
    label: 'Opérations',
    color: '#8b5cf6',
    lead: 'Ce que vos équipes et vos partenaires exécutent.',
    body: "Ménage déclenché au départ constaté, recouche quotidienne, maintenance rattachée à l'équipement, accueil, navette, blanchisserie. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe.",
    links: [
      { t: 'TeamFlow', href: '/teamflow' as const },
      { t: 'PMS', href: '/pms' as const },
      { t: 'Dashboard App', href: '/dashboard-app' as const },
    ],
  },
  {
    key: 'revenue',
    label: 'Ventes & revenu',
    color: '#10b981',
    lead: 'Ce que le séjour rapporte réellement.',
    body: "Tarification par règles avec vos bornes, distribution sur les canaux, mix canaux et commission nette, surclassements et extras vendus, note du séjour, revenu par chambre disponible.",
    links: [
      { t: 'Tarification dynamique', href: '/dynamic-pricing' as const },
      { t: 'Channel Manager', href: '/channel-manager' as const },
      { t: 'Smart Analytics', href: '/analytics' as const },
    ],
  },
];

/** Ce que Sojori connecte — la seconde moitié du positionnement. */
const CONNECTS = [
  { i: '🔌', t: 'Les systèmes', d: "Votre PMS s'il existe déjà — dont Mews —, les OTA, les moteurs de paiement, les sources de données comme le statut d'un vol." },
  { i: '💬', t: 'Les clients', d: 'Sur WhatsApp d’abord, dans leur langue, sans application à installer ni compte à créer.' },
  { i: '👥', t: 'Les équipes', d: 'Réception, gouvernante, femmes de chambre, maintenance — chacun reçoit ce qui le concerne, et son avancement remonte.' },
  { i: '🤝', t: 'Les partenaires', d: 'Chauffeurs, spa, restaurants, blanchisserie, excursions : ils entrent dans le flux plutôt que d’être appelés au téléphone.' },
];

const FAQ = [
  {
    q: "Qu'est-ce qu'un moteur d'orchestration hôtelière ?",
    a: "C'est un système qui déclenche et coordonne ce qui doit arriver pendant un séjour, au lieu d'attendre qu'on le saisisse. Un PMS enregistre que la chambre 204 est libérée ; un orchestrateur envoie la mission de ménage à la bonne personne, la réassigne si elle n'est pas prise, ouvre un ticket si un équipement est signalé, prévient la réception que l'arrivée de 15 h risque d'attendre, et ajuste le prix des nuits restantes. L'un tient un état, l'autre conduit une opération.",
  },
  {
    q: "En quoi est-ce différent d'un PMS ?",
    a: "Le PMS est la mémoire du séjour : réservations, chambres, factures, canaux. L'orchestration est ce qui se passe autour — accueil, ménage, maintenance, messages clients, tarification. Sojori inclut son propre PMS pour un établissement qui n'en a pas, mais se connecte aussi aux PMS déjà en place. La différence se mesure les jours de forte rotation, quand plus personne n'a le temps de coordonner à la main.",
  },
  {
    q: "Faut-il remplacer notre PMS actuel ?",
    a: "Non. Sojori se connecte aux PMS existants, dont Mews : il récupère les réservations et les états de chambre, puis orchestre autour. C'est souvent le chemin le plus court pour mesurer l'apport de l'orchestration sans toucher à votre système de réservation. Le remplacement n'a de sens que pour un établissement sans PMS, ou dont le PMS ne suit plus.",
  },
  {
    q: "Qu'est-ce qui déclenche une action dans Sojori ?",
    a: "Des événements réels, pas un planning théorique : un départ constaté, une arrivée anticipée, une chambre signalée en panne, un message client, un retard de vol, un seuil d'occupation franchi. C'est ce qui distingue l'orchestration d'une liste de tâches — vous ne décidez pas quand chaque chose doit partir, vous décidez des règles.",
  },
  {
    q: "L'orchestration décide-t-elle à notre place ?",
    a: "Vous fixez les règles et les limites, le moteur agit dedans. Sur la tarification par exemple, le calcul reste algorithmique, borné par un minimum et un maximum que vous définissez, avec un niveau d'autonomie paramétrable : automatique sous un certain seuil, soumis à validation au-delà. Un modèle ne fixe pas vos prix seul.",
  },
  {
    q: "Est-ce adapté à un petit établissement ?",
    a: "L'orchestration prend sa valeur quand il y a des flux à coordonner — des équipes, des arrivées simultanées, plusieurs canaux, des demandes clients. Un riad de six chambres tenu par deux personnes tirera surtout parti du PMS et du channel manager. Nous préférons vous le dire plutôt que de vous vendre un outil surdimensionné.",
  },
];

export default async function OrchestrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Orchestration', path: `/${locale}/orchestration` },
        ]}
        serviceName="Moteur d'orchestration de l'hospitalité"
        serviceDescription="Moteur qui orchestre l'expérience client, les opérations et le revenu d'un établissement hôtelier, en connectant les systèmes, les clients, les équipes et les partenaires."
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Orchestration" />

        <PageHero
          badge="● Le moteur · Hospitalité"
          title={<>Un PMS enregistre.{' '}<br /><span className="gradient-text">Un orchestrateur fait arriver les choses.</span></>}
          subtitle="Sojori orchestre l'expérience client, les opérations et le revenu de votre établissement — en connectant vos systèmes, vos clients, vos équipes et vos partenaires. Il inclut un PMS, et se connecte aussi au vôtre."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Un moteur d&apos;orchestration hôtelière déclenche et coordonne ce qui doit
              arriver pendant un séjour, au lieu d&apos;attendre qu&apos;un responsable le
              saisisse ou le rappelle à chacun. Là où un PMS tient l&apos;état des
              réservations et des chambres, l&apos;orchestration agit sur les événements
              réels : un départ constaté déclenche le ménage, une chambre signalée ouvre
              un ticket, un message client devient une tâche assignée, un seuil
              d&apos;occupation franchi ajuste le prix des nuits restantes. Sojori orchestre
              trois domaines — l&apos;expérience client, les opérations, les ventes et le
              revenu — en connectant quatre mondes qui ne se parlaient pas : vos systèmes,
              vos clients, vos équipes et vos partenaires. Il inclut son propre PMS, et se
              connecte aux PMS déjà en place, dont Mews : vous n&apos;êtes pas obligé de
              remplacer l&apos;existant pour orchestrer.
            </p>
          </div>
        </section>

        {/* La distinction fondatrice, posée noir sur blanc. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Enregistrer n&apos;est pas conduire
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Ce que fait un PMS</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                  <li>Enregistre la réservation et le séjour</li>
                  <li>Tient l&apos;état des chambres</li>
                  <li>Édite la facture</li>
                  <li>Synchronise les canaux</li>
                  <li>Affiche des indicateurs</li>
                </ul>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', marginTop: 16, fontStyle: 'italic' }}>
                  Vous savez ce qui se passe. La coordination reste à faire.
                </p>
              </div>
              <div className="card" style={{ padding: 24, borderColor: 'rgba(230,176,34,0.4)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Ce qu&apos;ajoute l&apos;orchestration</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                  <li>Déclenche la mission de ménage au départ constaté</li>
                  <li>Réassigne ce qui n&apos;est pas pris</li>
                  <li>Ouvre un ticket sur un équipement signalé</li>
                  <li>Transforme un message client en tâche</li>
                  <li>Ajuste le prix dans vos bornes</li>
                </ul>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', marginTop: 16, fontStyle: 'italic' }}>
                  Ce qui doit arriver arrive, sans que personne le rappelle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Les trois domaines — et les modules qui les servent. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Trois domaines, un seul moteur
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 28, maxWidth: 780 }}>
              Ce ne sont pas trois produits à assembler. C&apos;est le même moteur qui lit
              un événement et agit sur les trois fronts à la fois : un vol retardé décale
              le chauffeur, replanifie le ménage et laisse la nuit en vente plus longtemps.
            </p>
            <div style={{ display: 'grid', gap: 16 }}>
              {DOMAINS.map((d) => (
                <div key={d.key} className="card" style={{ padding: 24, borderLeft: `3px solid ${d.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{d.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{d.lead}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 14 }}>{d.body}</p>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                    {d.links.map((l, i) => (
                      <span key={l.t}>
                        {i > 0 && ' · '}
                        <Link href={{ pathname: l.href, query: { source: 'seo-orchestration' } }} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{l.t}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les quatre connexions. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Ce que Sojori connecte
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 28, maxWidth: 780 }}>
              Un établissement fonctionne déjà avec des outils, des habitudes et des
              prestataires. Orchestrer ne veut pas dire tout remplacer : cela veut dire
              faire circuler l&apos;information entre des mondes qui ne se parlaient pas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {CONNECTS.map((c) => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-3)', margin: 0 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Un exemple concret : la démonstration du principe. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Un exemple : un vol a 40 minutes de retard
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              Le client a réservé une navette à son arrivée, et son numéro de vol a été
              collecté au moment du check-in digital. Le vol part en retard. Personne au
              sein de l&apos;établissement n&apos;a consulté quoi que ce soit.
            </p>
            <ul style={{ margin: '0 0 16px', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.95, fontSize: 15 }}>
              <li><strong style={{ color: 'var(--text-2)' }}>Opérations</strong> — le chauffeur partenaire reçoit sa nouvelle heure de prise en charge sur WhatsApp ; le ménage de la chambre passe après celle d&apos;une arrivée à l&apos;heure.</li>
              <li><strong style={{ color: 'var(--text-2)' }}>Expérience client</strong> — la réception voit la nouvelle heure d&apos;arrivée, et l&apos;accueil est préparé pour ce moment-là plutôt que servi trop tôt.</li>
              <li><strong style={{ color: 'var(--text-2)' }}>Revenu</strong> — la chambre reste vendable plus longtemps, et un départ tardif peut être proposé au client précédent.</li>
            </ul>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)' }}>
              Un PMS aurait affiché le séjour sans rien déplacer. C&apos;est cet écart —
              entre savoir et faire — que l&apos;orchestration comble.
            </p>
          </div>
        </section>

        <StatsBar stats={[
          { k: '3', l: 'Domaines orchestrés' },
          { k: '4', l: 'Mondes connectés' },
          { k: 'PMS', l: 'Inclus ou connecté' },
          { k: 'FR/AR/EN', l: 'Langues des équipes' },
        ]} />

        <FaqSection badge="Orchestration hôtelière" title="Questions fréquentes" items={FAQ} />

        {/* Maillage : cette page est le pilier, elle doit redistribuer. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>● Poursuivre</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>Comparatif des PMS au Maroc</Link>
              {' · '}
              <Link href={'/integrations' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Intégrations & API</Link>
              {' · '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Go Siyaha</Link>
              {' · '}
              <Link href={'/pricing' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Tarifs</Link>
              <br />
              Par ville :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Marrakech</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Casablanca</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Rabat</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Tanger</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Agadir</Link>
            </div>
          </div>
        </section>

        <FinalCTA
          title={<>Voyez-le sur votre propre exploitation.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Sojori se connecte aussi à votre PMS existant — vous pouvez tester l'orchestration sans rien migrer."
        />

        <PageFooter />
      </div>
    </>
  );
}
