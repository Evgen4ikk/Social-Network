import { Avatar, Flex, Stack, Text, Title } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

import { useProfilePage } from './-hooks/useProfilePage';

const ProfilePage = () => {
  const { state } = useProfilePage();
  return (
    <Stack>
      <Flex gap='md'>
        <Avatar size={128}>{state.user?.name.charAt(0)}</Avatar>
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

export const Route = createLazyFileRoute('/profile/')({
  component: ProfilePage
});
