import { Module } from '@nestjs/common';

import { ServiceModule } from '../2-service/service.module';

import { UserController } from './user/user.controller';

@Module({
  imports: [ServiceModule],
  controllers: [UserController],
})
export class ControllerModule {}
