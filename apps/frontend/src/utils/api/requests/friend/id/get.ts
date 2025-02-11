import type { AxiosResponse } from 'axios';

import type { FriendControllerGetFriendsParams, GetFriendsResponse } from '@/generated/api';

import { api } from '@/utils/api/instance';

export interface GetRequestFriendsByIdParams extends FriendControllerGetFriendsParams {
  userId: number;
}

export type GetRequestFriendsByIdConfig = RequestConfig<GetRequestFriendsByIdParams>;

export const getFriendsById = ({ params, config }: GetRequestFriendsByIdConfig) =>
  api.get<never, AxiosResponse<GetFriendsResponse>>(`/friends/${params.userId}`, {
    params,
    ...config
  });
