import { createContext } from 'react';

export interface SessionContextProps {
  value?: boolean;
  setValue: (session: boolean) => void;
}

export const SessionContext = createContext<SessionContextProps>({
  value: undefined,
  setValue: () => {}
});
