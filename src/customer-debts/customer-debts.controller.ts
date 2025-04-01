import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerDebtsService } from './customer-debts.service';
import { CreateCustomerDebtDto } from './dto/create-customer-debt.dto';
import { UpdateCustomerDebtDto } from './dto/update-customer-debt.dto';
import { CustomerDebt } from '@prisma/client'; //importamos el modelo de usuario de prisma

@Controller('customer-debts')
export class CustomerDebtsController {
  constructor(
    private readonly customerDebtsService: CustomerDebtsService) {}

  @Post('createCustomerDebt')
  async create(@Body() createCustomerDebtDto: CreateCustomerDebtDto) :Promise<CustomerDebt> {
    return this.customerDebtsService.create(createCustomerDebtDto);
  }

  
  @Get('getCustomerDebts')
  async getCustomerDebts(): Promise<CustomerDebt[]> {
    return this.customerDebtsService.getCustomerDebts();
  }

  // ruta para obtener una deuda por id
  @Get('getCustomerDebt/:id')
  async getCustomerDebt(@Param('id') id: string): Promise<CustomerDebt> {
    return this.customerDebtsService.getCustomerDebt(id);
  }

  @Patch('updateCustomerDebt/:id')
  async update(@Param('id') id: string, @Body() updateCustomerDebtDto: UpdateCustomerDebtDto): Promise<CustomerDebt> {
    return this.customerDebtsService.update(id, updateCustomerDebtDto);
  }

  @Delete('deleteCustomerDebt/:id')
  remove(@Param('id') id: string) {
    return this.customerDebtsService.delete(id);
  }
}
