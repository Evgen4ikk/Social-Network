import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from '@/auth/auth.service';
import { ApiAuthorizedOnly } from '@/shared/guards';

import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { FriendService } from './friend.service';
import { FriendRequestResponse, GetFriendsResponse } from './model/friend.model';

@ApiTags('Friend')
@ApiAuthorizedOnly()
@ApiBearerAuth()
@Controller('friends')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
    private readonly authService: AuthService
  ) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Получить список друзей' })
  @ApiResponse({
    status: 200,
    description: 'Друзья',
    type: GetFriendsResponse
  })
  @ApiParam({ name: 'userId', required: true, description: 'ID пользователя', type: Number })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', type: Number })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Количество элементов на странице',
    type: Number
  })
  getFriends(@Param('userId') userId: number, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.friendService.getFriends(userId, page, limit);
  }

  @Post('request')
  @ApiOperation({ summary: 'Отправить запрос дружбы' })
  @ApiResponse({ status: 200, description: 'Запрос отправлен', type: FriendRequestResponse })
  sendRequest(@Body() body: SendFriendRequestDto) {
    return this.friendService.sendFriendRequest(body);
  }

  @Post('accept/:requestId')
  @ApiParam({ name: 'requestId', type: Number })
  @ApiResponse({ status: 200, description: 'Запрос принят', type: FriendRequestResponse })
  acceptRequest(@Param() params: { requestId: number }) {
    return this.friendService.acceptFriendRequest(params.requestId);
  }

  @Post('cancel/:requestId')
  @ApiParam({ name: 'requestId', type: Number })
  @ApiResponse({ status: 200, description: 'Запрос отклонен', type: FriendRequestResponse })
  cancelRequest(@Param() params: { requestId: number }) {
    return this.friendService.cancelFriendRequest(params.requestId);
  }

  @Delete('remove/:friendId')
  @ApiParam({ name: 'friendId', type: Number })
  @ApiOperation({ summary: 'Удалить друга' })
  async removeFriend(@Req() req: Request, @Param() params: { friendId: number }) {
    const userResponse = await this.authService.getUserByToken(req.cookies.session);

    if (!userResponse) throw new NotFoundException('Пользователь не найден');

    return this.friendService.removeFriend(userResponse.user.id, params.friendId);
  }
}
