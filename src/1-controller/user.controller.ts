import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../2-service/user.service';
import { UserCreateDto } from '../4-model/dto/user-create.dto';
import { UserUpdateDto } from '../4-model/dto/user-update.dto';
import { UserEntity } from '../4-model/entity/user.entity';
import { UserWithValuesViewModel } from '../4-model/view-model/user-with-values.view-model';
import { UserViewModel } from '../4-model/view-model/user.view-model';
import { MapperService } from '../6-shared/mapper/mapper.service';
import { RouteParamEnum } from '../6-shared/route/route-param.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly mapperService: MapperService) {}

  @Post()
  async create(@Body() dto: UserCreateDto): Promise<UserViewModel> {
    return this.mapperService.map(UserEntity, UserViewModel, await this.userService.create(dto));
  }

  @Patch(`:${RouteParamEnum.idUser}`)
  async update(@Param(RouteParamEnum.idUser) idUser: string, @Body() dto: UserUpdateDto): Promise<UserViewModel> {
    return this.mapperService.map(UserEntity, UserViewModel, await this.userService.update(idUser, dto));
  }

  @Delete(`:${RouteParamEnum.idUser}`)
  async delete(@Param(RouteParamEnum.idUser) idUser: string): Promise<void> {
    await this.userService.delete(idUser);
  }

  @Get('values')
  async getAllWithValues(): Promise<UserWithValuesViewModel[]> {
    return this.mapperService.map(UserEntity, UserWithValuesViewModel, await this.userService.getAllWithValues());
  }

  @Get(`:${RouteParamEnum.idUser}/exists`)
  async exists(
    @Param(RouteParamEnum.idUser) idUser: string
  ): Promise<boolean> {
    return this.userService.exists(idUser);
  }
}
