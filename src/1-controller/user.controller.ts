import { Controller } from '@nestjs/common';

import { UserService } from '../2-service/user.service';
import { UserEntity } from '../4-model/entity/user.entity';
import { UserWithValuesViewModel } from '../4-model/view-model/user-with-values.view-model';
import { MapperService } from '../6-shared/mapper/mapper.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly mapperService: MapperService) {
    setTimeout(() => {
      console.log(this.mapperService.get(UserEntity, UserWithValuesViewModel));
    }, 1000);
  }
}
