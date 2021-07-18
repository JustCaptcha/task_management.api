import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { OneToOne } from 'typeorm';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String, {nullable: true})
  readonly name?: string

  @Field(() => Int, {nullable: true})
  readonly activeTask?: Task

  @Field(type => Date, {nullable: true})
  readonly started_at?: Date;

  @Field(type => Date, {nullable: true})
  readonly stopped_at?: Date;

  @Field(type => Date, {nullable: true})
  readonly finished_at?: Date;

  @Field(type => String, {nullable: true})
  readonly trackedTime?: IPostgresInterval
}
