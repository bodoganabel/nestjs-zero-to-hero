import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IJwtTokenShape {
  username: string;
}

@Entity()
export class JwtRefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  @Column()
  autoLogout: Date;
}
