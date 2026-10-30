'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { normalizeDemoBackendResponse, demoResponseErrorMessage } from '@/lib/demoApiResponse';

/**
 * Page de rendez-vous du lien prospect (Tawfiq, 30/10/2026) : les 15 prochains jours
 * À PARTIR DE DEMAIN en haut (pas de calendrier mois, pas aujourd’hui), puis les heures
 * du jour choisi. Planning du commercial SANS son nom. Jeton `?t=` seul.
 */

const DEMO_API = '/api/v1/demo/rdv';
const JOURS_FENETRE = 15;

type Creneau = { debut: string; fin: string };
type Semaine = {
  jours: { jour: string; creneaux: Creneau[] }[];
  existant: { debut: string; fin: string; lienMeet: string | null } | null;
};

type Textes = {
  titre: string;
  intro: string;
  chargement: string;
  indisponible: string;
  aucunCreneau: string;
  fuseau: string;
  choisir: string;
  confirmer: string;
  annuler: string;
  envoi: string;
  confirmeTitre: string;
  confirmeTexte: string;
  email: string;
  visio: string;
  deja: string;
  pris: string;
  reseau: string;
  choisirJour: string;
  heuresDuJour: string;
  aucunCeJour: string;
  fenetre: string;
};

const TEXTES: Record<string, Textes> = {
  fr: {
    titre: 'Choisissez votre créneau',
    intro: 'Une démonstration de Sojori en visio, 30 minutes. Dès demain — pas aujourd’hui.',
    chargement: 'Chargement du planning…',
    indisponible:
      'Ce lien n’est plus valide. Répondez à l’e-mail que vous avez reçu et nous vous en enverrons un nouveau.',
    aucunCreneau:
      'Aucun créneau n’est libre pour le moment. Répondez à l’e-mail que vous avez reçu : nous trouverons un moment ensemble.',
    fuseau: 'Heures affichées dans votre fuseau :',
    choisir: 'Votre créneau',
    confirmer: 'Confirmer ce rendez-vous',
    annuler: 'Changer',
    envoi: 'Réservation…',
    confirmeTitre: 'Rendez-vous confirmé',
    confirmeTexte: 'Votre démonstration est réservée :',
    email: 'Un e-mail de confirmation vient de vous être envoyé.',
    visio: 'Lien de la visio :',
    deja: 'Vous avez déjà un rendez-vous :',
    pris: 'Ce créneau vient d’être pris. Choisissez-en un autre.',
    reseau: 'Erreur réseau. Rechargez la page.',
    choisirJour: 'Choisissez un jour',
    heuresDuJour: 'Horaires disponibles',
    aucunCeJour: 'Aucun créneau ce jour-là.',
    fenetre: 'Les 15 prochains jours (dès demain)',
  },
  en: {
    titre: 'Pick your time',
    intro: 'A 30-minute Sojori demo by video. From tomorrow — not today.',
    chargement: 'Loading the schedule…',
    indisponible: 'This link is no longer valid. Reply to the email you received and we will send you a new one.',
    aucunCreneau: 'No time slot is free right now. Reply to the email you received and we will find a time together.',
    fuseau: 'Times shown in your time zone:',
    choisir: 'Your slot',
    confirmer: 'Confirm this appointment',
    annuler: 'Change',
    envoi: 'Booking…',
    confirmeTitre: 'Appointment confirmed',
    confirmeTexte: 'Your demo is booked:',
    email: 'A confirmation email has just been sent to you.',
    visio: 'Video link:',
    deja: 'You already have an appointment:',
    pris: 'This slot was just taken. Please choose another.',
    reseau: 'Network error. Please reload the page.',
    choisirJour: 'Pick a day',
    heuresDuJour: 'Available times',
    aucunCeJour: 'No times available on this day.',
    fenetre: 'Next 15 days (from tomorrow)',
  },
  es: {
    titre: 'Elija su hora',
    intro: 'Una demostración de Sojori por videollamada, 30 minutos. Desde mañana — no hoy.',
    chargement: 'Cargando el calendario…',
    indisponible: 'Este enlace ya no es válido. Responda al correo que recibió y le enviaremos uno nuevo.',
    aucunCreneau: 'No hay ninguna hora libre por ahora. Responda al correo que recibió y buscaremos un momento juntos.',
    fuseau: 'Horas mostradas en su zona horaria:',
    choisir: 'Su hora',
    confirmer: 'Confirmar esta cita',
    annuler: 'Cambiar',
    envoi: 'Reservando…',
    confirmeTitre: 'Cita confirmada',
    confirmeTexte: 'Su demostración está reservada:',
    email: 'Acabamos de enviarle un correo de confirmación.',
    visio: 'Enlace de la videollamada:',
    deja: 'Ya tiene una cita:',
    pris: 'Esa hora acaba de ocuparse. Elija otra.',
    reseau: 'Error de red. Recargue la página.',
    choisirJour: 'Elija un día',
    heuresDuJour: 'Horarios disponibles',
    aucunCeJour: 'No hay horas disponibles ese día.',
    fenetre: 'Los 15 próximos días (desde mañana)',
  },
  pt: {
    titre: 'Escolha a sua hora',
    intro: 'Uma demonstração da Sojori por vídeo, 30 minutos. A partir de amanhã — não hoje.',
    chargement: 'A carregar o calendário…',
    indisponible: 'Esta ligação já não é válida. Responda ao e-mail que recebeu e enviaremos uma nova.',
    aucunCreneau: 'Não há nenhuma hora livre de momento. Responda ao e-mail que recebeu e encontraremos um momento juntos.',
    fuseau: 'Horas apresentadas no seu fuso horário:',
    choisir: 'A sua hora',
    confirmer: 'Confirmar esta marcação',
    annuler: 'Alterar',
    envoi: 'A reservar…',
    confirmeTitre: 'Marcação confirmada',
    confirmeTexte: 'A sua demonstração está reservada:',
    email: 'Acabámos de lhe enviar um e-mail de confirmação.',
    visio: 'Ligação do vídeo:',
    deja: 'Já tem uma marcação:',
    pris: 'Essa hora acabou de ser ocupada. Escolha outra.',
    reseau: 'Erro de rede. Recarregue a página.',
    choisirJour: 'Escolha um dia',
    heuresDuJour: 'Horários disponíveis',
    aucunCeJour: 'Sem horários neste dia.',
    fenetre: 'Os 15 próximos dias (a partir de amanhã)',
  },
  ar: {
    titre: 'اختر موعدك',
    intro: 'عرض توضيحي لـ Sojori عبر الفيديو، 30 دقيقة. من الغد — وليس اليوم.',
    chargement: 'جارٍ تحميل المواعيد…',
    indisponible: 'هذا الرابط لم يعد صالحاً. ردّ على البريد الذي وصلك وسنرسل لك رابطاً جديداً.',
    aucunCreneau: 'لا يوجد موعد متاح حالياً. ردّ على البريد الذي وصلك وسنجد وقتاً مناسباً معاً.',
    fuseau: 'الأوقات المعروضة بتوقيتك:',
    choisir: 'موعدك',
    confirmer: 'تأكيد هذا الموعد',
    annuler: 'تغيير',
    envoi: 'جارٍ الحجز…',
    confirmeTitre: 'تم تأكيد الموعد',
    confirmeTexte: 'تم حجز العرض التوضيحي:',
    email: 'أرسلنا لك للتو رسالة تأكيد بالبريد الإلكتروني.',
    visio: 'رابط الفيديو:',
    deja: 'لديك موعد بالفعل:',
    pris: 'تم حجز هذا الموعد للتو. اختر موعداً آخر.',
    reseau: 'خطأ في الشبكة. أعد تحميل الصفحة.',
    choisirJour: 'اختر يوماً',
    heuresDuJour: 'الأوقات المتاحة',
    aucunCeJour: 'لا توجد أوقات في هذا اليوم.',
    fenetre: 'الـ 15 يوماً القادمة (من الغد)',
  },
};

/** « AAAA-MM-JJ » du jour civil dans `fuseau` pour un instant ISO. */
function cleJour(iso: string, fuseau: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: fuseau }).format(new Date(iso));
}

/** Aujourd’hui civil dans `fuseau`, puis demain + 14 (= 15 jours). */
function clesDepuisDemain(fuseau: string, n = JOURS_FENETRE): string[] {
  const aujourdhui = new Intl.DateTimeFormat('en-CA', { timeZone: fuseau }).format(new Date());
  const out: string[] = [];
  const d = new Date(`${aujourdhui}T12:00:00Z`);
  for (let i = 1; i <= n; i++) {
    const x = new Date(d);
    x.setUTCDate(d.getUTCDate() + i);
    out.push(x.toISOString().slice(0, 10));
  }
  return out;
}

function RdvContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const rawLoc = params?.locale;
  const locale = Array.isArray(rawLoc) ? rawLoc[0] : rawLoc || 'fr';
  const t = TEXTES[locale] ?? TEXTES.fr;
  const jeton = searchParams.get('t') || '';

  const [etat, setEtat] = useState<'chargement' | 'pret' | 'indisponible'>(jeton ? 'chargement' : 'indisponible');
  const [semaine, setSemaine] = useState<Semaine | null>(null);
  const [choisi, setChoisi] = useState<Creneau | null>(null);
  const [jourChoisi, setJourChoisi] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');
  const [fait, setFait] = useState<{ debut: string; lienMeet: string | null } | null>(null);

  const fuseau = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  }, []);
  const intlLocale = locale === 'ar' ? 'ar-MA-u-nu-latn' : locale;
  const jourLisible = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: fuseau,
    }).format(new Date(iso));
  const jourCourt = (cle: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    }).format(new Date(`${cle}T12:00:00Z`));
  const heureLisible = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: fuseau,
    }).format(new Date(iso));
  const complet = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: fuseau,
    }).format(new Date(iso));

  const [rechargement, setRechargement] = useState(0);

  useEffect(() => {
    if (!jeton) return;
    let annule = false;
    fetch(`${DEMO_API}/semaine?t=${encodeURIComponent(jeton)}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((raw: unknown) => {
        if (annule) return;
        const parsed = normalizeDemoBackendResponse(raw) as { success?: boolean; data?: Semaine };
        if (!parsed.success || !parsed.data) {
          setEtat('indisponible');
          return;
        }
        setSemaine(parsed.data);
        setEtat('pret');
      })
      .catch(() => {
        if (annule) return;
        setErreur(t.reseau);
        setEtat('indisponible');
      });
    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jeton, rechargement]);

  const fenetreCles = useMemo(() => clesDepuisDemain(fuseau), [fuseau]);

  const parJour = useMemo(() => {
    const aujourdhui = new Intl.DateTimeFormat('en-CA', { timeZone: fuseau }).format(new Date());
    const groupes = new Map<string, Creneau[]>();
    for (const j of semaine?.jours ?? []) {
      for (const c of j.creneaux) {
        const cle = cleJour(c.debut, fuseau);
        if (cle <= aujourdhui) continue;
        if (!fenetreCles.includes(cle)) continue;
        groupes.set(cle, [...(groupes.get(cle) ?? []), c]);
      }
    }
    return groupes;
  }, [semaine, fuseau, fenetreCles]);

  const premierDispo = fenetreCles.find((cle) => (parJour.get(cle)?.length ?? 0) > 0) ?? null;

  useEffect(() => {
    if (!premierDispo) return;
    setJourChoisi((prev) => prev ?? premierDispo);
  }, [premierDispo]);

  const creneauxDuJour = jourChoisi ? (parJour.get(jourChoisi) ?? []) : [];
  const aDesCreneaux = fenetreCles.some((cle) => (parJour.get(cle)?.length ?? 0) > 0);

  const choisirJour = (cle: string) => {
    if (!(parJour.get(cle)?.length ?? 0)) return;
    setJourChoisi(cle);
    setChoisi(null);
    setErreur('');
  };

  const reserver = async () => {
    if (!choisi) return;
    setEnvoi(true);
    setErreur('');
    try {
      const res = await fetch(`${DEMO_API}/reserver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: jeton, debut: choisi.debut, fuseau }),
      });
      const parsed = normalizeDemoBackendResponse(await res.json()) as {
        success?: boolean;
        data?: { debut: string; lienMeet: string | null };
      };
      if (parsed.success && parsed.data) {
        setFait({ debut: parsed.data.debut, lienMeet: parsed.data.lienMeet });
        return;
      }
      if (res.status === 409) {
        setErreur(t.pris);
        setChoisi(null);
        setRechargement((n) => n + 1);
      } else {
        setErreur(demoResponseErrorMessage(parsed) || t.reseau);
      }
    } catch {
      setErreur(t.reseau);
    } finally {
      setEnvoi(false);
    }
  };

  const boite = {
    padding: 20,
    borderRadius: 16,
    background: 'var(--glass-strong)',
    border: '1px solid var(--glass-border)',
    boxShadow: 'var(--shadow-card)',
  } as const;

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <PageHeader pageTitle={t.titre} />
        <section style={{ padding: '48px 24px 100px', minHeight: '70vh', maxWidth: 880, margin: '0 auto' }}>
          {etat === 'chargement' && <p style={{ color: 'var(--text-2)' }}>{t.chargement}</p>}

          {etat === 'indisponible' && <div style={{ ...boite, color: 'var(--text)' }}>{erreur || t.indisponible}</div>}

          {etat === 'pret' && fait && (
            <div style={{ ...boite, textAlign: 'center' }}>
              <h1 style={{ fontSize: 30, marginBottom: 12 }}>{t.confirmeTitre}</h1>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 8 }}>{t.confirmeTexte}</p>
              <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{complet(fait.debut)}</p>
              {fait.lienMeet && (
                <p style={{ marginBottom: 12 }}>
                  {t.visio}{' '}
                  <a href={fait.lienMeet} target="_blank" rel="noopener noreferrer">
                    {fait.lienMeet}
                  </a>
                </p>
              )}
              <p style={{ fontSize: 14, color: 'var(--text-3)' }}>{t.email}</p>
            </div>
          )}

          {etat === 'pret' && !fait && semaine?.existant && (
            <div style={{ ...boite, textAlign: 'center' }}>
              <h1 style={{ fontSize: 26, marginBottom: 12 }}>{t.deja}</h1>
              <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{complet(semaine.existant.debut)}</p>
              {semaine.existant.lienMeet && (
                <a href={semaine.existant.lienMeet} target="_blank" rel="noopener noreferrer">
                  {semaine.existant.lienMeet}
                </a>
              )}
            </div>
          )}

          {etat === 'pret' && !fait && !semaine?.existant && (
            <>
              <h1 style={{ fontSize: 32, marginBottom: 10, letterSpacing: '-0.02em' }}>{t.titre}</h1>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 6 }}>{t.intro}</p>
              <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 28 }}>
                {t.fuseau} <strong>{fuseau}</strong>
              </p>

              {erreur && (
                <div
                  style={{
                    ...boite,
                    marginBottom: 20,
                    color: '#b91c1c',
                    border: '1px solid rgba(239,68,68,0.35)',
                    background: 'rgba(254,226,226,0.55)',
                  }}
                >
                  {erreur}
                </div>
              )}

              {!aDesCreneaux && <div style={boite}>{t.aucunCreneau}</div>}

              {aDesCreneaux && (
                <div className="rdv-layout">
                  <div className="rdv-jours" style={boite}>
                    <p className="rdv-jours-titre">{t.fenetre}</p>
                    <div className="rdv-jours-liste">
                      {fenetreCles.map((cle) => {
                        const n = parJour.get(cle)?.length ?? 0;
                        const dispo = n > 0;
                        const actif = jourChoisi === cle;
                        return (
                          <button
                            key={cle}
                            type="button"
                            disabled={!dispo}
                            className={[
                              'rdv-jour',
                              dispo ? 'rdv-jour-dispo' : '',
                              actif ? 'rdv-jour-on' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            onClick={() => choisirJour(cle)}
                          >
                            {jourCourt(cle)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rdv-slots" style={boite}>
                    {!jourChoisi && <p style={{ color: 'var(--text-3)' }}>{t.choisirJour}</p>}
                    {jourChoisi && (
                      <>
                        <h2 className="rdv-slots-titre">
                          {t.heuresDuJour}
                          <span>
                            {creneauxDuJour[0] ? jourLisible(creneauxDuJour[0].debut) : jourChoisi}
                          </span>
                        </h2>
                        {creneauxDuJour.length === 0 && (
                          <p style={{ color: 'var(--text-3)', marginTop: 8 }}>{t.aucunCeJour}</p>
                        )}
                        <div className="rdv-slots-liste">
                          {creneauxDuJour.map((c) => (
                            <button
                              key={c.debut}
                              type="button"
                              className={choisi?.debut === c.debut ? 'rdv-slot rdv-slot-on' : 'rdv-slot'}
                              onClick={() => {
                                setChoisi(c);
                                setErreur('');
                              }}
                            >
                              {heureLisible(c.debut)}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {choisi && (
                <div style={{ ...boite, marginTop: 20, position: 'sticky', bottom: 16 }}>
                  <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 4 }}>{t.choisir}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{complet(choisi.debut)}</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-ghost" onClick={() => setChoisi(null)} style={{ fontSize: 14 }}>
                      {t.annuler}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={envoi}
                      onClick={reserver}
                      style={{ flex: 1, padding: '14px', fontSize: 15, fontWeight: 600 }}
                    >
                      {envoi ? t.envoi : t.confirmer}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
        <PageFooter />
      </div>
    </>
  );
}

export default function RdvPage() {
  return (
    <Suspense fallback={null}>
      <RdvContent />
    </Suspense>
  );
}
