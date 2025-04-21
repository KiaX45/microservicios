import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { KeycloakUserGeneratorService } from 'src/keyCloak/keycloak-user-generator.service';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ConfigService, KeycloakUserGeneratorService, ], 
  exports: [UsersService, PrismaService], // Exportar el servicio de usuarios y PrismaService para que puedan ser utilizados en otros módulos
})
export class UsersModule {}
