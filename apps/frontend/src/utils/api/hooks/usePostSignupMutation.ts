import { useMutation } from '@tanstack/react-query';

import type { PostSignupConfig } from '../requests/auth/signup/post';

import { postSignup } from '../requests/auth/signup/post';

export const usePostSignupMutation = (
  settings?: MutationSettings<PostSignupConfig, typeof postSignup>
) =>
  useMutation({
    mutationKey: ['postSignup'],
    mutationFn: ({ params, config }) =>
      postSignup({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
