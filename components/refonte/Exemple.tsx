import { useTranslations } from 'next-intl';

/** Une maquette qui montre des montants porte une étiquette « Exemple » : ce sont des chiffres d'illustration, jamais les prix de Sojori. */
export function Exemple({ children }: { children: React.ReactNode }) {
  const t = useTranslations('refonte.band');
  return (
    <div className="sj2 sj2--chrome sj2-exemple-wrap">
      {children}
      <span className="sj2-exemple">{t('example')}</span>
    </div>
  );
}
