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
    title: t('goSiyaha.title'),
    description: t('goSiyaha.description'),
    alternates: { canonical: `/${locale}/go-siyaha` },
  };
}

/**
 * Page Go Siyaha.
 *
 * 2026-09-11 — Précaution rédactionnelle importante : cette page explique le
 * programme et oriente vers Maroc PME. Elle n'affirme NULLE PART que Sojori
 * est agréé, référencé ou pré-éligible, parce que la vérification n'a pas pu
 * aboutir : marocpme.gov.ma présente un certificat TLS invalide, et aucune
 * source consultée ne dit si Maroc PME impose un prestataire référencé.
 * Promettre une subvention à un hôtelier sans cette certitude serait
 * trompeur. Les chiffres viennent de sources secondaires concordantes et sont
 * attribués comme tels dans le texte.
 */
const FAQ = [
  {
    q: "Qu'est-ce que le programme Go Siyaha ?",
    a: "Go Siyaha est un programme public marocain porté par le ministère du Tourisme et déployé par l'agence Maroc PME. Il vise à moderniser et digitaliser le tissu touristique — hébergement, restauration, agences de voyage et de transport touristique. Il s'articule autour de trois axes : l'appui à l'investissement, la croissance verte, et la transformation digitale avec assistance technique.",
  },
  {
    q: "Quel est le taux de subvention pour la digitalisation ?",
    a: "Les sources professionnelles du secteur rapportent une prise en charge pouvant atteindre 90 % des dépenses d'expertise, de conseil, de marketing et de transformation digitale, contre 30 à 40 % pour les investissements physiques comme les travaux et les équipements. Les taux, plafonds et conditions exacts applicables à votre dossier sont à confirmer auprès de Maroc PME, seule habilitée à les fixer.",
  },
  {
    q: "Mon établissement est-il éligible ?",
    a: "Le programme vise les entreprises de droit privé marocain à capital 100 % privé opérant dans le tourisme, avec un chiffre d'affaires hors taxes inférieur à 200 millions de dirhams en moyenne sur les trois derniers exercices. Depuis juillet 2025, les barrières de taille ont été levées : les TPE, maisons d'hôtes, coopératives et jeunes porteurs de projet sont éligibles, et le seuil minimum d'investissement a été supprimé. Vérifiez votre situation auprès de Maroc PME.",
  },
  {
    q: "Un logiciel de gestion hôtelière entre-t-il dans les dépenses éligibles ?",
    a: "Le volet transformation digitale couvre l'expertise, le conseil, le marketing et les outils numériques — site web, moteur de réservation, référencement, identité de marque. Des acteurs du secteur indiquent que les solutions PMS et channel manager entrent dans ce périmètre. Sojori ne se prononce pas sur l'éligibilité de votre dossier : c'est Maroc PME qui instruit et décide.",
  },
  {
    q: "Sojori est-il agréé ou référencé au titre de Go Siyaha ?",
    a: "Nous ne revendiquons aucun agrément que nous ne pouvons documenter. Si vous montez un dossier Go Siyaha, nous fournissons ce dont votre dossier a besoin de notre côté — devis détaillé, description fonctionnelle, périmètre de déploiement — et vous restez maître de la démarche auprès de Maroc PME. Adressez-vous à eux pour savoir si un prestataire doit être référencé.",
  },
  {
    q: "Comment monter un dossier ?",
    a: "La démarche passe par Maroc PME. Les pièces habituellement demandées sont le registre du commerce, l'ICE, les statuts, les bilans des trois derniers exercices, un business plan et les devis fournisseurs. Nous pouvons vous transmettre un devis détaillé correspondant au périmètre que vous envisagez ; le reste du dossier relève de vous et de votre conseil.",
  },
];

export default async function GoSiyahaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'Solutions', path: `/${locale}/pms` },
          { name: 'Go Siyaha', path: `/${locale}/go-siyaha` },
        ]}
        serviceName="Digitalisation hôtelière et programme Go Siyaha"
        serviceDescription="Moteur d'orchestration de l'hospitalité pour les établissements touristiques marocains engagés dans une démarche de digitalisation."
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Go Siyaha" />

        <PageHero
          badge="🇲🇦 Digitalisation · Programme public"
          title={<>Go Siyaha{' '}<br /><span className="gradient-text">et la digitalisation de votre établissement</span></>}
          subtitle="Le programme public marocain soutient la transformation digitale des établissements touristiques. Voici ce qu'il couvre, qui est éligible, et où Sojori intervient — sans promesse que nous ne pourrions pas tenir."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              Go Siyaha est un programme du ministère du Tourisme déployé par Maroc PME
              pour moderniser le tissu touristique marocain. Il comporte trois axes :
              appui à l&apos;investissement, croissance verte, transformation digitale et
              assistance technique. Sur le volet digital, les sources professionnelles
              du secteur font état d&apos;une prise en charge pouvant atteindre 90 % des
              dépenses d&apos;expertise, de conseil et de transformation numérique, contre
              30 à 40 % pour les investissements physiques. Sont visées les entreprises
              de droit privé marocain à capital 100 % privé du secteur touristique, avec
              un chiffre d&apos;affaires moyen inférieur à 200 millions de dirhams sur trois
              exercices ; depuis juillet 2025, TPE, maisons d&apos;hôtes et coopératives sont
              pleinement éligibles. Les taux, plafonds et conditions exacts relèvent de
              Maroc PME, qui instruit les dossiers.
            </p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Ce que couvre le volet digital
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              Le volet transformation digitale et assistance technique porte sur ce qui
              relève de l&apos;immatériel : expertise, conseil, marketing, outils numériques.
              C&apos;est la part la mieux soutenue du programme, nettement plus que les
              travaux et les équipements.
            </p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>Site web et moteur de réservation</li>
              <li>Référencement local et présence en ligne</li>
              <li>Identité de marque, contenus photo et vidéo</li>
              <li>Campagnes d&apos;acquisition</li>
              <li>Solutions de gestion : PMS, channel manager</li>
              <li>Accompagnement et stratégie</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Où Sojori intervient
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              Une subvention finance un projet, pas un logiciel isolé. Si vous montez un
              dossier, l&apos;enjeu est de décrire ce que la digitalisation change
              concrètement dans votre exploitation — et c&apos;est exactement ce que Sojori
              rend démontrable : des réservations centralisées, un ménage et une
              maintenance déclenchés sur les événements réels du séjour, une
              communication client qui ne dépend plus d&apos;un téléphone personnel, une
              fiche de police collectée avant l&apos;arrivée, une tarification qui suit la
              demande.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              De notre côté, nous fournissons ce dont votre dossier a besoin : un devis
              détaillé, la description fonctionnelle du périmètre, et le calendrier de
              déploiement. L&apos;instruction et la décision appartiennent à Maroc PME.
            </p>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Ce que nous ne disons pas</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>
                Nous ne revendiquons aucun agrément Go Siyaha, et nous ne vous
                garantissons pas une subvention. Un éditeur qui affirme que son logiciel
                est « financé à 90 % » vous engage sur une décision qui ne lui appartient
                pas. Adressez-vous à Maroc PME pour connaître votre éligibilité réelle et
                savoir si un prestataire référencé est exigé.
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>Le périmètre Sojori</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: 'Planning, réservations, facturation, taxe de séjour.', link: '/pms' as const },
                { t: 'Channel Manager', d: 'Booking, Expedia, Airbnb et OTA synchronisés dans les deux sens.', link: '/channel-manager' as const },
                { t: 'TeamFlow', d: 'Ménage et maintenance déclenchés sur les événements réels.', link: '/teamflow' as const },
                { t: 'WhatsApp', d: 'Check-in digital, fiche de police, messages du séjour.', link: '/whatsapp' as const },
                { t: 'Dynamic Pricing', d: 'Tarification ajustée sur la demande réelle.', link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: 'Occupation, prix moyen, RevPAR et mix canaux.', link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-go-siyaha' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              <br />
              Comprendre :{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>Qu&apos;est-ce que l&apos;orchestration hôtelière ?</Link>
              Par ville :{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>PMS Marrakech</Link>
              {' · '}
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

        <StatsBar stats={[
          { k: '90%', l: 'Volet digital (source secteur)' },
          { k: '200M', l: 'Plafond CA en dirhams' },
          { k: '3', l: 'Axes du programme' },
          { k: 'Maroc PME', l: 'Organisme instructeur' },
        ]} />

        <FaqSection badge="Go Siyaha" title="Questions fréquentes" items={FAQ} />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Page d&apos;information mise à jour le 11 septembre 2026. Les montants et
              critères cités proviennent de sources professionnelles du secteur et sont
              susceptibles d&apos;évoluer. Seule Maroc PME fait foi sur l&apos;éligibilité, les
              taux et les plafonds applicables à votre dossier. Sojori n&apos;est pas
              intermédiaire de ce programme et ne perçoit aucune commission à ce titre.
            </p>
          </div>
        </section>

        <FinalCTA
          title={<>Digitalisez votre exploitation.{' '}<span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Mise en route accompagnée en français. Devis détaillé fourni si vous montez un dossier. Sojori se connecte aussi à votre PMS existant."
        />

        <PageFooter />
      </div>
    </>
  );
}
