import { Button } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

import { FriendsList } from './-components/FriendsList/FriendsList';
import { useFriendsPage } from './-hooks/useFriendsPage';

const FriendsPage = () => {
  const { state, functions } = useFriendsPage();

  if (!state.user) return null;

  const data = state.type === 'all' ? state.user.friends : state.type === 'new' ? state.users : [];

  return (
    <div>
      <Button
        variant={state.type === 'all' ? 'filled' : 'default'}
        onClick={() => functions.onChangeType({ type: 'all' })}
      >
        Мои друзья {state.user?.friends.length}
      </Button>
      <Button
        variant={state.type === 'online' ? 'filled' : 'default'}
        onClick={() => functions.onChangeType({ type: 'online' })}
      >
        Друзья онлайн 0
      </Button>
      <Button
        variant={state.type === 'new' ? 'filled' : 'default'}
        onClick={() => functions.onChangeType({ type: 'new' })}
      >
        Найти друзей
      </Button>
      <FriendsList users={data} />
    </div>
  );
};

export const Route = createLazyFileRoute('/friends/')({
  component: FriendsPage
});
