import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Friend } from './friend/entities/friend.entity';
import { FriendModule } from './friend/friend.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'postgres',
      database: 'SocialNetwork',
      entities: [User, Friend],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Friend]),
    UserModule,
    AuthModule,
    FriendModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
