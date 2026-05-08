"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import Link from 'next/link';

export default function DemoPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [source, setSource] = useState<string>('website'); // Default source

  const [formData, setFormData] = useState({
    // Step 1
    countryCode: '+33',
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

  const [loading, setLoading] = useState(false);
  const [demoRequestId, setDemoRequestId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TEMPORARY: Mock mode for testing (replace with real API call later)
      const USE_MOCK = false; // Set to false when backend is ready

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate mock ID
        const mockId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setDemoRequestId(mockId);

        // Log the data that would be sent to backend
        console.log('Demo request (mock):', {
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          numberOfProperties: formData.numberOfProperties
        });

        setStep(2);
      } else {
        // Direct API call to production backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.sojori.com';
        const response = await fetch(`${API_URL}/api/v1/demo/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            countryCode: formData.countryCode,
            numberOfProperties: formData.numberOfProperties,
            source: source // Include source tracking
          })
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to submit demo request');
        }

        setDemoRequestId(data.data.id);
        setStep(2);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting step 1:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TEMPORARY: Mock mode for testing (replace with real API call later)
      const USE_MOCK = false; // Set to false when backend is ready

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Log the full qualification data
        console.log('Demo qualification (mock):', {
          demoRequestId: demoRequestId,
          fullName: formData.fullName,
          company: formData.company,
          numberOfProperties: formData.numberOfProperties,
          propertyTypes: formData.propertyTypes,
          currentPMS: formData.currentPMS,
          currentChannelManager: formData.currentChannelManager,
          currentDynamicPricing: formData.currentDynamicPricing,
          currentWhatsApp: formData.currentWhatsApp,
          timeline: formData.timeline,
          biggestChallenges: formData.biggestChallenges,
          expectations: formData.expectations,
          newPropertiesNext12Months: parseInt(formData.newPropertiesNext12Months) || 0,
          hearAboutUs: formData.hearAboutUs,
          promoCode: formData.promoCode,
          roleType: formData.roleType
        });

        // Move to success step
        setStep(3);
      } else {
        // Direct API call to production backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.sojori.com';
        const response = await fetch(`${API_URL}/api/v1/demo/request/${demoRequestId}/qualify`, {
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
            newPropertiesNext12Months: parseInt(formData.newPropertiesNext12Months) || 0,
            hearAboutUs: formData.hearAboutUs,
            promoCode: formData.promoCode,
            roleType: formData.roleType
          })
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to submit qualification');
        }

        setStep(3);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting step 2:', err);
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
                    <span className="badge-dot"></span> Démo gratuite · 30 minutes
                  </span>
                  <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
                    Réservez votre <span className="gradient-text">démo gratuite</span>
                  </h1>
                  <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
                    Découvrez comment Sojori orchestre automatiquement +20 tâches de la réservation au checkout.
                  </p>
                </div>

                <div className="glass" style={{ padding: 40, borderRadius: 16 }}>
                  {error && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmitStep1}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle as React.CSSProperties}>Email professionnel *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vous@entreprise.com"
                        style={inputStyle}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, marginBottom: 28 }}>
                      <div>
                        <label style={labelStyle as React.CSSProperties}>Code *</label>
                        <select name="countryCode" value={formData.countryCode} onChange={handleChange} style={inputStyle}>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+212">🇲🇦 +212</option>
                          <option value="+351">🇵🇹 +351</option>
                          <option value="+34">🇪🇸 +34</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle as React.CSSProperties}>Téléphone *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="6 12 34 56 78"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle as React.CSSProperties}>Nombre de biens *</label>
                      <select
                        name="numberOfProperties"
                        value={formData.numberOfProperties}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="1">1 bien</option>
                        <option value="2-5">2-5 biens</option>
                        <option value="6-10">6-10 biens</option>
                        <option value="11-20">11-20 biens</option>
                        <option value="21-50">21-50 biens</option>
                        <option value="51+">51+ biens</option>
                      </select>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? 'Envoi en cours...' : 'Réserver ma démo →'}
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 16 }}>
                      En fournissant vos coordonnées, vous acceptez de recevoir des informations sur Sojori. Désinscription possible à tout moment.
                    </p>
                  </form>
                </div>
              </>
            )}

            {/* STEP 2: Detailed Qualification Form */}
            {step === 2 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <span className="badge" style={{ marginBottom: 20 }}>
                    <span className="badge-dot"></span> Étape 2/2 · Qualification
                  </span>
                  <h2 style={{ marginBottom: 14, fontSize: 36 }}>
                    Personnalisez votre <span className="gradient-text">démo</span>
                  </h2>
                  <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
                    Aidez-nous à préparer une démo adaptée à vos besoins spécifiques.
                  </p>
                </div>

                <div className="glass" style={{ padding: 40, borderRadius: 16 }}>
                  {error && (
                    <div style={{ padding: 16, borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmitStep2}>

                    {/* Informations de base */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>📋 Informations de base</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>Nom complet *</label>
                          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Votre nom" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>Entreprise *</label>
                          <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Nom de votre entreprise" style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Vous êtes ? *</label>
                        <select name="roleType" required value={formData.roleType} onChange={handleChange} style={inputStyle}>
                          <option value="">Sélectionnez...</option>
                          <option value="property-manager">Property Manager (gestionnaire)</option>
                          <option value="owner">Propriétaire (gère ses propres biens)</option>
                          <option value="agency">Agence immobilière</option>
                          <option value="hotel">Hôtel / Résidence</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle as React.CSSProperties}>Types de propriétés (plusieurs choix possibles)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                          {['Appartement', 'Villa', 'Maison', 'Chambre d\'hôtel', 'Résidence', 'Autre'].map(type => (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--glass-border)', background: formData.propertyTypes.includes(type) ? 'rgba(230,176,34,0.15)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', fontSize: 13 }}>
                              <input type="checkbox" checked={formData.propertyTypes.includes(type)} onChange={() => togglePropertyType(type)} style={{ cursor: 'pointer' }} />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Outils actuels */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>🛠️ Outils actuels</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>PMS actuel</label>
                          <input type="text" name="currentPMS" value={formData.currentPMS} onChange={handleChange} placeholder="ex: Lodgify, Smoobu, Excel..." style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>Channel Manager actuel</label>
                          <input type="text" name="currentChannelManager" value={formData.currentChannelManager} onChange={handleChange} placeholder="ex: Rentals United, SiteMinder..." style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>Dynamic Pricing</label>
                          <input type="text" name="currentDynamicPricing" value={formData.currentDynamicPricing} onChange={handleChange} placeholder="ex: PriceLabs, Beyond, Manuel..." style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle as React.CSSProperties}>Communication voyageurs</label>
                          <input type="text" name="currentWhatsApp" value={formData.currentWhatsApp} onChange={handleChange} placeholder="ex: WhatsApp manuel, Email..." style={inputStyle} />
                        </div>
                      </div>
                    </div>

                    {/* Besoins et timing */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>🎯 Vos besoins</h3>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Quand souhaitez-vous lancer Sojori ? *</label>
                        <select name="timeline" required value={formData.timeline} onChange={handleChange} style={inputStyle}>
                          <option value="">Sélectionnez...</option>
                          <option value="asap">Dès que possible (moins de 2 semaines)</option>
                          <option value="1month">Dans le mois</option>
                          <option value="1-3months">1-3 mois</option>
                          <option value="3-6months">3-6 mois</option>
                          <option value="exploring">En exploration (pas de date précise)</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Combien de nouvelles propriétés prévoyez-vous de gérer dans les 12 prochains mois ?</label>
                        <input type="number" name="newPropertiesNext12Months" value={formData.newPropertiesNext12Months} onChange={handleChange} placeholder="0" min="0" style={inputStyle} />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Quels sont vos plus grands défis actuellement ? *</label>
                        <textarea name="biggestChallenges" required value={formData.biggestChallenges} onChange={handleChange} placeholder="ex: Temps passé sur WhatsApp, erreurs de synchro calendrier, prix manuels, coordination staff..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Qu&apos;attendez-vous de Sojori ? *</label>
                        <textarea name="expectations" required value={formData.expectations} onChange={handleChange} placeholder="ex: Automatiser WhatsApp, centraliser tous les canaux, gagner du temps sur la gestion quotidienne..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>
                    </div>

                    {/* Informations complémentaires */}
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20, color: '#f4cf5e' }}>ℹ️ Informations complémentaires</h3>

                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle as React.CSSProperties}>Comment avez-vous entendu parler de Sojori ? *</label>
                        <select name="hearAboutUs" required value={formData.hearAboutUs} onChange={handleChange} style={inputStyle}>
                          <option value="">Sélectionnez...</option>
                          <option value="google">Google Search</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="facebook">Facebook / Instagram</option>
                          <option value="referral">Recommandation d&apos;un partenaire</option>
                          <option value="blog">Blog / Article</option>
                          <option value="event">Événement / Salon</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle as React.CSSProperties}>Code promo (si vous en avez un)</label>
                        <input type="text" name="promoCode" value={formData.promoCode} onChange={handleChange} placeholder="PROMO2025" style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <button type="button" onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: 1, padding: '14px' }}>
                        ← Retour
                      </button>
                      <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 2, padding: '14px', fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'Envoi en cours...' : 'Confirmer ma démo →'}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <div className="glass" style={{ padding: 60, borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
                <h2 style={{ fontSize: 40, marginBottom: 18 }}>
                  Demande <span className="gradient-text">confirmée !</span>
                </h2>
                <p style={{ fontSize: 17, color: 'var(--text-2)', marginBottom: 12, maxWidth: 520, margin: '0 auto 12px' }}>
                  Notre équipe vous contactera sous <strong style={{ color: '#f4cf5e' }}>2h ouvrées</strong> pour organiser votre démo personnalisée.
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 40 }}>
                  Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 50 }}>
                  <Link href="/" className="btn btn-primary btn-lg">← Retour à l&apos;accueil</Link>
                  <Link href="/pricing" className="btn btn-ghost btn-lg">Voir les tarifs</Link>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 30, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Setup en 7 jours</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Import de vos données inclus</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Démo personnalisée</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Basée sur votre contexte</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>💰</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>14 jours gratuits</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Sans engagement</div>
                  </div>
                </div>
              </div>
            )}

            {/* Trust indicators - visible sur step 1 et 2 */}
            {(step === 1 || step === 2) && (
              <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Setup rapide</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Déployé en moins de 7 jours</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>100% sécurisé</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>RGPD · SOC 2 · ISO 27001</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>💰</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Sans engagement</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>14 jours d&apos;essai gratuit</div>
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
