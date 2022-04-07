import { IsString } from 'class-validator';

export class AssignPermissionsToUserDto {
  @IsString()
  username: string;

  @IsString({ each: true })
  permissionsToSet: string[];
}
