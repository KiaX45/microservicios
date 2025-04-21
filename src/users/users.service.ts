import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { User } from '@prisma/client'; //importamos el modelo de usuario de prisma
import {v4 as uuidV4 } from 'uuid'
import { createUserDtoKeyCloak } from './dto/createUserKeyCloak.dto';
import { KeycloakUserGeneratorService } from 'src/keyCloak/keycloak-user-generator.service';



@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService, private readonly keyCloakService: KeycloakUserGeneratorService) {} //inicializamos el servicio de prisma en el constructor

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //los campos que nos faltan son createdAt, updatedAt y id, ya que son generados por prisma
    const createdAt = new Date()
    const updatedAt = new Date()
    //comprobamos si el correo ya existe en la base de datos
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    //si existe el usuario lanzamos una excepción
    if (userExists) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }
    

    
    //Creamos el usuairo tambien en keycloak
    const userKeyCloak: createUserDtoKeyCloak = {
      username: createUserDto.name,
      email: createUserDto.email,
      firstName: createUserDto.name,
      lastName: createUserDto.name,
      password: createUserDto.password,
      isTemporaryPassword: false,
    }

    const userKeyCloakCreated = await this.keyCloakService.createUser(userKeyCloak)
    //le colocamos el role de user por defecto
    await this.keyCloakService.assignRolesToUser(userKeyCloakCreated.id, ['user'])

    //Creamos un nuevo objeto de usuario con los datos que nos llegan por el dto y los campos que nos faltan
    const user = {
      ...createUserDto,
      id: userKeyCloakCreated.id,
      createdAt,
      updatedAt,
    };
    
    //Guardamos el nuevo usuario en la base de datos
    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    //consultamos el usuario
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    //si no existe el usuario lanzamos una excepción
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {  
    //consultamos el usuario
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    //si no existe el usuario lanzamos una excepción
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    //actualizamos el usuario
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        ...updateUserDto,
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }

  async remove(id: string): Promise<String> {
    //consultamos el usuario
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    //si no existe el usuario lanzamos una excepción
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    //eliminamos el usuario
    await this.prisma.user.delete({
      where: { id },
    });
    //retornamos un mensaje de éxito
    return `User with id ${id} deleted successfully`;
  }

}
