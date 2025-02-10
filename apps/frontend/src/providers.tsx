import type { MantineProviderProps } from '@mantine/core';
import type { QueryClientProviderProps } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';

export interface ProvidersProps {
  children: ReactNode;
  mantine: Omit<MantineProviderProps, 'children'>;
  query: Omit<QueryClientProviderProps, 'children'>;
}

export const Providers = ({ children, query, mantine }: ProvidersProps) => {
  return (
    <MantineProvider {...mantine}>
      <QueryClientProvider {...query}>
        <Notifications />
        {children}
      </QueryClientProvider>
    </MantineProvider>
  );
};
