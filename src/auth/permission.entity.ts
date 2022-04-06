import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export interface IJwtPayload {
  username: string;
  permissions: string[];
}

enum EPermissions {
  PERM_DELETE_USERS = 'PERM_DELETE_USERS',
  PERM_VIEW_USERS = 'PERM_DELETE_USER',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  permission: EPermissions;

  @ManyToOne((_type) => User, (user: { tasks: any }) => user.tasks, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  user: User;
}
