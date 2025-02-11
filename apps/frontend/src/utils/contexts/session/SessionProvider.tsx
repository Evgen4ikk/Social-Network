import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import { UserResponse } from '@/generated/api';
import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  children: ReactNode;
  initialSession?: boolean;
  initialUser?: UserResponse;
}

export const SessionProvider = ({
  children,
  initialSession,
  initialUser
}: SessionProviderProps) => {
  const [session, setSession] = useState(initialSession);
  const [user, setUser] = useState(initialUser);

  const value = useMemo(
    () => ({ value: session, user: user, setValue: setSession, setUser }),
    [session, user]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
