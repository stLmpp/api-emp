import { isArray } from 'st-utils';

import { UserEntity } from '../entity/user.entity';
import { UserWithValuesViewModel } from '../view-model/user-with-values.view-model';

export class UserEntityToUserWithValuesViewModelMapper {
  private static _mapOne(user: UserEntity): UserWithValuesViewModel {
    const viewModel = new UserWithValuesViewModel({
      id: user.id,
      total: 0,
      totalReceived: 0,
      totalToReceive: 0,
    });
    for (const person of user.people) {
      for (const transaction of person.transactions) {
        viewModel.total += transaction.total;
        for (const transactionItem of transaction.transactionItems) {
          viewModel.totalReceived += transactionItem.value;
        }
      }
    }
    viewModel.totalToReceive = viewModel.total - viewModel.totalReceived;
    return viewModel;
  }

  static map(users: UserEntity[]): UserWithValuesViewModel[];
  static map(user: UserEntity): UserWithValuesViewModel;
  static map(userOrUsers: UserEntity | UserEntity[]): UserWithValuesViewModel | UserWithValuesViewModel[] {
    if (isArray(userOrUsers)) {
      return userOrUsers.map(this._mapOne);
    }
    return this._mapOne(userOrUsers);
  }
}
