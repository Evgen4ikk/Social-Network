import { useQuery } from '@tanstack/react-query';

import { getUser } from '../requests/user/get';

export const useGetUserQuery = (settings?: QuerySettings<typeof getUser>) =>
  useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser({ config: settings?.config }),
    ...settings?.options
  });
