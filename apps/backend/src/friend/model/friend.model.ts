import { ApiProperty } from '@nestjs/swagger';

import { FriendStatus } from '../entities/friend.entity';

export class Friend {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({ description: 'Логин пользователя', example: 'test' })
  login: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;
}

export class FriendResponse {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;
  @ApiProperty({ description: 'Пользователь', type: Friend })
  friend: Friend;
  @ApiProperty({ description: 'Статус дружбы', example: 'PENDING' })
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
