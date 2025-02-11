import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { usePostSignupMutation } from '@/api/hooks';
import { useSession } from '@/utils/contexts/session';

import type { SignupFormData } from '../-constants/signupSchema';

import { signupSchema } from '../-constants/signupSchema';

export const useSignupPage = () => {
  const navigate = useNavigate();
  const { set } = useSession();
  const { mutateAsync: postSignup } = usePostSignupMutation();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    await postSignup(
      {
        params: {
          login: data.login,
          name: data.name,
          password: data.password
        }
      },
      {
        onSuccess: () => {
          set(true);
          navigate({ to: '/home' });
        }
      }
    );
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
