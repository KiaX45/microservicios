import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { Category } from '@prisma/client'; //importamos el modelo de categoria de prisma
import {v4 as uuidV4 } from 'uuid'

@Injectable()
export class CategoriesService {

  constructor( private prisma : PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    //los campos que nos faltan son createdAt, updatedAt y id, ya que son generados por prisma
    const id = uuidV4()
    const createdAt = new Date()
    const updatedAt = new Date()
    //Creamos un nuevo objeto de categoria con los datos que nos llegan por el dto y los campos que nos faltan
    const category = {
      ...createCategoryDto,
      id,
      createdAt,
      updatedAt,
    };

    //Guardamos la nueva categoria en la base de datos
    const newCategory = await this.prisma.category.create({
      data: category,
    });
    return newCategory;
    
  }

  async findAll() : Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string):Promise<Category> { 
    //consultamos la categoria
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    //si no existe la categoria lanzamos una excepción
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    //si no existe la categoria lanzamos una excepción
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    //actualizamos la categoria
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return updatedCategory;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {id}
    })
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const removedCategory = await this.prisma.category.delete({
      where: {id}
    })
    return removedCategory;
  }
}
