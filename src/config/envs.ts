import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number
    JWT_SECRET: string
}

const envsSchema = joi.object ({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
}).unknown(true)//se van a poder poner mas variables ademas de las expuestas en el objeto de arriba

const {error, value} = envsSchema.validate(process.env)

if (error) {
    throw new Error(`config validation error ${error.message}`)
}


const envVars: EnvVars = value;

export const envs = {
    port : envVars.PORT,
    jwtSecret : envVars.JWT_SECRET,
}