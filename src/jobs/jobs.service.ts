import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JwtService } from 'src/auth/jwt.service.ts';
//import { JwtService } from 'src/auth/jwt.service.ts';

@Injectable()
export class JobsService implements OnApplicationBootstrap {
  constructor(private jwtService: JwtService) {
    console.log(`The module has been initialized.`);
  }
  onApplicationBootstrap(): void {
    console.log(`The module has been initialized.`);
    this.jwtService.test();
  }
}
