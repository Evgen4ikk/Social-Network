import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  children: ReactNode;
  initialSession?: boolean;
}

export const SessionProvider = ({ children, initialSession }: SessionProviderProps) => {
  const [session, setSession] = useState(initialSession);

  const value = useMemo(() => ({ value: session, set: setSession }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
