import { useMutation } from '@tanstack/react-query';

import type { PostCancelRequestConfig } from '../requests/friend/cancel/post';

import { postCancelFriendRequest } from '../requests/friend/cancel/post';

export const usePostCancelFriendRequest = (
  settings?: MutationSettings<PostCancelRequestConfig, typeof postCancelFriendRequest>
) =>
  useMutation({
    mutationKey: ['postCancelRequest'],
    mutationFn: ({ params, config }: PostCancelRequestConfig) =>
      postCancelFriendRequest({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
