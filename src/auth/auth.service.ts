import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { EPermissions, IJwtPayload, User } from 'src/auth/user.entity';
import { ISigninResponse } from './auth.controller';
import { JwtService } from './jwt.service.ts';
import { isArrayContainsAllTargetElements } from 'src/utils/arrayFunctions';

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
      const permissions = user.permissions;

      const payload: IJwtPayload = { username, permissions };
      const signInResponse: ISigninResponse =
        await this.jwtService.authenticateUserWithJwt(payload);
      return signInResponse;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async assignPermissionsToUser(
    username: string,
    permissionsToSet: string[],
  ): Promise<void> {
    const user = await this.userRepository.findOne({ username });
    console.log('user::');
    console.log(user);
    const existingPermissions = Object.values(EPermissions); // get all permissions to avoid SQL INJECTION

    if (
      user &&
      isArrayContainsAllTargetElements(existingPermissions, permissionsToSet)
    ) {
      const permissionsToApply = existingPermissions.filter((permission) =>
        permissionsToSet.includes(permission),
      );
      console.log('permissionsToApply:');
      console.log(permissionsToApply);
      user.permissions = permissionsToApply;
      console.log('updated, but not yet saved user');
      console.log(user);
      await this.userRepository.save(user);

      const updatedUser = await this.userRepository.findOne({ username });
      console.log('updatedUser');
      console.log(updatedUser);
    } else {
      throw new InternalServerErrorException('Non valid permissions');
    }
  }

  async getPermissions(): Promise<string[]> {
    return Object.values(EPermissions);
  }

  async getRoles(): Promise<string[]> {
    return ['Roles are not implemented'];
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
