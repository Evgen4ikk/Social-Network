import { useGetUserQuery } from '@/utils/api/hooks';

export const useProfilePage = () => {
  const user = useGetUserQuery();

  return {
    state: {
      user: user.data?.data.user
    }
  };
};
