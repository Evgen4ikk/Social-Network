import type { AxiosResponse } from 'axios';

import type { GetUserResponse } from '@/generated/api';

import { api } from '../../instance';

export type GetRequestUserConfig = RequestConfig;

export const getUser = (params?: GetRequestUserConfig) =>
  api.get<never, AxiosResponse<GetUserResponse>>('/user', params?.config);
