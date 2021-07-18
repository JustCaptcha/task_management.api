import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  taskId?: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  prevTaskId?: number;

  @OneToOne(() => Task, task => task.assignedUser)
  @Field(type => Task, {nullable: true})
  activeTask?: Task
}
