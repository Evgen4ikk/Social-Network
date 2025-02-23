import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Friend, FriendStatus } from '@/friend/entities/friend.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Friend, (friend) => friend.requester)
  sentRequests: Friend[];

  @OneToMany(() => Friend, (friend) => friend.recipient)
  receivedRequests: Friend[];

  get friends(): User[] {
    return [
      ...this.sentRequests
        .filter((req) => req.status === FriendStatus.ACCEPTED)
        .map((req) => req.recipient),
      ...this.receivedRequests
        .filter((req) => req.status === FriendStatus.ACCEPTED)
        .map((req) => req.requester)
    ];
  }
}
