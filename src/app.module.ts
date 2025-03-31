import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ResenasModule } from './resenas/resenas.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ProductsModule, UsersModule, ResenasModule, CategoriesModule, ReviewsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
