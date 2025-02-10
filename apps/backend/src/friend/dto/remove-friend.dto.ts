import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RemoveFriendDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'ID друга',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  friendId: number;
}
