import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { Connection } from 'typeorm';
import { initDb } from './database/initDb';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly databaseConnection: Connection,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  private readonly logger = new Logger(BootstrapService.name);

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('InitDb 🍫');
    await initDb(this.databaseConnection, this.userRepository);
  }
}
