import type { AxiosResponse } from 'axios';

import type { SendFriendRequestDto } from '@/generated/api';

import { api } from '@/utils/api/instance';

export type PostSendRequestParams = SendFriendRequestDto;

export type PostSendRequestConfig = RequestConfig<PostSendRequestParams>;

export const postSendFriendRequest = ({ params, config }: PostSendRequestConfig) =>
  api.post<never, AxiosResponse<null>>('/friends/request', params, config);
