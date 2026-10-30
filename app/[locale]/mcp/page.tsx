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
    title: t('mcp.title'),
    description: t('mcp.description'),
    alternates: { canonical: `/${locale}/mcp` },
  };
}

/**
 * Page MCP — « le PMS qu'on interroge depuis son IA ».
 *
 * Angle SEO : « PMS MCP », « PMS ChatGPT », « connecter Claude à son PMS »
 * sont des requêtes naissantes qu'aucun acteur hôtelier n'occupe. Cloudbeds,
 * Mews et Hostaway ont des API ; aucun n'expose de serveur MCP documenté.
 *
 * Contrainte de véracité : le serveur n'expose aucune donnée identifiant un
 * voyageur — ni nom, ni contact, ni pièce d'identité ; ces champs n'existent
 * pas dans le miroir interrogé. Les codes d'accès, les mots de passe wifi et
 * les notes libres du staff en sont également absents. Tout ce que cette page
 * affirme sur la confidentialité doit rester vérifiable dans le serveur.
 */

/** Ce que l'IA peut lire — et ce qu'elle ne verra jamais. */
const EXPOSED = [
  { t: 'Les réservations', d: "Occupation, saisonnalité, durée des séjours, répartition par canal et par nationalité, revenu. De quoi mesurer une activité, sans savoir qui a dormi là." },
  { t: 'Les logements', d: "Configuration, ville, services activés, complétude du paramétrage. Ce qui est prêt, ce qui ne l'est pas." },
  { t: "Les tâches d'exploitation", d: "Ménage, accueil, conciergerie, support : ce qui traîne, les retards, la charge par membre de l'équipe. Votre staff est nommé — c'est votre équipe." },
  { t: 'La fraîcheur des données', d: "Chaque réponse indique depuis quand les données existent. Un chiffre sur une période non couverte n'est pas produit : il serait faux sans le dire." },
];

const NEVER_EXPOSED = [
  { t: "L'identité des voyageurs", d: 'Ni nom, ni téléphone, ni email, ni pièce d’identité. Ces champs n’existent pas dans le miroir interrogé : ils ne peuvent pas être demandés, même en insistant.' },
  { t: "Les codes d'accès et le wifi", d: 'Le serveur dit si un code est configuré, jamais lequel. Pour le lire ou le changer, on passe par le dashboard — c’est volontaire.' },
  { t: 'Les notes libres du staff', d: 'Elles peuvent contenir des données personnelles qu’on ne sait pas filtrer de façon fiable. Tant que c’est le cas, elles restent en dehors.' },
];

const QUESTIONS = [
  "Quel est mon taux d'occupation sur les trois derniers mois, par ville ?",
  'Quelle part de mon revenu vient de Booking, et quelle part du direct ?',
  'Quels logements ont une configuration incomplète ?',
  'Combien de tâches de ménage sont en retard cette semaine, et sur qui ?',
  "Compare la durée moyenne des séjours entre l'été et l'hiver.",
  'Prépare-moi un rapport mensuel pour mes propriétaires.',
];

const FAQ = [
  {
    q: "Qu'est-ce que MCP, et pourquoi un PMS s'en servirait ?",
    a: "MCP (Model Context Protocol) est un standard ouvert qui permet à une IA — ChatGPT, Claude, ou un agent maison — de lire des données applicatives et de s'en servir pour répondre. Appliqué à un PMS, cela veut dire poser une question en langage courant et obtenir une réponse construite sur vos chiffres réels, sans exporter un fichier ni ouvrir un tableau de bord. La différence avec une API classique : vous n'avez rien à développer, l'IA sait se servir du serveur toute seule.",
  },
  {
    q: "Mes données partent-elles chez OpenAI ou Anthropic ?",
    a: "Les données restent chez Sojori. Le serveur MCP répond à des questions précises et ne renvoie que le résultat : des agrégats, jamais votre base. Et ce résultat ne contient aucune donnée identifiant un voyageur — ni nom, ni contact, ni pièce d'identité, parce que ces champs n'existent pas dans le miroir interrogé. Ce qui circule, ce sont des chiffres d'exploitation : occupation, revenu, retards, mix canaux.",
  },
  {
    q: "Pourquoi l'identité des voyageurs est-elle exclue par construction ?",
    a: "Parce qu'une protection qui repose sur un filtre finit toujours par être contournée. Nous avons choisi l'inverse : les champs identifiants ne sont pas dans les données que le serveur peut lire. Il n'y a rien à filtrer, donc rien à oublier de filtrer. La loi 09-08 sur la protection des données personnelles s'applique à vos voyageurs ; nous préférons que l'architecture réponde à la question plutôt qu'une promesse.",
  },
  {
    q: "Est-ce que l'IA peut modifier quelque chose ?",
    a: "Non. Le serveur est en lecture seule sur ce périmètre : l'IA lit, analyse, restitue. Elle ne crée pas de réservation, ne change pas un prix, n'assigne pas une tâche. Les actions passent par les interfaces où il y a une trace et un responsable.",
  },
  {
    q: "Comment savoir si un chiffre donné par l'IA est fiable ?",
    a: "Chaque réponse porte la période réellement couverte par les données. Si vous demandez un comparatif sur deux ans et que le miroir ne commence qu'il y a huit mois, le serveur le signale plutôt que de produire un chiffre incomplet qui aurait l'air complet. C'est la principale cause d'erreur quand on branche une IA sur une base métier.",
  },
  {
    q: "Faut-il être développeur pour l'utiliser ?",
    a: "Non. Vous connectez Sojori à votre client IA une fois — Claude Desktop, ChatGPT, ou l'outil de votre choix compatible MCP — puis vous posez vos questions en français. C'est inclus dans l'offre Premium.",
  },
  {
    q: "Quels PMS concurrents proposent la même chose ?",
    a: "À notre connaissance, aucun à ce jour. Cloudbeds, Mews et Hostaway exposent des API, ce qui suppose un développement de votre côté. Un serveur MCP est d'une autre nature : c'est l'IA qui sait s'en servir, pas vous qui devez écrire le code. Si un concurrent en publie un, nous mettrons cette réponse à jour.",
  },
];

export default async function McpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: 'Accueil', path: `/${locale}` },
          { name: 'MCP', path: `/${locale}/mcp` },
        ]}
        serviceName="PMS connecté à l'IA par MCP"
        serviceDescription="Serveur MCP permettant d'interroger son activité hôtelière depuis ChatGPT ou Claude, en lecture seule et sans aucune donnée identifiant un voyageur."
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="MCP" />

        <PageHero
          badge="● MCP · Le PMS que votre IA sait lire"
          title={<>Posez la question à votre IA.{' '}<br /><span className="gradient-text">Elle lit vos chiffres.</span></>}
          subtitle="Sojori expose votre activité à ChatGPT, à Claude ou à votre propre agent, via MCP. En lecture seule, et sans aucune donnée permettant d'identifier un voyageur."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        {/* Réponse directe — format repris des pages piliers, pour les IA */}
        <section style={{ padding: '8px 32px 48px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Réponse directe</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              MCP — <em>Model Context Protocol</em> — est un standard ouvert qui permet à
              une intelligence artificielle de lire les données d&apos;une application et de
              s&apos;en servir pour répondre. Sojori expose un serveur MCP : vous connectez
              votre client IA une fois, puis vous posez vos questions en français.
              <strong style={{ color: 'var(--text)' }}> Aucun export, aucun tableau croisé, aucun développement.</strong>{' '}
              Et rien de ce qui sort ne permet d&apos;identifier un voyageur : ni nom, ni
              contact, ni pièce d&apos;identité — ces champs n&apos;existent pas dans les
              données que le serveur peut lire.
            </p>
          </div>
        </section>

        {/* Ce qu'on demande */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 16 }}>● Ce que vous demandez</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUESTIONS.map(q => (
                <div
                  key={q}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    fontSize: 15,
                    color: 'var(--text-2)',
                    fontStyle: 'italic',
                  }}
                >
                  «&nbsp;{q}&nbsp;»
                </div>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6 }}>
              La réponse est construite sur vos données réelles, pas sur une moyenne du
              secteur. Et elle indique sur quelle période elle porte.
            </p>
          </div>
        </section>

        {/* Lisible / jamais lisible */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="mcp-split">
              <div>
                <div className="uppercase-sm" style={{ color: '#10b981', marginBottom: 16 }}>● Ce que l&apos;IA lit</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {EXPOSED.map(x => (
                    <div key={x.t} className="card" style={{ padding: 18 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="uppercase-sm" style={{ color: '#f4cf5e', marginBottom: 16 }}>● Ce qu&apos;elle ne verra jamais</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {NEVER_EXPOSED.map(x => (
                    <div
                      key={x.t}
                      style={{
                        padding: 18,
                        borderRadius: 14,
                        background: 'linear-gradient(180deg, rgba(244,207,94,0.06), rgba(244,207,94,0.02))',
                        border: '1px solid rgba(244,207,94,0.3)',
                      }}
                    >
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{x.d}</div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6 }}>
                  Ce n&apos;est pas un réglage que l&apos;on peut desserrer : ces champs ne
                  sont pas dans les données que le serveur interroge. Il n&apos;y a rien à
                  filtrer, donc rien à oublier de filtrer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lecture seule */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div
              style={{
                padding: '22px 26px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                L&apos;IA lit. Elle n&apos;agit pas.
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
                Le serveur est en lecture seule. L&apos;IA analyse et restitue ; elle ne crée
                pas de réservation, ne change pas un prix, n&apos;assigne pas une tâche. Les
                actions passent par les interfaces où il y a une trace et un responsable —
                c&apos;est le rôle de{' '}
                <Link href="/orchestration" style={{ color: '#f4cf5e' }}>l&apos;orchestration</Link>,
                qui, elle, déclenche vraiment les choses.
              </p>
            </div>
          </div>
        </section>

        {/* Pourquoi ça change la façon de piloter */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 16 }}>● Pourquoi cela change quelque chose</div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', marginBottom: 16 }}>
              Un tableau de bord répond aux questions que quelqu&apos;un a prévues. Les
              vôtres arrivent rarement dans cet ordre : vous voulez croiser la nationalité
              et la durée de séjour un mardi soir, parce qu&apos;un propriétaire vous a posé
              la question. Il faut alors exporter, recoller, vérifier — ou renoncer.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', marginBottom: 16 }}>
              Avec MCP, la question se pose à voix haute et la réponse se construit sur vos
              chiffres. Un rapport propriétaire se rédige en une minute. Une anomalie se
              creuse jusqu&apos;à sa cause au lieu d&apos;être notée pour plus tard.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: 0 }}>
              Et parce que l&apos;identité des voyageurs n&apos;est jamais du voyage, vous
              pouvez le faire sans arbitrer entre l&apos;utilité et la confidentialité.
            </p>
          </div>
        </section>

        <FaqSection badge="MCP" title="Questions fréquentes" items={FAQ} />

        <FinalCTA
          title={<>Votre PMS, <span className="gradient-text">interrogeable.</span></>}
          subtitle="MCP est inclus dans l'offre Premium. Voyez les tarifs, ou demandez une démonstration sur vos propres données."
        />
        <PageFooter />
      </div>

      <style>{`
        .mcp-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 860px) {
          .mcp-split {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </>
  );
}
