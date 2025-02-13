import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import type { UserResponse } from '@/generated/api';

import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  children: ReactNode;
  initialSession?: boolean;
  initialUser?: UserResponse;
}

export const SessionProvider = ({ children, initialSession }: SessionProviderProps) => {
  const [session, setSession] = useState(initialSession);

  const value = useMemo(() => ({ value: session, setValue: setSession }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
