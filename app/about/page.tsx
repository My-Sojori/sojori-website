import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export const metadata: Metadata = {
  title: 'Sojori — About',
  description: "L'équipe Sojori. Notre mission, nos valeurs, notre histoire. Basés à Paris, Barcelona, Lisbon.",
};

interface TeamMember {
  n: string;
  r: string;
  b: string;
  c: string;
}

const TEAM: TeamMember[] = [
  { n: 'Yassine Bennani', r: 'CEO & Co-founder', b: 'Ex-Booking · 12 ans hospitality tech', c: '#f4cf5e' },
  { n: 'Léa Marchand', r: 'CTO & Co-founder', b: 'Ex-Stripe · ex-Datadog · YC W19', c: '#a78bfa' },
  { n: 'Thomas Dubois', r: 'Head of Product', b: 'Ex-Airbnb · 8 ans UX hospitality', c: '#06b6d4' },
  { n: 'Sofia Costa', r: 'Head of Operations', b: 'Ex-Sonder · scale ops 200→2k biens', c: '#10b981' },
  { n: 'David Park', r: 'Head of AI', b: 'Ex-Anthropic · PhD NLP Stanford', c: '#ec4899' },
  { n: 'Amina Tazi', r: 'Head of Customer', b: 'Ex-Hostfully · 10 ans CS hospitality', c: '#f59e0b' },
];

interface Value {
  i: string;
  t: string;
  d: string;
}

const VALUES: Value[] = [
  { i: '🎯', t: "Hosts d'abord", d: "On construit pour ceux qui se lèvent à 6h pour gérer un check-in. Pas pour les VC slides." },
  { i: '🔬', t: 'Mesurer, pas deviner', d: 'Chaque feature est validée sur du vrai portfolio avant ship. Pas de hype produit.' },
  { i: '🌍', t: 'Local, pas générique', d: 'Paris ≠ Lisbonne ≠ Barcelona. Notre produit s\'adapte aux règles, langues, usages locaux.' },
  { i: '🛡️', t: 'Vos données sont à vous', d: "Pas de revente, pas d'AI training sur vos messages voyageurs. Export en 1 clic." },
];

interface TimelineItem {
  y: string;
  t: string;
  d: string;
}

const TIMELINE: TimelineItem[] = [
  { y: '2022', t: 'Idée', d: 'Yassine gère 12 appartements à Paris. Excel + WhatsApp + 3 PMS différents. Il y a mieux à faire.' },
  { y: '2023', t: 'Premiers clients', d: 'YC W23. 50 hosts pilotes en France. Le PMS et le WhatsApp Bot prennent forme.' },
  { y: '2024', t: 'Expansion EU', d: "Lisbonne et Paris. 800 biens. Series A · 12M€. L'équipe passe à 35." },
  { y: '2025', t: "Aujourd'hui", d: '2 400 biens, 14 pays, 80 personnes. Lancement TeamFlow et Smart Pricing AI.' },
];

interface Press {
  n: string;
  q: string;
}

const PRESS: Press[] = [
  { n: 'Skift', q: "L'orchestrateur que les hosts attendaient" },
  { n: 'Les Échos', q: 'La pépite hospitality française' },
  { n: 'TechCrunch', q: 'Sojori raises €12M Series A' },
  { n: 'PhocusWire', q: 'Reinventing the PMS for SMB hosts' },
];

export default function AboutPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="About" />
        <PageHero
          badge="✨ About Sojori · Notre mission"
          title={<>On construit l'<span className="gradient-text">opérateur intelligent</span> que les hosts méritent.</>}
          subtitle="Sojori est né à Paris en 2022, où Yassine jonglait entre Excel, 3 PMS et 200 messages WhatsApp par jour pour gérer ses appartements. Aujourd'hui, on aide 2 400 hosts à reprendre leur vie."
          cta1="Voir nos offres" cta2="Rejoindre l'équipe"
        />

        {/* Mission */}
        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>● Notre mission</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.2, textWrap: 'balance' }}>
              Rendre le métier de host <span className="gradient-text">aussi opéré qu'un hôtel</span>, sans en perdre l'âme.
            </h2>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '0 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Nos valeurs</div>
            <h2 style={{ fontSize: 36, marginBottom: 32, letterSpacing: '-0.02em' }}>Ce qui nous <span className="gradient-text">guide.</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              {VALUES.map(v => (
                <div key={v.t} className="card" style={{ padding: 28 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{v.i}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{v.t}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6 }}>{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '70px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Notre histoire</div>
            <h2 style={{ fontSize: 36, marginBottom: 40, letterSpacing: '-0.02em' }}>De Paris à <span className="gradient-text">14 pays.</span></h2>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 60, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, #f4cf5e, transparent)' }}></div>
              {TIMELINE.map((t, i) => (
                <div key={t.y} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 30, marginBottom: 28, position: 'relative' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#f4cf5e', fontFamily: 'Geist Mono', textAlign: 'right', paddingRight: 10 }}>{t.y}</div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: -18, top: 8, width: 12, height: 12, borderRadius: '50%', background: '#f4cf5e', boxShadow: '0 0 0 4px rgba(244,207,94,0.15)' }}></span>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.t}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6 }}>{t.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: '70px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● L'équipe</div>
            <h2 style={{ fontSize: 36, marginBottom: 32, letterSpacing: '-0.02em' }}>Les humains <span className="gradient-text">derrière Sojori.</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
              {TEAM.map(p => (
                <div key={p.n} className="card" style={{ padding: 22, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: p.c, color: '#1a1408', fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.n.split(' ').map(s => s[0]).join('')}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{p.n}</div>
                    <div style={{ fontSize: 11, color: '#f4cf5e', fontWeight: 600, fontFamily: 'Geist Mono', marginTop: 2, letterSpacing: 0.3 }}>{p.r}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>{p.b}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 30, fontSize: 13, color: 'var(--text-3)' }}>+ 74 personnes en France, Espagne, Portugal, Italie</div>
          </div>
        </section>

        {/* Press */}
        <section style={{ padding: '60px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 24 }}>● On parle de nous</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {PRESS.map(p => (
                <div key={p.n} className="card" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#f4cf5e', fontWeight: 700, letterSpacing: 1.5, fontFamily: 'Geist Mono', marginBottom: 10 }}>{p.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>« {p.q} »</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investors */}
        <section style={{ padding: '60px 32px', textAlign: 'center' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 18 }}>● Soutenus par</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', opacity: 0.85 }}>
            {['Y Combinator', 'Sequoia', 'Partech', 'Headline', 'BPI France', 'Kima Ventures'].map(i => (
              <div key={i} style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{i}</div>
            ))}
          </div>
        </section>

        <StatsBar stats={[{k:'2 400',l:'biens gérés'},{k:'80',l:'personnes'},{k:'14 pays',l:'présence'},{k:'12M€',l:'Series A'}]} />
        <FinalCTA title={<>On recrute. <span className="gradient-text">Rejoignez-nous.</span></>} subtitle="Engineering, Product, Design, Customer Success — toutes nos offres sont ouvertes en remote-friendly EU." />
        <PageFooter />
      </div>
    </>
  );
}
