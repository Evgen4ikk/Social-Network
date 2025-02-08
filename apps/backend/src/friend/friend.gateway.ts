import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ApiAuthorizedOnly } from '@/shared/guards/auth.guard';

import { FriendStatus } from './entities/friend.entity';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@ApiAuthorizedOnly()
export class FriendGateway {
  @WebSocketServer() server: Server;
  private logger = new Logger(FriendGateway.name);

  async handleConnection(client: Socket) {
    try {
      const userId = client.handshake.auth.user.id;
      if (userId) {
        client.join(`user_${userId}`);
        this.logger.log(`Клиент ${client.id} подключен к комнате user_${userId}`);
      }
    } catch (error) {
      this.logger.error('Ошибка подключения:', error.message);
      client.disconnect();
    }
  }

  sendFriendRequestUpdate(userId: number) {
    this.server.to(`user_${userId}`).emit('friend_request', {
      type: 'FRIEND_REQUEST',
      payload: { timestamp: new Date().toISOString() }
    });
  }

  sendFriendStatusUpdate(userId: number, status: FriendStatus) {
    this.server.to(`user_${userId}`).emit('friend_status', {
      type: 'FRIEND_STATUS_UPDATE',
      payload: { status, timestamp: new Date().toISOString() }
    });
  }
}
