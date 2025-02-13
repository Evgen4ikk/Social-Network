import { Avatar, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

import { useUserByIdPage } from './-hooks/useUserByIdPage';

const UserByIdPage = () => {
  const { state, functions } = useUserByIdPage();
  return (
    <Stack>
      <Flex gap='md'>
        <Stack>
          <Avatar mx='auto' size={128}>
            {state.user?.name.charAt(0)}
          </Avatar>
          {!state.isFriend && !state.isRequested && !state.isReceived && (
            <Button onClick={functions.sendFriendRequest}>Добавить в друзья</Button>
          )}
          {state.isFriend && <Button onClick={functions.deleteFriend}>Удалить из друзей</Button>}
          {state.isRequested && !state.isFriend && (
            <Button onClick={functions.cancelFriendRequest}>Отменить запрос</Button>
          )}
          {state.isReceived && !state.isFriend && (
            <Button onClick={functions.acceptFriendRequest}>Принять запрос</Button>
          )}
        </Stack>
        <Stack gap='md'>
          <Title mt={8}>{state.user?.name}</Title>
          <Stack
            style={{
              flexShrink: 0,
              alignSelf: 'flex-start'
            }}
            gap={2}
            ta='center'
          >
            <Text>Друзей</Text>
            <Text>{state.user?.friends.length}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export const Route = createLazyFileRoute('/user/$id/')({
  component: UserByIdPage
});
