import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]) ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
