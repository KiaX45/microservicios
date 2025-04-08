import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/config/envs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //primero, obtenemos el request del contexto de la ejecución
        const request = context.switchToHttp().getRequest();
        //después, extraemos el token del header de autorización
        const token = this.extractTokenFromHeader(request);
        //si no hay token, lanzamos una excepción de no autorizado
        if (!token) {
            throw new UnauthorizedException();
        }
        //verificamos el token usando el servicio JWT
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: envs.jwtSecret
                }
            );
            //si la verificación es exitosa, agregamos el payload al request
            request['user'] = payload;
        } catch {
            //si la verificación falla, lanzamos una excepción de no autorizado
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}