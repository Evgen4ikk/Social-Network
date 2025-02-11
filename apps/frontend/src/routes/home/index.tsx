import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/home/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/signin'
      });
    }
  }
});
