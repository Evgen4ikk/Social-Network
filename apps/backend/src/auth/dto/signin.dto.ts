import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'john123', description: 'Логин пользователя' })
  @MinLength(6, { message: 'Логин должен содержать не менее 6 символов' })
  @IsString()
  @Matches(/^[a-z0-9]+$/i, { message: 'Логин может содержать только латинские буквы и цифры' })
  login: string;

  @ApiProperty({ example: 'securePassword123', description: 'Пароль пользователя' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @IsString()
  password: string;
}
