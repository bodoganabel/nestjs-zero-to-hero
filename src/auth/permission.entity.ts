import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

export interface IJwtPayload {
  username: string;
  permissions: string[];
}

export enum EPermissions {
  DELETE_USERS = 'DELETE_USERS',
  VIEW_USERS = 'VIEW_USERS',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  permission: EPermissions;

  @ManyToMany(() => User)
  @JoinTable()
  @Exclude({ toPlainOnly: true })
  users: User[];

  @ManyToMany(() => Role)
  @JoinTable()
  @Exclude({ toPlainOnly: true })
  roles: User[];
}
