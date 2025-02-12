import { ApiProperty } from '@nestjs/swagger';

import { Friend } from '@/friend/model/friend.model';

export class UserResponse {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({ description: 'Логин пользователя', example: 'test' })
  login: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Друзья',
    type: () => Friend,
    isArray: true
  })
  friends: Friend[];
}

export class GetUserResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}
