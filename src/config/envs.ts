import { strict } from 'assert'
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number
    JWT_SECRET: string
    KEYCLOAK_CLIENT_SECRET: string
    KEYCLOAK_URL: string
    KEYCLOAK_REALM: string
    KEYCLOAK_CLIENT_ID: string
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    KEYCLOAK_CLIENT_SECRET: joi.string().required(),
    KEYCLOAK_URL: joi.string().uri().required(),
    KEYCLOAK_REALM: joi.string().required(),
    KEYCLOAK_CLIENT_ID: joi.string().required(),
}).unknown(true)//se van a poder poner mas variables ademas de las expuestas en el objeto de arriba

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`config validation error ${error.message}`)
}


const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    keycloakClientSecret: envVars.KEYCLOAK_CLIENT_SECRET,
    keycloakUrl: envVars.KEYCLOAK_URL,
    keycloakRealm: envVars.KEYCLOAK_REALM,
    keycloakClientId: envVars.KEYCLOAK_CLIENT_ID,
}