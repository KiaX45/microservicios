import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, CategoriesService], //inicializamos el servicio de prisma en el constructor
})
export class ProductsModule {}
