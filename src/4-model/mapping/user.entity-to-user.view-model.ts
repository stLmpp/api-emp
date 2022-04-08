import { createMapperProfile } from '../../6-shared/mapper/mapper.service';
import { UserEntity } from '../entity/user.entity';
import { UserViewModel } from '../view-model/user.view-model';

createMapperProfile(UserEntity, UserViewModel);
