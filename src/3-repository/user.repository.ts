import { EntityRepository } from '@mikro-orm/postgresql';

import { UserEntity } from '../4-model/entity/user.entity';

export class UserRepository extends EntityRepository<UserEntity> {}
