import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useGetUserQuery } from '@/api/hooks';
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
  const { value: isAuthenticated, setValue, setUser } = useSession();
  const { data, isLoading, isError } = useGetUserQuery({
    options: {
      retry: false
    }
  });

  useEffect(() => {
    if (data?.data.user) {
      setValue(true);
      setUser(data.data.user);
    } else if (isError || !isLoading) {
      setValue(false);
    }
  }, [data, isError, isLoading, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider context={{ isAuthenticated }} router={router} scrollRestoration />;
};
