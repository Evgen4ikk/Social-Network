import { useQuery } from '@tanstack/react-query';

import type { GetRequestFriendsByIdParams } from '../requests/friend/id/get';

import { getFriendsById } from '../requests/friend/id/get';

export const useGetFriendsByIdQuery = (
  params: GetRequestFriendsByIdParams,
  settings?: QuerySettings<typeof getFriendsById>
) =>
  useQuery({
    queryKey: ['getFriendsById', params.userId],
    queryFn: () => getFriendsById({ params, config: settings?.config }),
    ...settings?.options
  });
