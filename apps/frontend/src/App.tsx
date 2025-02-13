import { useQuery } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

import { getUser } from '@/api/requests/user/get';
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
  const { value: isAuthenticated, setValue } = useSession();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['session'],
    queryFn: () => getUser()
  });

  useEffect(() => {
    if (data?.data.user) {
      setValue(true);
    } else if (isError || !isLoading) {
      setValue(false);
    }
  }, [data, isError, isLoading, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider context={{ isAuthenticated }} router={router} scrollRestoration />;
};
