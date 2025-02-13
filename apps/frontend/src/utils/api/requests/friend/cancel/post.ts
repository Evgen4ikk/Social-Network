import type { AxiosResponse } from 'axios';

import { api } from '@/utils/api/instance';

export interface PostCancelRequestParams {
  requestId: number;
}

export type PostCancelRequestConfig = RequestConfig<PostCancelRequestParams>;

export const postCancelFriendRequest = ({ params, config }: PostCancelRequestConfig) =>
  api.post<never, AxiosResponse<null>>(`/friends/cancel/${params.requestId}`, params, config);
