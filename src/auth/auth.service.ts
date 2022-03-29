import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/auth/user.entity';
import { ISigninResponse } from './auth.controller';
import { JwtService } from './jwt.service.ts';

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
    console.log('username');
    console.log(username);
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { username };
      console.log('payload');
      console.log(payload);
      const signInResponse: ISigninResponse =
        await this.jwtService.authenticateUserWithJwt(payload);
      return signInResponse;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
