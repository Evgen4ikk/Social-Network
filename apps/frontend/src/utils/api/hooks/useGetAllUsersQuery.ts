import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '../requests/user/all/get';

export const useGetAllUsersQuery = (settings?: QuerySettings<typeof getAllUsers>) =>
  useQuery({
    queryKey: ['getAllUsers'],
    queryFn: () => getAllUsers({ config: settings?.config }),
    ...settings?.options
  });
