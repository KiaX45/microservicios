import { Injectable, Logger, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class KeycloakAuthGuard extends AuthGuard('keycloak') {
  private readonly logger = new Logger(KeycloakAuthGuard.name);
  
  constructor() {
    super();
    this.logger.log('KeycloakAuthGuard inicializado');
  }
  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`🔒 Intentando autenticar request a: ${request.url}`);
    this.logger.debug(`Headers de autenticación: ${request.headers.authorization ? 'Presentes' : 'Ausentes'}`);
    return super.canActivate(context);
  }
  
  /*handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.logger.error(`❌ Error durante autenticación: ${err.message}`);
      throw err;
    }
    
    if (!user) {
      this.logger.error(`❌ Autenticación fallida. Info: ${JSON.stringify(info)}`);
      throw new UnauthorizedException('Credenciales inválidas');
    } else {
      this.logger.log(`✅ Autenticación exitosa para usuario: ${user.username}`);
    }
    
    return user;
  }
*/
}