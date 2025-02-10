import type { AxiosResponse } from 'axios';

import type { SigninDto } from '@/generated/api';

import { api } from '@/utils/api/instance';

export type PostSigninConfig = RequestConfig<SigninDto>;

export const postSignin = ({ params, config }: PostSigninConfig) =>
  api.post<never, AxiosResponse<null>>('/auth/signin', params, config);
