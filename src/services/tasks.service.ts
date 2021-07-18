import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskInput } from 'src/dto/create-task.input';
import { UpdateTaskInput } from 'src/dto/update-task.input';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm'
import { Task, TaskStatus } from '../entities/task.entity';
import { UsersService } from './users.service';

@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
    ) {}

    async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        const newTask = this.tasksRepository.create(createTaskInput);
        return this.tasksRepository.save(newTask);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        return this.tasksRepository.findOneOrFail(id);
    }

    async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
        this.tasksRepository.update(id, updateTaskInput);
        return await this.findOne(id);
    }

    async getUser(userId: number): Promise<User> {
        return this.usersService.findOne(userId);
    }
}