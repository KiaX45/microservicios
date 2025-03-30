import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ResenasModule } from './resenas/resenas.module';

@Module({
  imports: [ProductsModule, UsersModule, ResenasModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
