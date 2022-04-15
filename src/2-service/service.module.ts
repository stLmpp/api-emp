import { Module } from '@nestjs/common';

import { RepositoryModule } from '../3-repository/repository.module';

import { UserService } from './user/user.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
