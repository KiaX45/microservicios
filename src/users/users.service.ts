import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { User } from '@prisma/client'; //importamos el modelo de usuario de prisma
import {v4 as uuidV4 } from 'uuid'


@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {} //inicializamos el servicio de prisma en el constructor

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //los campos que nos faltan son createdAt, updatedAt y id, ya que son generados por prisma
    const id = uuidV4()
    const createdAt = new Date()
    const updatedAt = new Date()
    //Creamos un nuevo objeto de usuario con los datos que nos llegan por el dto y los campos que nos faltan
    const user = {
      ...createUserDto,
      id,
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


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
