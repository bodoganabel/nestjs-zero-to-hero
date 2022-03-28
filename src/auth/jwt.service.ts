import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import jwt, { Secret } from 'jsonwebtoken';
import { JwtRepository } from './jwt.repository';
import { authConfig } from './auth.module';
import { IJwtTokenShape, JwtRefreshTokenEntity } from './jwt.entity';

@Injectable()
export class JwtServices {
  constructor(
    @InjectRepository(JwtRepository)
    private jwtRepository: JwtRepository,
  ) {}

  private generateAccessToken(jwtData: IJwtTokenShape) {
    const serializedUser = { username: jwtData.username };
    return jwt.sign(serializedUser, process.env.ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: authConfig.accessToxenExpiration,
    });
  }

  async refreshJwtToken(req: any, res: any) {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    const refreshToken = this.jwtRepository.findOne();
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = this.generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
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
    const refreshToken: JwtRefreshTokenEntity = this.jwtRepository.create({
      token: jwt.sign(clientJwt, process.env.REFRESH_TOKEN_SECRET as Secret),
      autoLogout: new Date(
        new Date().getTime() + authConfig.autoLogoutPeriodMs,
      ),
    });
    this.jwtRepository.save(refreshToken);
    return { accessToken, refreshToken };
  }
}
