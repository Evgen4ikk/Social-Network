import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { usePostSignupMutation } from '@/api/hooks';

import type { SignupFormData } from '../-constants/signupSchema';

import { signupSchema } from '../-constants/signupSchema';

export const useSignupPage = () => {
  const { mutateAsync: postSignup } = usePostSignupMutation();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    await postSignup({
      params: {
        login: data.login,
        name: data.name,
        password: data.password
      }
    });
  };

  return {
    state: {
      form
    },
    functions: {
      handleSubmit: form.handleSubmit(onSubmit)
    }
  };
};
