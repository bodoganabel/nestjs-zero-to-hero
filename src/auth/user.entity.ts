import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';

export interface IJwtPayload {
  username: string;
  permissions: Permission[];
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Permission, (permission) => permission.user, {
    eager: true,
  })
  permissions: Permission[];

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  task: Task[];
}
