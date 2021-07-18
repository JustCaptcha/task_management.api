import { InputType, Field, Int } from '@nestjs/graphql'
import { IsAlpha, IsEnum, ValidateIf } from 'class-validator'
import { TaskStatus } from 'src/entities/task.entity';

@InputType()
export class CreateTaskInput {
    @Field()
    readonly name: string

    @Field({nullable: true})
    readonly description?: string;

    @ValidateIf(o => o.status != null)
    @IsEnum(TaskStatus)
    @Field({nullable: true})
    readonly status?: TaskStatus 

    @Field(type => Int)
    readonly userId: number
}