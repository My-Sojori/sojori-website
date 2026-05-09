"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useMessages, useLocale } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import Link from 'next/link';
import { PhoneDialSelect } from '@/components/demo/PhoneDialSelect';

/** API démo via routes Next.js → srv-user (même origine que le site). */
const DEMO_API = '/api/v1/demo';

/** Tag BCP 47 pour `Intl` (aligné sur les locales du site). */
const BOOKING_INTL_LOCALE: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-PT',
  ar: 'ar-MA',
};

function bookingIntlLocale(locale: string): string {
  return BOOKING_INTL_LOCALE[locale] ?? locale;
}

type BookingDay = { date: string; label: string; slots: { id: string; startTime: string; endTime: string }[] };
type BookingWeekData = { agent: { id: string; firstName: string; lastName: string }; days: BookingDay[] };
type BookingWeekApiData =
  | BookingWeekData
  | {
      alreadyBooked: true;
      appointment: {
        appointmentId: string;
        date: string;
        startTime: string;
        endTime: string;
        agent: { id: string; firstName: string; lastName: string };
      };
    }
  | {
      noAgent: true;
      message?: string;
      agent: null;
      days: BookingDay[];
    };

function DemoPageContent() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('demo');
  const messages = useMessages() as {
    demo?: { step3?: { propertyTypeOptions?: string[] } };
  };
  const propertyTypeOptionLabels = messages.demo?.step3?.propertyTypeOptions ?? [];
  const PROPERTY_TYPE_VALUES = ['Appartement', 'Villa', 'Maison', "Chambre d'hôtel", 'Résidence', 'Autre'] as const;

  const intlTag = bookingIntlLocale(locale);
  const formatBookingDateFull = (dateYmd: string) =>
    new Date(`${dateYmd}T12:00:00`).toLocaleDateString(intlTag, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  const formatBookingDateShort = (dateYmd: string) =>
    new Date(`${dateYmd}T12:00:00`).toLocaleDateString(intlTag, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  const [step, setStep] = useState(1);
  const [source, setSource] = useState<string>('website'); // Default source

  const [formData, setFormData] = useState({
    // Step 1
    countryCode: '+33',
    dialCountryIso: 'FR',
    email: '',
    phone: '',
    numberOfProperties: '',
    // Step 2
    fullName: '',
    company: '',
    propertyTypes: [] as string[],
    currentPMS: '',
    currentChannelManager: '',
    currentDynamicPricing: '',
    currentWhatsApp: '',
    timeline: '',
    biggestChallenges: '',
    expectations: '',
    newPropertiesNext12Months: '0',
    hearAboutUs: '',
    promoCode: '',
    roleType: '',
  });

  // Capture source from URL on component mount
  useEffect(() => {
    const sourceParam = searchParams.get('source');
    if (sourceParam) {
      setSource(sourceParam);
      console.log('📍 Source captured:', sourceParam);
    }
  }, [searchParams]);

  /** Lien e-mail : /…/demo?demoRequestId=…&step=2 */
  useEffect(() => {
    if (resumeFromUrlApplied.current) return;
    const id = searchParams.get('demoRequestId')?.trim() ?? '';
    const stepRaw = searchParams.get('step')?.trim() ?? '';
    if (!id || !/^[a-f0-9]{24}$/i.test(id)) return;
    const stepNum = stepRaw ? Number.parseInt(stepRaw, 10) : 2;
    if (stepNum !== 2 && stepNum !== 3 && stepNum !== 4) return;
    resumeFromUrlApplied.current = true;
    setDemoRequestId(id);
    setStep(stepNum);
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [demoRequestId, setDemoRequestId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [bookingChecking, setBookingChecking] = useState(true);
  const [bookingWeek, setBookingWeek] = useState<BookingWeekData | null>(null);
  const [bookingError, setBookingError] = useState('');
  /** API sans agent : message + e-mail envoyé côté backend */
  const [bookingNoAgentMessage, setBookingNoAgentMessage] = useState('');
  const resumeFromUrlApplied = useRef(false);
  const [selectedDateYmd, setSelectedDateYmd] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    id: string;
    startTime: string;
    endTime: string;
    date: string;
  } | null>(null);
  /** RDV déjà lié à la demande : on saute calendrier + questionnaire, écran final seul. */
  const [calendarSkippedAlreadyBooked, setCalendarSkippedAlreadyBooked] = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    let cancelled = false;
    (async () => {
      setError('');
      setBookingChecking(true);
      setBookingError('');
      setBookingWeek(null);
      setBookingNoAgentMessage('');
      setSelectedSlot(null);
      setSelectedDateYmd(null);
      const t0 = Date.now();
      try {
        const qs = demoRequestId
          ? `?demoRequestId=${encodeURIComponent(demoRequestId)}`
          : '';
        const res = await fetch(`${DEMO_API}/booking-week${qs}`);
        const data = await res.json();
        if (cancelled) return;
        if (!data.success) {
          throw new Error(data.error || 'Impossible de charger les disponibilités');
        }
        const raw = data.data as BookingWeekApiData;
        if ('noAgent' in raw && raw.noAgent) {
          setBookingWeek(null);
          setBookingNoAgentMessage(raw.message || t('step2.noAgentNotice'));
          setCalendarSkippedAlreadyBooked(false);
          const elapsed = Date.now() - t0;
          const MIN_MS = 5000;
          if (elapsed < MIN_MS) {
            await new Promise((r) => setTimeout(r, MIN_MS - elapsed));
          }
          if (cancelled) return;
          setBookingChecking(false);
          return;
        }
        if ('alreadyBooked' in raw && raw.alreadyBooked && raw.appointment) {
          const a = raw.appointment;
          setSelectedSlot({
            id: a.appointmentId,
            date: a.date,
            startTime: a.startTime,
            endTime: a.endTime,
          });
          setBookingWeek(null);
          setSelectedDateYmd(null);
          setBookingChecking(false);
          setCalendarSkippedAlreadyBooked(true);
          setStep(4);
          return;
        }
        setCalendarSkippedAlreadyBooked(false);
        const elapsed = Date.now() - t0;
        const MIN_MS = 5000;
        if (elapsed < MIN_MS) {
          await new Promise((r) => setTimeout(r, MIN_MS - elapsed));
        }
        if (cancelled) return;
        const payload = raw as BookingWeekData;
        setBookingWeek(payload);
        /* Pas de jour présélectionné : on n’affiche les créneaux qu’après clic sur un jour. */
        setSelectedDateYmd(null);
      } catch (err: unknown) {
        if (!cancelled) {
          setBookingError(err instanceof Error ? err.message : 'Erreur réseau');
        }
      } finally {
        if (!cancelled) setBookingChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [step, demoRequestId]);

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const t0 = Date.now();
    const MIN_STEP1_MS = 5000;

    const waitRemainingMin = async () => {
      const elapsed = Date.now() - t0;
      if (elapsed < MIN_STEP1_MS) {
        await new Promise((r) => setTimeout(r, MIN_STEP1_MS - elapsed));
      }
    };

    try {
      const USE_MOCK = false;

      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setDemoRequestId(mockId);
        setCalendarSkippedAlreadyBooked(false);
        await waitRemainingMin();
        setStep(2);
      } else {
        const response = await fetch(`${DEMO_API}/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            countryCode: formData.countryCode,
            numberOfProperties: formData.numberOfProperties,
            source: source,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to submit demo request');
        }

        setDemoRequestId(data.data.id);
        setCalendarSkippedAlreadyBooked(false);
        await waitRemainingMin();
        setStep(2);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.';
      const hint =
        typeof msg === 'string' &&
        (msg.includes('connect') || msg.includes('Failed to fetch') || msg.includes('backend'))
          ? ' En local : lancez srv-user et définissez SRV_USER_URL dans .env.local (ex. http://localhost:4005).'
          : '';
      setError(`${msg}${hint}`);
      console.error('Error submitting step 1:', err);
    } finally {
      setLoading(false);
    }
  };

  /** Nom affiché sur le RDV avant d’avoir le nom complet (étape suivante). */
  const provisionalClientName = () => {
    const local = formData.email.split('@')[0]?.replace(/[.+_]/g, ' ').trim();
    return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'Invité';
  };

  const handleConfirmSlot = async () => {
    if (!selectedSlot?.id || !demoRequestId) {
      setError('Choisissez un créneau avant de continuer.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const bookRes = await fetch(`${DEMO_API}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoRequestId,
          slotId: selectedSlot.id,
          clientName: provisionalClientName(),
        }),
      });
      const bookData = await bookRes.json();
      if (!bookData.success) {
        throw new Error(bookData.error || 'Impossible de réserver ce créneau');
      }
      setError('');
      setCalendarSkippedAlreadyBooked(false);
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Error confirming slot:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQualification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoRequestId) {
      setError('Session invalide. Recommencez depuis l’étape 1.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const qualRes = await fetch(`${DEMO_API}/request/${demoRequestId}/qualify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          propertyTypes: formData.propertyTypes,
          currentPMS: formData.currentPMS,
          currentChannelManager: formData.currentChannelManager,
          currentDynamicPricing: formData.currentDynamicPricing,
          currentWhatsApp: formData.currentWhatsApp,
          timeline: formData.timeline,
          biggestChallenges: formData.biggestChallenges,
          expectations: formData.expectations,
          newPropertiesNext12Months: parseInt(formData.newPropertiesNext12Months, 10) || 0,
          hearAboutUs: formData.hearAboutUs,
          promoCode: formData.promoCode,
          roleType: formData.roleType,
        }),
      });
      const qualData = await qualRes.json();
      if (!qualData.success) {
        throw new Error(qualData.error || 'Échec de l’envoi du questionnaire');
      }

      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting qualification:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePropertyType = (value: string) => {
    const current = formData.propertyTypes;
    setFormData({
      ...formData,
      propertyTypes: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--text-1)',
    fontSize: 14,
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: 'var(--text-2)'
  };

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Demander une démo" />

        <section style={{ padding: '80px 32px 100px', minHeight: '80vh' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>

            {/* STEP 1: Simple Form (Email + Phone) */}
            {step === 1 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                  <span className="badge" style={{ marginBottom: 20 }}>
                    <span className="badge-dot"></span> {t('step1.badge')}
                  </span>
                  <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
                    {t('step1.title')} <span className="gradient-text">{t('step1.titleGradient')}</span>
                  </h1>
                  <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
                    {t('step1.subtitle')}
                  </p>
                </div>

                <div className="glass" style={{ padding: 40, borderRadius: 16, position: 'relative' }}>
                  {error && !loading && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                  {loading && (
                    <div
                      role="status"
                      aria-live="polite"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 12,
                        borderRadius: 16,
                        background: 'var(--glass-strong)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 28,
                        textAlign: 'center',
                      }}
                    >
                      <div className="demo-cal-spinner" aria-hidden />
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: 'var(--text)',
                          marginBottom: 8,
                          marginTop: 8,
                        }}
                      >
                        {t('step1.loadingTitle')}
                      </p>
                      <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 4, maxWidth: 400 }}>
                        {t('step1.loadingDescription')}
                      </p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary-deep)' }}>
                        {t('step1.loadingWait')}
                      </p>
                      <div className="demo-cal-dots" aria-hidden>
                        <span className="demo-cal-dot" />
                        <span className="demo-cal-dot" />
                        <span className="demo-cal-dot" />
                      </div>
                      <div className="demo-cal-shimmer-track" aria-hidden style={{ maxWidth: 280, width: '100%', marginTop: 8 }} />
                    </div>
                  )}

                  <form onSubmit={handleSubmitStep1} style={{ opacity: loading ? 0.35 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle as React.CSSProperties}>{t('step1.emailLabel')}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('step1.emailPlaceholder')}
                        style={inputStyle}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 14,
                        marginBottom: 28,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: '1 1 280px', minWidth: 220 }}>
                        <PhoneDialSelect
                          dial={formData.countryCode}
                          iso={formData.dialCountryIso}
                          onSelect={(d, iso) =>
                            setFormData((prev) => ({ ...prev, countryCode: d, dialCountryIso: iso }))
                          }
                          inputStyle={inputStyle}
                          labelStyle={labelStyle as React.CSSProperties}
                        />
                      </div>
                      <div style={{ flex: '2 1 220px', minWidth: 180 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step1.phoneLabel')}</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t('step1.phonePlaceholder')}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle as React.CSSProperties}>{t('step1.propertiesLabel')}</label>
                      <select
                        name="numberOfProperties"
                        value={formData.numberOfProperties}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      >
                        <option value="">{t('step1.propertiesPlaceholder')}</option>
                        <option value="1">{t('step1.propertiesOptions.1')}</option>
                        <option value="2-5">{t('step1.propertiesOptions.2-5')}</option>
                        <option value="6-10">{t('step1.propertiesOptions.6-10')}</option>
                        <option value="11-20">{t('step1.propertiesOptions.11-20')}</option>
                        <option value="21-50">{t('step1.propertiesOptions.21-50')}</option>
                        <option value="51+">{t('step1.propertiesOptions.51+')}</option>
                      </select>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? t('step1.submitButtonLoading') : t('step1.submitButton')}
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 16 }}>
                      {t('step1.disclaimer')}
                    </p>
                  </form>
                </div>
              </>
            )}

            {/* STEP 2 : choix du créneau (semaine à partir de demain, fuseau Paris / backend) */}
            {step === 2 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <span className="badge" style={{ marginBottom: 20 }}>
                    <span className="badge-dot"></span> {t('step2.badge')}
                  </span>
                  <h2 style={{ marginBottom: 14, fontSize: 34 }}>
                    {t('step2.title')} <span className="gradient-text">{t('step2.titleGradient')}</span> {t('step2.titleEnd')}
                  </h2>
                  <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto' }}>
                    {t('step2.subtitle')}
                  </p>
                </div>

                <div
                  className="glass"
                  style={{
                    padding: 36,
                    borderRadius: 16,
                    border: '1px solid var(--border-strong)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {error && !bookingChecking && bookingWeek && (
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '2px solid var(--error)',
                        marginBottom: 24,
                        color: '#991b1b',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {bookingChecking && (
                    <div
                      role="status"
                      aria-live="polite"
                      style={{
                        textAlign: 'center',
                        padding: '40px 20px 48px',
                        maxWidth: 420,
                        margin: '0 auto',
                      }}
                    >
                      <div className="demo-cal-spinner" aria-hidden />
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: 'var(--text)',
                          marginBottom: 8,
                        }}
                      >
                        {t('step2.loadingTitle')}
                      </p>
                      <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 4 }}>
                        {t('step2.loadingDescription')}
                      </p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary-deep)' }}>
                        {t('step2.loadingWait')}
                      </p>
                      <div className="demo-cal-dots" aria-hidden>
                        <span className="demo-cal-dot" />
                        <span className="demo-cal-dot" />
                        <span className="demo-cal-dot" />
                      </div>
                      <div className="demo-cal-shimmer-track" aria-hidden />
                    </div>
                  )}

                  {!bookingChecking && bookingError && (
                    <div
                      style={{
                        padding: 20,
                        borderRadius: 12,
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '2px solid var(--error)',
                        color: '#991b1b',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {bookingError}
                    </div>
                  )}

                  {!bookingChecking && !bookingError && bookingNoAgentMessage && (
                    <div
                      style={{
                        padding: 20,
                        borderRadius: 12,
                        background: 'rgba(59, 130, 246, 0.08)',
                        border: '1px solid rgba(37, 99, 235, 0.35)',
                        color: 'var(--text)',
                        fontSize: 15,
                        lineHeight: 1.55,
                        fontWeight: 500,
                      }}
                    >
                      {bookingNoAgentMessage}
                    </div>
                  )}

                  {!bookingChecking && !bookingError && bookingWeek && (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          flexWrap: 'wrap',
                          marginBottom: 22,
                          padding: '12px 16px',
                          borderRadius: 10,
                          background: 'rgba(244, 207, 94, 0.12)',
                          border: '1px solid rgba(184, 136, 26, 0.2)',
                        }}
                      >
                        <span style={{ fontSize: 18, opacity: 0.85 }} aria-hidden>
                          👤
                        </span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '0.02em' }}>
                            {t('step2.agentLabel')}
                          </div>
                          <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>
                            {bookingWeek.agent.firstName} {bookingWeek.agent.lastName}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>
                        {t('step2.chooseDayLabel')}
                      </p>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
                          gap: 12,
                          marginBottom: 28,
                        }}
                      >
                        {bookingWeek.days.map((d) => {
                          const active = selectedDateYmd === d.date;
                          const count = d.slots.length;
                          const full = count === 0;
                          return (
                            <button
                              key={d.date}
                              type="button"
                              onClick={() => {
                                setSelectedDateYmd(d.date);
                                setSelectedSlot(null);
                              }}
                              style={{
                                padding: '12px 10px',
                                borderRadius: 10,
                                cursor: full ? 'default' : 'pointer',
                                textAlign: 'center',
                                border: active
                                  ? '1px solid rgba(184, 136, 26, 0.55)'
                                  : '1px solid var(--glass-border)',
                                background: active
                                  ? 'rgba(244, 207, 94, 0.18)'
                                  : full
                                    ? 'var(--bg-2)'
                                    : 'var(--bg-1)',
                                boxShadow: active ? '0 0 0 2px rgba(244, 207, 94, 0.35)' : 'none',
                                color: 'var(--text)',
                                transition: 'background 0.15s ease, box-shadow 0.15s ease',
                                opacity: full ? 0.72 : 1,
                              }}
                            >
                              <span style={{ display: 'block', fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}>
                                {d.label}
                              </span>
                              <span
                                style={{
                                  display: 'block',
                                  marginTop: 5,
                                  fontSize: 11,
                                  fontWeight: 500,
                                  color: full ? 'var(--text-3)' : 'var(--success)',
                                }}
                              >
                                {full ? t('step2.fullLabel') : `${count} ${count > 1 ? t('step2.availablePluralLabel') : t('step2.availableLabel')}`}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {!selectedDateYmd && (
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: 'var(--text-3)',
                            marginBottom: 22,
                            lineHeight: 1.5,
                          }}
                        >
                          {t('step2.selectDatePrompt')}
                        </p>
                      )}

                      {selectedDateYmd && (
                        <div
                          style={{
                            marginBottom: 26,
                            padding: '16px 18px',
                            borderRadius: 10,
                            background: 'var(--bg-2)',
                            border: '1px solid var(--glass-border)',
                          }}
                        >
                          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
                            {t('step2.availableSlotsLabel')}
                          </h3>
                          {(() => {
                            const day = bookingWeek.days.find((x) => x.date === selectedDateYmd);
                            if (!day?.slots.length) {
                              return (
                                <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-2)' }}>
                                  {t('step2.noSlotsMessage')}
                                </p>
                              );
                            }
                            return (
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
                                  gap: 8,
                                }}
                              >
                                {day.slots.map((s) => {
                                  const picked =
                                    selectedSlot?.id === s.id && selectedSlot.date === selectedDateYmd;
                                  return (
                                    <button
                                      key={s.id}
                                      type="button"
                                      onClick={() =>
                                        setSelectedSlot({
                                          id: s.id,
                                          startTime: s.startTime,
                                          endTime: s.endTime,
                                          date: selectedDateYmd,
                                        })
                                      }
                                      style={{
                                        padding: '11px 10px',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        borderRadius: 8,
                                        border: picked
                                          ? '1px solid rgba(184, 136, 26, 0.5)'
                                          : '1px solid var(--glass-border)',
                                        background: picked ? 'rgba(244, 207, 94, 0.28)' : 'var(--bg-1)',
                                        color: 'var(--text)',
                                        boxShadow: picked ? '0 0 0 2px rgba(244, 207, 94, 0.25)' : 'none',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {s.startTime} – {s.endTime}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn btn-ghost"
                          style={{
                            padding: '12px 20px',
                            fontWeight: 500,
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text)',
                          }}
                        >
                          {t('step2.backButton')}
                        </button>
                        <button
                          type="button"
                          disabled={!selectedSlot || loading}
                          onClick={() => void handleConfirmSlot()}
                          className="btn btn-primary"
                          style={{
                            padding: '12px 24px',
                            fontWeight: 600,
                            opacity: !selectedSlot || loading ? 0.45 : 1,
                          }}
                        >
                          {loading ? t('step2.confirmButtonLoading') : t('step2.confirmButton')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* STEP 3: Detailed Qualification Form */}
            {step === 3 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <span className="badge" style={{ marginBottom: 20 }}>
                    <span className="badge-dot"></span> {t('step3.badge')}
                  </span>
                  <h2 style={{ marginBottom: 14, fontSize: 36 }}>
                    {t('step3.title')} <span className="gradient-text">{t('step3.titleGradient')}</span>
                  </h2>
                  <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
                    {t('step3.subtitle')}
                  </p>
                  {selectedSlot && (
                    <p style={{ fontSize: 14, color: '#f4cf5e', marginTop: 16 }}>
                      {t('step3.appointmentLabel')}{' '}
                      {formatBookingDateShort(selectedSlot.date)}{' '}
                      · {selectedSlot.startTime} – {selectedSlot.endTime}
                    </p>
                  )}
                </div>

                <div className="glass" style={{ padding: 40, borderRadius: 16 }}>
                  {error && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmitQualification}>

                    {/* Informations de base */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>{t('step3.basicInfoTitle')}</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.fullNameLabel')}</label>
                          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder={t('step3.fullNamePlaceholder')} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.companyLabel')}</label>
                          <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder={t('step3.companyPlaceholder')} style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.roleLabel')}</label>
                        <select name="roleType" required value={formData.roleType} onChange={handleChange} style={inputStyle}>
                          <option value="">{t('step3.rolePlaceholder')}</option>
                          <option value="property-manager">{t('step3.roleOptions.property-manager')}</option>
                          <option value="owner">{t('step3.roleOptions.owner')}</option>
                          <option value="agency">{t('step3.roleOptions.agency')}</option>
                          <option value="hotel">{t('step3.roleOptions.hotel')}</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.propertyTypesLabel')}</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                          {PROPERTY_TYPE_VALUES.map((value, idx) => (
                            <label key={value} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--glass-border)', background: formData.propertyTypes.includes(value) ? 'rgba(230,176,34,0.15)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', fontSize: 13 }}>
                              <input type="checkbox" checked={formData.propertyTypes.includes(value)} onChange={() => togglePropertyType(value)} style={{ cursor: 'pointer' }} />
                              {propertyTypeOptionLabels[idx] ?? value}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Outils actuels */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>{t('step3.currentToolsTitle')}</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.currentPMSLabel')}</label>
                          <input type="text" name="currentPMS" value={formData.currentPMS} onChange={handleChange} placeholder={t('step3.currentPMSPlaceholder')} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.currentChannelManagerLabel')}</label>
                          <input type="text" name="currentChannelManager" value={formData.currentChannelManager} onChange={handleChange} placeholder={t('step3.currentChannelManagerPlaceholder')} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.currentDynamicPricingLabel')}</label>
                          <input type="text" name="currentDynamicPricing" value={formData.currentDynamicPricing} onChange={handleChange} placeholder={t('step3.currentDynamicPricingPlaceholder')} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>{t('step3.currentWhatsAppLabel')}</label>
                          <input type="text" name="currentWhatsApp" value={formData.currentWhatsApp} onChange={handleChange} placeholder={t('step3.currentWhatsAppPlaceholder')} style={inputStyle} />
                        </div>
                      </div>
                    </div>

                    {/* Besoins et timing */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>{t('step3.needsTitle')}</h3>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.timelineLabel')}</label>
                        <select name="timeline" required value={formData.timeline} onChange={handleChange} style={inputStyle}>
                          <option value="">{t('step3.timelinePlaceholder')}</option>
                          <option value="asap">{t('step3.timelineOptions.asap')}</option>
                          <option value="1month">{t('step3.timelineOptions.1month')}</option>
                          <option value="1-3months">{t('step3.timelineOptions.1-3months')}</option>
                          <option value="3-6months">{t('step3.timelineOptions.3-6months')}</option>
                          <option value="exploring">{t('step3.timelineOptions.exploring')}</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.newPropertiesLabel')}</label>
                        <input type="number" name="newPropertiesNext12Months" value={formData.newPropertiesNext12Months} onChange={handleChange} placeholder={t('step3.newPropertiesPlaceholder')} min="0" style={inputStyle} />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.challengesLabel')}</label>
                        <textarea name="biggestChallenges" required value={formData.biggestChallenges} onChange={handleChange} placeholder={t('step3.challengesPlaceholder')} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.expectationsLabel')}</label>
                        <textarea name="expectations" required value={formData.expectations} onChange={handleChange} placeholder={t('step3.expectationsPlaceholder')} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>
                    </div>

                    {/* Informations complémentaires */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>{t('step3.additionalInfoTitle')}</h3>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.hearAboutUsLabel')}</label>
                        <select name="hearAboutUs" required value={formData.hearAboutUs} onChange={handleChange} style={inputStyle}>
                          <option value="">{t('step3.hearAboutUsPlaceholder')}</option>
                          <option value="google">{t('step3.hearAboutUsOptions.google')}</option>
                          <option value="linkedin">{t('step3.hearAboutUsOptions.linkedin')}</option>
                          <option value="facebook">{t('step3.hearAboutUsOptions.facebook')}</option>
                          <option value="referral">{t('step3.hearAboutUsOptions.referral')}</option>
                          <option value="blog">{t('step3.hearAboutUsOptions.blog')}</option>
                          <option value="event">{t('step3.hearAboutUsOptions.event')}</option>
                          <option value="other">{t('step3.hearAboutUsOptions.other')}</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle as React.CSSProperties}>{t('step3.promoCodeLabel')}</label>
                        <input type="text" name="promoCode" value={formData.promoCode} onChange={handleChange} placeholder={t('step3.promoCodePlaceholder')} style={inputStyle} />
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>
                      {t('step3.scheduleNote')}
                    </p>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? t('step3.submitButtonLoading') : t('step3.submitButton')}
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* STEP 4: Confirmation (parcours complet ou RDV déjà en place sans questionnaire) */}
            {step === 4 && (
              <div className="glass" style={{ padding: 60, borderRadius: 16, textAlign: 'center' }}>
                {calendarSkippedAlreadyBooked ? (
                  <>
                    <div style={{ fontSize: 56, marginBottom: 24 }} aria-hidden>
                      📅
                    </div>
                    <span className="badge" style={{ marginBottom: 16, display: 'inline-block' }}>
                      <span className="badge-dot" /> {t('step4.alreadyBooked.badge')}
                    </span>
                    <h2 style={{ fontSize: 36, marginBottom: 18 }}>
                      {t('step4.alreadyBooked.title')} <span className="gradient-text">{t('step4.alreadyBooked.titleGradient')}</span>
                    </h2>
                    <p
                      style={{
                        fontSize: 16,
                        color: 'var(--text-2)',
                        maxWidth: 560,
                        margin: '0 auto 20px',
                        lineHeight: 1.65,
                        textAlign: 'left',
                      }}
                    >
                      <strong style={{ color: 'var(--text)' }}>
                        {t('step4.alreadyBooked.appointmentPrefix')}
                        {selectedSlot
                          ? ` ${t('step4.alreadyBooked.appointmentOn')} ${formatBookingDateFull(selectedSlot.date)}, ${t('step4.alreadyBooked.appointmentFrom')} ${selectedSlot.startTime} ${t('step4.alreadyBooked.appointmentTo')} ${selectedSlot.endTime}`
                          : ` ${t('step4.alreadyBooked.appointmentForRequest')}`}
                        .
                      </strong>{' '}
                      {t('step4.alreadyBooked.checkEmail')}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
                      {t('step4.alreadyBooked.noFormNeeded')}{' '}
                      <strong>{formData.email}</strong>.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                      <Link href="/" className="btn btn-primary btn-lg">
                        {t('step4.alreadyBooked.backToHome')}
                      </Link>
                      <Link href="/pricing" className="btn btn-ghost btn-lg">
                        {t('step4.alreadyBooked.viewPricing')}
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
                    <h2 style={{ fontSize: 40, marginBottom: 18 }}>
                      {t('step4.confirmed.title')} <span className="gradient-text">{t('step4.confirmed.titleGradient')}</span>
                    </h2>
                    <p style={{ fontSize: 17, color: 'var(--text-2)', marginBottom: 12, maxWidth: 520, margin: '0 auto 12px' }}>
                      {t('step4.confirmed.message')}{' '}
                      <strong style={{ color: '#f4cf5e' }}>{t('step4.confirmed.contactTime')}</strong> {t('step4.confirmed.ifNeeded')}
                    </p>
                    {selectedSlot && (
                      <p style={{ fontSize: 15, color: '#f4cf5e', marginBottom: 16, maxWidth: 480, margin: '0 auto 16px' }}>
                        {t('step4.confirmed.appointmentLabel')}{' '}
                        {formatBookingDateFull(selectedSlot.date)}{' '}
                        {t('step4.confirmed.appointmentAt')} {selectedSlot.startTime}
                      </p>
                    )}
                    <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 40 }}>
                      {t('step4.confirmed.emailSent')} <strong>{formData.email}</strong>
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 50 }}>
                      <Link href="/" className="btn btn-primary btn-lg">
                        {t('step4.confirmed.backToHome')}
                      </Link>
                      <Link href="/pricing" className="btn btn-ghost btn-lg">
                        {t('step4.confirmed.viewPricing')}
                      </Link>
                    </div>

                    <div
                      style={{
                        borderTop: '1px solid var(--glass-border)',
                        paddingTop: 30,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 24,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('step4.confirmed.feature1Title')}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('step4.confirmed.feature1Desc')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('step4.confirmed.feature2Title')}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('step4.confirmed.feature2Desc')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>💰</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('step4.confirmed.feature3Title')}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('step4.confirmed.feature3Desc')}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Trust indicators */}
            {(step === 1 || step === 2 || step === 3 || (step === 4 && calendarSkippedAlreadyBooked)) && (
              <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('trustCards.setup.title')}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('trustCards.setup.description')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('trustCards.secure.title')}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('trustCards.secure.description')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>💰</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('trustCards.trial.title')}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('trustCards.trial.description')}</div>
                </div>
              </div>
            )}

          </div>
        </section>

        <PageFooter />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          /* Reduce section padding */
          section {
            padding: 60px 20px 80px !important;
          }

          /* Glass cards - reduce padding */
          .glass {
            padding: 28px !important;
          }

          /* 2-column grids → single column */
          .glass form > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          /* Trust indicators and feature grids → single column */
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* Calendar day buttons - 2 columns on mobile */
          div[style*="grid-template-columns: repeat(auto-fill, minmax(112px, 1fr))"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Time slot buttons - 2 columns on mobile */
          div[style*="grid-template-columns: repeat(auto-fill, minmax(128px, 1fr))"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Button groups - stack on small screens */
          @media (max-width: 480px) {
            div[style*="display: flex"][style*="gap: 12"] button {
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemoPageContent />
    </Suspense>
  );
}
