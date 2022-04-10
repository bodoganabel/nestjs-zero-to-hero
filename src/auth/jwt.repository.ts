/* import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { JwtRefreshToken } from './jwt.entity';

@EntityRepository(JwtRefreshToken)
export class JwtRepository extends Repository<JwtRefreshToken> {
  constructor() {
    super();
  }
  async createRefreshToken(token: JwtRefreshToken): Promise<void> {
    console.log('token:');
    console.log(token);
    const newRefreshToken = this.create(token);
    try {
      await this.save(newRefreshToken);
    } catch (error) {
      console.log(error.code, ' #29940f9b2');
      throw new ConflictException('Token already exists');
    }
  }
}
 */
