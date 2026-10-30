import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#faf9f6',
        color: '#1a1a1a',
      }}>
        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #e6b022, #d4a017)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            404
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            Page introuvable
          </h1>
          <p style={{ fontSize: 15, color: '#6b6b6b', marginBottom: 32, maxWidth: 400 }}>
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'opacity 0.2s',
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
