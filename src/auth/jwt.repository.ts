import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { JwtRefreshTokenEntity } from './jwt.entity';

@EntityRepository(JwtRefreshTokenEntity)
export class JwtRepository extends Repository<JwtRefreshTokenEntity> {
  constructor() {
    super();
  }
  async createRefreshToken(token: JwtRefreshTokenEntity): Promise<void> {
    const newRefreshToken = this.create(token);
    try {
      await this.save(newRefreshToken);
    } catch (error) {
      console.log(error.code, ' #29940f9b2');
      throw new ConflictException('Token already exists');
    }
  }
}
