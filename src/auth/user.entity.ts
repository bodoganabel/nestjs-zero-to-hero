import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

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

  /*   @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  role: Role; */

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  task: Task[];

  addPermissions(permissions: Permission[]) {
    if (this.permissions == null) {
      this.permissions = new Array<Permission>();
    }
    permissions.forEach((permission: Permission) => {
      console.log('permission pushed');
      console.log(permission);
      this.permissions.push(permission);
    });
    console.log('this.permissions');
    console.log(this.permissions);
  }
}
