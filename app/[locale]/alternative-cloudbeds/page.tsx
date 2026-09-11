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
    title: t('altCloudbeds.title'),
    description: t('altCloudbeds.description'),
    alternates: { canonical: `/${locale}/alternative-cloudbeds` },
  };
}

/**
 * Page comparative Cloudbeds.
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
    "q": "Sojori remplace-t-il Cloudbeds ?",
    "a": "Pas nécessairement. Sojori inclut son propre PMS, mais il se connecte aussi aux PMS existants : vous pouvez garder Cloudbeds pour la réservation et ajouter la couche d'orchestration par-dessus. C'est une différence de fond avec les autres alternatives, qui exigent toutes un remplacement complet."
  },
  {
    "q": "Quelle est la vraie différence entre les deux ?",
    "a": "Le périmètre. Cloudbeds centralise l'information du séjour ; Sojori déclenche ce qui en découle. Dit autrement : Cloudbeds vous dit que la chambre 12 est libérée, Sojori envoie la mission de ménage à la bonne personne, la relance si elle n'est pas prise, et vous prévient si l'arrivée suivante risque d'attendre."
  },
  {
    "q": "Cloudbeds gère-t-il la fiche de police marocaine ?",
    "a": "Nous ne nous prononçons pas sur le périmètre exact d'un produit concurrent, qui évolue. Posez-leur directement la question, et demandez une démonstration sur votre propre cas : une fiche collectée avant l'arrivée, en arabe, avec la pièce d'identité. Vous verrez immédiatement ce que chaque outil sait faire."
  },
  {
    "q": "La migration est-elle compliquée ?",
    "a": "Elle est prise en charge. Et si vous préférez ne pas migrer, la connexion à votre PMS actuel reste possible — c'est souvent le chemin le plus court pour mesurer l'apport de l'orchestration avant de décider quoi que ce soit sur votre système de réservation."
  },
  {
    "q": "Combien de temps pour être opérationnel ?",
    "a": "Quelques jours pour un établissement seul. Ce qui prend du temps n'est jamais l'installation mais la reprise des historiques et le paramétrage des règles propres à votre exploitation — cadences de ménage, règles de tarification, circuits de validation."
  }
];

export default async function AltCloudbeds({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
          { name: "Sojori vs Cloudbeds", path: `/${locale}/alternative-cloudbeds` },
        ]}
        serviceName={"Alternative à Cloudbeds — orchestration hôtelière"}
        serviceDescription={"Cloudbeds vs Sojori pour un hôtel ou un riad au Maroc : plateforme internationale contre moteur d'orchestration ancré sur le terrain marocain. Comparatif honnête, sans promesse invérifiable."}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Sojori vs Cloudbeds" />

        <PageHero
          badge="🌍 Comparatif · Sojori vs Cloudbeds"
          title={<>Alternative à Cloudbeds{' '}<br /><span className="gradient-text">pour l&apos;hôtellerie marocaine</span></>}
          subtitle="Cloudbeds est une plateforme internationale solide. La question n&apos;est pas sa qualité, mais si une solution conçue pour 150 pays répond aux contraintes d&apos;un riad de la médina. Comparatif factuel."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Cloudbeds est une plateforme tout-en-un reconnue : PMS, channel manager, moteur de réservation et paiements dans un même abonnement, déployée dans plus de 150 pays. Sojori est un moteur d&apos;orchestration : il inclut un PMS, mais son objet est ce qui se passe après la réservation — ménage déclenché au départ constaté, maintenance, messages clients sur WhatsApp, tarification. Deux différences structurelles séparent les deux produits. D&apos;abord le périmètre : Cloudbeds centralise, Sojori déclenche. Ensuite l&apos;ancrage : la fiche de police marocaine, la taxe de séjour paramétrable et l&apos;arabe comme langue de travail des équipes de terrain sont natifs chez Sojori, là où une plateforme internationale les traite comme des cas particuliers. Si vous cherchez une plateforme globale pour un groupe multi-pays, Cloudbeds est un choix défendable. Si votre exploitation est marocaine et que votre problème est la coordination quotidienne, le raisonnement penche autrement.
            </p>
          </div>
        </section>

        {/* Reconnaître les forces du concurrent n'est pas une concession :
            une page qui ne dit que du mal n'est pas crue, et Google
            déclasse les comparatifs déséquilibrés. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Ce que Cloudbeds fait bien</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Cloudbeds a construit une plateforme large et mature : PMS, channel manager, moteur de réservation et paiements réunis dans un même abonnement, avec une couverture internationale que peu d&apos;éditeurs atteignent. Pour un groupe opérant dans plusieurs pays, avec des devises et des réglementations différentes, cette largeur est un vrai avantage.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>L&apos;écosystème d&apos;intégrations est étendu et la marque est établie. Ce n&apos;est pas un produit qu&apos;on remplace par principe : si votre exploitation en tire ce qu&apos;elle attend, la question ne se pose pas.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Où le raisonnement bascule pour un établissement marocain</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le périmètre s&apos;arrête à la réservation</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un PMS enregistre le séjour et synchronise les canaux. Ce qui suit — qui nettoie quelle chambre, quand, dans quel ordre ; quel équipement est en panne ; quel client attend une réponse — reste coordonné à la main, par téléphone ou sur un groupe WhatsApp personnel. C&apos;est précisément le travail que Sojori automatise en déclenchant les tâches sur les événements réels du séjour.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>La conformité marocaine n&apos;est pas le cœur du produit</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Fiche de police, taxe de séjour au séjour ou par personne et par nuit, facturation en dirhams : une plateforme conçue pour 150 pays traite ces règles comme des variantes locales. Chez Sojori elles sont natives, parce que le Maroc est le marché de départ et non une extension.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>L&apos;arabe n&apos;est pas une langue de travail</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Vos réceptionnistes parlent français. Vos femmes de chambre et vos agents de maintenance, souvent l&apos;arabe. Un outil que seule la réception peut utiliser laisse le terrain hors du système — et c&apos;est le terrain qui exécute. Sojori envoie les missions sur WhatsApp en arabe, sans application à installer.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le support et la tarification</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Les avis publiés sur G2 et Hotel Tech Report font état de délais de réponse jugés longs et d&apos;une grille tarifaire peu lisible, sans prix public ni essai gratuit. Ce sont des retours d&apos;utilisateurs, pas notre constat : vérifiez-les vous-même et demandez un devis écrit avant de vous engager.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Lequel choisir ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Cloudbeds</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Vous opérez dans plusieurs pays, avec des devises et des réglementations différentes, et vous avez besoin d&apos;une plateforme globale unique. Cloudbeds est alors le choix cohérent.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Sojori</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Votre exploitation est au Maroc, votre problème quotidien est la coordination des équipes plutôt que la saisie des réservations, et vous voulez que le terrain entre dans le système — pas seulement la réception.</p>
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
              <Link href={'/alternative-pluriel' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Pluriel</Link>
              {' · '}
              <Link href={'/alternative-nozoul' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Nozoul</Link>
              {' · '}
              <Link href={'/alternative-welcomax' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>vs Welcomax</Link>
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

        <FaqSection badge="Sojori vs Cloudbeds" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Comparatif établi le 11 septembre 2026 à partir des informations publiques
              publiées par l&apos;éditeur et d&apos;avis d&apos;utilisateurs accessibles en ligne.
              Les produits évoluent : vérifiez les périmètres auprès de chaque éditeur avant
              de décider, et demandez la même démonstration aux deux sur un scénario réel de
              votre établissement. Cloudbeds est une marque de son propriétaire respectif, citée
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
