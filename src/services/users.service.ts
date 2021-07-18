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
import * as postgresInterval from 'postgres-interval';
import { interval } from 'rxjs';
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
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
    if(user.taskId === assignTaskInput.taskId) throw new PreconditionFailedException("You can't assign the same task again!");
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

  // WIP
  async stopActiveTask(id: number): Promise<User> {
    const user = await this.findOne(id);
    if(user.taskId === null) throw new PreconditionFailedException(`User with id: ${user.id} has no active tasks!`);
    try {
    } catch(e) {
      throw new NotFoundException('e');
    }
    const activeTask = await this.tasksService.findOne(user.taskId);
    console.log(activeTask);
    const stopped_at = moment().toDate();
    const started_at = (activeTask.stopped_at === null) ? activeTask.started_at : activeTask.stopped_at;
    const prevTrackedTime = (activeTask.trackedTime) ? activeTask.trackedTime.toISO() : 0

    const trackedTime = moment.duration(started_at.getMilliseconds() - stopped_at.getMilliseconds())

    const a = trackedTime.format("HH:mm:ss");
    console.log(a);
    await this.tasksService.update(activeTask.id, {
      ...activeTask,
      status: TaskStatus.DONE,
      stopped_at: moment().toDate(),
    });

    await this.usersRepository.update(id, {
      ...user,
      taskId: null, 
      prevTaskId: user.taskId
    });
    return user;
  }

  async getTask(taskId: number): Promise<Task> {
    return this.tasksService.findOne(taskId);
  }
}
