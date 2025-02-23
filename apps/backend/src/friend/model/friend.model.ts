import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/user/model/user.model';

import { FriendStatus } from '../entities/friend.entity';

export class FriendResponse {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({ description: 'Друг', type: User })
  friend: User;

  @ApiProperty({
    description: 'Статус дружбы',
    enum: FriendStatus,
    example: 'PENDING'
  })
  status: FriendStatus;
}

export class GetFriendsResponse {
  @ApiProperty({ description: 'Друзья', type: [FriendResponse] })
  friends: [FriendResponse];

  @ApiProperty({ description: 'Количество друзей' })
  total: number;

  @ApiProperty({ description: 'Страница' })
  page: number;

  @ApiProperty({ description: 'Лимит' })
  limit: number;
}

export class FriendRequestResponse {
  @ApiProperty({ description: 'ID запроса', example: 1 })
  id: number;

  @ApiProperty({ description: 'Получатель', type: User })
  recipient: User;

  @ApiProperty({ description: 'Отправитель', type: User })
  requester: User;

  @ApiProperty({
    description: 'Статус дружбы',
    enum: FriendStatus,
    example: 'PENDING'
  })
  status: FriendStatus;
}
