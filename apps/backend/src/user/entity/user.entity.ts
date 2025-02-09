import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Friend } from '@/friend/entities/friend.entity';

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

  @OneToMany(() => Friend, (friend) => friend.requester)
  sentRequests: Friend[];

  @OneToMany(() => Friend, (friend) => friend.recipient)
  receivedRequests: Friend[];
}
