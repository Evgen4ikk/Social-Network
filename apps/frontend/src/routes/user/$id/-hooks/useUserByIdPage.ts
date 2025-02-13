import { getRouteApi } from '@tanstack/react-router';

import { useGetUserQuery } from '@/utils/api/hooks';
import { useGetUserByIdQuery } from '@/utils/api/hooks/getUserByIdQuery';
import { useDeleteFriendRequest } from '@/utils/api/hooks/useDe;eteFriendMutation';
import { usePostAcceptFriendRequest } from '@/utils/api/hooks/usePostAcceptFriendRequestMutation';
import { usePostCancelFriendRequest } from '@/utils/api/hooks/usePostCancelFriendRequestMutation';
import { usePostSendFriendRequest } from '@/utils/api/hooks/usePostSendFriendRequest';

export const useUserByIdPage = () => {
  const route = getRouteApi('/user/$id/');
  const { id } = route.useParams();
  const { data: meResponse, refetch: refetchMe } = useGetUserQuery();
  const me = meResponse?.data.user;

  const { data: user } = useGetUserByIdQuery({ userId: +id });

  let isRequested = me?.sentRequests.some((req) => req.recipient.id === +id) || false;

  let isFriend = me?.friends.some((friend) => friend.id === +id) || false;

  let isReceived = me?.receivedRequests.some((req) => req.requester.id === +id) || false;

  const { mutateAsync: postSendFriendRequest } = usePostSendFriendRequest();

  const { mutateAsync: postAcceptFriendRequest } = usePostAcceptFriendRequest();

  const { mutateAsync: postCancelFriendRequest } = usePostCancelFriendRequest();

  const { mutateAsync: deleteFriendRequest } = useDeleteFriendRequest();

  const sendFriendRequest = async () => {
    if (!me) return;
    await postSendFriendRequest(
      { params: { recipientId: +id, senderId: me.id } },
      {
        onSuccess: () => {
          refetchMe();
          isRequested = true;
        }
      }
    );
  };

  const acceptFriendRequest = async () => {
    if (!me) return;

    const requestId = me.receivedRequests.find((req) => req.requester.id === +id)?.id;

    if (!requestId) return;
    await postAcceptFriendRequest(
      { params: { requestId } },
      {
        onSuccess: () => {
          refetchMe();
          isFriend = true;
          isReceived = false;
        }
      }
    );
  };

  const cancelFriendRequest = async () => {
    if (!me) return;

    const requestId = me.sentRequests.find((req) => req.recipient.id === +id)?.id;

    if (!requestId) return;
    await postCancelFriendRequest(
      { params: { requestId } },
      {
        onSuccess: () => {
          refetchMe();
          isRequested = false;
        }
      }
    );
  };

  const deleteFriend = async () => {
    if (!me) return;

    await deleteFriendRequest(
      { params: { friendId: +id } },
      {
        onSuccess: () => {
          refetchMe();
          isFriend = false;
        }
      }
    );
  };

  return {
    state: {
      user: user?.data,
      isRequested,
      isFriend,
      isReceived
    },
    functions: {
      sendFriendRequest,
      acceptFriendRequest,
      cancelFriendRequest,
      deleteFriend
    }
  };
};
