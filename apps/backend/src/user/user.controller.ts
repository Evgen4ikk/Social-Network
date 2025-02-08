import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiAuthorizedOnly()
  getProfile(@Req() req: Request) {
    const token = req.cookies.access_jwt;

    return this.userService.getProfile(token);
  }
}
