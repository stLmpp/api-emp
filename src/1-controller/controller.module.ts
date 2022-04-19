import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { TransactionControllerModule } from '@controller/transaction/transaction-controller.module';
import { UserControllerModule } from '@controller/user/user-controller.module';
import { RouteParamEnum } from '@shared/route/route-param.enum';

@Module({
  imports: [
    UserControllerModule,
    TransactionControllerModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserControllerModule,
        children: [
          {
            path: `:${RouteParamEnum.idUser}`,
            children: [
              {
                path: 'transactions',
                module: TransactionControllerModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class ControllerModule {}
