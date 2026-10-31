"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useMessages, useLocale } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { Link } from '@/i18n/routing';
import { QualificationForm, type FollowUpQuestion, type QualificationPayload } from '@/components/demo/QualificationForm';
import { ACTIVITIES } from '@/lib/demoQualification';
import { champsIdentite, erreursIdentite, paysInitial } from '@/lib/refonte/identiteDemande';
import { dialDeIso, formaterNumero, nomCrm } from '@/lib/refonte/pays';
import { ChampPays } from '@/components/refonte/ChampPays';
import { normalizeDemoBackendResponse, demoResponseErrorMessage } from '@/lib/demoApiResponse';
import { trackDemoLead, trackDemoScheduled, trackDemoQualified } from '@/lib/analytics';
import { enTetesDemande } from '@/lib/demoTest';
import { BandeauTest } from '@/components/refonte/BandeauTest';

/** API démo via routes Next.js → srv-crm (même origine que le site). */
const DEMO_API = '/api/v1/demo';

/** Le calendrier staff est coupé : le mini-formulaire enchaîne sur le questionnaire. */
const PRISE_DE_RENDEZ_VOUS = false;

/** L'écran « type d'établissement et PMS » : entre l'identité (étape 1) et le questionnaire facultatif (étape 3). */
const STEP_TYPE = 5;

/** Taille du compte, en chambres ou en biens selon le type (Tawfiq, 30/10/2026). */
const TRANCHES = ['1-5', '6-20', '21-50', '51-100', '100-200', '200+'];

/** Les types du petit formulaire (Tawfiq, 29/10/2026) : conciergerie, hôtel, riad / maison d'hôtes, villa / appartement, autre. */
const TYPES_FORMULAIRE = ['conciergerie', 'hotel', 'riad', 'villa', 'autre'];

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

  const textesPays = { search: t('step1.dialSearchPlaceholder'), none: t('step1.dialNoResults'), close: t('step1.countryClose') };
  const [step, setStep] = useState(1);
  const [source, setSource] = useState<string>('website'); // Default source

  const [formData, setFormData] = useState({
    // Step 1
    // Le pays proposé selon la langue de la page ; l'indicatif du téléphone le suit (et se change à part).
    paysIso: paysInitial(locale),
    dialIso: paysInitial(locale),
    // Écran « type d'établissement » : le PMS (Sojori ou le sien) et, pour « Autre », la précision.
    pmsChoix: '' as '' | 'sojori' | 'own',
    pmsNom: '',
    activiteAutre: '',
    ville: '',
    email: '',
    phone: '',
    numberOfProperties: '',
    // Le petit formulaire, comme Hostaway (Tawfiq, 28/10/2026) : nom, téléphone, consentement, puis le type.
    activity: '',
    // Selon le type : nombre de chambres (hôtel, riad…) ou de biens (conciergerie, villa…).
    taille: '',
    consentementMessages: false,
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
      console.log('Source captured:', sourceParam);
    }
  }, [searchParams]);

  /** Lien e-mail : /…/demo?demoRequestId=…&step=2 */
  useEffect(() => {
    if (resumeFromUrlApplied.current) return;
    const id = searchParams.get('demoRequestId')?.trim() ?? '';
    const stepRaw = searchParams.get('step')?.trim() ?? '';
    const reschedFrom = searchParams.get('rescheduledFromId')?.trim() ?? '';
    if (!id || !/^[a-f0-9]{24}$/i.test(id)) return;
    const stepNum = stepRaw ? Number.parseInt(stepRaw, 10) : 2;
    if (stepNum !== 2 && stepNum !== 3 && stepNum !== 4) return;
    resumeFromUrlApplied.current = true;
    setDemoRequestId(id);
    if (reschedFrom && /^[a-f0-9]{24}$/i.test(reschedFrom)) {
      setRescheduledFromId(reschedFrom);
    }
    setStep(stepNum);
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [demoRequestId, setDemoRequestId] = useState<string>('');
  /** Remis par le backend à l'étape 1 ; exigé pour envoyer le questionnaire. */
  const [qualificationToken, setQualificationToken] = useState<string>('');
  /** Jeton du rendez-vous, pour les questions de suivi choisies par l'IA. */
  const [appointmentToken, setAppointmentToken] = useState<string>('');
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
  const [rescheduling, setRescheduling] = useState(false);
  const [cancellingAppt, setCancellingAppt] = useState(false);
  const [apptCancelled, setApptCancelled] = useState(false);
  const [rescheduledFromId, setRescheduledFromId] = useState<string | null>(null);

  useEffect(() => {
    // Sans prise de rendez-vous, l'étape 2 n'existe plus : handleSubmitStep1 passe directement à 3.
    if (!PRISE_DE_RENDEZ_VOUS || step !== 2) return;
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
        let raw: unknown;
        try {
          raw = await res.json();
        } catch {
          throw new Error(t('errors.availability'));
        }
        const data = normalizeDemoBackendResponse(raw) as { success?: boolean; error?: string; data?: unknown };
        if (cancelled) return;
        if (data.success !== true) {
          throw new Error(demoResponseErrorMessage(data) || t('errors.availability'));
        }
        const rawWeek = data.data as BookingWeekApiData;
        if ('noAgent' in rawWeek && rawWeek.noAgent) {
          setBookingWeek(null);
          setBookingNoAgentMessage(rawWeek.message || t('step2.noAgentNotice'));
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
        if ('alreadyBooked' in rawWeek && rawWeek.alreadyBooked && rawWeek.appointment) {
          const a = rawWeek.appointment;
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
        const payload = rawWeek as BookingWeekData;
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

  const choisirActivite = (id: string) => {
    setFormData(prev => ({ ...prev, activity: id, taille: '' }));
  };

  /** Quatre coordonnées obligatoires (e-mail, nom, pays, téléphone) et l'accord (Tawfiq, 31/10/2026) ; le reste vient après. */
  const identite = () => ({ email: formData.email, nom: formData.fullName, paysIso: formData.paysIso, tel: formData.phone, consent: formData.consentementMessages });
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const err = erreursIdentite(identite());
    if (err.email) { setError(t('step1.emailRequired')); return; }
    if (err.nom) { setError(t('step1.nameRequired')); return; }
    if (err.pays) { setError(t('step1.paysRequired')); return; }
    if (err.tel) { setError(t('step1.phoneInvalid')); return; }
    if (err.consent) { setError(t('step1.consentRequired')); return; }
    void envoyerDemande();
  };

  /** Écran 1 → la demande existe dès ici (e-mail, nom, pays, téléphone) ; puis l'écran du type d'établissement. */
  const envoyerDemande = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${DEMO_API}/request`, {
        method: 'POST',
        headers: enTetesDemande({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          email: formData.email.trim(),
          ...champsIdentite(identite(), formData.dialIso),
          consentementMessages: formData.consentementMessages,
          source: source,
          // La langue de la page : celle du prospect, lue par l'agent de prospection (28/10/2026).
          langue: locale,
        }),
      });

      let rawBody: unknown;
      try {
        rawBody = await response.json();
      } catch {
        throw new Error(t('errors.invalidResponse'));
      }
      const data = normalizeDemoBackendResponse(rawBody) as {
        success?: boolean;
        error?: string;
        data?: { id?: string; qualificationToken?: string };
      };

      if (data.success !== true) {
        throw new Error(demoResponseErrorMessage(data) || t('errors.submitStep1'));
      }
      const newId = data.data?.id;
      if (!newId) {
        throw new Error(demoResponseErrorMessage(data) || t('errors.invalidResponse'));
      }

      setDemoRequestId(String(newId));
      setQualificationToken(String(data.data?.qualificationToken ?? ''));
      setCalendarSkippedAlreadyBooked(false);
      // Mode test (aperçus) : aucune conversion publicitaire.
      if (!(data.data as { test?: boolean } | undefined)?.test) trackDemoLead(source);
      setStep(STEP_TYPE);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors.submitStep1');
      setError(msg);
      console.error('Error submitting step 1:', err);
    } finally {
      setLoading(false);
    }
  };

  /** Écran 2 (obligatoire) : le type d'établissement et le PMS partent en `qualify` ; puis « C'est envoyé » et les questions facultatives. */
  const envoyerType = async (e: React.FormEvent) => {
    e.preventDefault();
    const activite = ACTIVITIES.find(item => item.id === formData.activity);
    if (!activite) { setError(t('step1.activityRequired')); return; }
    if (!formData.pmsChoix) { setError(t('step1.pmsRequired')); return; }
    if (!demoRequestId) { setError(t('errors.invalidResponse')); setStep(1); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${DEMO_API}/request/${demoRequestId}/qualify`, {
        method: 'PATCH',
        headers: enTetesDemande({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          qualificationToken,
          ...champsIdentite(identite(), formData.dialIso),
          // L'activité dans les mots du CRM : l'agent de prospection s'en sert pour choisir le commercial.
          ...(activite.crmSegment ? { segment: activite.crmSegment } : {}),
          currentPMS: formData.pmsChoix === 'sojori' ? 'Sojori' : (formData.pmsNom.trim().slice(0, 80) || 'Garde son PMS actuel'),
          ...(activite.id === 'autre' && formData.activiteAutre.trim() ? { expectations: `Type : ${formData.activiteAutre.trim().slice(0, 120)}` } : {}),
        }),
      });
      const raw = normalizeDemoBackendResponse(await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (raw.success !== true) throw new Error(demoResponseErrorMessage(raw) || t('errors.qualify'));
      setStep(PRISE_DE_RENDEZ_VOUS ? 2 : 3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('errors.qualify'));
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
        headers: enTetesDemande({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          demoRequestId,
          slotId: selectedSlot.id,
          clientName: provisionalClientName(),
          ...(rescheduledFromId ? { rescheduledFromId } : {}),
        }),
      });
      let bookRaw: unknown;
      try {
        bookRaw = await bookRes.json();
      } catch {
        throw new Error(t('errors.invalidResponse'));
      }
      const bookData = normalizeDemoBackendResponse(bookRaw) as { success?: boolean; error?: string };
      if (bookData.success !== true) {
        throw new Error(demoResponseErrorMessage(bookData) || t('errors.bookSlot'));
      }
      setError('');
      setCalendarSkippedAlreadyBooked(false);
      const bookToken = (bookData as { data?: { qualificationToken?: string } }).data?.qualificationToken;
      if (bookToken) setAppointmentToken(String(bookToken));
      if (!rescheduledFromId) trackDemoScheduled(source);
      setRescheduledFromId(null);
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Error confirming slot:', err);
    } finally {
      setLoading(false);
    }
  };

  const demanderQuestions = async (payload: QualificationPayload): Promise<FollowUpQuestion[]> => {
    if (!appointmentToken) return [];
    try {
      const res = await fetch(
        `${DEMO_API}/request/follow-up-by-token?t=${encodeURIComponent(appointmentToken)}`,
        {
          method: 'POST',
          headers: enTetesDemande({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        },
      );
      const data = normalizeDemoBackendResponse(await res.json()) as {
        data?: { questions?: FollowUpQuestion[] };
      };
      return Array.isArray(data.data?.questions) ? data.data.questions : [];
    } catch {
      return [];
    }
  };

  const handleQualificationSubmit = async (payload: QualificationPayload) => {
    if (!demoRequestId) {
      setError('Session invalide. Recommencez depuis l’étape 1.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const qualRes = await fetch(`${DEMO_API}/request/${demoRequestId}/qualify`, {
        method: 'PATCH',
        headers: enTetesDemande({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ ...payload, qualificationToken }),
      });
      let qualRaw: unknown;
      try {
        qualRaw = await qualRes.json();
      } catch {
        throw new Error(t('errors.invalidResponse'));
      }
      const qualData = normalizeDemoBackendResponse(qualRaw) as { success?: boolean; error?: string };
      if (qualData.success !== true) {
        throw new Error(demoResponseErrorMessage(qualData) || t('errors.qualify'));
      }

      if (!(qualData as { data?: { test?: boolean } }).data?.test) trackDemoQualified(source);
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
        <PageHeader pageTitle={t('pageTitle')} />

        <section className="demo-page-section" style={{ padding: '80px 32px 100px', minHeight: '80vh' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>

            <BandeauTest />
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
                  {source === 'offre-conciergeries-express' && (
                    <a
                      href={`/${locale}/offre-conciergeries?source=demo-express-discover`}
                      style={{ display: 'inline-block', marginTop: 14, fontSize: 14, color: 'var(--text-3)', textDecoration: 'underline' }}
                    >
                      Découvrir Sojori avant de réserver →
                    </a>
                  )}
                  {source === 'global-launch-express' && (
                    <a
                      href={`/${locale}/global-launch?source=demo-express-discover`}
                      style={{ display: 'inline-block', marginTop: 14, fontSize: 14, color: 'var(--text-3)', textDecoration: 'underline' }}
                    >
                      Discover Sojori before booking →
                    </a>
                  )}
                </div>

                <div className="glass demo-glass-panel" style={{ padding: 40, borderRadius: 16, position: 'relative' }}>
                  {error && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                    <form onSubmit={handleSubmitStep1} className="demo-mini">
                      <div style={{ marginBottom: 18 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step1.emailLabel')}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          autoFocus
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('step1.emailPlaceholder')}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 18 }}>
                        <label style={labelStyle as React.CSSProperties}>{t('step1.fullNameLabel')}</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t('step1.fullNamePlaceholder')}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                        <div className="sj2-scope" style={{ flex: '1 1 100%', minWidth: 200 }}>
                          <label style={labelStyle as React.CSSProperties} htmlFor="demo-pays">{t('step1.paysLabel')}</label>
                          <ChampPays id="demo-pays" valeur={formData.paysIso} locale={locale} affichage="pays" libelle={t('step1.paysLabel')} textes={textesPays}
                            onChoisir={iso => setFormData(prev => ({ ...prev, paysIso: iso, dialIso: iso, phone: formaterNumero(prev.phone, iso) }))} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 18 }}>
                        <label style={labelStyle as React.CSSProperties} htmlFor="demo-tel">{t('step1.phoneLabel')}</label>
                        <div className="sj2-tel sj2-scope">
                          <ChampPays id="demo-dial" valeur={formData.dialIso} locale={locale} affichage="indicatif" libelle={t('step1.dialLabel')} textes={textesPays}
                            onChoisir={iso => setFormData(prev => ({ ...prev, dialIso: iso, phone: formaterNumero(prev.phone, iso) }))} />
                          <input
                            id="demo-tel"
                            type="tel"
                            name="phone"
                            inputMode="tel"
                            required
                            autoComplete="tel-national"
                            value={formData.phone}
                            onChange={e => setFormData(prev => ({ ...prev, phone: formaterNumero(e.target.value, prev.dialIso) }))}
                            placeholder={t('step1.phonePlaceholder')}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-2)', marginBottom: 22, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          required
                          checked={formData.consentementMessages}
                          onChange={e => setFormData(prev => ({ ...prev, consentementMessages: e.target.checked }))}
                          style={{ marginTop: 3, width: 18, height: 18 }}
                        />
                        <span>{t('step1.consentLabel')}</span>
                      </label>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 600 }}
                      >
                        {loading ? t('step1.submitButtonLoading') : t('step1.submitButton')}
                      </button>
                      <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 16 }}>
                        {t('step1.disclaimer')}
                      </p>
                    </form>
                </div>
              </>
            )}

            {/* ÉCRAN « TYPE D'ÉTABLISSEMENT ET PMS » : obligatoire, juste après l'identité */}
            {step === STEP_TYPE && (
              <div className="demo-step-in">
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <span className="badge" style={{ marginBottom: 20 }}>
                    <span className="badge-dot"></span> {t('step1.badge')}
                  </span>
                  <h2 style={{ marginBottom: 12, fontSize: 34, textWrap: 'balance' }}>{t('step1.typeTitle')}</h2>
                  <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto' }}>{t('step1.typeSubtitle')}</p>
                </div>
                <div className="glass demo-glass-panel" style={{ padding: 40, borderRadius: 16 }}>
                  {error && (
                    <div role="alert" style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}
                  <form onSubmit={envoyerType} className="demo-mini" noValidate>
                    <div className="qf-pills" role="group" aria-label={t('step1.typeTitle')} style={{ marginBottom: 22 }}>
                      {ACTIVITIES.filter(item => TYPES_FORMULAIRE.includes(item.id)).map(item => (
                        <button
                          key={item.id}
                          type="button"
                          disabled={loading}
                          aria-pressed={formData.activity === item.id}
                          onClick={() => choisirActivite(item.id)}
                          className={formData.activity === item.id ? 'qf-pill qf-pill-on' : 'qf-pill'}
                        >
                          {t(`step1.activities.${item.id}`)}
                        </button>
                      ))}
                    </div>
                    {formData.activity === 'autre' && (
                      <div style={{ marginBottom: 22 }}>
                        <label style={labelStyle as React.CSSProperties} htmlFor="demo-autre">{t('step1.otherLabel')}</label>
                        <input id="demo-autre" type="text" name="activiteAutre" value={formData.activiteAutre} onChange={handleChange} style={inputStyle} />
                      </div>
                    )}
                    <h3 style={{ fontSize: 18, marginBottom: 12 }}>{t('step1.pmsTitle')}</h3>
                    <div className="demo-pms-choix" role="group" aria-label={t('step1.pmsTitle')} style={{ marginBottom: 18 }}>
                      {(['sojori', 'own'] as const).map(v => (
                        <button
                          key={v}
                          type="button"
                          disabled={loading}
                          aria-pressed={formData.pmsChoix === v}
                          onClick={() => setFormData(prev => ({ ...prev, pmsChoix: v }))}
                          className={formData.pmsChoix === v ? 'qf-pill qf-pill-on' : 'qf-pill'}
                          style={{ flex: '1 1 200px', minHeight: 64, fontSize: 16, fontWeight: 600 }}
                        >
                          {t(v === 'sojori' ? 'step1.pmsSojori' : 'step1.pmsOwn')}
                        </button>
                      ))}
                    </div>
                    {formData.pmsChoix === 'own' && (
                      <div style={{ marginBottom: 22 }}>
                        <label style={labelStyle as React.CSSProperties} htmlFor="demo-pms">{t('step1.pmsWhich')}</label>
                        <input id="demo-pms" type="text" name="pmsNom" value={formData.pmsNom} onChange={handleChange} style={inputStyle} />
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 600 }}>
                      {loading ? t('step1.submitButtonLoading') : t('step1.typeSubmit')}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* STEP 2 : choix du créneau (semaine à partir de demain, fuseau Paris / backend) */}
            {PRISE_DE_RENDEZ_VOUS && step === 2 && (
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
                  className="glass demo-glass-panel"
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
                      <p style={{ fontSize: 13, color: '#c99212', fontWeight: 700 }}>
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
                      {[0, 1].map((weekIdx) => {
                        const weekDays = bookingWeek.days.slice(weekIdx * 7, weekIdx * 7 + 7);
                        if (weekDays.length === 0) return null;
                        return (
                          <div key={weekIdx} style={{ marginBottom: weekIdx === 0 ? 8 : 28 }}>
                            <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              {weekIdx === 0 ? t('step2.thisWeekLabel') : t('step2.nextWeekLabel')}
                            </span>
                            <div
                              className="demo-cal-days"
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                gap: 8,
                              }}
                            >
                              {weekDays.map((d) => {
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
                                      padding: '10px 4px',
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
                                    <span style={{ display: 'block', fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>
                                      {d.label}
                                    </span>
                                    <span
                                      style={{
                                        display: 'block',
                                        marginTop: 4,
                                        fontSize: 10,
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
                          </div>
                        );
                      })}

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
                                className="demo-cal-slots"
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
              <div className="demo-step-in">
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

                <div className="glass demo-glass-panel" style={{ padding: 40, borderRadius: 16 }}>
                  {error && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                  <QualificationForm
                    initialActivityId={formData.activity || undefined}
                    initialPhone={formData.phone.replace(/\D/g, '') || undefined}
                    initialCountryCode={dialDeIso(formData.dialIso)}
                    initialNumberOfProperties={formData.taille || undefined}
                    initialCountry={nomCrm(formData.paysIso)}
                    initialCurrentPMS={formData.pmsChoix === 'sojori' ? 'Sojori' : formData.pmsChoix === 'own' ? (formData.pmsNom.trim() || 'Garde son PMS actuel') : undefined}
                    initialFullName={formData.fullName.trim() || undefined}
                    initialCity={formData.ville.trim() || undefined}
                    compact
                    onSubmit={handleQualificationSubmit}
                    onRequestFollowUp={demanderQuestions}
                    loading={loading}
                    error={error}
                    submitLabel={t('step3.submitButton')}
                  />
                  <div style={{ textAlign: 'center', marginTop: 18 }}>
                    <button type="button" onClick={() => setStep(4)} className="qf-skip" disabled={loading}>
                      {t('step3.skipAll')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation (parcours complet ou RDV déjà en place sans questionnaire) */}
            {step === 4 && (
              <div className="glass demo-glass-panel demo-step4-glass" style={{ padding: 60, borderRadius: 16, textAlign: 'center' }}>
                {calendarSkippedAlreadyBooked ? (
                  <>
                    <div style={{ fontSize: 56, marginBottom: 24 }} aria-hidden>
                      
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
                    {apptCancelled ? (
                      <div style={{ padding: 20, borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: 40 }}>
                        <p style={{ margin: 0, fontSize: 15, color: 'var(--text-2)' }}>{t('step4.alreadyBooked.cancelledMessage')}</p>
                      </div>
                    ) : (
                      <div className="demo-cta-stack" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          disabled={rescheduling || cancellingAppt}
                          onClick={async () => {
                            if (!selectedSlot?.id || !demoRequestId) return;
                            setRescheduling(true);
                            try {
                              const res = await fetch(`${DEMO_API}/appointment/cancel-by-demo`, {
                                method: 'POST',
                                headers: enTetesDemande({ 'Content-Type': 'application/json' }),
                                body: JSON.stringify({ appointmentId: selectedSlot.id, demoRequestId, isReschedule: true }),
                              });
                              const raw: unknown = await res.json();
                              const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean };
                              if (parsed.success) {
                                setRescheduledFromId(selectedSlot.id);
                                setCalendarSkippedAlreadyBooked(false);
                                setSelectedSlot(null);
                                setStep(2);
                              }
                            } catch { /* ignore */ } finally {
                              setRescheduling(false);
                            }
                          }}
                        >
                          {rescheduling ? t('step4.alreadyBooked.rescheduling') : t('step4.alreadyBooked.reschedule')}
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-lg"
                          disabled={rescheduling || cancellingAppt}
                          style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#f87171' }}
                          onClick={async () => {
                            if (!selectedSlot?.id || !demoRequestId) return;
                            setCancellingAppt(true);
                            try {
                              const res = await fetch(`${DEMO_API}/appointment/cancel-by-demo`, {
                                method: 'POST',
                                headers: enTetesDemande({ 'Content-Type': 'application/json' }),
                                body: JSON.stringify({ appointmentId: selectedSlot.id, demoRequestId }),
                              });
                              const raw: unknown = await res.json();
                              const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean };
                              if (parsed.success) {
                                setApptCancelled(true);
                              }
                            } catch { /* ignore */ } finally {
                              setCancellingAppt(false);
                            }
                          }}
                        >
                          {cancellingAppt ? t('step4.alreadyBooked.cancelling') : t('step4.alreadyBooked.cancel')}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 56, marginBottom: 24 }}></div>
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

                    <div className="demo-cta-stack" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 50 }}>
                      <Link href="/" className="btn btn-primary btn-lg">
                        {t('step4.confirmed.backToHome')}
                      </Link>
                      <Link href="/offre" className="btn btn-ghost btn-lg">
                        {t('step4.confirmed.viewPricing')}
                      </Link>
                    </div>

                    <div
                      className="demo-feature-grid-3"
                      style={{
                        borderTop: '1px solid var(--glass-border)',
                        paddingTop: 30,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 24,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}></div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('step4.confirmed.feature1Title')}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('step4.confirmed.feature1Desc')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}></div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('step4.confirmed.feature2Title')}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('step4.confirmed.feature2Desc')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}></div>
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
              <div className="demo-trust-grid-3" style={{ marginTop: 50, display: 'grid', gridTemplateColumns: '1fr', gap: 24, maxWidth: 360, marginInline: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}></div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t('trustCards.trial.title')}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t('trustCards.trial.description')}</div>
                </div>
              </div>
            )}

          </div>
        </section>

        <PageFooter />
      </div>

    </>
  );
}

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div
          className="demo-page-suspense"
          role="status"
          aria-live="polite"
          style={{ minHeight: '50vh', padding: '48px 24px', textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}
        >
          …
        </div>
      }
    >
      <DemoPageContent />
    </Suspense>
  );
}
