import { useQuery } from '@tanstack/react-query';

import type { GetUserByIdParams } from '../requests/user/id/get';

import { getUserById } from '../requests/user/id/get';

export const useGetUserByIdQuery = (
  params: GetUserByIdParams,
  settings?: QuerySettings<typeof getUserById>
) =>
  useQuery({
    queryKey: ['getUserById', params.userId],
    queryFn: () => getUserById({ params, config: settings?.config }),
    ...settings?.options
  });
