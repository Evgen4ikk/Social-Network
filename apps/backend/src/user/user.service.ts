import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { AuthService } from '@/auth/auth.service';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getProfile(token: string) {
    const user = await this.authService.getUserByToken(token);

    return instanceToPlain(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return instanceToPlain(users);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'sentRequests',
        'receivedRequests',
        'sentRequests.recipient',
        'receivedRequests.requester'
      ]
    });

    if (!user) throw new NotFoundException('Пользователь не найден');

    const { sentRequests, receivedRequests, ...cleanUser } = instanceToPlain(user);

    return { ...cleanUser, friends: user.friends };
  }
}
