import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/signup/')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/home'
      });
    }
  }
});
