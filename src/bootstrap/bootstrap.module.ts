import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { JwtRefreshToken, JwtRefreshTokenSchema } from 'src/auth/jwt.schema';
import { Permission, PermissionSchema } from 'src/auth/permission.schema';
import { User, UserSchema } from 'src/auth/user.schema';
import { BootstrapService } from './bootstrap.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: JwtRefreshToken.name, schema: JwtRefreshTokenSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [BootstrapService],
})
export class BootstrapModule {}
