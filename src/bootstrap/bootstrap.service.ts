import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/auth/user.schema';
import { initDb } from './database/initDb';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from 'src/auth/permission.schema';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}
  private readonly logger = new Logger(BootstrapService.name);

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('InitDb 🍫');
    await initDb(this.userModel, this.permissionModel);
  }
}
