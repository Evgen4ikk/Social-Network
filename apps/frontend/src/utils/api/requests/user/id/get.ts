import type { AxiosResponse } from 'axios';

import type { UserWithFriends } from '@/generated/api';

import { api } from '@/utils/api/instance';

export interface GetUserByIdParams {
  userId: number;
}

export type GetUserByIdConfig = RequestConfig<GetUserByIdParams>;

export const getUserById = ({ params, config }: GetUserByIdConfig) =>
  api.get<never, AxiosResponse<UserWithFriends>>(`/user/${params.userId}`, {
    params,
    ...config
  });
