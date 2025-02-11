import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/signin',
      })
    }
  },
})
