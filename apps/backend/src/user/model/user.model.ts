import { ApiProperty } from '@nestjs/swagger';

import { Friend } from '@/friend/entities/friend.entity';

import { User } from '../entity/user.entity';

export class UserResponse implements Omit<User, 'password'> {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;
  @ApiProperty({ description: 'Логин пользователя', example: 'test' })
  login: string;
  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;
  @ApiProperty({ description: 'Заявки в друзья', type: [Friend] })
  receivedRequests: Friend[];
  @ApiProperty({ description: 'Заявки в друзья', type: [Friend] })
  sentRequests: Friend[];
}

export class GetUserResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}
