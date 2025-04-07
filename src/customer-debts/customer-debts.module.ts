import { Module } from '@nestjs/common';
import { CustomerDebtsService } from './customer-debts.service';
import { CustomerDebtsController } from './customer-debts.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';


@Module({
  controllers: [CustomerDebtsController],
  providers: [CustomerDebtsService, PrismaService, UsersService],
})
export class CustomerDebtsModule {}
