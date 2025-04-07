import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { signInDto } from './dto/singIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {} //inicializamos el servicio de prisma en el constructor

  async singIn (singInData: signInDto): Promise<any> {
    const {email, password} = singInData
    const user = await this.prisma.user.findUnique({where: {email}})
    if (!user) {
      throw new NotFoundException(`User with email ${email} Not Found`)
    }

    if(password != user?.password){
      throw new UnauthorizedException()
    }

    const payload = {sub: user.id, username: user.name}

    return {
      access_token : await this.jwtService.signAsync(payload)
    }

  }

}
