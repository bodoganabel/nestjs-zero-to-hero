import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, User } from 'src/auth/user.entity';
import jwt, { Secret } from 'jsonwebtoken';
import { JwtRepository } from './jwt.repository';
import { authConfig } from './auth.module';
import { IJwtTokenShape, JwtRefreshTokenEntity } from './jwt.entity';
import { ISigninResponse } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISigninResponse> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { username };
      const signInResponse: ISigninResponse =
        await this.jwtService.authenticateUserWithJwt(payload);
      return signInResponse;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}

@Injectable()
export class JwtService {
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

  public deleteJwtToken = (refreshToken: JwtRefreshTokenEntity) => {
    this.jwtRepository.delete(refreshToken);
    return HttpStatus.NO_CONTENT;
  };

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
