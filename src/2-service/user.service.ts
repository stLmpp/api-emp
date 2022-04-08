import { Injectable } from '@nestjs/common';

import { UserRepository } from '../3-repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
