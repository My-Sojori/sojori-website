import { BackgroundEffects } from '@/components/BackgroundEffects';

function SojoriLogo({ size = 36, variant = 'color' }: { size?: number; variant?: 'color' | 'mono' }) {
  const gradientId = `logoGrad-${variant}`;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          {variant === 'color' ? (
            <>
              <stop offset="0%" stopColor="#f4cf5e" />
              <stop offset="50%" stopColor="#e6b022" />
              <stop offset="100%" stopColor="#b8881a" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0f0f14" />
              <stop offset="50%" stopColor="#0f0f14" />
              <stop offset="100%" stopColor="#0f0f14" />
            </>
          )}
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17" stroke={`url(#${gradientId})`} strokeWidth="2" fill="none" strokeDasharray="3 4" opacity={variant === 'mono' ? "0.4" : "0.5"} />
      <circle cx="20" cy="20" r="11" stroke={`url(#${gradientId})`} strokeWidth="1.5" fill="none" opacity={variant === 'mono' ? "0.55" : "0.6"} />
      <path d="M 12 26 Q 20 26 20 20 Q 20 14 28 14" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="20" r="2.5" fill={variant === 'color' ? "#f4cf5e" : "#0f0f14"} />
    </svg>
  );
}

export default function BrandPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header strip */}
        <header style={{
          padding: '32px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SojoriLogo size={36} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>sojori</div>
              <div className="mono" style={{
                fontSize: 9,
                color: 'var(--text-3)',
                letterSpacing: '0.18em',
                marginTop: 3
              }}>
                BRAND SYSTEM v1.0
              </div>
            </div>
          </div>
          <a href="/" className="btn btn-ghost">Voir la homepage →</a>
        </header>

        {/* Hero of brand page */}
        <section style={{ padding: '80px 48px 40px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="badge" style={{ marginBottom: 20 }}>
            <span className="badge-dot"></span> Identité visuelle
          </div>
          <h1 style={{ marginBottom: 16 }}>
            Le système <span className="gradient-text">Sojori</span>.
          </h1>
          <p style={{ fontSize: 18, maxWidth: 640, lineHeight: 1.55 }}>
            Un langage visuel construit autour de l'orchestration : précision, fluidité, prestige.
            Tout part d'une métaphore — un chef d'orchestre invisible qui coordonne +20 tâches sans qu'on le voie.
          </p>
        </section>

        {/* Logo system */}
        <section style={{ padding: '40px 48px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            01 · Logo
          </div>
          <h2 style={{ marginBottom: 32 }}>Trois variantes, un seul geste.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {/* Full logo */}
            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 260,
              gap: 32
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <SojoriLogo size={52} />
                <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>sojori</div>
              </div>
              <div className="mono" style={{
                fontSize: 10,
                color: 'var(--text-3)',
                letterSpacing: '0.2em'
              }}>
                FULL · 52PX
              </div>
            </div>

            {/* Mark only */}
            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'linear-gradient(135deg, rgba(230,176,34,0.08), rgba(139,92,246,0.05))',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 260,
              gap: 32
            }}>
              <SojoriLogo size={84} />
              <div className="mono" style={{
                fontSize: 10,
                color: 'var(--text-3)',
                letterSpacing: '0.2em'
              }}>
                MARK · FAVICON
              </div>
            </div>

            {/* Monochrome */}
            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: '#f5f5f7',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 260,
              gap: 32
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <SojoriLogo size={52} variant="mono" />
                <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em', color: '#0f0f14' }}>
                  sojori
                </div>
              </div>
              <div className="mono" style={{
                fontSize: 10,
                color: 'rgba(15,15,20,0.5)',
                letterSpacing: '0.2em'
              }}>
                MONO · LIGHT BG
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 24,
            padding: '20px 28px',
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--r-lg)'
          }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>Concept :</strong> Trois éléments superposés —
              un <strong style={{ color: 'var(--primary)' }}>arc extérieur pointillé</strong> (la portée musicale, le réseau de tâches),
              un <strong style={{ color: 'var(--primary)' }}>cercle médian</strong> (l'onde de coordination),
              et un <strong style={{ color: 'var(--primary)' }}>geste central en S</strong> (la baguette du chef d'orchestre, qui forme le S de Sojori).
              Le tout converge sur un point lumineux : le client final.
            </div>
          </div>
        </section>

        {/* Color system */}
        <section style={{ padding: '60px 48px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            02 · Couleurs
          </div>
          <h2 style={{ marginBottom: 12 }}>Or premium, violet AI, fond nuit.</h2>
          <p style={{ marginBottom: 32, maxWidth: 600 }}>
            L'or comme accent unique pour les CTAs. Le violet et le cyan en seconds rôles, jamais en compétition. Le reste : de la profondeur.
          </p>

          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            Brand
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            <div className="swatch" style={{
              aspectRatio: '1.6',
              borderRadius: 'var(--r-lg)',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--glass-border)',
              background: 'linear-gradient(135deg, #f4cf5e 0%, #e6b022 50%, #b8881a 100%)',
              color: '#1a1408'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Primary · Or</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8 }}>#E6B022</div>
              </div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>CTAs, accents, hover</div>
            </div>

            <div className="swatch" style={{
              aspectRatio: '1.6',
              borderRadius: 'var(--r-lg)',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--glass-border)',
              background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #6d28d9 100%)',
              color: '#fff'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Secondary · Violet</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8 }}>#8B5CF6</div>
              </div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>AI / intelligence</div>
            </div>

            <div className="swatch" style={{
              aspectRatio: '1.6',
              borderRadius: 'var(--r-lg)',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--glass-border)',
              background: 'linear-gradient(135deg, #67e8f9 0%, #06b6d4 50%, #0891b2 100%)',
              color: '#082834'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Accent · Cyan</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8 }}>#06B6D4</div>
              </div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>Flow / automation</div>
            </div>

            <div className="swatch" style={{
              aspectRatio: '1.6',
              borderRadius: 'var(--r-lg)',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--glass-border)',
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #047857 100%)',
              color: '#fff'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Success</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8 }}>#10B981</div>
              </div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>Tâches complétées</div>
            </div>
          </div>

          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            Backgrounds (dark scale)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { name: 'BG · 0', hex: '#FBFAF6', bg: '#fbfaf6' },
              { name: 'BG · 1', hex: '#FFFFFF', bg: '#ffffff' },
              { name: 'BG · 2', hex: '#F5F3EC', bg: '#f5f3ec' },
              { name: 'BG · 3', hex: '#1F1F2A', bg: '#1f1f2a' },
              { name: 'Glass', hex: 'white/4%', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' },
              { name: 'Glass+', hex: 'white/7%', bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.14)' },
            ].map(swatch => (
              <div key={swatch.name} className="swatch" style={{
                aspectRatio: '1.6',
                borderRadius: 'var(--r-lg)',
                padding: 14,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `1px solid ${swatch.border || 'var(--glass-border)'}`,
                background: swatch.bg,
                color: '#fff',
                backdropFilter: swatch.name.includes('Glass') ? 'blur(20px)' : undefined
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{swatch.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.8 }}>{swatch.hex}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            Texte (sur dark)
          </div>
          <div className="specimen" style={{
            padding: 32,
            borderRadius: 'var(--r-xl)',
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}>
            <div style={{ fontSize: 24, color: 'var(--text)' }}>Aa · #FFFFFF · Primary</div>
            <div style={{ fontSize: 22, color: 'var(--text-2)' }}>Aa · 72% · Secondary</div>
            <div style={{ fontSize: 20, color: 'var(--text-3)' }}>Aa · 52% · Tertiary</div>
            <div style={{ fontSize: 18, color: 'var(--text-muted)' }}>Aa · 36% · Muted</div>
            <div style={{ fontSize: 16, color: 'var(--text-faint)' }}>Aa · 18% · Faint (hairlines)</div>
          </div>
        </section>

        {/* Typography */}
        <section style={{ padding: '60px 48px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            03 · Typographie
          </div>
          <h2 style={{ marginBottom: 32 }}>Geist Sans + Geist Mono.</h2>

          <div className="specimen" style={{
            padding: 32,
            borderRadius: 'var(--r-xl)',
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            marginBottom: 16
          }}>
            <div className="label" style={{
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              fontWeight: 600,
              marginBottom: 12
            }}>
              Display · 800
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04 }}>
              L'Orchestrateur Intelligent.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)'
            }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 12
              }}>
                H2 · 700
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Tout en une plateforme.
              </div>
            </div>

            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)'
            }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 12
              }}>
                H3 · 600
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em' }}>
                Channel Manager certifié.
              </div>
            </div>

            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)'
            }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 12
              }}>
                Body · 400
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--text-2)' }}>
                De la réservation au checkout, chaque étape orchestrée automatiquement. Sans oublis, sans retards, sans friction.
              </div>
            </div>

            <div className="specimen" style={{
              padding: 32,
              borderRadius: 'var(--r-xl)',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)'
            }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 12
              }}>
                Mono · 500
              </div>
              <div className="mono" style={{
                fontSize: 14,
                color: 'var(--primary)',
                letterSpacing: '0.04em'
              }}>
                23 TASKS · 0 OUBLIS · 100% AUTO
              </div>
              <div className="mono" style={{
                fontSize: 13,
                marginTop: 8,
                color: 'var(--text-3)'
              }}>
                v2.4 · live demo · uptime 99.97%
              </div>
            </div>
          </div>
        </section>

        {/* Components preview */}
        <section style={{ padding: '60px 48px 100px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="label" style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 600,
            marginBottom: 12
          }}>
            04 · Composants
          </div>
          <h2 style={{ marginBottom: 32 }}>Boutons, badges, glass.</h2>

          <div className="specimen" style={{
            padding: 32,
            borderRadius: 'var(--r-xl)',
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            alignItems: 'center',
            marginBottom: 16
          }}>
            <button className="btn btn-primary btn-lg">Demander une démo →</button>
            <button className="btn btn-ghost btn-lg">Voir le pricing</button>
            <button className="btn btn-primary">Get demo</button>
            <button className="btn btn-ghost">Login</button>
            <span className="badge">
              <span className="badge-dot"></span> L'Orchestrateur Intelligent
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div className="glass" style={{ padding: 28 }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 8
              }}>
                Card · glass
              </div>
              <h3>PMS Complet</h3>
              <p style={{ marginTop: 8, fontSize: 14 }}>
                Calendrier, paiements, contrats. Une seule source de vérité.
              </p>
            </div>

            <div className="glass" style={{
              padding: 28,
              borderColor: 'rgba(230,176,34,0.4)',
              background: 'linear-gradient(180deg, rgba(230,176,34,0.06) 0%, rgba(255,255,255,0.02) 100%)'
            }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                fontWeight: 600,
                marginBottom: 8
              }}>
                Card · highlight
              </div>
              <h3>Orchestration AI</h3>
              <p style={{ marginTop: 8, fontSize: 14 }}>
                +20 tâches automatisées. Zéro oubli. WhatsApp 24/7.
              </p>
            </div>

            <div className="glass" style={{ padding: 28 }}>
              <div className="label" style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                fontWeight: 600,
                marginBottom: 8
              }}>
                Card · glass
              </div>
              <h3>Channel Manager</h3>
              <p style={{ marginTop: 8, fontSize: 14 }}>
                Sync 20+ OTAs. Plus jamais d'overbooking.
              </p>
            </div>
          </div>
        </section>

        <footer style={{
          padding: '32px 48px',
          borderTop: '1px solid var(--glass-border)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 12
        }}>
          <span className="mono" style={{ letterSpacing: '0.16em' }}>
            SOJORI · BRAND SYSTEM v1.0
          </span>
        </footer>
      </div>
    </>
  );
}
