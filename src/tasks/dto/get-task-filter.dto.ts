import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ETaskStatus } from '../task.entity';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
