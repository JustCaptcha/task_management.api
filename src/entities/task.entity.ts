import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({length: 50})
  @Field()
  name: string;

  @Column({length: 500, nullable: true})
  @Field({nullable: true})
  description?: string;

  @Column({
    default: TaskStatus.OPEN,
    enum: TaskStatus,
    type: 'enum'
  })
  @Field({nullable: true})
  status?: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updated_at: Date;

  @Column({nullable: true})
  @Field(type => Int)
  userId?: number;
  
  @ManyToOne(() => User, user => user.activeTask)
  @Field(type => User)
  assignedUser: User
}


