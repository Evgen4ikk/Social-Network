import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { AcceptFriendRequestDto } from './dto/accept-friend-request.dto';
import { RemoveFriendDto } from './dto/remove-friend.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { FriendService } from './friend.service';

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
  acceptRequest(@Param() params: AcceptFriendRequestDto) {
    return this.friendService.acceptFriendRequest(params.requestId);
  }

  @Delete('remove/:userId/:friendId')
  @ApiOperation({ summary: 'Удалить друга' })
  removeFriend(@Param() params: RemoveFriendDto) {
    return this.friendService.removeFriend(params.userId, params.friendId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Получить список друзей' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getFriends(@Param('userId') userId: number, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.friendService.getFriends(userId, page, limit);
  }
}
