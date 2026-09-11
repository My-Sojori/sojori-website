import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqSection } from '@/components/FaqSection';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('altWelcomax.title'),
    description: t('altWelcomax.description'),
    alternates: { canonical: `/${locale}/alternative-welcomax` },
  };
}

/**
 * Page comparative Welcomax.
 *
 * 2026-09-11 — Règle de rédaction appliquée à toutes les pages comparatives :
 * l'offensive porte sur des différences STRUCTURELLES vérifiables
 * (architecture, périmètre, ancrage marché), jamais sur l'absence d'une
 * fonctionnalité chez le concurrent — un éditeur peut la livrer le mois
 * suivant et la page devient fausse, donc attaquable et décrédibilisante.
 * Les faiblesses issues d'avis clients sont attribuées à leur source
 * (G2, Hotel Tech Report), jamais affirmées en notre nom.
 * Chaque page dit explicitement dans quel cas le concurrent est le bon choix.
 * Relevé effectué le 2026-09-11 sur le site de l'éditeur.
 */
const FAQ = [
  {
    "q": "Sojori remplace-t-il Welcomax ?",
    "a": "Il peut, puisqu'il inclut un PMS. Mais il peut aussi s'y ajouter si l'interfaçage le permet : Sojori se connecte aux PMS existants, récupère les réservations et les états de chambre et orchestre autour. C'est souvent le chemin le plus court pour mesurer l'apport avant toute décision de migration."
  },
  {
    "q": "Quelle est la différence de fond ?",
    "a": "Le périmètre. Une suite PMS centralise l'information ; un orchestrateur déclenche les actions qui en découlent. Savoir que la chambre est libérée, ou faire en sorte qu'elle soit prête avant l'arrivée suivante : ce ne sont pas les mêmes produits."
  },
  {
    "q": "Les deux gèrent la conformité marocaine, où est l'écart ?",
    "a": "Sur le moment où les données sont collectées. Chez Sojori, la fiche de police est remplie par le client avant son arrivée, depuis WhatsApp, avec sa pièce d'identité — la réception ne saisit rien. L'écart n'est pas dans le document produit, il est dans le travail évité."
  },
  {
    "q": "Et la tarification ?",
    "a": "Sojori pilote la tarification par règles, en gardant le calcul algorithmique et en signalant les recommandations plutôt qu'en les appliquant aveuglément, avec des bornes minimum et maximum. C'est un choix assumé : nous ne laissons pas un modèle fixer seul vos prix."
  },
  {
    "q": "Comment comparer sérieusement les deux ?",
    "a": "Demandez la même démonstration aux deux éditeurs, sur un scénario réel de votre établissement : un départ à 11 h, une arrivée anticipée à 13 h, une chambre signalée en panne, un client qui écrit en arabe. Vous verrez en quinze minutes ce que chaque outil fait réellement."
  }
];

export default async function AltWelcomax({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
          { name: "Sojori vs Welcomax", path: `/${locale}/alternative-welcomax` },
        ]}
        serviceName={"Alternative à Welcomax — orchestration hôtelière"}
        serviceDescription={"Welcomax vs Sojori : suite PMS et channel manager pour le Maroc contre moteur d'orchestration de l'hospitalité. Comparatif des périmètres, pour hôtels, riads et résidences."}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Sojori vs Welcomax" />

        <PageHero
          badge="🧭 Comparatif · Sojori vs Welcomax"
          title={<>Alternative à Welcomax{' '}<br /><span className="gradient-text">de la centralisation à l&apos;orchestration</span></>}
          subtitle="Welcomax propose une suite Hotel PMS, Rental PMS et Channel Manager pensée pour le marché marocain. Sojori répond à la question d&apos;après : une fois les réservations centralisées, qui coordonne ce qui suit ?"
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Welcomax est une suite marocaine articulée autour de trois produits — Hotel PMS, Rental PMS et Channel Manager — destinée aux hôtels, riads, maisons d&apos;hôtes, villas et appartements, avec une interface multilingue et multidevise, la fiscalité DGI et le rapport de police mis en avant, et un support local. Sojori partage ce terrain mais se place à un autre niveau : il inclut un PMS et se connecte aux PMS existants, et son objet est l&apos;orchestration — ménage et maintenance déclenchés sur les événements réels du séjour, communication client sur WhatsApp, tarification, coordination des équipes de terrain. La distinction se résume ainsi : centraliser l&apos;information et conduire l&apos;opération sont deux métiers. Une suite PMS vous donne une vue juste de ce qui se passe ; un orchestrateur fait en sorte que ce qui doit arriver arrive, sans qu&apos;un responsable le rappelle à chacun.
            </p>
          </div>
        </section>

        {/* Reconnaître les forces du concurrent n'est pas une concession :
            une page qui ne dit que du mal n'est pas crue, et Google
            déclasse les comparatifs déséquilibrés. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Ce que Welcomax fait bien</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Welcomax couvre un spectre large avec un produit distinct pour l&apos;hôtel et un pour la location, ce qui est cohérent : les deux métiers n&apos;ont ni le même cycle ni la même facturation. Le marché marocain est traité sérieusement — fiscalité DGI, rapport de police, multidevise — et la documentation produit est de bonne qualité.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Sur le référencement, c&apos;est aujourd&apos;hui l&apos;acteur le mieux positionné sur les requêtes « PMS + ville » au Maroc, avec des pages structurées et des données enrichies. C&apos;est un concurrent sérieux, et le dire n&apos;enlève rien à notre proposition.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Où s&apos;arrête une suite PMS</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>La vue juste ne fait pas l&apos;opération</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un tableau de bord qui affiche 85 % d&apos;occupation, le RevPAR et huit impayés est utile pour décider. Il ne dit pas qui nettoie la chambre 12, si la mission a été prise, ni que l&apos;arrivée de 15 h va attendre. L&apos;orchestration comble cet écart entre savoir et faire.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Les équipes de terrain restent en dehors</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Réception et direction utilisent le logiciel. Le ménage, la maintenance et le gardiennage sont coordonnés ailleurs — téléphone, groupe WhatsApp personnel, cahier. Sojori les fait entrer dans le système par WhatsApp, en français ou en arabe, sans application à installer.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Adopter une suite implique de tout reprendre</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Une suite PMS s&apos;adopte en bloc : c&apos;est sa logique. Sojori se connecte aux PMS existants, ce qui autorise une autre trajectoire — ajouter l&apos;orchestration d&apos;abord, décider ensuite du système de réservation.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>La conversation client n&apos;est pas un module</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Avant, pendant et après le séjour, le client écrit. Ces messages déclenchent des tâches, révèlent des incidents et déterminent les avis. Traiter ce flux comme un canal parmi d&apos;autres, ou comme le cœur du système, ne produit pas le même résultat.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Lequel choisir ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Welcomax</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Vous cherchez une suite PMS classique bien adaptée au Maroc, avec des produits distincts pour l&apos;hôtel et la location, et votre besoin s&apos;arrête à la centralisation des réservations, à la distribution et à la facturation.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Sojori</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Votre difficulté est la coordination : chambres pas prêtes, ménage géré au téléphone, maintenance qui traîne, messages clients perdus. Ou vous avez déjà un PMS et vous ne voulez pas en changer.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>● Poursuivre</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>Comparatif des PMS au Maroc</Link>
              {' · '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Go Siyaha</Link>
              {' · '}
              <Link href={'/pms' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Le PMS Sojori</Link>
              <br />
              Autres comparatifs :{' '}
              <Link href={'/alternative-cloudbeds' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Cloudbeds</Link>
              {' · '}
              <Link href={'/alternative-pluriel' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Pluriel</Link>
              {' · '}
              <Link href={'/alternative-nozoul' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Nozoul</Link>
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

        <FaqSection badge="Sojori vs Welcomax" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Comparatif établi le 11 septembre 2026 à partir des informations publiques
              publiées par l&apos;éditeur et d&apos;avis d&apos;utilisateurs accessibles en ligne.
              Les produits évoluent : vérifiez les périmètres auprès de chaque éditeur avant
              de décider, et demandez la même démonstration aux deux sur un scénario réel de
              votre établissement. Welcomax est une marque de son propriétaire respectif, citée
              à des fins de comparaison.
            </p>
          </div>
        </section>

        <FinalCTA
          title={<>Comparez sur votre propre exploitation.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Sojori se connecte aussi à votre PMS existant — vous pouvez tester l'orchestration sans rien migrer."
        />

        <PageFooter />
      </div>
    </>
  );
}
