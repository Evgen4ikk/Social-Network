import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/messenger/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/signin'
      });
    }
  }
});
