import { AppShell, Box, Flex, rem, Text, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import type { User } from '@/generated/api';

import { useGetUserQuery } from '@/utils/api/hooks';

import { Header, Sidebar } from './components';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { data: userResponse, refetch } = useGetUserQuery();
  const user = userResponse?.data.user;

  useEffect(() => {
    if (!user?.id) return;

    const socket = io('http://localhost:3000', {
      auth: { user: { id: user.id } }
    });

    socket.on('connect', () => console.log('✅ Соединение установлено'));

    socket.on('friend_request', (data: { user: User }) => {
      refetch();
      notifications.show({
        title: 'Новый запрос в друзья',
        message: (
          <Flex align='center' gap={4}>
            Пользователь{' '}
            {
              <Text
                style={{
                  cursor: 'pointer'
                }}
                c='blue'
                fw={500}
                size='sm'
                td='underline'
                onClick={() =>
                  navigate({ to: '/user/$id', params: { id: data.user.id.toString() } })
                }
              >
                {' '}
                {data.user.name}{' '}
              </Text>
            }{' '}
            хочет добавить вас в друзья
          </Flex>
        ),
        color: 'green'
      });
    });

    const handleFriendStatus = (data: { status: string; recipient: User; requester: User }) => {
      refetch();
      if (user.id === data.requester.id && data.status === 'ACCEPTED') {
        notifications.show({
          title: 'Новый друг!',
          message: (
            <Flex align='center' gap={4}>
              Пользователь{' '}
              {
                <Text
                  style={{
                    cursor: 'pointer'
                  }}
                  c='blue'
                  fw={500}
                  size='sm'
                  td='underline'
                  onClick={() =>
                    navigate({ to: '/user/$id', params: { id: data.recipient.id.toString() } })
                  }
                >
                  {' '}
                  {data.recipient.name}{' '}
                </Text>
              }{' '}
              принял ваш запрос в друзья
            </Flex>
          ),
          color: 'green'
        });
      }
    };

    socket.on('friend_status', handleFriendStatus);

    socket.on('disconnect', () => console.log('❌ Соединение закрыто'));

    return () => {
      socket.off('friend_status', handleFriendStatus);
      socket.disconnect();
    };
  }, [user?.id]);

  return (
    <Box
      style={{
        maxWidth: rem(1080),
        margin: '0 auto',
        minHeight: '100vh'
      }}
      maw={rem(1080)}
    >
      <AppShell
        styles={{
          main: {
            paddingLeft: 0,
            paddingRight: 0,
            maxWidth: rem(1080),
            marginLeft: 'auto',
            marginRight: 'auto'
          }
        }}
        header={{ height: { base: 60, md: 70 } }}
        padding='md'
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Flex gap='md'>
            <Sidebar />
            <Box
              style={{
                flexGrow: 1,
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
                backgroundColor: theme.colors.dark[6]
              }}
            >
              {children}
            </Box>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </Box>
  );
};
