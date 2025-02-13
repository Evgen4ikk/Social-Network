import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Layout } from '@/components/Layout';
import { useSession } from '@/utils/contexts/session';

interface RouterContext {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { value: isAuthenticated } = useSession();

    if (isAuthenticated) {
      return (
        <Layout>
          <Outlet />
        </Layout>
      );
    }

    return <Outlet />;
  }
});
