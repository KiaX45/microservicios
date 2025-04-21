import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ConfigService } from '@nestjs/config';
import { KeycloakUserGeneratorService } from 'src/keyCloak/keycloak-user-generator.service';


@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ProductsService, UsersService, PrismaService, CategoriesService, ConfigService, KeycloakUserGeneratorService ],
})
export class ReviewsModule {}
