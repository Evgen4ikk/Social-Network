import type { AxiosResponse } from 'axios';

import { api } from '@/utils/api/instance';

export interface PostAcceptRequestParams {
  requestId: number;
}

export type PostAcceptRequestConfig = RequestConfig<PostAcceptRequestParams>;

export const postAcceptFriendRequest = ({ params, config }: PostAcceptRequestConfig) =>
  api.post<never, AxiosResponse<null>>(`/friends/accept/${params.requestId}`, params, config);
