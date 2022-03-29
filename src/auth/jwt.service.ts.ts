import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt, { Secret } from 'jsonwebtoken';
import { JwtRepository } from './jwt.repository';
import { authConfig } from './auth.module';
import { IJwtTokenShape, JwtRefreshTokenEntity } from './jwt.entity';

@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(JwtRepository)
    private jwtRepository: JwtRepository,
  ) {}

  private generateAccessToken(jwtData: IJwtTokenShape) {
    console.log('jwtData');
    console.log(jwtData);
    const serializedUser = { username: jwtData.username };
    console.log('process.env.ACCESS_TOKEN_SECRET:');
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log('serializedUser:');
    console.log(serializedUser);
    return jwt.sign(serializedUser, process.env.ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: authConfig.accessToxenExpiration,
    });
  }

  async refreshJwtToken(refreshToken: JwtRefreshTokenEntity) {
    if (refreshToken == null) throw new UnauthorizedException('Unauthorized');

    const existingRefreshToken = this.jwtRepository.findOne(refreshToken);
    if (!existingRefreshToken) throw new ForbiddenException('Forbidden');
    jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      (err: any, jwtPayload: IJwtTokenShape) => {
        if (err) {
          console.log(err);
          throw new ForbiddenException('Forbidden');
        }
        const accessToken = this.generateAccessToken(jwtPayload);
        return { accessToken: accessToken };
      },
    );
  }

  public async deleteJwtToken(refreshToken: JwtRefreshTokenEntity) {
    const result = await this.jwtRepository.delete(refreshToken);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Token not found "${refreshToken.token}" not found`,
      );
    }
    return HttpStatus.NO_CONTENT;
  }

  public async authenticateUserWithJwt(clientJwt: IJwtTokenShape) {
    const accessToken = this.generateAccessToken(clientJwt);
    console.log('accessToken');
    console.log(accessToken);
    const refreshToken: JwtRefreshTokenEntity = this.jwtRepository.create({
      token: jwt.sign(clientJwt, process.env.REFRESH_TOKEN_SECRET as Secret),
      autoLogout: new Date(
        new Date().getTime() + authConfig.autoLogoutPeriodMs,
      ),
    });
    console.log('refreshToken');
    console.log(refreshToken);
    this.jwtRepository.save(refreshToken);
    return { accessToken, refreshToken };
  }
}
