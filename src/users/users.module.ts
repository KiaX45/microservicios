import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService], //inicializamos el servicio de prisma en el constructor
})
export class UsersModule {}
