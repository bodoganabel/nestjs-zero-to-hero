import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, User } from 'src/auth/user.entity';
import { ISigninResponse } from './auth.controller';
import { JwtService } from './jwt.service.ts';
import { PermissionRepository } from './permission.repository';
import { RoleRepository } from './role.repository';
import { isArrayContainsAllTargetElements } from 'src/utils/arrayFunctions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
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
    const existingPermissions = await this.permissionRepository.find(); // get all permissions to avoid SQL INJECTION

    if (
      user &&
      isArrayContainsAllTargetElements(
        existingPermissions.map((permission) => permission.permissionName),
        permissionsToSet,
      )
    ) {
      const permissionsToApply = existingPermissions.filter((permission) =>
        permissionsToSet.includes(permission.permissionName),
      );
      console.log('permissionsToApply:');
      console.log(permissionsToApply);
      user.addPermissions(permissionsToApply);
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
    const permissions = await this.permissionRepository.find();
    return permissions.map((permission) => permission.permissionName);
  }

  async getRoles(): Promise<string[]> {
    const roles = await this.roleRepository.find();
    return roles.map((role) => role.roleName);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
