import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  private readonly logger = new Logger(KeycloakStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'http://keycloak:8080/realms/nestjs-realm/protocol/openid-connect/certs',
      }),
      audience: 'account', // Configurado para usar 'account' como se detectó en tu token
      issuer: 'http://localhost:8080/realms/nestjs-realm',
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
    this.logger.log('KeycloakStrategy inicializada');
  }

  async validate(request: any, payload: any) {
    this.logger.log('▶️ Iniciando validación de token JWT');
    this.logger.debug(`Payload recibido: ${JSON.stringify(payload)}`);
    
    // Asegurarse de que los roles se extraen correctamente de realm_access.roles
    const roles = payload.realm_access?.roles || [];
    this.logger.debug(`Roles extraídos del token: ${JSON.stringify(roles)}`);
    
    // Extraer información del token
    const user = {
      userId: payload.sub,
      username: payload.preferred_username,
      roles: roles, // Asegurar que los roles se asignan correctamente
    };
    
    this.logger.log(`✅ Usuario autenticado: ${user.username} con roles: ${JSON.stringify(user.roles)}`);
    return user;
  }
}