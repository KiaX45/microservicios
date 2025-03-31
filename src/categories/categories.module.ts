import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
