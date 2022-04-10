import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  EPermissions,
  IJwtPayload,
  User,
  UserDocument,
} from 'src/auth/user.schema';
import { ISigninResponse } from './auth.controller';
import { JwtService } from './jwt.service';
import { isArrayContainsAllTargetElements } from 'src/utils/arrayFunctions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.userModel.create({ authCredentialsDto });
    console.log('User created:');
    console.log(user);
    return user;
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISigninResponse> {
    const { username, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const permissions = user.permissions.map((permission) => permission.name);
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
    console.log(
      `assignPermissionsToUser is not yet implemented... username: ${username}, permissionsToSet: ${permissionsToSet}`,
    );
    /* const user = await this.userModel.findOne({ username });
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
      await this.userModel.updateOne({ user });

      const updatedUser = await this.userModel.findOne({ username });
      console.log('updatedUser');
      console.log(updatedUser);
    } else {
      throw new InternalServerErrorException('Non valid permissions');
    } */
  }

  async getPermissions(): Promise<string[]> {
    return Object.values(EPermissions);
  }

  async getRoles(): Promise<string[]> {
    return ['Roles are not implemented'];
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
