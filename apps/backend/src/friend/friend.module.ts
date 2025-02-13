import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';
import { User } from '@/user/entity/user.entity';

import { Friend } from './entities/friend.entity';
import { FriendController } from './friend.controller';
import { FriendGateway } from './friend.gateway';
import { FriendService } from './friend.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Friend, User])],
  controllers: [FriendController],
  providers: [FriendService, FriendGateway],
  exports: [FriendService, FriendGateway]
})
export class FriendModule {}
