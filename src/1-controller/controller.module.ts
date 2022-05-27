import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { PersonControllerModule } from '@controller/person/person-controller.module';
import { TransactionItemControllerModule } from '@controller/transaction-item/transaction-item-controller.module';
import { TransactionControllerModule } from '@controller/transaction/transaction-controller.module';
import { UserControllerModule } from '@controller/user/user-controller.module';
import { RouteParamEnum } from '@shared/route/route-param.enum';

@Module({
  imports: [
    UserControllerModule,
    TransactionControllerModule,
    PersonControllerModule,
    TransactionItemControllerModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserControllerModule,
        children: [
          {
            path: `:${RouteParamEnum.idUser}`,
            children: [
              {
                path: 'transaction',
                module: TransactionControllerModule,
                children: [
                  {
                    path: `:${RouteParamEnum.idTransaction}/transaction-item`,
                    module: TransactionItemControllerModule,
                  },
                ],
              },
              {
                path: 'person',
                module: PersonControllerModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class ControllerModule {}
