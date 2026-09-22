'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { Link } from '@/i18n/routing';
import {
  QualificationForm,
  type QualificationPayload,
  type FollowUpQuestion,
} from '@/components/demo/QualificationForm';
import { normalizeDemoBackendResponse, demoResponseErrorMessage } from '@/lib/demoApiResponse';

/**
 * Préparer sa démonstration — page atteinte depuis l'e-mail de confirmation.
 *
 * Le client a déjà réservé son créneau : il arrive ici par un lien personnel,
 * sans compte ni mot de passe. Le jeton en query identifie son rendez-vous, et
 * le backend limite par liste blanche ce qu'il peut écrire.
 *
 * Rien n'est obligatoire. Si le lien est invalide ou expiré, on le dit sans
 * dramatiser : le rendez-vous, lui, tient toujours.
 */

type Etat = 'form' | 'envoi' | 'merci' | 'lien-invalide';

export function PreparerClient() {
  const params = useSearchParams();
  // Lu dès le premier rendu : sinon le formulaire s'affiche un instant sans
  // jeton, et quelqu'un pourrait le remplir pour rien.
  const token = params.get('t')?.trim() ?? '';
  const [etat, setEtat] = useState<Etat>(token ? 'form' : 'lien-invalide');
  const [erreur, setErreur] = useState('');

  const demanderQuestions = async (
    payload: QualificationPayload,
  ): Promise<FollowUpQuestion[]> => {
    if (!token) return [];
    try {
      const res = await fetch(`/api/v1/demo/follow-up-by-token?t=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = normalizeDemoBackendResponse(await res.json()) as {
        data?: { questions?: FollowUpQuestion[] };
      };
      return Array.isArray(data.data?.questions) ? data.data.questions : [];
    } catch {
      // Ces questions enrichissent le questionnaire ; leur absence ne doit
      // jamais empêcher de l'envoyer.
      return [];
    }
  };

  const envoyer = async (payload: QualificationPayload) => {
    if (!token) {
      setEtat('lien-invalide');
      return;
    }
    setEtat('envoi');
    setErreur('');

    try {
      const res = await fetch(`/api/v1/demo/qualify-by-token?t=${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = normalizeDemoBackendResponse(await res.json()) as {
        success?: boolean;
        error?: string;
      };

      if (data.success !== true) {
        if (res.status === 404) {
          setEtat('lien-invalide');
          return;
        }
        throw new Error(demoResponseErrorMessage(data) || 'Envoi impossible pour le moment.');
      }
      setEtat('merci');
    } catch (e) {
      setErreur(e instanceof Error ? e.message : 'Une erreur est survenue.');
      setEtat('form');
    }
  };

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader />

        <section style={{ padding: '70px 32px 90px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {etat === 'lien-invalide' ? (
              <div className="glass" style={{ padding: 40, borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                  Ce lien n&apos;est plus valable
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 24 }}>
                  Votre rendez-vous, lui, tient toujours — nous vous appellerons comme prévu. Si
                  vous souhaitez tout de même nous en dire plus, écrivez-nous et nous vous
                  renverrons un lien.
                </p>
                <Link href="/demo" className="btn btn-ghost">
                  Retour
                </Link>
              </div>
            ) : etat === 'merci' ? (
              <div className="glass" style={{ padding: 44, borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
                  C&apos;est noté, merci.
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 26 }}>
                  Nous préparons la démonstration à partir de vos réponses. À très vite.
                </p>
                <Link href="/" className="btn btn-ghost">
                  Retour à l&apos;accueil
                </Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 28 }}>
                  <div
                    className="uppercase-sm"
                    style={{ color: '#e6b022', marginBottom: 12, fontSize: 11, letterSpacing: '0.16em' }}
                  >
                    ● Votre créneau est réservé
                  </div>
                  <h1 style={{ fontSize: 34, letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.2 }}>
                    Quelques questions,{' '}
                    <span className="gradient-text">et la démo sera la vôtre.</span>
                  </h1>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 560 }}>
                    Elles nous servent à préparer une démonstration sur votre situation plutôt
                    qu&apos;une présentation générique. Rien n&apos;est obligatoire.
                  </p>
                </div>

                <div className="glass" style={{ padding: 34, borderRadius: 16 }}>
                  <QualificationForm
                    onSubmit={envoyer}
                    onRequestFollowUp={demanderQuestions}
                    loading={etat === 'envoi'}
                    error={erreur}
                    submitLabel="Envoyer →"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        <PageFooter />
      </div>
    </>
  );
}
