import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useGetUserQuery } from '@/api/hooks';
import { Layout } from '@/components/Layout';
import { routeTree } from '@/generated/router';
import { useSession } from '@/utils/contexts/session';

const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const { value: isAuthenticated, set } = useSession();
  const { data, isLoading, isError } = useGetUserQuery({
    options: {
      retry: false
    }
  });

  useEffect(() => {
    if (data?.data.user) {
      set(true);
    } else if (isError || !isLoading) {
      set(false);
    }
  }, [data, isError, isLoading, set]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <Layout>
        <RouterProvider context={{ isAuthenticated }} router={router} scrollRestoration />
      </Layout>
    );
  }

  return <RouterProvider context={{ isAuthenticated }} router={router} scrollRestoration />;
};
