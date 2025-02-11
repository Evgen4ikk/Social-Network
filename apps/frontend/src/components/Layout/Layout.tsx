import { AppShell, Box, Flex, rem, useMantineTheme } from '@mantine/core';
import { Header, Sidebar } from './components';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();

  return (
    <Box
      maw={rem(1080)}
      style={{
        maxWidth: rem(1080),
        margin: '0 auto',
        minHeight: '100vh'
      }}
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
