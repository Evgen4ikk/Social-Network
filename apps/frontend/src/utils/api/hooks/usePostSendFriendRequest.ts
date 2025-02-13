import { useMutation } from '@tanstack/react-query';

import type { PostSendRequestConfig } from '../requests/friend/request/post';

import { postSendFriendRequest } from '../requests/friend/request/post';

export const usePostSendFriendRequest = (
  settings?: MutationSettings<PostSendRequestConfig, typeof postSendFriendRequest>
) =>
  useMutation({
    mutationKey: ['postSendRequest'],
    mutationFn: ({ params, config }: PostSendRequestConfig) =>
      postSendFriendRequest({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
