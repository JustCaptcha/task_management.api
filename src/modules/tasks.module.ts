import { Module } from '@nestjs/common';
import { TasksService } from '../services/';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '../entities/task.entity';
import { TasksResolver } from '../resolvers/tasks.resolver';
import { UsersModule } from './users.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ Task ]), UsersModule ],
  providers: [TasksResolver, TasksService],
  exports: [TasksService]
})
export class TasksModule {}
