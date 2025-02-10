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

import { useSignupPage } from './-hooks/useSignupPage';

const SignupPage = () => {
  const navigate = useNavigate();
  const { functions, state } = useSignupPage();
  return (
    <Center mih='100vh'>
      <Container bg='dark.6' px={24} py={38} style={{ borderRadius: 14 }} w={450}>
        <Text inline size='36' ta='center'>
          Регистрация
        </Text>
        <form onSubmit={functions.handleSubmit}>
          <Stack gap={26} mt={32}>
            <TextInput
              label='Имя'
              size='md'
              placeholder='Имя'
              {...state.form.register('name')}
              error={state.form.formState.errors.name?.message}
            />
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
            <PasswordInput
              label='Повторите пароль'
              size='md'
              placeholder='Пароль'
              {...state.form.register('confirmPassword')}
              error={state.form.formState.errors.confirmPassword?.message}
            />
          </Stack>
          <Button fullWidth mt={26} size='md' type='submit'>
            Зарегистрироваться
          </Button>
        </form>
        <Flex align='center' gap={8} mt={12}>
          <Text>Есть аккаунт?</Text>
          <Text
            style={{ cursor: 'pointer' }}
            td='underline'
            onClick={() => navigate({ to: '/signin' })}
          >
            Войти
          </Text>
        </Flex>
      </Container>
    </Center>
  );
};

export const Route = createLazyFileRoute('/signup/')({
  component: SignupPage
});
