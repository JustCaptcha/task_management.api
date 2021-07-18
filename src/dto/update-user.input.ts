import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { OneToOne } from 'typeorm';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String, {nullable: true})
  readonly name?: string

  @Field(() => Int, {nullable: true})
  readonly activeTask?: Task
}
