import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { usePostSigninMutation } from '@/api/hooks';
import { useSession } from '@/utils/contexts/session';

import type { SigninFormData } from '../-constatnts/signinSchema';

import { signinSchema } from '../-constatnts/signinSchema';

export const useSigninPage = () => {
  const navigate = useNavigate();
  const { set } = useSession();
  const { mutateAsync: postSignin, isPending } = usePostSigninMutation();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
    await postSignin(
      {
        params: data
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
      form,
      isLoading: isPending
    },
    functions: {
      handleSubmit: form.handleSubmit(onSubmit)
    }
  };
};
