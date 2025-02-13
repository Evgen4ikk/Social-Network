import { getRouteApi } from '@tanstack/react-router';

import { useGetAllUsersQuery, useGetUserQuery } from '@/api/hooks';

import type { FriendsSearch } from '..';

export const useFriendsPage = () => {
  const { data: meResponse } = useGetUserQuery();
  const user = meResponse?.data.user;
  const routeApi = getRouteApi('/friends/');
  const { type } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const usersResponse = useGetAllUsersQuery();

  const onChangeType = ({ type }: FriendsSearch) => {
    navigate({ search: { type } });
  };

  return {
    state: {
      users: usersResponse.data?.data || [],
      user,
      type
    },
    functions: {
      onChangeType
    }
  };
};
