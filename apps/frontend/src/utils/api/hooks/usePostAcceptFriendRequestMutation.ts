import { useMutation } from '@tanstack/react-query';

import type { PostAcceptRequestConfig } from '../requests/friend/accept/post';

import { postAcceptFriendRequest } from '../requests/friend/accept/post';

export const usePostAcceptFriendRequest = (
  settings?: MutationSettings<PostAcceptRequestConfig, typeof postAcceptFriendRequest>
) =>
  useMutation({
    mutationKey: ['postAcceptRequest'],
    mutationFn: ({ params, config }: PostAcceptRequestConfig) =>
      postAcceptFriendRequest({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
