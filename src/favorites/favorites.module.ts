import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';


@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, UsersService, ProductsService, CategoriesService],
})
export class FavoritesModule {}
