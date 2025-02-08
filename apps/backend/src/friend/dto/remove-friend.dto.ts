import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RemoveFriendDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  friendId: number;
}
