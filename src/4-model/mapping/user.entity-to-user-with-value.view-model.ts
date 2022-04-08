import { createMapperProfile } from '../../6-shared/mapper/mapper.service';
import { UserEntity } from '../entity/user.entity';
import { UserWithValuesViewModel } from '../view-model/user-with-values.view-model';

createMapperProfile(UserEntity, UserWithValuesViewModel)
  .for(
    from => from.total,
    () => 0
  ) // TODO
  .for(
    from => from.lastDateReceived,
    () => new Date()
  ) // TODO
  .for(
    from => from.totalReceived,
    () => 0
  ) // TODO
  .for(
    from => from.totalToReceive,
    () => 0
  ); // TODO
