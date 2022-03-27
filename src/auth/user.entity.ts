import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface JwtPayload {
  username: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
