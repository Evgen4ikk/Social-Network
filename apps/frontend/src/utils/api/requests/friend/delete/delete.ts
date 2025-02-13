import type { AxiosResponse } from 'axios';

import { api } from '@/utils/api/instance';

export interface DeleteFriendRequestParams {
  friendId: number;
}

export type DeleteFriendRequestConfig = RequestConfig<DeleteFriendRequestParams>;

export const deleteFriendRequest = ({ params, config }: DeleteFriendRequestConfig) =>
  api.delete<never, AxiosResponse<null>>(`/friends/remove/${params.friendId}`, {
    params,
    ...config
  });
