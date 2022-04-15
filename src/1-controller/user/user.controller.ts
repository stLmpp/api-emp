import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

import { UserService } from '../../2-service/user/user.service';
import { UserCreateDto } from '../../4-model/dto/user/user-create.dto';
import { UserExistsParams } from '../../4-model/dto/user/user-exists.params';
import { UserExistsQuery } from '../../4-model/dto/user/user-exists.query';
import { UserUpdateDto } from '../../4-model/dto/user/user-update.dto';
import { UserEntityToUserWithValuesViewModelMapper } from '../../4-model/mapping/user/user.entity-to-user-with-values.view-model.mapper';
import { UserEntityToUserViewModelMapper } from '../../4-model/mapping/user/user.entity-to-user.view-model.mapper';
import { UserWithValuesViewModel } from '../../4-model/view-model/user/user-with-values.view-model';
import { UserViewModel } from '../../4-model/view-model/user/user.view-model';
import { RouteParamEnum } from '../../6-shared/route/route-param.enum';

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
    return UserEntityToUserWithValuesViewModelMapper.map(await this.userService.getAllWithValues());
  }

  @ApiQuery({ name: 'exclude', isArray: true, type: 'string', style: 'form' })
  @Get(`:${RouteParamEnum.idUser}/exists`)
  async exists(@Param() { idUser }: UserExistsParams, @Query() { exclude }: UserExistsQuery): Promise<boolean> {
    console.log({ exclude }); // TODO fix array in query params
    return this.userService.exists(idUser);
  }
}