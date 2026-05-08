'use client';

import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import Link from 'next/link';
import React from 'react';

export default function AboutPage() {
  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .timeline-track { grid-template-columns: 1fr !important; }
          .timeline-track::before { display: none !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .founder-card { grid-template-columns: 1fr !important; text-align: center !important; }
        }
      `}</style>

      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="About" />

        {/* HERO */}
        <section style={{ padding: '80px 32px 40px', position: 'relative' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <span className="badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.2,
              background: 'linear-gradient(90deg, rgba(230,176,34,0.10), rgba(139,92,246,0.10))',
              border: '1px solid rgba(230,176,34,0.25)',
              color: 'var(--text-2)',
              marginBottom: 28
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
              À propos de Sojori
            </span>

            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'end' }}>
              <div>
                <h1 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(44px, 6.4vw, 88px)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.035em',
                  margin: '0 0 32px',
                  textWrap: 'balance'
                }}>
                  L'<span className="gradient-text">orchestrateur intelligent</span><br/>
                  que les property managers<br/>
                  méritent.
                </h1>
              </div>
              <div style={{ paddingBottom: 12 }}>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 24px', textWrap: 'pretty' }}>
                  Les property managers méritent mieux que des outils qui gèrent uniquement calendriers et paiements. Sojori répond au besoin d'<strong style={{ color: 'var(--text)' }}>orchestration</strong> : coordonner chaque interaction, anticiper chaque besoin, au bon moment.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  <Link href="/demo" className="btn btn-primary btn-lg">Demander une démo →</Link>
                  <Link href="#contact" className="btn btn-ghost btn-lg">Nous contacter</Link>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 4,
                  borderTop: '1px solid var(--border)',
                  paddingTop: 24
                }}>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>2025</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase' }}>
                      année de lancement
                    </div>
                  </div>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>2 villes</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase' }}>
                      Paris · Casablanca
                    </div>
                  </div>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>Multi-pays déjà adopté</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      FR · ES · PT · MA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div style={{
            marginTop: 80,
            padding: '24px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)'
          }}>
            <div style={{
              display: 'flex',
              gap: 64,
              animation: 'scroll 28s linear infinite',
              whiteSpace: 'nowrap',
              width: 'max-content'
            }}>
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['PARIS', 'CASABLANCA', 'FRANCE', 'ESPAGNE', 'PORTUGAL', 'MAROC', 'PMS', 'Channel Manager', 'WhatsApp AI', 'Orchestration'].map((item, idx) => (
                    <span key={`${i}-${idx}`} style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--text-2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 64
                    }}>
                      {item}
                      <span style={{ color: 'var(--primary)', fontStyle: 'normal' }}>✦</span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section style={{ padding: '120px 32px 100px', textAlign: 'center' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              Notre mission
            </div>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(34px, 4.8vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              margin: '0 0 18px',
              textWrap: 'balance'
            }}>
              Orchestrer chaque détail du <span className="gradient-text">parcours voyageur</span>.
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-2)', margin: '0 0 32px' }}>
              Comme le ferait le meilleur concierge.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '18px 26px',
              borderRadius: 999,
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 24px rgba(230,176,34,0.10)',
              marginTop: 24
            }}>
              <div style={{ fontSize: 22 }}>🎯</div>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--text-2)', textAlign: 'left', maxWidth: 560, lineHeight: 1.55 }}>
                Pas seulement gérer des réservations. Mais coordonner chaque interaction, anticiper chaque besoin, orchestrer chaque moment — avec la précision d'un concierge 5 étoiles.
              </p>
            </div>
          </div>
        </section>

        {/* ORIGIN STORY — Magazine style */}
        <section style={{
          padding: '100px 32px',
          background: 'rgba(255,255,255,0.5)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20
              }}>
                <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                Pourquoi Sojori existe
              </div>
              <h2 style={{
                fontWeight: 700,
                fontSize: 'clamp(34px, 4.6vw, 52px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                margin: 0,
                textWrap: 'balance'
              }}>
                Le <span className="gradient-text">problème</span> qu'on résout.
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {/* Chapter i */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>i.</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    L'écart entre l'ambition et les outils.
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 14px', textWrap: 'pretty' }}>
                    Les property managers veulent offrir <strong style={{ color: 'var(--text)', fontWeight: 600 }}>une expérience exceptionnelle</strong> : hospitalité, sens du détail, anticipation des besoins.
                  </p>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: 0, textWrap: 'pretty' }}>
                    Mais les PMS classiques se limitent à gérer <strong style={{ color: 'var(--text)' }}>calendriers et paiements</strong> — sans coordonner l'expérience.
                  </p>
                </div>
              </div>

              {/* Chapter ii */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>ii.</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    Le besoin d'orchestration, pas d'automation.
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 14px', textWrap: 'pretty' }}>
                    Les PMS classiques gèrent le calendrier, les réservations, les paiements — mais ils <strong style={{ color: 'var(--text)', fontWeight: 600 }}>ne coordonnent rien</strong>.
                  </p>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: 0, textWrap: 'pretty' }}>
                    Le marché a besoin d'un orchestrateur : une plateforme qui sait qu'un message de bienvenue doit partir J-7, qu'un code porte doit être généré 4h avant le check-in, que le ménage doit être vérifié avant 14h.
                  </p>
                </div>
              </div>

              {/* Chapter iii */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>iii.</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    Les PMS automatisent. Sojori <span className="gradient-text">orchestre</span>.
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 18px', textWrap: 'pretty' }}>
                    C'est la différence entre un robot qui suit des règles et un <strong style={{ color: 'var(--text)', fontWeight: 600 }}>chef d'orchestre</strong> qui coordonne chaque instrument au bon moment.
                  </p>
                  <div style={{
                    marginTop: 18,
                    padding: '18px 22px',
                    background: 'linear-gradient(135deg, rgba(230,176,34,0.10), rgba(139,92,246,0.06))',
                    borderLeft: '3px solid var(--primary)',
                    borderRadius: '0 12px 12px 0',
                    fontSize: 14.5,
                    color: 'var(--text-2)',
                    lineHeight: 1.55
                  }}>
                    <strong style={{ color: 'var(--text)' }}>Notre engagement :</strong> que vous n'ayez plus jamais à courir derrière un check-in, un ménage, ou un message non envoyé. On orchestre — vous accueillez.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES — Asymmetric grid */}
        <section style={{ padding: '100px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 56 }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  Nos valeurs
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  textWrap: 'balance'
                }}>
                  Ce qui nous <strong style={{ color: 'var(--text)' }}>guide</strong>.
                </h2>
              </div>
              <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                Quatre principes qu'on relit à chaque feature, à chaque embauche, à chaque décision produit.
              </p>
            </div>

            <div className="values-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 20,
              gridAutoRows: 'minmax(200px, auto)'
            }}>
              {/* Value 1 - span 7 */}
              <div style={{
                gridColumn: 'span 7',
                background: 'linear-gradient(135deg, rgba(230,176,34,0.10), rgba(255,255,255,0.78))',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  01 — Priorité
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    Hosts <strong style={{ color: 'var(--text)' }}>d'abord</strong>.
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    On construit pour ceux qui se lèvent à 6h pour gérer un check-in. Pas pour les slides VC.
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🎯</div>
              </div>

              {/* Value 2 - span 5 */}
              <div style={{
                gridColumn: 'span 5',
                background: 'var(--glass)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  02 — Méthode
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    Orchestration, pas <strong style={{ color: 'var(--text)' }}>automation</strong>.
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    Les PMS classiques automatisent. Nous orchestrons. Chaque tâche, au bon moment, à la bonne personne.
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🔬</div>
              </div>

              {/* Value 3 - span 5 */}
              <div style={{
                gridColumn: 'span 5',
                background: 'var(--glass)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  03 — Géographie
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    Présence <strong style={{ color: 'var(--text)' }}>locale</strong>.
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    Offices à Paris & Casablanca. Clients en France, Espagne, Portugal, Maroc. Sojori s'adapte aux règles, langues, usages de chaque marché.
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🌍</div>
              </div>

              {/* Value 4 - span 7 */}
              <div style={{
                gridColumn: 'span 7',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(255,255,255,0.78))',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  04 — Rythme
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    Ship fast, <strong style={{ color: 'var(--text)' }}>iterate faster</strong>.
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    Le marché bouge vite. On livre chaque semaine, on écoute, on améliore. Chaque feedback de host devient une feature, pas un ticket dans Jira.
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>⚡</div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{
          padding: '100px 0',
          background: 'linear-gradient(180deg, transparent, rgba(245,243,236,0.6))',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto 48px', padding: '0 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  Notre parcours
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  D'une vision à <strong style={{ color: 'var(--text)' }}>une plateforme</strong>.
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: 16, margin: 0, lineHeight: 1.6 }}>
                Créée en 2024, lancée en 2025, en expansion multi-pays.
              </p>
            </div>
          </div>

          <div className="timeline-track" style={{
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1280,
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Connecting line */}
            <div style={{
              content: '',
              position: 'absolute',
              left: 32,
              right: 32,
              top: 38,
              height: 2,
              background: 'repeating-linear-gradient(90deg, var(--primary) 0 8px, transparent 8px 16px)',
              opacity: 0.4,
              zIndex: 0
            }} />

            {/* 2024 */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fbfaf6',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.12)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 14
              }}>2024</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>Création</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                Sojori est créée pour répondre au besoin d'orchestration dans la gestion locative courte durée. L'objectif : aller au-delà des PMS classiques en coordonnant chaque étape du parcours voyageur.
              </div>
            </div>

            {/* 2025 */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fbfaf6',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.12)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 14
              }}>2025</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>Lancement</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                Sojori est lancé. Premiers property managers adoptent la plateforme pour orchestrer leurs opérations quotidiennes.
              </div>
            </div>

            {/* Today - Active */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.25)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--primary-deep)',
                marginBottom: 14
              }}>Today</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>Expansion</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                Des clients dans différents pays utilisent Sojori. Nous continuons d'améliorer le produit avec leur feedback — semaine après semaine.
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section style={{ padding: '110px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 48 }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  L'équipe
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  Qui construit <strong style={{ color: 'var(--text)' }}>Sojori</strong>.
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: 16, margin: 0, lineHeight: 1.6 }}>
                Une équipe construisant la plateforme d'orchestration de demain.
              </p>
            </div>

            <div className="founder-card" style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: 28,
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 40,
              alignItems: 'center',
              boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 40px -20px rgba(26,20,8,0.10)'
            }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f4cf5e, #b8881a)',
                color: '#1a1408',
                fontWeight: 700,
                fontSize: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 32px rgba(230,176,34,0.30)'
              }}>TG</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
                  Tawfiq Gouach
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--primary-deep)',
                  marginBottom: 18
                }}>CEO & Founder</div>
                <div style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-2)', marginBottom: 22, textWrap: 'pretty' }}>
                  Entrepreneur tech basé entre <strong style={{ color: 'var(--text)' }}>Paris & Casablanca</strong>. Dirige le développement de la plateforme d'orchestration Sojori.
                </div>
                <Link href="https://www.linkedin.com/in/tawfiq-gouach-77158a21/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text)',
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(230,176,34,0.10)',
                  border: '1px solid rgba(230,176,34,0.25)',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,176,34,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(230,176,34,0.10)'; }}>
                  → Voir le profil LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL */}
        <section style={{
          padding: '80px 32px',
          background: 'rgba(255,255,255,0.5)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              Nous suivre
            </div>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(30px, 3.8vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 36px'
            }}>
              Rejoignez la <strong style={{ color: 'var(--text)' }}>communauté</strong>.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <Link href="https://www.linkedin.com/company/108488739" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                padding: '24px 28px',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                transition: 'all 0.2s',
                textAlign: 'left',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -12px rgba(230,176,34,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(230,176,34,0.15), rgba(139,92,246,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}>in</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>LinkedIn</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Suivez nos actualités</div>
                </div>
                <div style={{ fontSize: 18, color: 'var(--primary-deep)' }}>→</div>
              </Link>

              <Link href="https://instagram.com/sojoriapp" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                padding: '24px 28px',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                transition: 'all 0.2s',
                textAlign: 'left',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -12px rgba(230,176,34,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(230,176,34,0.15), rgba(139,92,246,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}>📷</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Instagram</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Découvrez nos coulisses</div>
                </div>
                <div style={{ fontSize: 18, color: 'var(--primary-deep)' }}>→</div>
              </Link>
            </div>
          </div>
        </section>

        {/* BIG STATS */}
        <section style={{
          padding: '80px 32px',
          background: 'linear-gradient(180deg, rgba(245,243,236,0.6), transparent)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              En chiffres
            </div>
          </div>
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0
          }}>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: 'none' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(48px, 6vw, 84px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>2025</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>Année de lancement</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(48px, 6vw, 84px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>2 villes</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>Paris & Casablanca</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(38px, 5vw, 68px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap'
              }}>Multi-pays</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>Déjà adopté</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          padding: '120px 32px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,176,34,0.16), transparent 70%)'
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(40px, 5.6vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            maxWidth: 800,
            margin: '0 auto 20px',
            textWrap: 'balance'
          }}>
            Prêt à <strong style={{ color: 'var(--text)' }}>orchestrer comme jamais</strong> ?
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Découvrez comment Sojori transforme la gestion quotidienne de vos locations courte durée.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo" className="btn btn-primary btn-lg">Demander une démo →</Link>
            <Link href="/" className="btn btn-ghost btn-lg">← Retour homepage</Link>
          </div>
        </section>

        <PageFooter />
      </div>
    </>
  );
}
