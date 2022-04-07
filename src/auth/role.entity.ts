import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

export interface IJwtPayload {
  username: string;
  permissions: string[];
}

export enum ERoles {
  ADMIN = 'ADMIN',
  SUB_ADMIN = 'SUB_ADMIN',
  USER = 'USER',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  roleName: ERoles;

  /* @OneToMany(() => User, (user) => user.role, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permissions: Permission[]; */
}
