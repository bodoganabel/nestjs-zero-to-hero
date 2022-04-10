import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export interface IJwtPayload {
  username: string;
  permissions: string[];
}

export enum EPermissions {
  GET_USERS = 'GET_USERS',
  DELETE_USERS = 'DELETE_USERS',
  GET_PERMISSIONS = 'GET_PERMISSIONS',
  UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
}
export const ERoles = {
  ADMIN: Object.values(EPermissions),
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('text', { array: true, nullable: true })
  permissions: string[];

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  task: Task[];
}
