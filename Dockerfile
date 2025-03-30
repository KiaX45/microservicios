FROM node:23.3.0


# Creamos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos el package.json y package-lock.json dentro del directorio de trabajo
COPY package*.json ./

#Copiamos el archivo de prisma dentro del directorio de trabajo
COPY prisma ./prisma

# Instalamos las dependencias
RUN npm install

#Generamos el cliente de prisma
RUN npx prisma generate

#Copiamos el resto de los archivos de la aplicación dentro del directorio de trabajo
COPY . .

#Compilamos el código de la aplicación
RUN npm run build

# Exponemos el puerto 3000 para la aplicación
EXPOSE 3000

#Definimos el comando para iniciar la aplicación
CMD ["npm", "run", "npm run start:prod"]





