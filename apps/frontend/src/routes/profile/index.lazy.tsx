import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfilePage } from './-hooks/useProfilePage';

const ProfilePage = () => {
  const { state } = useProfilePage();
  return <div>{state.user?.name}</div>;
};

export const Route = createLazyFileRoute('/profile/')({
  component: ProfilePage
});
