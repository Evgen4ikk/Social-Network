import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SendFriendRequestDto {
  @ApiProperty({
    description: 'ID отправителя запроса',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  senderId: number;

  @ApiProperty({
    description: 'ID получателя запроса',
    example: 2
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  recipientId: number;
}
