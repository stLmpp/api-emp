import { Module } from '@nestjs/common';

import { PersonController } from '@controller/person/person.controller';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [PersonController],
})
export class PersonControllerModule {}
