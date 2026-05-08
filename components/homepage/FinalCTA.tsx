export function FinalCTA() {
  return (
    <section
      style={{
        padding: '120px 32px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14) 0%, transparent 70%)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 18, textWrap: 'balance' }}>
          Prêt à <span className="gradient-text">orchestrer</span>
          <br />
          vos locations ?
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
          Rejoignez des centaines de property managers qui automatisent leurs opérations avec Sojori.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/demo?source=homepage-cta" className="btn btn-primary btn-xl">
            Demander une démo gratuite →
          </a>
          <a href="/pricing" className="btn btn-ghost btn-xl">
            Voir le pricing
          </a>
        </div>
        <div style={{ marginTop: 24, fontSize: 13, color: 'var(--text-3)' }}>
          ✓ Démo personnalisée · ✓ Sans engagement · ✓ Setup en &lt;7 jours
        </div>
      </div>
    </section>
  );
}
