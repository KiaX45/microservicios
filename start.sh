#!/bin/bash

# Aplicamos las migraciones
npx prisma migrate deploy

# Iniciamos la aplicación
npm run start:prod