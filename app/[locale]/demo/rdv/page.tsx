'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { normalizeDemoBackendResponse, demoResponseErrorMessage } from '@/lib/demoApiResponse';

const DEMO_API = '/api/v1/demo';

type ApptData = {
  appointmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  demoRequestId: string | null;
  agent: { firstName: string; lastName: string } | null;
};

function DemoRdvContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const rawLoc = params?.locale;
  const locale = Array.isArray(rawLoc) ? rawLoc[0] : rawLoc || 'fr';
  const appointmentId = searchParams.get('appointmentId') || '';
  const token = searchParams.get('t') || '';
  const openBooking = searchParams.get('open') === 'booking';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApptData | null>(null);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    let cancelledReq = false;
    (async () => {
      if (!token) {
        setError('Lien incomplet (jeton manquant).');
        setLoading(false);
        return;
      }
      try {
        const q = appointmentId
          ? `appointmentId=${encodeURIComponent(appointmentId)}&t=${encodeURIComponent(token)}`
          : `t=${encodeURIComponent(token)}`;
        const res = await fetch(`${DEMO_API}/appointment/by-token?${q}`);
        const raw: unknown = await res.json();
        if (cancelledReq) return;
        const parsed = normalizeDemoBackendResponse(raw) as {
          success?: boolean;
          data?: ApptData;
        };
        if (!parsed.success || !parsed.data) {
          setError(demoResponseErrorMessage(parsed) || 'Impossible de charger ce rendez-vous.');
          setData(null);
        } else {
          setData(parsed.data);
          setError('');
        }
      } catch {
        if (!cancelledReq) setError('Erreur réseau. Réessayez plus tard.');
      } finally {
        if (!cancelledReq) setLoading(false);
      }
    })();
    return () => {
      cancelledReq = true;
    };
  }, [appointmentId, token]);

  useEffect(() => {
    if (loading || !data || !openBooking) return;
    const dr = data.demoRequestId;
    if (!dr) return;
    router.replace(`/${locale}/demo?demoRequestId=${encodeURIComponent(dr)}&step=2`);
  }, [loading, data, openBooking, locale, router]);

  const handleCancel = async () => {
    if (!window.confirm('Annuler ce rendez-vous ? Le créneau sera libéré.')) return;
    setCancelling(true);
    setError('');
    try {
      const res = await fetch(`${DEMO_API}/appointment/cancel-by-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentId ? { appointmentId, token } : { token }),
      });
      const raw: unknown = await res.json();
      const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean; error?: string };
      if (!parsed.success) {
        setError(demoResponseErrorMessage(parsed) || "Annulation impossible.");
        return;
      }
      setCancelled(true);
    } catch {
      setError('Erreur réseau lors de l’annulation.');
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (ymd: string) => {
    try {
      return new Date(`${ymd}T12:00:00Z`).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/Paris',
      });
    } catch {
      return ymd;
    }
  };

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Votre rendez-vous démo" />
        <section style={{ padding: '60px 24px 100px', minHeight: '70vh', maxWidth: 640, margin: '0 auto' }}>
          {loading && <p style={{ color: 'var(--text-2)' }}>Chargement…</p>}
          {!loading && error && (
            <div
              style={{
                padding: 20,
                borderRadius: 12,
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.35)',
                color: '#fecaca',
              }}
            >
              {error}
            </div>
          )}
          {!loading && data && !cancelled && (
            <div
              style={{
                padding: 28,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <h1 style={{ fontSize: 22, margin: '0 0 8px', color: 'var(--text-1)' }}>Détail du créneau</h1>
              <p style={{ margin: '0 0 20px', color: 'var(--text-2)', fontSize: 15 }}>
                {formatDate(data.date)} · {data.startTime} – {data.endTime}
              </p>
              {data.agent && (
                <p style={{ margin: '0 0 24px', color: 'var(--text-2)', fontSize: 14 }}>
                  Avec {data.agent.firstName} {data.agent.lastName}
                </p>
              )}
              <p style={{ margin: '0 0 20px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6 }}>
                Pour <strong>modifier</strong> l’horaire : annulez ce rendez-vous, puis reprenez le lien reçu par
                e-mail après votre demande (« choisir un créneau »).
              </p>
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling || data.status === 'cancelled'}
                style={{
                  padding: '12px 22px',
                  borderRadius: 10,
                  border: '1px solid rgba(239,68,68,0.5)',
                  background: 'rgba(239,68,68,0.15)',
                  color: '#fecaca',
                  fontWeight: 700,
                  cursor: cancelling ? 'wait' : 'pointer',
                }}
              >
                {cancelling ? 'Annulation…' : 'Annuler ce rendez-vous'}
              </button>
            </div>
          )}
          {cancelled && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 18, color: 'var(--text-1)', marginBottom: 16 }}>Rendez-vous annulé.</p>
              <Link href="/demo" style={{ color: '#f4cf5e', fontWeight: 600 }}>
                Retour à la page démo
              </Link>
            </div>
          )}
        </section>
        <PageFooter />
      </div>
    </>
  );
}

export default function DemoRdvPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 48, textAlign: 'center', color: '#a8a29e' }}>
          Chargement…
        </div>
      }
    >
      <DemoRdvContent />
    </Suspense>
  );
}
