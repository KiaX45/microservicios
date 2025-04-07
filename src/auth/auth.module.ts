import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true, // Habilita el módulo JWT globalmente
      secret: envs.jwtSecret, //Clave secreta que viene de .env
      signOptions: { expiresIn: '60m' }, // Configura la expiración del token aquí
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard], // JwtService eliminado
  exports: [AuthService, AuthGuard], // Exporta AuthService y AuthGuard para que puedan ser utilizados en otros módulos
})
export class AuthModule {}