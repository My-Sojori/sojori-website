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
    title: t('altNozoul.title'),
    description: t('altNozoul.description'),
    alternates: { canonical: `/${locale}/alternative-nozoul` },
  };
}

/**
 * Page comparative Nozoul.
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
    "q": "Sojori est-il référencé Go Siyaha ?",
    "a": "Nous ne revendiquons aucun agrément que nous ne pouvons documenter, et à ce jour nous ne l'affichons pas. Nozoul, lui, affiche un référencement au programme : c'est un avantage réel pour un hôtelier qui monte un dossier, et nous préférons vous le dire. Si le financement est votre critère décisif, posez la question à Maroc PME avant de choisir."
  },
  {
    "q": "Quelle est la différence concrète avec un PMS classique ?",
    "a": "Un PMS attend qu'on saisisse ; un orchestrateur déclenche. Le départ constaté génère la mission de ménage, la chambre signalée ouvre un ticket, le séjour qui approche envoie ses messages. Sur un établissement calme la différence est faible. Sur une journée à vingt départs, elle est visible."
  },
  {
    "q": "Puis-je garder mon PMS actuel ?",
    "a": "Oui, c'est même souvent le chemin le plus court. Sojori se connecte aux PMS existants, dont Mews, récupère réservations et états de chambre, et orchestre autour. Vous mesurez l'apport sans risquer votre système de réservation."
  },
  {
    "q": "Sojori gère-t-il la fiche de police et la taxe de séjour ?",
    "a": "Oui. La fiche est collectée avant l'arrivée : le client la remplit depuis WhatsApp avec sa pièce d'identité. La taxe de séjour se paramètre par établissement, au séjour, à la nuit ou par personne et par nuit. La déclaration aux autorités reste votre démarche."
  },
  {
    "q": "Et si mon établissement est petit ?",
    "a": "Alors comparez honnêtement, et regardez d'abord le prix et la simplicité. L'orchestration prend toute sa valeur quand il y a des équipes à coordonner. Sur un riad de six chambres tenu par deux personnes, un bon PMS peut suffire — nous préférons vous le dire que vous vendre un outil surdimensionné."
  }
];

export default async function AltNozoul({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
          { name: "Sojori vs Nozoul", path: `/${locale}/alternative-nozoul` },
        ]}
        serviceName={"Alternative à Nozoul — orchestration hôtelière"}
        serviceDescription={"Nozoul vs Sojori : deux PMS cloud marocains, deux périmètres différents. PMS et channel manager d'un côté, moteur d'orchestration connectable aux PMS existants de l'autre. Comparatif factuel."}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Sojori vs Nozoul" />

        <PageHero
          badge="☁️ Comparatif · Sojori vs Nozoul"
          title={<>Alternative à Nozoul{' '}<br /><span className="gradient-text">quand le PMS ne suffit plus</span></>}
          subtitle="Nozoul et Sojori sont deux solutions cloud marocaines qui partagent beaucoup : fiche de police, taxe de séjour, interface française et arabe. La différence tient au périmètre — et elle devient décisive quand l&apos;exploitation se complique."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Nozoul est un PMS cloud et channel manager marocain, revendiquant plus de 50 établissements, une connexion à plus de 200 OTA, une interface française et arabe, un export DGSN, la taxe de séjour et un suivi du ménage depuis le téléphone, avec un référencement Go Siyaha affiché. Sojori partage cet ancrage marocain mais répond à une question différente : Nozoul est un PMS, Sojori est un moteur d&apos;orchestration qui inclut un PMS. La conséquence pratique tient en deux points. D&apos;abord, Sojori se connecte aux PMS existants, dont Mews : vous pouvez orchestrer sans remplacer votre système de réservation, ce qu&apos;un PMS ne permet pas par construction. Ensuite, le périmètre orchestré va au-delà du statut des chambres : maintenance suivie par équipement, demandes clients transformées en tâches assignées, tarification pilotée par règles, coordination multi-établissements. Pour un riad de huit chambres qui veut sortir d&apos;Excel, Nozoul est une réponse pertinente. Pour une exploitation qui gère plusieurs sites, des équipes nombreuses ou un PMS déjà en place, le raisonnement change.
            </p>
          </div>
        </section>

        {/* Reconnaître les forces du concurrent n'est pas une concession :
            une page qui ne dit que du mal n'est pas crue, et Google
            déclasse les comparatifs déséquilibrés. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Ce que Nozoul fait bien</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Nozoul a bien lu son marché : un riad de huit chambres n&apos;a pas besoin d&apos;un logiciel d&apos;hôtel de chaîne, il a besoin de sortir d&apos;Excel sans y passer trois semaines. La promesse d&apos;une prise en main en deux heures et l&apos;interface bilingue répondent à un vrai besoin, et la conformité marocaine est traitée nativement.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Le positionnement Go Siyaha est également bien joué : l&apos;éditeur affiche un référencement au programme, ce qui simplifie la démarche pour un hôtelier qui monte un dossier. C&apos;est un avantage commercial concret, et nous préférons le dire que le taire.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Où un PMS atteint sa limite</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Un PMS exige un remplacement, un orchestrateur non</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>C&apos;est la différence structurelle. Si vous avez déjà un PMS qui vous convient, adopter un autre PMS signifie tout migrer. Sojori se connecte à l&apos;existant : vous ajoutez l&apos;orchestration et vous gardez votre système de réservation. Le choix n&apos;est plus binaire.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le statut des chambres n&apos;est pas l&apos;orchestration</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Marquer une chambre « prête » depuis un téléphone est utile. Déclencher automatiquement la mission au départ constaté, la réassigner si elle n&apos;est pas prise, ouvrir un ticket de maintenance rattaché à l&apos;équipement et prévenir la réception que l&apos;arrivée de 15 h risque d&apos;attendre : c&apos;est un autre métier. L&apos;un affiche un état, l&apos;autre conduit une opération.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le multi-établissement change les règles</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un PMS conçu pour un établissement gère mal plusieurs sites avec des équipes partagées, des règles différentes et une vue consolidée. C&apos;est le moment où la coordination redevient manuelle, malgré le logiciel.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>La relation client reste à part</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un channel manager distribue, un PMS enregistre. La conversation avec le client — avant, pendant et après le séjour, sur WhatsApp, dans sa langue — est un flux à part entière, qui alimente les tâches et la satisfaction. Chez Sojori elle est au centre, pas à côté.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Lequel choisir ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Nozoul</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Vous avez un établissement, entre cinq et vingt chambres, vous partez d&apos;Excel ou du papier, et votre besoin immédiat est de centraliser les réservations et d&apos;être visible sur les OTA. C&apos;est exactement le terrain de Nozoul.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Sojori</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Vous gérez plusieurs établissements, des équipes nombreuses, ou vous avez déjà un PMS que vous ne voulez pas remplacer. Votre problème n&apos;est plus de saisir les réservations mais de coordonner ce qui en découle.</p>
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
              <Link href={'/alternative-welcomax' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Welcomax</Link>
              <br />
              <br />
              Comprendre :{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>Qu&apos;est-ce que l&apos;orchestration hôtelière ?</Link>
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

        <FaqSection badge="Sojori vs Nozoul" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Comparatif établi le 11 septembre 2026 à partir des informations publiques
              publiées par l&apos;éditeur et d&apos;avis d&apos;utilisateurs accessibles en ligne.
              Les produits évoluent : vérifiez les périmètres auprès de chaque éditeur avant
              de décider, et demandez la même démonstration aux deux sur un scénario réel de
              votre établissement. Nozoul est une marque de son propriétaire respectif, citée
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
