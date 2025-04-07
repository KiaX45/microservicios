import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomerDebtsModule } from './customer-debts/customer-debts.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, UsersModule, CategoriesModule, ReviewsModule, CustomerDebtsModule, FavoritesModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
