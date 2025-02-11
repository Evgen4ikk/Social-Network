import { createContext } from 'react';

import type { UserResponse } from '@/generated/api';

export interface SessionContextProps {
  user?: UserResponse;
  value?: boolean;
  setUser: (user: UserResponse) => void;
  setValue: (session: boolean) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  value: undefined,
  setValue: () => {},
  setUser: () => {},
  user: undefined
});
