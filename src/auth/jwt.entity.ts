import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IJwtTokenShape {
  username: string;
}

@Entity()
export class JwtRefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  @Column()
  autoLogout: Date;
}
