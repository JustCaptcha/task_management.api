import { Field, InputType, Int } from "@nestjs/graphql";
import { Task } from "src/entities/task.entity";

@InputType()
export class AssignTaskInput {
  @Field(() => Int)
  readonly id: number;

  @Field(() => Int)
  readonly taskId: number 
}