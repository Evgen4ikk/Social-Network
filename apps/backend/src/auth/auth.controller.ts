import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 409, description: 'Пользователь с таким логином уже существует' })
  @ApiBody({ type: SignupDto })
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signUp(signupDto, response);
  }

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, description: 'Авторизация успешна' })
  @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
  @ApiBody({ type: SigninDto })
  @Post('signin')
  async signIn(@Body() signinDto: SigninDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(signinDto, response);
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, description: 'Выход выполнен' })
  @ApiAuthorizedOnly()
  @ApiBearerAuth()
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.signOut(response);
  }
}
