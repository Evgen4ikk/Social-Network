import { ActionIcon, Avatar, Group, TextInput } from '@mantine/core';
import { IconBell, IconSearch } from '@tabler/icons-react';

export const Header = () => (
  <Group h='100%' justify='space-between' maw={1080} mx='auto'>
    <Group>
      Logo
      <TextInput
        size='sm'
        variant='filled'
        leftSection={<IconSearch size='1rem' />}
        placeholder='Поиск'
        styles={{ root: { width: 250 } }}
      />
    </Group>

    <Group gap='xl'>
      <ActionIcon size='lg' variant='transparent'>
        <IconBell size='1.4rem' />
      </ActionIcon>
      <Avatar radius='xl' size={40}>
        L
      </Avatar>
    </Group>
  </Group>
);
