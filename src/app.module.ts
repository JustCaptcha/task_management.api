import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmConfigService } from './config';
import { TasksModule } from './modules/tasks.module';
import { join } from 'path';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      include: [TasksModule, UsersModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
    }),
    TasksModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
