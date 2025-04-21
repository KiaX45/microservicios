import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomerDebtsModule } from './customer-debts/customer-debts.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';
import { KeyCloakAuthModule } from './keyCloak/keycloak-auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './keyCloak/keycloak-roles.guard';
import { KeycloakAuthGuard } from './keyCloak/keycloak-auth.guard';
import { KeycloakUserGeneratorService } from './keyCloak/keycloak-user-generator.service';

@Module({
  imports: [ProductsModule, UsersModule, CategoriesModule, ReviewsModule, CustomerDebtsModule, FavoritesModule, AuthModule, KeyCloakAuthModule],
  controllers: [],
  providers: [PrismaService, { provide: APP_GUARD, useClass: KeycloakAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule { }
