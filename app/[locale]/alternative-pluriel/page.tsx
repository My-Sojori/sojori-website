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
    title: t('altPluriel.title'),
    description: t('altPluriel.description'),
    alternates: { canonical: `/${locale}/alternative-pluriel` },
  };
}

/**
 * Page comparative Pluriel.
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
    "q": "Faut-il remplacer Pluriel pour utiliser Sojori ?",
    "a": "Pas forcément. Sojori se connecte aux PMS existants ; selon les possibilités d'interfaçage de votre installation, l'orchestration peut s'ajouter sans toucher à votre système de réservation. C'est à examiner au cas par cas — parlons-en avant d'envisager une migration."
  },
  {
    "q": "Qu'advient-il de l'historique de réservations ?",
    "a": "La reprise des données est prise en charge lors de la mise en route. C'est généralement l'étape la plus longue du déploiement, et celle qu'il faut cadrer en premier."
  },
  {
    "q": "Le cloud est-il fiable quand la connexion est instable ?",
    "a": "C'est la bonne question à poser, et elle mérite une réponse honnête : une coupure prolongée affecte l'accès. C'est l'argument historique du logiciel installé. En pratique, l'orchestration passe largement par WhatsApp sur les téléphones des équipes, qui fonctionnent en données mobiles indépendamment du wifi de l'établissement."
  },
  {
    "q": "Pluriel fait de la comptabilité et de la paie. Sojori aussi ?",
    "a": "Non. Sojori orchestre l'exploitation : réservations, ménage, maintenance, relation client, revenu. La comptabilité et la paie ne sont pas dans son périmètre, et les exports alimentent votre outil comptable. Si vous cherchez une suite administrative complète chez un seul éditeur, la suite Pluriel couvre un terrain que nous ne couvrons pas."
  },
  {
    "q": "Sojori parle-t-il arabe ?",
    "a": "Oui, et c'est central. Les missions envoyées aux équipes de terrain le sont en français ou en arabe, sur WhatsApp, sans application à installer ni compte à créer."
  }
];

export default async function AltPluriel({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
          { name: "Sojori vs Pluriel", path: `/${locale}/alternative-pluriel` },
        ]}
        serviceName={"Alternative à Pluriel — orchestration hôtelière"}
        serviceDescription={"Pluriel vs Sojori : logiciel installé sur site et 30 ans d'ancrage marocain, contre moteur d'orchestration cloud. Comparatif factuel des deux approches pour hôtels et riads au Maroc."}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Sojori vs Pluriel" />

        <PageHero
          badge="🏛️ Comparatif · Sojori vs Pluriel"
          title={<>Alternative à Pluriel{' '}<br /><span className="gradient-text">quand l&apos;installé montre ses limites</span></>}
          subtitle="Pluriel est l&apos;acteur historique du logiciel hôtelier marocain : 30 ans, 200 références, une hotline locale. La question n&apos;est pas sa légitimité, mais si une architecture installée sur site correspond encore à la façon dont vos équipes travaillent."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Pluriel est un éditeur marocain fondé en 1989, revendiquant 200 références et 30 ans d&apos;expertise, avec une suite couvrant l&apos;hôtel, la restauration, les stocks, la comptabilité et la paie, un support téléphonique 24/7 et une forte compétence d&apos;intégration matérielle — réseaux, wifi, centraux téléphoniques, serrures électroniques, pointeuses. Sojori répond à un autre problème : l&apos;orchestration des opérations quotidiennes, en cloud, avec les équipes de terrain dans le système via WhatsApp. La différence tient à l&apos;architecture. Une solution installée sur site vit dans l&apos;établissement, ce qui suppose un serveur, des sauvegardes, un antivirus et une maintenance ; une solution cloud s&apos;ouvre depuis un navigateur, y compris depuis chez vous. Elle tient aussi au périmètre : la suite Pluriel est large et couvre la gestion administrative, là où Sojori se concentre sur la coordination du séjour et déclenche les tâches plutôt que d&apos;attendre qu&apos;on les saisisse.
            </p>
          </div>
        </section>

        {/* Reconnaître les forces du concurrent n'est pas une concession :
            une page qui ne dit que du mal n'est pas crue, et Google
            déclasse les comparatifs déséquilibrés. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Ce que Pluriel fait bien, et qu&apos;il ne faut pas sous-estimer</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Trente ans sur un marché, 200 établissements équipés et treize personnes à la hotline, cela ne s&apos;improvise pas. Pluriel connaît les usages marocains, les habitudes comptables et les contraintes des établissements locaux, et son support répond en darija comme en français.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>Sa compétence d&apos;intégration matérielle est réelle et rarement égalée : centraux téléphoniques, serrures électroniques, pointeuses, réseau et wifi. Si votre projet comporte une part d&apos;infrastructure importante, c&apos;est un terrain où Sojori ne joue pas — nous sommes un logiciel, pas un intégrateur.</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Où l&apos;architecture installée coûte cher aujourd&apos;hui</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le logiciel est dans l&apos;établissement, pas avec vous</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Une solution installée suppose un serveur sur place, des sauvegardes à surveiller, un antivirus à jour et un pare-feu à maintenir. C&apos;est autant de charge technique qui pèse sur l&apos;exploitation. Une solution cloud s&apos;ouvre depuis un navigateur, sur un téléphone, depuis chez vous un dimanche soir.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Les équipes de terrain restent hors du système</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un logiciel de réception est utilisé par la réception. La femme de chambre, l&apos;agent de maintenance, le gardien continuent d&apos;être coordonnés à l&apos;oral ou sur un groupe WhatsApp personnel — et ce qui s&apos;y dit ne laisse aucune trace exploitable. Sojori envoie la mission sur WhatsApp, en arabe si besoin, et l&apos;état de chaque chambre remonte en temps réel.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Rien ne se déclenche tout seul</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un PMS classique attend qu&apos;on saisisse. L&apos;orchestration inverse la logique : le départ constaté déclenche le ménage, la chambre signalée ouvre un ticket, le séjour qui approche envoie ses messages. La différence se mesure sur les jours de forte rotation, quand personne n&apos;a le temps de coordonner.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Le rythme des évolutions</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Un produit cloud se met à jour pour tous en continu ; une solution installée évolue au rythme des interventions sur site. Ce n&apos;est pas un défaut d&apos;éditeur, c&apos;est une conséquence de l&apos;architecture — mais elle se paie sur la vitesse à laquelle vous récupérez une nouveauté.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Lequel choisir ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Pluriel</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Votre projet comporte une part d&apos;infrastructure lourde (réseau, serrures, centraux téléphoniques), vous voulez un interlocuteur unique du câble au logiciel, et la gestion administrative complète — comptabilité, paie, stocks — compte davantage que la coordination du séjour.</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Choisissez Sojori</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>Votre problème est opérationnel : chambres pas prêtes à temps, ménage coordonné au téléphone, demandes clients perdues, aucune visibilité à distance. Et vous voulez que vos équipes de terrain entrent dans le système sans installer d&apos;application.</p>
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

        <FaqSection badge="Sojori vs Pluriel" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Comparatif établi le 11 septembre 2026 à partir des informations publiques
              publiées par l&apos;éditeur et d&apos;avis d&apos;utilisateurs accessibles en ligne.
              Les produits évoluent : vérifiez les périmètres auprès de chaque éditeur avant
              de décider, et demandez la même démonstration aux deux sur un scénario réel de
              votre établissement. Pluriel est une marque de son propriétaire respectif, citée
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
