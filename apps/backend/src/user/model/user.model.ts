import { ApiProperty } from '@nestjs/swagger';

import { FriendStatus } from '@/friend/entities/friend.entity';

export class User {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({ description: 'Логин пользователя', example: 'test' })
  login: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;
}

export class UserWithFriends extends User {
  @ApiProperty({
    description: 'Друзья',
    type: () => User,
    isArray: true
  })
  friends: User[];
}

export class receivedRequests {
  @ApiProperty({ description: 'ID запроса', example: 1 })
  id: number;

  @ApiProperty({ description: 'Пользователь', type: User })
  requester: User;

  @ApiProperty({ description: 'Статус дружбы', example: 'PENDING' })
  status: FriendStatus;
}

export class sentRequests {
  @ApiProperty({ description: 'ID запроса', example: 1 })
  id: number;

  @ApiProperty({ description: 'Пользователь', type: User })
  recipient: User;

  @ApiProperty({ description: 'Статус дружбы', example: 'PENDING' })
  status: FriendStatus;
}

export class UserResponse {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({ description: 'Логин пользователя', example: 'test' })
  login: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Друзья',
    type: () => User,
    isArray: true
  })
  friends: User[];

  @ApiProperty({
    description: 'Полученные запросы',
    type: () => receivedRequests,
    isArray: true
  })
  receivedRequests: receivedRequests[];

  @ApiProperty({
    description: 'Отправленные запросы',
    type: () => sentRequests,
    isArray: true
  })
  sentRequests: sentRequests[];
}

export class GetUserResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}
