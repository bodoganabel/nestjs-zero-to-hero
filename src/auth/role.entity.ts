import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  role: ERoles;

  @OneToMany(() => User, (user) => user.role, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  users: User[];
}
