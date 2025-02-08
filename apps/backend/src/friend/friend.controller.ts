import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AcceptFriendRequestDto } from './dto/accept-friend-request.dto';
import { RemoveFriendDto } from './dto/remove-friend.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { FriendService } from './friend.service';

@ApiTags('Friend')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @ApiOperation({ summary: 'Отправить запрос дружбы' })
  @ApiResponse({ status: 201, description: 'Запрос успешно отправлен' })
  @ApiResponse({ status: 400, description: 'Невалидные данные' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  sendRequest(@Body() body: SendFriendRequestDto) {
    return this.friendService.sendFriendRequest(body);
  }

  @Post('accept/:requestId')
  @ApiOperation({ summary: 'Принять запрос дружбы' })
  @ApiParam({ name: 'requestId', type: Number })
  @ApiResponse({ status: 200, description: 'Запрос принят' })
  @ApiResponse({ status: 404, description: 'Запрос не найден' })
  acceptRequest(@Param() params: AcceptFriendRequestDto) {
    return this.friendService.acceptFriendRequest(params.requestId);
  }

  @Delete('remove/:userId/:friendId')
  @ApiOperation({ summary: 'Удалить друга' })
  @ApiResponse({ status: 200, description: 'Друг удален' })
  @ApiResponse({ status: 404, description: 'Связь не найдена' })
  removeFriend(@Param() params: RemoveFriendDto) {
    return this.friendService.removeFriend(params.userId, params.friendId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Получить список друзей' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Список друзей' })
  getFriends(@Param('userId') userId: number, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.friendService.getFriends(userId, page, limit);
  }
}
