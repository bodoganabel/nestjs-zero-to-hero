import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { initDb } from './database/initDb';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly databaseConnection: Connection,
  ) {}
  private readonly logger = new Logger(BootstrapService.name);

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('InitDb 🍫');
    await initDb(this.databaseConnection);
  }
}
