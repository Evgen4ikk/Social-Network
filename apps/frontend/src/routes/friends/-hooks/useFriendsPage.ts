import { useGetFriendsByIdQuery } from '@/utils/api/hooks/useGetFriendsByIdQuery';
import { useSession } from '@/utils/contexts/session';

export const useFriendsPage = () => {
  const { user } = useSession();
  const friends = useGetFriendsByIdQuery({ userId: user?.id || 0 });

  return {
    state: {
      friends: friends.data?.data.friends || []
    }
  };
};
