import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiAuthorizedOnly } from '@/shared/guards';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: SignupDto })
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signUp(signupDto, response);
  }

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiBody({ type: SigninDto })
  @Post('signin')
  async signIn(@Body() signinDto: SigninDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(signinDto, response);
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @ApiAuthorizedOnly()
  @ApiBearerAuth()
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.signOut(response);
  }
}
