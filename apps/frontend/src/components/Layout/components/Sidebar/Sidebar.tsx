import { Box, NavLink, rem } from '@mantine/core';
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const mainLinks = [
    { icon: <IconHome size='1.2rem' />, label: 'Моя страница', path: '/profile' },
    { icon: <IconUser size='1.2rem' />, label: 'Друзья', path: '/friends' },
    { icon: <IconMessage size='1.2rem' />, label: 'Мессенджер', path: '/messenger' }
  ];

  const handleNavigation = (path: string, index: number) => {
    setActive(index);
    navigate({ to: path });
  };

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
          onClick={() => handleNavigation(item.path, index)}
          styles={{ root: { borderRadius: 'var(--mantine-radius-md)' } }}
        />
      ))}
    </Box>
  );
};
