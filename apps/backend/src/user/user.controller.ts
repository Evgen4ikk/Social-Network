import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { GetUserResponse } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiAuthorizedOnly()
  @ApiOperation({ summary: 'Получить данные профиля' })
  @ApiResponse({ description: 'Получить данные профиля', type: GetUserResponse })
  getProfile(@Req() req: Request) {
    const token = req.cookies.session;

    return this.userService.getProfile(token);
  }
}
