import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { JwtService } from './jwt.service.ts';
import { User } from './user.entity';

export interface ISigninResponse {
  accessToken: string;
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
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

  @Post('/token')
  async refreshJwtToken(
    @Body('token') token: string,
  ): Promise<string | undefined> {
    const refreshedAccessToken = await this.jwtService.refreshJwtToken(token);
    console.log(refreshedAccessToken);
    return refreshedAccessToken;
  }

  @Post('/test')
  async test(@GetUser() user: User, @Request() req: Request) {
    console.log('test auth');
    this.jwtService.test(user, req);
  }
}
