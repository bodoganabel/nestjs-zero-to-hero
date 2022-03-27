import { IsEnum } from 'class-validator';
import { ETaskStatus } from '../task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
