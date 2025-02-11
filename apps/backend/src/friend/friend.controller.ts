import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { RemoveFriendDto } from './dto/remove-friend.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { FriendService } from './friend.service';
import { GetFriendsResponse } from './model/friend.model';

@ApiTags('Friend')
@ApiAuthorizedOnly()
@ApiBearerAuth()
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @ApiOperation({ summary: 'Отправить запрос дружбы' })
  sendRequest(@Body() body: SendFriendRequestDto) {
    return this.friendService.sendFriendRequest(body);
  }

  @Post('accept/:requestId')
  @ApiParam({ name: 'requestId', type: Number })
  acceptRequest(@Param() params: { requestId: number }) {
    return this.friendService.acceptFriendRequest(params.requestId);
  }

  @Delete('remove/:userId/:friendId')
  @ApiOperation({ summary: 'Удалить друга' })
  removeFriend(@Param() params: RemoveFriendDto) {
    return this.friendService.removeFriend(params.userId, params.friendId);
  }

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
}
