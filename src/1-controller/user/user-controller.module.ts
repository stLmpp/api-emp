import { Module } from '@nestjs/common';

import { UserController } from '@controller/user/user.controller';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [UserController],
})
export class UserControllerModule {
  
}
