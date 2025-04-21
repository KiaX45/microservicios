import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envs } from 'src/config/envs';
import { createUserDtoKeyCloak } from './dto/createUserKeyCloak.dto';



@Injectable()
export class KeycloakUserGeneratorService {
    private kcAdminClient: KeycloakAdminClient;
    private readonly logger = new Logger(KeycloakUserGeneratorService.name)

    constructor(private configService: ConfigService) {
        this.kcAdminClient = new KeycloakAdminClient({
            baseUrl: this.configService.get<string>('KEYCLOAK_URL'),
            realmName: this.configService.get<string>('KEYCLOAK_REALM'),
        })
    }

    // Initialize the Keycloak client with admin credentials
    async init() {
        try {
            await this.kcAdminClient.auth({
                grantType: 'client_credentials',
                clientId: envs.keycloakClientId,
                clientSecret: envs.keycloakClientSecret,
            });
            this.kcAdminClient.setConfig({
                realmName: envs.keycloakRealm,
                // baseUrl: envs.keycloakUrl,
            });
            return true
        } catch (error) {
            this.logger.error('Error initializing Keycloak client', error);
            throw new Error('Failed to initialize Keycloak client');
        }
    }

    async createUser(userData: createUserDtoKeyCloak) {
        await this.init(); // Ensure the client is initialized before making requests
        try {
            const user = await this.kcAdminClient.users.create({
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                enabled: userData.enabled !== undefined ? userData.enabled : true,
                attributes: userData.attributes,
            });

            this.logger.log(`User created with ID: ${user.id}`);

            // Set the password for the user
            if (userData.password) {
                await this.kcAdminClient.users.resetPassword({
                    id: user.id,
                    credential: {
                        temporary: userData.isTemporaryPassword || false,
                        type: 'password',
                        value: userData.password,
                    }
                });
            }
            this.logger.log(`Password set for user ID: ${user.id}`);
            return user
        } catch (error) {
            this.logger.error('Error creating user in Keycloak', error);
            throw new Error('Failed to create user in Keycloak');
        }
    }

    async assignRolesToUser(userId: string, roles: string[]) {
        await this.init(); // Ensure the client is initialized before making requests
        try {
            const availableRoles = await this.kcAdminClient.roles.find();
            const filterRoles = availableRoles.filter(role => role.name && roles.includes(role.name));
            const rolesToAssing = filterRoles.map(role => ({id:role.id!, name:role.name!}))
            if (rolesToAssing.length === 0) {
                this.logger.warn(`No roles found to assign to user ID: ${userId}`);
                return false;
            }

            await this.kcAdminClient.users.addRealmRoleMappings({
                id: userId,
                roles: rolesToAssing,
            });
            this.logger.log(`Roles assigned to user ID: ${userId}`);
            return true;
        } catch (error) {
            this.logger.error('Error assigning roles to user in Keycloak', error);
            throw new Error('Failed to assign roles to user in Keycloak');
        }
    }

}
