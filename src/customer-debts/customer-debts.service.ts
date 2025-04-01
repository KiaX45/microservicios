import { Injectable } from '@nestjs/common';
import { CreateCustomerDebtDto } from './dto/create-customer-debt.dto';
import { UpdateCustomerDebtDto } from './dto/update-customer-debt.dto';
import { PrismaService } from 'src/prisma.service';
import { CustomerDebt } from '@prisma/client'; //importamos el modelo de usuario de prisma
import {v4 as uuidV4 } from 'uuid' //importamos la libreria uuid para generar ids unicos
import { NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class CustomerDebtsService {

  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    ) {} //inicializamos el servicio de prisma en el constructor
  
  async getCustomerDebts() {
    return this.prisma.customerDebt.findMany(); //buscamos todos los registros de la tabla customerDebt
  }

  //metodo para buscar un registro por id
  async getCustomerDebt(id: string): Promise<CustomerDebt> {
    const customerDebt = await this.prisma.customerDebt.findUnique({
      where: { id },
    });
  
    if (!customerDebt) {
      throw new NotFoundException(`CustomerDebt con id ${id} no encontrado`);
    }
  
    return customerDebt;
  }

  async create(createCustomerDebtDto: CreateCustomerDebtDto): Promise<CustomerDebt> { 

    //comprobamos si el usuario existe
    await this.usersService.findOne(createCustomerDebtDto.user_id);

    //

    const id = uuidV4()
    const createdAt = new Date()

    const customerDebt = {
      ...createCustomerDebtDto,
      id,
      createdAt,
    }

    const newCustomerDebt = await this.prisma.customerDebt.create({
      data: customerDebt,
    });
    return newCustomerDebt; //retornamos el nuevo registro creado
  }

  //metodo para actualizar un registro por id
  async update(id: string, updateCustomerDebtDto: UpdateCustomerDebtDto): Promise<CustomerDebt> {
    //consultamos si existe el registro
    const customerDebt = await this.prisma.customerDebt.findUnique({
      where: { id },
    });
    //si no existe lanzamos una excepcion
    if (!customerDebt) {
      throw new NotFoundException(`CustomerDebt con id ${id} no encontrado`);
    }
    //si existe lo actualizamos
    const updatedCustomerDebt = await this.prisma.customerDebt.update({
      where: { id },
      data: {
        ...customerDebt,
        ...updateCustomerDebtDto,
      },
    });
    //actualizamos el registro con los nuevos datos
    return updatedCustomerDebt; //retornamos el registro actualizado
  }

  async delete(id: string) :Promise<CustomerDebt> {
    const customerDebt = await this.prisma.customerDebt.delete({
      where: {
        id,
      },
    });
    return customerDebt; //retornamos el registro eliminado
  }
}
