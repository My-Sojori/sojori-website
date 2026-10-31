'use client';

import { createContext, useContext, useState } from 'react';
import type { CasId } from '@/lib/refonte/journee';

const Ctx = createContext<{ cas: CasId; setCas: (c: CasId) => void }>({ cas: 'conc', setCas: () => {} });

/** L'établissement choisi en haut de l'accueil : la scène, les chiffres et les gains estimés le suivent. */
export function CasProvider({ children }: { children: React.ReactNode }) {
  const [cas, setCas] = useState<CasId>('conc');
  return <Ctx.Provider value={{ cas, setCas }}>{children}</Ctx.Provider>;
}

export const useCas = () => useContext(Ctx);
