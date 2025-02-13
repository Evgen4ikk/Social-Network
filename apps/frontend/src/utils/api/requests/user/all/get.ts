import type { AxiosResponse } from 'axios';

import type { User } from '@/generated/api';

import { api } from '@/api/instance';

export type GetRequestUserConfig = RequestConfig;

export const getAllUsers = (params?: GetRequestUserConfig) =>
  api.get<never, AxiosResponse<User[]>>('/user/all', params?.config);
