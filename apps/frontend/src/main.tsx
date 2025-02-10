import { createTheme } from '@mantine/core';
import { QueryClient } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import type { ProvidersProps } from './providers';

import { App } from './App';
import { Providers } from './providers';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const init = () => {
  const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

  const providersProps: Omit<ProvidersProps, 'children'> = {
    query: {
      client: new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
    },
    mantine: {
      theme: createTheme({
        fontFamily: 'Roboto, sans-serif',
        primaryColor: 'dark'
      }),
      defaultColorScheme: 'dark'
    }
  };

  root.render(
    <Providers {...providersProps}>
      <App />
    </Providers>
  );
};

init();
