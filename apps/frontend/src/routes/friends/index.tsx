import { createFileRoute, redirect } from '@tanstack/react-router';

export interface FriendsSearch {
  type: 'all' | 'new' | 'online';
}

export const Route = createFileRoute('/friends/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/signin'
      });
    }
  },
  validateSearch: (search: Record<string, unknown>): FriendsSearch => {
    return {
      type: (search.type as 'all' | 'new' | 'online') || 'all'
    };
  }
});
