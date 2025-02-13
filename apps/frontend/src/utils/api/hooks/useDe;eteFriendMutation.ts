import { useMutation } from '@tanstack/react-query';

import type { DeleteFriendRequestConfig } from '../requests/friend/delete/delete';

import { deleteFriendRequest } from '../requests/friend/delete/delete';

export const useDeleteFriendRequest = (
  settings?: MutationSettings<DeleteFriendRequestConfig, typeof deleteFriendRequest>
) =>
  useMutation({
    mutationKey: ['deleteRequest'],
    mutationFn: ({ params, config }: DeleteFriendRequestConfig) =>
      deleteFriendRequest({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
