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
  permissionName: string;

  /*   @ManyToMany(() => User, (users) => users.permissions, {
    eager: false,
  })
  @JoinTable()
  users: User[]; */

  /*   @ManyToMany(() => Role, (roles) => roles.permissions, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[]; */
}
