import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongooseClassSerializer.intercepptor';
import { AuthService } from './auth.service';
import { AssignPermissionsToUserDto } from './dto/assign-permissions-to-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { JwtService } from './jwt.service';
import { PermissionGuard } from './permissions-required.guard';
import { EPermissions, User } from './user.schema';

export interface ISigninResponse {
  accessToken: string;
  refreshToken: string;
}

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
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

  @UseGuards(
    new PermissionGuard([
      EPermissions.DELETE_USERS,
      EPermissions.GET_USERS,
      EPermissions.UPDATE_PERMISSIONS,
    ]),
  )
  @Post('/test')
  async test(@GetUser() user: User, @Request() req: Request) {
    console.log('test auth');
    this.jwtService.test(user, req);
  }

  @Get('/permissions')
  async permissions() {
    return this.authService.getPermissions();
  }

  @Get('/roles')
  async roles() {
    return this.authService.getRoles();
  }

  @Get('/users')
  async users() {
    return this.authService.getUsers();
  }

  @Post('/assign-permissions-to-user')
  async assignPermissionsToUser(
    @Body() assignPermissionsToUserDto: AssignPermissionsToUserDto,
  ) {
    console.log('test auth');
    return await this.authService.assignPermissionsToUser(
      assignPermissionsToUserDto.username,
      assignPermissionsToUserDto.permissionsToSet,
    );
  }
}
