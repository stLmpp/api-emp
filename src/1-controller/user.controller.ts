import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../2-service/user.service';
import { UserCreateDto } from '../4-model/dto/user-create.dto';
import { UserUpdateDto } from '../4-model/dto/user-update.dto';
import { UserEntityToUserViewModelMapper } from '../4-model/mapping/user.entity-to-user.view-model.mapper';
import { UserWithValuesViewModel } from '../4-model/view-model/user-with-values.view-model';
import { UserViewModel } from '../4-model/view-model/user.view-model';
import { RouteParamEnum } from '../6-shared/route/route-param.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: UserCreateDto): Promise<UserViewModel> {
    return UserEntityToUserViewModelMapper.map(await this.userService.create(dto));
  }

  @Patch(`:${RouteParamEnum.idUser}`)
  async update(@Param(RouteParamEnum.idUser) idUser: string, @Body() dto: UserUpdateDto): Promise<UserViewModel> {
    return UserEntityToUserViewModelMapper.map(await this.userService.update(idUser, dto));
  }

  @Delete(`:${RouteParamEnum.idUser}`)
  async delete(@Param(RouteParamEnum.idUser) idUser: string): Promise<void> {
    await this.userService.delete(idUser);
  }

  @Get('values')
  async getAllWithValues(): Promise<UserWithValuesViewModel[]> {
    return this.userService.getAllWithValues();
  }

  @Get(`:${RouteParamEnum.idUser}/exists`)
  async exists(@Param(RouteParamEnum.idUser) idUser: string): Promise<boolean> {
    return this.userService.exists(idUser);
  }
}
