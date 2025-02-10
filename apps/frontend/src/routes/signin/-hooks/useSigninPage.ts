import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { usePostSigninMutation } from '@/api/hooks';

import type { SigninFormData } from '../-constatnts/signinSchema';

import { signinSchema } from '../-constatnts/signinSchema';

export const useSigninPage = () => {
  const { mutateAsync: postSignin, isPending } = usePostSigninMutation();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
    await postSignin({
      params: data
    });
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
