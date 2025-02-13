import { Avatar, Flex, Stack, Title } from '@mantine/core';
import { IconUserQuestion, IconUsersPlus } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';

import type { User } from '@/generated/api';

import { useGetUserQuery } from '@/utils/api/hooks';
import { usePostSendFriendRequest } from '@/utils/api/hooks/usePostSendFriendRequest';

interface FriendsListProps {
  users: User[];
}

const FriendItem = (user: User) => {
  const navigate = useNavigate();
  const { data: meResponse } = useGetUserQuery();
  const profile = meResponse?.data.user;

  const { mutateAsync: postSendFriendRequest } = usePostSendFriendRequest();

  const handleSendFriendRequest = async () => {
    if (!profile) return;
    await postSendFriendRequest({ params: { recipientId: user.id, senderId: profile.id } });
  };

  const isRequestSent = profile?.sentRequests.some((req) => req.recipient.id === user.id);

  return (
    <Flex
      align='center'
      bg='dark.7'
      justify='space-between'
      pl={12}
      pr={24}
      py={6}
      style={{ borderRadius: 8 }}
    >
      <Flex
        align='center'
        gap='md'
        onClick={() => navigate({ to: '/user/$id', params: { id: user.id.toString() } })}
      >
        <Avatar size={52}>{user.name.charAt(0)}</Avatar>
        <Title size='24'>{user.name}</Title>
      </Flex>
      {!isRequestSent ? (
        <IconUsersPlus cursor='pointer' onClick={handleSendFriendRequest} />
      ) : (
        <IconUserQuestion cursor='pointer' />
      )}
    </Flex>
  );
};

export const FriendsList = ({ users }: FriendsListProps) => {
  return (
    <Stack mt={24}>
      {users.map((user) => (
        <FriendItem key={user.id} {...user} />
      ))}
    </Stack>
  );
};
