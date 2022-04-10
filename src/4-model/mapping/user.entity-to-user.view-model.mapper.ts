import { isArray } from 'st-utils';

import { UserEntity } from '../entity/user.entity';
import { UserViewModel } from '../view-model/user.view-model';

export class UserEntityToUserViewModelMapper {
  private static _mapOne(user: UserEntity): UserViewModel {
    const viewModel = new UserViewModel();
    viewModel.id = user.id;
    return viewModel;
  }

  static map(users: UserEntity[]): UserViewModel[];
  static map(user: UserEntity): UserViewModel;
  static map(userOrUsers: UserEntity | UserEntity[]): UserViewModel | UserViewModel[] {
    if (isArray(userOrUsers)) {
      return userOrUsers.map(this._mapOne);
    }
    return this._mapOne(userOrUsers);
  }
}
