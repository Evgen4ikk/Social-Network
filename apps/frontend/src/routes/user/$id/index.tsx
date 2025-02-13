import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/user/$id/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/signin'
      });
    }
  }
});
