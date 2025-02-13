import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from '@/user/entity/user.entity';

import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { Friend, FriendStatus } from './entities/friend.entity';
import { FriendGateway } from './friend.gateway';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepo: Repository<Friend>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly friendGateway: FriendGateway
  ) {}

  async sendFriendRequest(dto: SendFriendRequestDto) {
    const { senderId, recipientId } = dto;

    if (senderId === recipientId) throw new BadRequestException('Нельзя добавить самого себя');

    const [sender, recipient] = await Promise.all([
      this.userRepo.findOneBy({ id: senderId }),
      this.userRepo.findOneBy({ id: recipientId })
    ]);

    if (!sender || !recipient) throw new NotFoundException('Пользователь не найден');

    const existing = await this.friendRepo.findOneBy({
      requester: { id: senderId },
      recipient: { id: recipientId }
    });
    if (existing) throw new ConflictException('Запрос уже существует');

    const request = await this.friendRepo.save({
      requester: instanceToPlain(sender),
      recipient: instanceToPlain(recipient),
      status: FriendStatus.PENDING
    });

    this.friendGateway.sendFriendRequestUpdate(sender, recipientId);
    return request;
  }

  async acceptFriendRequest(requestId: number) {
    const request = await this.friendRepo.findOne({
      where: { id: requestId },
      relations: ['requester', 'recipient']
    });

    if (!request) throw new NotFoundException('Запрос не найден');

    const updated = await this.friendRepo.save({
      ...request,
      status: FriendStatus.ACCEPTED
    });

    this.friendGateway.sendFriendStatusUpdate(
      updated.recipient,
      updated.requester,
      FriendStatus.ACCEPTED
    );

    return instanceToPlain(updated);
  }

  async cancelFriendRequest(requestId: number) {
    const request = await this.friendRepo.findOne({
      where: { id: requestId },
      relations: ['requester', 'recipient']
    });

    if (!request) throw new NotFoundException('Запрос не найден');

    await this.friendRepo.remove(request);

    this.friendGateway.sendFriendStatusUpdate(
      request.recipient,
      request.requester,
      FriendStatus.DECLINED
    );
  }

  async removeFriend(userId: number, friendId: number) {
    const relation = await this.friendRepo.findOne({
      where: [
        { requester: { id: userId }, recipient: { id: friendId } },
        { requester: { id: friendId }, recipient: { id: userId } }
      ],
      relations: ['requester', 'recipient']
    });

    if (!relation) throw new NotFoundException('Связь не найдена');

    this.friendGateway.sendFriendStatusUpdate(
      relation.recipient,
      relation.requester,
      FriendStatus.DELETED
    );

    await this.friendRepo.remove(relation);
  }

  async getFriends(userId: number, page = 1, limit = 10) {
    const [friends, total] = await this.friendRepo.findAndCount({
      where: [
        { requester: { id: userId }, status: FriendStatus.ACCEPTED },
        { recipient: { id: userId }, status: FriendStatus.ACCEPTED }
      ],
      relations: ['requester', 'recipient'],
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      friends: friends.map((friend) => ({
        id: friend.id,
        friend: instanceToPlain(
          friend.requester.id === userId ? friend.recipient : friend.requester
        ),
        status: friend.status
      })),
      total,
      page,
      limit
    };
  }
}
