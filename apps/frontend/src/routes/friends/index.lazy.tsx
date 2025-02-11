import { createLazyFileRoute } from '@tanstack/react-router';
import { useFriendsPage } from './-hooks/useFriendsPage';

const FriendsPage = () => {
  const { state } = useFriendsPage();
  return <div>{state.friends.map((friend) => friend.friend.name)}</div>;
};

export const Route = createLazyFileRoute('/friends/')({
  component: FriendsPage
});
