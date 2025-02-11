import { createContext } from 'react';

export interface SessionContextProps {
  value?: boolean;
  set: (session: boolean) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  value: undefined,
  set: () => {}
});
