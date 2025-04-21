import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client'; //importamos el modelo de usuario de prisma
import { KeycloakAuthGuard } from 'src/keyCloak/keycloak-auth.guard';
import { Roles } from 'src/keyCloak/role.decorator';
import { RolesGuard } from 'src/keyCloak/keycloak-roles.guard';
import { Protect } from 'src/keyCloak/protect.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(KeycloakAuthGuard, RolesGuard)
  @Protect()
  @Roles('admin')
  @Post('createUser')
  async create(@Body() createUserDto: CreateUserDto) :Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(KeycloakAuthGuard, RolesGuard)
  @Protect()
  @Roles('user', 'admin')
  @Get('getUsers')
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('getUser/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }


}
