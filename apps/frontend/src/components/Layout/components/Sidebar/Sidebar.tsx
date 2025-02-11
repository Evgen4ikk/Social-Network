import { Box, NavLink, rem } from '@mantine/core';
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { useState } from 'react';

export const Sidebar = () => {
  const [active, setActive] = useState(0);

  const mainLinks = [
    { icon: <IconHome size='1.2rem' />, label: 'Моя страница' },
    { icon: <IconUser size='1.2rem' />, label: 'Друзья' },
    { icon: <IconMessage size='1.2rem' />, label: 'Мессенджер' }
  ];

  return (
    <Box
      w={rem(200)}
      style={{
        flexShrink: 0
      }}
    >
      {mainLinks.map((item, index) => (
        <NavLink
          key={item.label}
          active={index === active}
          label={item.label}
          variant='filled'
          leftSection={item.icon}
          onClick={() => setActive(index)}
          styles={{ root: { borderRadius: 'var(--mantine-radius-md)' } }}
        />
      ))}
    </Box>
  );
};
