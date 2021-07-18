import { forwardRef, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { AssignTaskInput } from 'src/dto/assign-task.input';
import { Task, TaskStatus } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { TasksService } from './tasks.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => TasksService)) private readonly tasksService: TasksService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    this.usersRepository.update(id, updateUserInput);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user; 
  }

  async assignTask(assignTaskInput: AssignTaskInput): Promise<User> {
    const user = await this.findOne(assignTaskInput.id);
    if(user.taskId === assignTaskInput.taskId) throw new PreconditionFailedException("You can't assign the same task again!")
    try {
      const newTask = await this.tasksService.findOne(assignTaskInput.taskId);
      await this.tasksService.update(newTask.id, {
        ...newTask,
        status: TaskStatus.IN_PROGRESS,
        started_at: moment().toDate()
      });
    } catch (e) {
      throw new NotFoundException(`Task with id: ${assignTaskInput.taskId} task does not exist!`);
    }
    if(user.prevTaskId !== null) {
      const prevTask = await this.tasksService.findOne(assignTaskInput.taskId);
      await this.tasksService.update(user.prevTaskId, {
        ...prevTask,
        status: TaskStatus.STOP,
        stopped_at: moment().toDate()
      });
    }
    await this.usersRepository.update(assignTaskInput.id, {...assignTaskInput, prevTaskId: user.taskId});
    return user;
  }

  async getTask(taskId: number): Promise<Task> {
    return this.tasksService.findOne(taskId);
  }
}
