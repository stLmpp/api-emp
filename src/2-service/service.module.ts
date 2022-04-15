import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';

import { RepositoryModule } from '@repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
