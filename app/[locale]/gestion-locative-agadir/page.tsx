import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqSection } from '@/components/FaqSection';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeAgadir.title'),
    description: t('gestionLocativeAgadir.description'),
    alternates: { canonical: `/${locale}/gestion-locative-agadir` },
  };
}

export default function GestionLocativeAgadirPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Gestion Locative Agadir" />

        <PageHero
          badge="🏖️ Gestion Locative Agadir · Solution Complète"
          title={<>Orchestrez votre établissement.<br /><span className="gradient-text">Depuis Agadir.</span></>}
          subtitle="Hôtels, clubs et résidences de tourisme à Agadir : PMS complet, Channel Manager multi-OTA, Conciergerie WhatsApp 24/7, Dynamic Pricing saisonnier. La solution pensée pour la station balnéaire la plus fréquentée du Maroc."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi Agadir ?</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              Agadir = <span className="gradient-text">capitale balnéaire du Maroc</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '☀️', t: 'Climat Toute l\'Année', d: 'Climat tempéré atlantique, rarement extrême même en plein été. Agadir combine haute saison estivale classique et un flux hivernal de séjours longs (retraités et résidents saisonniers européens) — une double saisonnalité rare au Maroc.' },
                { i: '🏝️', t: 'Ville Balnéaire Moderne', d: 'Reconstruite après le séisme de 1960 avec des normes antisismiques strictes, Agadir a un parc immobilier récent : résidences balnéaires sécurisées avec piscines, plutôt que médinas historiques — un marché structurellement différent de Marrakech ou Fès.' },
                { i: '✈️', t: 'Aéroport en Forte Croissance', d: 'L\'aéroport Agadir Al Massira, 3ème du pays par trafic, connaît une croissance soutenue portée par les compagnies low-cost européennes — un flux touristique en expansion continue à capter.' },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Modules Sojori pour Agadir</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce dont un établissement à Agadir a besoin. <span style={{ color: 'var(--text-3)' }}>Dans un seul logiciel.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '📋', t: 'PMS Multi-Propriétés', d: 'Calendrier unifié pour résidences balnéaires. Réservations, paiements MAD/EUR, facturation automatique, contrats digitaux — pensé pour les séjours longs comme pour les courts city-breaks.', link: '/pms' as const },
                { i: '🔄', t: 'Channel Manager Temps Réel', d: 'Synchronisation Booking.com, Expedia, Airbnb. Évitez surréservations sur des portefeuilles saisonniers à forte occupation, gérez calendrier depuis un dashboard unique.', link: '/channel-manager' as const },
                { i: '💬', t: 'WhatsApp Conciergerie 24/7', d: 'Conciergerie automatique FR/AR/EN adaptée aux arrivées charter groupées et aux séjours longs des résidents hivernaux. Check-in digital, support réactif toute l\'année.', link: '/whatsapp' as const },
                { i: '💰', t: 'Dynamic Pricing Saisonnier', d: 'Yield management pensé pour la double saison d\'Agadir : pic estival familles, saison hivernale longue durée. Optimisez RevPAR automatiquement selon la demande.', link: '/dynamic-pricing' as const },
                { i: '👥', t: 'Gestion Équipe Locale', d: 'Planification ménage adaptée aux rotations rapides de la haute saison, attribution tâches, suivi performances. Coordonnez vos équipes sans chaos WhatsApp.', link: '/teamflow' as const },
                { i: '📊', t: 'Analytics & Reporting', d: 'Revenue par propriété, occupation, ADR, RevPAR. Export comptable mensuel. Dashboards temps réel pour piloter un portefeuille à forte saisonnalité.', link: '/analytics' as const },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <Link href={{ pathname: c.link, query: { source: 'seo-gestion-locative-agadir' } }} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>En savoir plus →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Cas d'usage Agadir</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Nos clients à Agadir. <span className="gradient-text">Leurs résultats.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { profil: 'Hôtel de charme · Résidences Marina & Founty', pb: 'Gérait des résidences balnéaires avec Excel + WhatsApp perso. Pic estival ingérable manuellement, messages guests perdus, aucune visibilité revenus consolidée.', sol: 'PMS + Channel Manager + WhatsApp AI déployés en quelques jours. Calendrier unifié, conciergerie 24/7 automatique pour absorber les pics de haute saison, reporting financier mensuel.', res: 'Occupation en hausse sur la haute saison · 0 surréservation · gestion des pics automatisée' },
                { profil: 'Co-host · Appartements Standing Front de Mer', pb: 'Propriétaires voulaient transparence finances sur des locations à forte saisonnalité. Statements manuels = plusieurs jours par mois. Virements retardés.', sol: 'Owner Portal multi-devise. Statements automatiques, virements programmés, dashboards propriétaires en temps réel.', res: 'Temps administratif fortement réduit · rétention propriétaires élevée · portefeuille en croissance' },
                { profil: 'Agence · Portefeuille Résidences Sécurisées', pb: 'Équipe ménage désorganisée sur des rotations rapides en haute saison. Pas de suivi qualité. Reviews clients en baisse pendant les pics.', sol: 'TeamFlow déployé. Planning automatique par propriété, checklist ménage digitale, suivi temps réel. WhatsApp AI pour guests toute l\'année.', res: 'Reviews en hausse · coordination plus rapide même en pic · équipe mieux organisée' },
              ].map((c, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{c.profil}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Problème</div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.pb}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Solution Sojori</div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.sol}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Résultats</div>
                      <div style={{ fontSize: 13, color: '#10b981', lineHeight: 1.55, fontWeight: 600 }}>{c.res}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: '1ère', l: 'Station balnéaire du Maroc' },
          { k: 'Al Massira', l: '3ème aéroport du pays' },
          { k: '24/7', l: 'Support FR/AR' },
          { k: '<7j', l: 'Mise en place' }
        ]} />
        <FaqSection
          badge="Gestion hôtelière Agadir"
          title="Questions fréquentes"
          items={[
          {
                    "q": "Quel logiciel de gestion hôtelière choisir à Agadir ?",
                    "a": "Le critère qui compte n'est pas la liste de fonctions, mais ce que le logiciel orchestre réellement : réservations, housekeeping, maintenance, communication client et revenu dans un même flux. Sojori inclut son propre PMS, et se connecte aussi aux PMS déjà en place — vous n'êtes pas obligé de remplacer l'existant pour orchestrer vos opérations."
          },
          {
                    "q": "Sojori remplace-t-il mon PMS actuel ?",
                    "a": "Non, sauf si vous le souhaitez. Sojori est un moteur d'orchestration : il se connecte à votre PMS existant (Mews et d'autres), récupère les réservations et les états de chambre, puis orchestre ce qui se passe autour — accueil, ménage, maintenance, messages clients, tarification. Pour un établissement sans PMS, celui de Sojori suffit."
          },
          {
                    "q": "Comment organiser le housekeeping et la maintenance à Agadir ?",
                    "a": "Les tâches se déclenchent sur les événements réels : départ constaté, arrivée anticipée, chambre signalée en panne. Chaque intervenant reçoit sa mission sur WhatsApp, en français ou en arabe, sans application à installer. Vous voyez l'état de chaque chambre en temps réel plutôt que de le reconstituer en fin de journée."
          },
          {
                    "q": "Comment gérer Booking.com, Expedia, Airbnb et les réservations directes ?",
                    "a": "Le channel manager synchronise disponibilités et tarifs dans les deux sens avec Booking, Expedia, Airbnb et les autres canaux. Les réservations directes entrent dans le même flux. Vous évitez la surréservation, et surtout vous cessez de gérer chaque canal séparément."
          },
          {
                    "q": "Quels indicateurs suivre pour un établissement à Agadir ?",
                    "a": "Taux d'occupation, prix moyen, revenu par chambre disponible, et surtout la part du direct dans votre mix. Agadir repose sur un tourisme de séjour long, avec une saison étalée : piloter ces indicateurs par canal, et non globalement, change les décisions de tarification."
          },
          {
                    "q": "Sojori convient-il pour hôtels balnéaires, clubs et résidences de tourisme ?",
                    "a": "Oui. L'orchestration ne dépend pas du type d'établissement mais des flux à coordonner — arrivées, ménage, demandes clients, revenu. Les règles se paramètrent par établissement, pas selon un modèle imposé."
          }
]}
        />

        {/* Maillage interne — ajouté le 2026-09-11. Ces pages vivaient sans
            liens entre elles : le PageRank n'y circulait pas. */}
        <section style={{ padding: '32px 32px 56px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>● Sur le même sujet</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>PMS hôtel Agadir</Link>
              {' · '}
              <Link href={'/conciergerie-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Conciergerie Agadir</Link>
              <br />
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



        <FinalCTA
          title={<>Rejoignez les établissements d&apos;Agadir. <span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Onboarding guidé en français. Migration depuis Hostfully, Smoobu, Lodgify offerte. Support dédié Maroc."
        />

        <PageFooter />
      </div>
    </>
  );
}
