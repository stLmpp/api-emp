import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';

import { ServiceModule } from '@service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [UserController],
})
export class ControllerModule {}
