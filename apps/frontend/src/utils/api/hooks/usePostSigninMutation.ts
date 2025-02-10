import { useMutation } from '@tanstack/react-query';

import type { PostSigninConfig } from '../requests/auth/signin/post';

import { postSignin } from '../requests/auth/signin/post';

export const usePostSigninMutation = (
  settings?: MutationSettings<PostSigninConfig, typeof postSignin>
) =>
  useMutation({
    mutationKey: ['postSignin'],
    mutationFn: ({ params, config }) =>
      postSignin({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
