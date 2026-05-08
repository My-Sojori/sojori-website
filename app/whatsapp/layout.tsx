import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'WhatsApp AI Marrakech | Conciergerie Automatisée 24/7 Maroc',
  description: 'WhatsApp AI 24/7 pour property managers à Marrakech. Conciergerie automatisée, réponses instantanées guests, traduction automatique FR/AR/EN. Check-in digital, demandes personnalisées.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'WhatsApp conciergerie Marrakech',
    'automatisation WhatsApp Maroc',
    'chatbot hôtel Marrakech',
    'conciergerie digitale riad',
    'assistant IA tourisme Maroc',
    'messagerie automatique location',
  ],
  path: '/whatsapp',
});

export default function WhatsAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
