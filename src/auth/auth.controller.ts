import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtRefreshTokenEntity } from './jwt.entity';

export interface ISigninResponse {
  accessToken: string;
  refreshToken: JwtRefreshTokenEntity;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISigninResponse> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
