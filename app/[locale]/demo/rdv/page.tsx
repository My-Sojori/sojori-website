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
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const CANCEL_REASONS = [
    { value: '', label: 'Sélectionnez une raison...' },
    { value: 'reschedule_later', label: 'Je reprendrai rendez-vous plus tard' },
    { value: 'changed_mind', label: "J'ai changé d'avis" },
    { value: 'found_alternative', label: "J'ai trouvé une autre solution" },
    { value: 'not_available', label: 'Je ne suis plus disponible à cette date' },
    { value: 'not_ready', label: 'Ce n\'est pas le bon moment pour moi' },
    { value: 'need_more_info', label: "J'ai besoin de plus d'informations avant" },
    { value: 'duplicate', label: "C'est un doublon / erreur de réservation" },
    { value: 'other', label: 'Autre raison' },
  ];

  useEffect(() => {
    let aborted = false;
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
        if (aborted) return;
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
        if (!aborted) setError('Erreur réseau. Veuillez recharger la page.');
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [appointmentId, token]);

  useEffect(() => {
    if (loading || !data || !openBooking) return;
    const dr = data.demoRequestId;
    if (!dr) return;
    router.replace(`/${locale}/demo?demoRequestId=${encodeURIComponent(dr)}&step=2`);
  }, [loading, data, openBooking, locale, router]);

  const doCancelByToken = async (reason?: string): Promise<boolean> => {
    setCancelling(true);
    setError('');
    try {
      const payload: Record<string, unknown> = appointmentId ? { appointmentId, token } : { token };
      if (reason) payload.cancelReason = reason;
      const res = await fetch(`${DEMO_API}/appointment/cancel-by-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const raw: unknown = await res.json();
      const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean; error?: string };
      if (!parsed.success) {
        setError(demoResponseErrorMessage(parsed) || 'Impossible de modifier ce rendez-vous.');
        return false;
      }
      return true;
    } catch {
      setError('Erreur réseau.');
      return false;
    } finally {
      setCancelling(false);
    }
  };

  const handleReschedule = async () => {
    if (!data?.demoRequestId) return;
    setCancelling(true);
    setError('');
    try {
      const res = await fetch(`${DEMO_API}/appointment/cancel-by-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          appointmentId
            ? { appointmentId, token, isReschedule: true }
            : { token, isReschedule: true },
        ),
      });
      const raw: unknown = await res.json();
      const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean; data?: { appointmentId?: string } };
      if (parsed.success) {
        const fromId = parsed.data?.appointmentId || data.appointmentId;
        router.replace(
          `/${locale}/demo?demoRequestId=${encodeURIComponent(data.demoRequestId)}&step=2&rescheduledFromId=${encodeURIComponent(fromId)}`,
        );
      } else {
        setError('Impossible de modifier ce rendez-vous.');
      }
    } catch {
      setError('Erreur réseau.');
    } finally {
      setCancelling(false);
    }
  };

  const handleCancel = () => {
    setShowCancelForm(true);
  };

  const confirmCancel = async () => {
    if (!cancelReason) return;
    const reasonLabel = CANCEL_REASONS.find((r) => r.value === cancelReason)?.label || cancelReason;
    const ok = await doCancelByToken(reasonLabel);
    if (ok) {
      setCancelled(true);
      setShowCancelForm(false);
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

  const isAlreadyClosed = data ? ['cancelled', 'rescheduled', 'completed', 'no_show'].includes(data.status) : false;

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Votre rendez-vous" />
        <section style={{ padding: '60px 24px 100px', minHeight: '70vh', maxWidth: 640, margin: '0 auto' }}>
          {loading && <p style={{ color: 'var(--text-2)' }}>Chargement...</p>}
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
                padding: '36px 32px',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(244,207,94,0.04) 100%)',
                border: '1px solid rgba(230,176,34,0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                maxWidth: 520,
                margin: '0 auto',
              }}
            >
              {/* Header avec icone */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontSize: 44, marginBottom: 12, lineHeight: 1 }}>
                  {isAlreadyClosed ? (data.status === 'rescheduled' ? '🔄' : '📋') : '🎉'}
                </div>
                <h1 style={{ fontSize: 24, margin: '0 0 6px', color: 'var(--text-1)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {isAlreadyClosed ? 'Rendez-vous clos' : 'Votre rendez-vous est confirmé !'}
                </h1>
                {!isAlreadyClosed && (
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-3)', fontWeight: 500 }}>
                    On a hâte de vous retrouver
                  </p>
                )}
              </div>

              {/* Carte date/heure */}
              {!isAlreadyClosed && (
                <div
                  style={{
                    padding: '18px 20px',
                    borderRadius: 14,
                    background: 'rgba(244,207,94,0.1)',
                    border: '1px solid rgba(230,176,34,0.2)',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <div style={{ fontSize: 28, lineHeight: 1 }}>{'📅'}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3, textTransform: 'capitalize' }}>
                      {formatDate(data.date)}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)', marginTop: 2 }}>
                      {data.startTime} – {data.endTime}
                    </div>
                  </div>
                </div>
              )}

              {/* Agent */}
              {data.agent && !isAlreadyClosed && (
                <div
                  style={{
                    padding: '14px 20px',
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    marginBottom: 28,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e6b022, #f4cf5e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 16,
                      color: '#1c1917',
                      flexShrink: 0,
                    }}
                  >
                    {(data.agent.firstName?.[0] || '').toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>Votre interlocuteur</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', textTransform: 'capitalize' }}>
                      {data.agent.firstName} {data.agent.lastName}
                    </div>
                  </div>
                </div>
              )}

              {isAlreadyClosed ? (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>
                    {data.status === 'rescheduled' ? '🔄' : data.status === 'cancelled' ? '❌' : '✅'}
                  </div>
                  <p style={{ margin: '0 0 24px', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    {data.status === 'rescheduled'
                      ? 'Ce rendez-vous a été modifié. Un nouveau créneau a été choisi.'
                      : data.status === 'cancelled'
                        ? 'Ce rendez-vous a été annulé. Le créneau a été libéré.'
                        : 'Ce rendez-vous est terminé. Merci pour votre confiance !'}
                  </p>
                  <Link
                    href="/demo"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '14px 32px',
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #e6b022, #d4a017)',
                      color: '#1c1917',
                      fontWeight: 800,
                      fontSize: 15,
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(230,176,34,0.3)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    {'📅'} Prendre un nouveau rendez-vous
                  </Link>
                </div>
              ) : (
                <>
                  {showCancelForm ? (
                    <div
                      style={{
                        padding: '24px',
                        borderRadius: 16,
                        background: 'rgba(239,68,68,0.04)',
                        border: '1px solid rgba(239,68,68,0.15)',
                      }}
                    >
                      <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>
                        Pourquoi souhaitez-vous annuler ?
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                        {CANCEL_REASONS.filter((r) => r.value).map((r) => (
                          <label
                            key={r.value}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '10px 14px',
                              borderRadius: 10,
                              border: cancelReason === r.value
                                ? '1.5px solid rgba(239,68,68,0.4)'
                                : '1px solid var(--glass-border)',
                              background: cancelReason === r.value
                                ? 'rgba(239,68,68,0.08)'
                                : 'rgba(255,255,255,0.03)',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              fontSize: 14,
                              color: 'var(--text-1)',
                              fontWeight: cancelReason === r.value ? 600 : 400,
                            }}
                          >
                            <input
                              type="radio"
                              name="cancelReason"
                              value={r.value}
                              checked={cancelReason === r.value}
                              onChange={() => setCancelReason(r.value)}
                              style={{ accentColor: '#ef4444', width: 16, height: 16, flexShrink: 0 }}
                            />
                            {r.label}
                          </label>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          type="button"
                          onClick={confirmCancel}
                          disabled={!cancelReason || cancelling}
                          style={{
                            flex: 1,
                            padding: '12px 20px',
                            borderRadius: 12,
                            border: 'none',
                            background: !cancelReason ? '#ccc' : '#ef4444',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: !cancelReason || cancelling ? 'not-allowed' : 'pointer',
                            opacity: cancelling ? 0.6 : 1,
                            transition: 'background 0.15s ease',
                          }}
                        >
                          {cancelling ? '⏳ Annulation...' : 'Confirmer l\'annulation'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowCancelForm(false); setCancelReason(''); }}
                          disabled={cancelling}
                          style={{
                            padding: '12px 20px',
                            borderRadius: 12,
                            border: '1px solid var(--glass-border)',
                            background: 'transparent',
                            color: 'var(--text-2)',
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: 'pointer',
                          }}
                        >
                          Retour
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                          type="button"
                          disabled={cancelling}
                          onClick={handleReschedule}
                          style={{
                            padding: '14px 28px',
                            borderRadius: 14,
                            border: 'none',
                            background: 'linear-gradient(135deg, #e6b022, #d4a017)',
                            color: '#1c1917',
                            fontWeight: 800,
                            fontSize: 15,
                            cursor: cancelling ? 'wait' : 'pointer',
                            opacity: cancelling ? 0.6 : 1,
                            boxShadow: '0 4px 16px rgba(230,176,34,0.25)',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          {cancelling ? '⏳ Chargement...' : '📅 Choisir un autre créneau'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          disabled={cancelling}
                          style={{
                            padding: '14px 28px',
                            borderRadius: 14,
                            border: '1.5px solid rgba(239,68,68,0.35)',
                            background: 'rgba(239,68,68,0.06)',
                            color: '#ef4444',
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: cancelling ? 'wait' : 'pointer',
                            opacity: cancelling ? 0.6 : 1,
                            transition: 'background 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          {cancelling ? 'Chargement...' : 'Annuler le rendez-vous'}
                        </button>
                      </div>
                      <div
                        style={{
                          marginTop: 20,
                          padding: '12px 16px',
                          borderRadius: 10,
                          background: 'rgba(59,130,246,0.06)',
                          border: '1px solid rgba(59,130,246,0.12)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                        }}
                      >
                        <span style={{ fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>{'💡'}</span>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>
                          En cliquant <strong>Choisir un autre créneau</strong>, votre rendez-vous actuel est libéré et vous êtes redirigé vers le calendrier pour choisir une nouvelle date.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {cancelled && (
            <div
              style={{
                padding: '48px 32px',
                textAlign: 'center',
                maxWidth: 480,
                margin: '0 auto',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(239,68,68,0.03) 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16, lineHeight: 1 }}>{'👋'}</div>
              <p style={{ fontSize: 22, color: 'var(--text-1)', fontWeight: 800, marginBottom: 8 }}>Rendez-vous annulé</p>
              <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 32, lineHeight: 1.5 }}>
                Votre créneau a été libéré. Vous pouvez reprendre rendez-vous à tout moment.
              </p>
              <Link
                href="/demo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #e6b022, #d4a017)',
                  color: '#1c1917',
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(230,176,34,0.3)',
                }}
              >
                {'📅'} Reprendre un rendez-vous
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
          Chargement...
        </div>
      }
    >
      <DemoRdvContent />
    </Suspense>
  );
}
