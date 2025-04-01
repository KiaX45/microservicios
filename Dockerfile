FROM node:23.3.0

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y package-lock.json dentro del directorio de trabajo
COPY package*.json ./

# Copiamos el archivo de prisma dentro del directorio de trabajo
COPY prisma ./prisma

# Instalamos las dependencias
RUN npm install

# Generamos el cliente de Prisma
RUN npx prisma generate

# Copiamos el resto de los archivos de la aplicación dentro del directorio de trabajo
COPY . .

# Exponemos el puerto 3000 para la aplicación
EXPOSE 3000

# Compilamos la aplicación para producción
RUN npm run build

# Copiamos el script de entrada
COPY start.sh /app/start.sh

# Damos permisos de ejecución al script
RUN chmod +x /app/start.sh

# Usamos el script como comando de inicio
CMD ["/app/start.sh"]