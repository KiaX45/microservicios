import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ResenasModule } from './resenas/resenas.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, UsersModule, ResenasModule, CategoriesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
