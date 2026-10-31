import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import fr from '@/messages/fr.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import pt from '@/messages/pt.json';
import ar from '@/messages/ar.json';

export const OG_SIZE = { width: 1200, height: 630 };

const MESSAGES = { fr, en, es, pt, ar } as unknown as Record<string, { refonte: { home: { hero: { keywords: string } } } }>;

// Les polices sont lues sur disque (runtime Node) : le chemin littéral est suivi par le traçage de Vercel.
const police = (nom: string) => readFile(join(process.cwd(), 'lib', 'og', nom));

/**
 * Image de partage (Open Graph et Twitter), version nuit : grille, halo or, logo, ligne de mots-clés en mono or,
 * « AI workforce for hospitality. », sojori.com. Les polices Geist n'ont que le latin : en arabe la ligne de
 * mots-clés reste en anglais (celle de l'accueil en anglais).
 */
export async function renderOg(locale: string) {
  const arabe = locale === 'ar';
  const brut = (MESSAGES[locale] ?? MESSAGES.fr).refonte.home.hero.keywords;
  const keywords = arabe ? brut : brut.toUpperCase();
  const [fontSemi, fontMono, fontArabe] = await Promise.all([
    police('Geist-SemiBold.ttf'), police('GeistMono-Medium.ttf'), arabe ? police('IBMPlexSansArabic-SemiBold.woff') : Promise.resolve(null),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px',
          backgroundColor: '#0C0B09',
          backgroundImage: 'radial-gradient(60% 50% at 82% 12%, rgba(230,176,34,0.22), rgba(12,11,9,0) 70%), linear-gradient(rgba(244,241,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,234,0.04) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          color: '#F4F1EA',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="17" stroke="#e6b022" strokeWidth="2" fill="none" strokeDasharray="3 4" opacity="0.7" />
            <circle cx="20" cy="20" r="11" stroke="#e6b022" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M 12 26 Q 20 26 20 20 Q 20 14 28 14" stroke="#e6b022" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="2.5" fill="#f4cf5e" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.2 }}>sojori</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {arabe ? (
            // Satori ne gère pas le bidi : les mots arabes sont posés un à un, en ligne inversée, avec un écart fixe.
            <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'flex-start', columnGap: 14, rowGap: 4, fontFamily: 'Plex Arabic', fontSize: 34, color: '#E6B022' }}>
              {keywords.split(/\s+/).filter(Boolean).map((w, i) => <div key={i} style={{ display: 'flex', whiteSpace: 'nowrap' }}>{w.trim()}</div>)}
            </div>
          ) : (
            <div style={{ fontFamily: 'Geist Mono', fontSize: 21, letterSpacing: 2.2, color: '#E6B022', display: 'flex' }}>{keywords}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 600, letterSpacing: -4.5, lineHeight: 1 }}>
            <div style={{ display: 'flex' }}>AI workforce</div>
            <div style={{ display: 'flex', color: '#E6B022' }}>for hospitality.</div>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#BDB6A8' }}>sojori.com</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Geist', data: fontSemi, weight: 600, style: 'normal' },
        { name: 'Geist Mono', data: fontMono, weight: 500, style: 'normal' },
        ...(fontArabe ? [{ name: 'Plex Arabic', data: fontArabe, weight: 600 as const, style: 'normal' as const }] : []),
      ],
    },
  );
}
