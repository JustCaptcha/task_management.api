import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { AssignTaskInput } from '../dto/assign-task.input';
import { Task } from 'src/entities/task.entity';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  assignTaskToUser(@Args('assignTaskToUserInput') userInput: AssignTaskInput) {
    return this.usersService.assignTask(userInput);
  }

  @Mutation(() => User)
  stopActiveTask(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.stopActiveTask(id);
  }

  @ResolveField(returns => User)
  async activeTask(@Parent() user: User): Promise<Task> {
    return await this.usersService.getTask(user.taskId);
  }
}
