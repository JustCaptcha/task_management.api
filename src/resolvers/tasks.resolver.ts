import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TasksService } from '../services';
import { CreateTaskInput } from 'src/dto/create-task.input';
import { User } from 'src/entities/user.entity';

@Resolver(of => Task)
export class TasksResolver {
  constructor(@Inject(TasksService) private tasksService: TasksService) {}

  @Query(returns => [Task])
  async tasks(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Query(returns => Task)
  async getTask(@Args('id', {type: () => Int }) id: number): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @ResolveField(returns => User)
  async getUser(@Parent() user: User): Promise<User> {
    return await this.tasksService.getUser(user.id);
  }

  @Mutation(returns => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    return await this.tasksService.createTask(createTaskInput);
  }
}
