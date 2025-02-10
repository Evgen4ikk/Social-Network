import type { AxiosResponse } from 'axios';

import type { SignupDto } from '@/generated/api';

import { api } from '@/utils/api/instance';

export type PostSignupConfig = RequestConfig<SignupDto>;

export const postSignup = ({ params, config }: PostSignupConfig) =>
  api.post<never, AxiosResponse<null>>('/auth/signup', params, config);
