import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetFriendsDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;
}
