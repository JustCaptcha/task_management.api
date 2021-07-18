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

  @OneToOne(() => Task, task => task.assignedUser)
  @Field(type => Task, {nullable: true})
  activeTask?: Task
}
