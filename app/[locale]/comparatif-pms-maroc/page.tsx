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
    title: t('comparatifPmsMaroc.title'),
    description: t('comparatifPmsMaroc.description'),
    alternates: { canonical: `/${locale}/comparatif-pms-maroc` },
  };
}

/**
 * Page pilier des comparatifs.
 *
 * 2026-09-11 — Cible la requête « meilleur PMS hôtel Maroc » et distribue
 * vers les 4 comparatifs détaillés. Le tableau décrit des PROFILS
 * (architecture, périmètre, cible) et non des cases fonctionnelles
 * oui/non : une matrice de fonctionnalités sur des produits concurrents
 * serait invérifiable et périmée en quelques mois.
 */
const PLAYERS = [
  {
    name: 'Sojori',
    profil: "Moteur d'orchestration incluant un PMS",
    archi: 'Cloud',
    fort: "Déclenche les opérations (ménage, maintenance, messages) sur les événements réels. Se connecte aussi aux PMS existants.",
    pour: "Exploitations avec des équipes à coordonner, plusieurs sites, ou un PMS déjà en place.",
    slug: null,
    highlight: true,
  },
  {
    name: 'Cloudbeds',
    profil: 'Plateforme internationale tout-en-un',
    archi: 'Cloud',
    fort: "Couverture mondiale, écosystème d'intégrations très large, marque établie.",
    pour: "Groupes multi-pays ayant besoin d'une plateforme globale unique.",
    slug: '/alternative-cloudbeds' as const,
    highlight: false,
  },
  {
    name: 'Pluriel',
    profil: 'Suite de gestion marocaine historique',
    archi: 'Installé sur site',
    fort: "30 ans de marché, 200 références, hotline locale, intégration matérielle (serrures, centraux, réseau).",
    pour: "Projets avec une part d'infrastructure importante et un besoin de suite administrative complète.",
    slug: '/alternative-pluriel' as const,
    highlight: false,
  },
  {
    name: 'Nozoul',
    profil: 'PMS cloud et channel manager marocain',
    archi: 'Cloud',
    fort: "Simplicité assumée, interface FR/AR, conformité marocaine native, référencement Go Siyaha affiché.",
    pour: "Riads et petits hôtels de 5 à 20 chambres partant d'Excel ou du papier.",
    slug: '/alternative-nozoul' as const,
    highlight: false,
  },
  {
    name: 'Welcomax',
    profil: 'Suite PMS hôtel + location',
    archi: 'Cloud',
    fort: "Produits distincts hôtel et location, fiscalité DGI et rapport de police, multidevise.",
    pour: "Établissements cherchant une suite PMS classique bien adaptée au marché marocain.",
    slug: '/alternative-welcomax' as const,
    highlight: false,
  },
];

const FAQ = [
  {
    q: "Quel est le meilleur PMS pour un hôtel au Maroc ?",
    a: "La question est mal posée, et c'est ce qui fait perdre du temps. Il n'existe pas de meilleur PMS dans l'absolu : il existe un produit adapté à votre taille, à votre organisation et à votre problème réel. Un riad de six chambres tenu par deux personnes et un groupe de quatre établissements avec trente employés n'ont pas le même besoin. Commencez par identifier ce qui vous coûte le plus cher aujourd'hui — la saisie des réservations, la coordination des équipes, ou la distribution sur les OTA — puis comparez sur ce point.",
  },
  {
    q: "Quelle différence entre un PMS et un moteur d'orchestration ?",
    a: "Un PMS enregistre et centralise : réservations, chambres, factures, canaux. Un moteur d'orchestration déclenche ce qui en découle : le départ constaté génère la mission de ménage, la chambre signalée ouvre un ticket de maintenance, le séjour qui approche envoie ses messages au client. Sur un établissement calme, la différence se voit peu. Sur une journée à vingt départs, elle décide si les chambres sont prêtes à temps.",
  },
  {
    q: "Faut-il un logiciel marocain ou international ?",
    a: "Un éditeur local traite nativement la fiche de police, la taxe de séjour, le dirham et l'arabe, là où une plateforme internationale les gère comme des variantes locales. En contrepartie, les plateformes internationales offrent souvent des écosystèmes d'intégrations plus larges. Si votre exploitation est entièrement marocaine, l'ancrage local pèse lourd. Si vous opérez dans plusieurs pays, l'arbitrage s'inverse.",
  },
  {
    q: "Cloud ou installé sur site ?",
    a: "Le cloud s'ouvre depuis un navigateur, se met à jour pour tous et ne demande ni serveur ni sauvegardes à surveiller. L'installé sur site reste accessible en cas de coupure internet et permet une intégration matérielle profonde — serrures, centraux téléphoniques, pointeuses. Aujourd'hui la majorité des nouveaux déploiements se font en cloud, mais un projet comportant une part d'infrastructure lourde peut justifier l'autre choix.",
  },
  {
    q: "Le programme Go Siyaha finance-t-il ces logiciels ?",
    a: "Le volet transformation digitale du programme couvre les outils numériques, et certains éditeurs affichent un référencement au titre du programme. Les taux, plafonds et conditions relèvent de Maroc PME, seule habilitée à instruire les dossiers. Vérifiez auprès d'eux, et méfiez-vous d'un éditeur qui vous garantit une subvention : cette décision ne lui appartient pas.",
  },
  {
    q: "Comment comparer sérieusement deux solutions ?",
    a: "Demandez la même démonstration à chaque éditeur, sur un scénario réel de votre établissement : un départ à 11 h, une arrivée anticipée à 13 h, une chambre signalée en panne, un client qui écrit en arabe, un paiement partiel puis une facture. En quinze minutes vous verrez ce que chaque outil fait réellement, plutôt que ce que la plaquette annonce.",
  },
];

export default async function ComparatifPmsMarocPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
        ]}
        serviceName="Comparatif des logiciels de gestion hôtelière au Maroc"
        serviceDescription="Comparatif des PMS et solutions d'orchestration disponibles pour les hôtels, riads et résidences au Maroc."
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Comparatif PMS Maroc" />

        <PageHero
          badge="🇲🇦 Comparatif · PMS et orchestration au Maroc"
          title={<>Quel logiciel pour votre établissement ?{' '}<br /><span className="gradient-text">Comparatif sans complaisance.</span></>}
          subtitle="Cinq solutions présentes sur le marché marocain, leurs vrais points forts, et le cas où chacune est le bon choix — y compris quand ce n'est pas Sojori."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Il n&apos;existe pas de meilleur logiciel hôtelier dans l&apos;absolu, et tout
              comparatif qui prétend le contraire vend quelque chose. Le marché marocain
              se répartit en trois familles. Les plateformes internationales comme
              Cloudbeds offrent une couverture mondiale et un large écosystème. Les
              éditeurs marocains — Pluriel, Nozoul, Welcomax — traitent nativement la
              fiche de police, la taxe de séjour, le dirham et l&apos;arabe, avec un support
              local. Enfin, les moteurs d&apos;orchestration comme Sojori se placent à un
              autre niveau : ils incluent un PMS mais leur objet est de déclencher ce qui
              suit la réservation — ménage, maintenance, messages clients, tarification —
              et ils se connectent aux PMS existants plutôt que d&apos;exiger un
              remplacement. Le bon critère n&apos;est pas la longueur de la liste de
              fonctions, mais ce qui vous coûte le plus cher aujourd&apos;hui.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Cinq solutions, cinq profils
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 24, maxWidth: 760 }}>
              Ce tableau décrit des positionnements, pas des cases à cocher. Une matrice
              de fonctionnalités sur des produits concurrents serait invérifiable et
              périmée en quelques mois — demandez les détails à chaque éditeur.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860, fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Solution</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Profil</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Architecture</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Point fort</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Le bon choix pour</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAYERS.map(p => (
                    <tr key={p.name} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '14px', fontWeight: 600, color: p.highlight ? '#f4cf5e' : 'var(--text)' }}>
                        {p.slug ? (
                          <Link href={p.slug} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</Link>
                        ) : p.name}
                      </td>
                      <td style={{ padding: '14px', color: 'var(--text-2)' }}>{p.profil}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)' }}>{p.archi}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)', lineHeight: 1.6 }}>{p.fort}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)', lineHeight: 1.6 }}>{p.pour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              La question à se poser avant de comparer
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              La plupart des hôteliers comparent des listes de fonctionnalités. C&apos;est le
              plus sûr moyen de choisir un outil trop large, trop cher, et finalement peu
              utilisé. La question utile est ailleurs : qu&apos;est-ce qui vous coûte le plus
              cher aujourd&apos;hui ?
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              Si c&apos;est la saisie des réservations et l&apos;absence de visibilité sur les
              OTA, un bon PMS avec channel manager résout votre problème, et vous n&apos;avez
              pas besoin d&apos;autre chose. Si c&apos;est la coordination — des chambres pas
              prêtes à l&apos;arrivée, un ménage organisé au téléphone, une maintenance qui
              traîne, des messages clients perdus dans un groupe WhatsApp personnel — alors
              aucun PMS ne le réglera, parce que ce n&apos;est pas son métier. C&apos;est à ce
              moment précis que l&apos;orchestration devient pertinente.
            </p>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Le test en quinze minutes</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>
                Demandez la même démonstration à chaque éditeur, sur un scénario réel :
                un départ à 11 h, une arrivée anticipée à 13 h, une chambre signalée en
                panne, un client qui écrit en arabe, un paiement partiel puis une facture.
                Vous verrez immédiatement lequel enregistre l&apos;information et lequel
                conduit l&apos;opération.
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Comparatifs détaillés</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { t: 'vs Cloudbeds', d: 'Plateforme internationale contre ancrage marocain.', link: '/alternative-cloudbeds' as const },
                { t: 'vs Pluriel', d: "Installé sur site contre cloud et orchestration.", link: '/alternative-pluriel' as const },
                { t: 'vs Nozoul', d: "PMS cloud contre moteur connectable à l'existant.", link: '/alternative-nozoul' as const },
                { t: 'vs Welcomax', d: 'Suite PMS contre conduite des opérations.', link: '/alternative-welcomax' as const },
              ].map(c => (
                <Link key={c.t} href={c.link} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              Aller plus loin :{' '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Go Siyaha, la subvention digitalisation</Link>
              {' · '}
              <Link href={'/pms' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Le PMS Sojori</Link>
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

        <FaqSection badge="Comparatif PMS Maroc" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Comparatif établi le 11 septembre 2026 à partir des informations publiques
              publiées par chaque éditeur et d&apos;avis d&apos;utilisateurs accessibles en ligne.
              Sojori est éditeur de l&apos;une des solutions citées : lisez cette page en le
              sachant, et vérifiez les périmètres auprès de chaque éditeur avant de
              décider. Les marques citées appartiennent à leurs propriétaires respectifs.
            </p>
          </div>
        </section>

        <FinalCTA
          title={<>Testez sur votre propre exploitation.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Sojori se connecte aussi à votre PMS existant — vous pouvez tester l'orchestration sans rien migrer."
        />

        <PageFooter />
      </div>
    </>
  );
}
