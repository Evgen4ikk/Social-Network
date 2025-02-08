import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AcceptFriendRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  requestId: number;
}
