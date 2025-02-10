import {
  Button,
  Center,
  Container,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

import { useSigninPage } from './-hooks/useSigninPage';

const SigninPage = () => {
  const navigate = useNavigate();
  const { functions, state } = useSigninPage();

  return (
    <Center mih='100vh'>
      <Container bg='dark.6' px={24} py={38} style={{ borderRadius: 14 }} w={450}>
        <Text inline size='36' ta='center'>
          Вход
        </Text>
        <form onSubmit={functions.handleSubmit}>
          <Stack gap={26} mt={32}>
            <TextInput
              label='Логин'
              size='md'
              placeholder='Логин'
              {...state.form.register('login')}
              error={state.form.formState.errors.login?.message}
            />
            <PasswordInput
              label='Пароль'
              size='md'
              placeholder='Пароль'
              {...state.form.register('password')}
              error={state.form.formState.errors.password?.message}
            />
          </Stack>
          <Button fullWidth mt={26} size='md' type='submit'>
            Войти
          </Button>
        </form>
        <Flex align='center' gap={8} mt={12}>
          <>
            <Text>Нет аккаунта?</Text>
            <Text
              style={{ cursor: 'pointer' }}
              td='underline'
              onClick={() => navigate({ to: '/signup' })}
            >
              Регистрация
            </Text>
          </>
        </Flex>
      </Container>
    </Center>
  );
};

export const Route = createLazyFileRoute('/signin/')({
  component: SigninPage
});
