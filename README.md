#Microservicios
Este proyecto es una aplicación de e-commerce desarrollada con NestJS, utilizando Prisma como ORM para la gestión de la base de datos. Se basa en una arquitectura de microservicios, lo que permite escalabilidad y modularidad.
##Tecnologias 
**NestJS:** Framework de Node.js para construir aplicaciones escalables y modulares.
**Prisma:** ORM para la interacción con la base de datos.
**PostgreSQL**: Base de datos relacional
**Docker:** Para despliegue y gestión de contenedores.
##Funcionalidades
**Gestión de Usuarios(users/):** registro, autenticación, actualización y eliminación.
**Módulo de Productos(products/):** Creación, edición y eliminación de productos en la tienda.
**Módulo de Categorías(categories/):** CRUD completo para organizar los productos según distintas categorías.
**Módulo de Reseñas(reviews/):** reseñas respecto a los distintos productos por parte de un usuario.
**Módulo de Favoritos(favorites/):** organización de productos favoritos para cada usuario.
**Gestión de deudas de clientes (customer-debts/):** Módulo para registrar y gestionar deudas asociadas a clientes.

## Instrucciones de Despliegue

```bash
#Instalacion de modulos
$ npm install

#Para generar el cliente prisma con sus respectivos modelos
$ npx prisma generate

#(Opcional en caso de querer hacer migraciones a la base de datos)
$ npx prisma migrate

# Compilar y ejecutar
$ npm run start

# Modo desarrollo
$ npm run start:dev

# Modo producción
$ npm run start:prod

#PARA DOCKER
docker compose up --build #Construye las imágenes y levanta los contenedores
docker compose down #Detiene y elimina los contenedores en ejecución
docker compose build #Construye las imágenes sin ejecutarlas

```
##ENDPOINTS
###Products
![Products](Endpoints_images/Products.png)
####Post Products
![Products](Endpoints_images/Post_Products.png)
####Get Products
![Products](Endpoints_images/Get_Products.png)
####Get Products by id
![Products](Endpoints_images/Get_Products_by_id.png)
####Patch Products
![Products](Endpoints_images/Patch_Products.png)
####Delete Products
![Products](Endpoints_images/Delete_Products.png)
###Users
![Users](Endpoints_images/Users.png)
####Post Users
![Users](Endpoints_images/Post_Users.png)
####Get Users
![Users](Endpoints_images/Get_Users.png)
####Get Users by id
![Users](Endpoints_images/Get_Users_by_id.png)
####Patch Users
![Users](Endpoints_images/Patch_Users.png)
####Delete Users
![Users](Endpoints_images/Delete_Users.png)
###Categories
![Categories](Endpoints_images/Categories.png)
####Post Categories
![Categories](Endpoints_images/Post_Categories.png)
####Get Categories
![Categories](Endpoints_images/Get_Categories.png)
####Get Categories by id
![Categories](Endpoints_images/Get_Categories_by_id.png)
####Patch Categories
![Categories](Endpoints_images/Patch_Categories.png)
####Delete Categories
![Categories](Endpoints_images/Delete_Categories.png)