import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { IPostgresInterval } from 'postgres-interval';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  STOP = 'STOP',
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
  status?: TaskStatus;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updated_at: Date;

  @Column({type: 'timestamp', nullable: true})
  @Field(type => Date, {nullable: true})
  started_at: Date;

  @Column({type: 'timestamp', nullable: true})
  @Field(type => Date, {nullable: true})
  stopped_at: Date;

  @Column({type: 'timestamp', nullable: true})
  @Field(type => Date, {nullable: true})
  finished_at: Date;

  @Column({type: 'interval', nullable: true})
  @Field(type => String, {nullable: true})
  trackedTime: IPostgresInterval

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  userId?: number;
  
  @ManyToOne(() => User, user => user.activeTask)
  @Field(type => User)
  assignedUser?: User
}


