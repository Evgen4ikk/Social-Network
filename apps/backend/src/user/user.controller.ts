import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/shared/guards';

import { GetUserResponse, User, UserWithFriends } from './model/user.model';
import { UserService } from './user.service';

@ApiAuthorizedOnly()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получить данные профиля' })
  @ApiResponse({ description: 'Получить данные профиля', type: GetUserResponse })
  getProfile(@Req() req: Request) {
    const token = req.cookies.session;

    return this.userService.getProfile(token);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ description: 'Получить всех пользователей', type: [User] })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ description: 'Получить пользователя по ID', type: UserWithFriends })
  @ApiParam({ name: 'id', type: Number })
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
