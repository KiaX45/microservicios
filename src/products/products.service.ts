import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidV4 } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client'; //importamos el modelo de producto de prisma
import { PrismaService } from '../prisma.service'; //para establecer la conexión con la base de datos
import { CategoriesService } from 'src/categories/categories.service';


@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService,
    private categoriesService: CategoriesService
  ) {}

  private products : Product [] = []

  async create(createProductDto: CreateProductDto): Promise<Product> {
    //los campos que nos faltan son createdAt, updatedAt y id, ya que son generados por prisma
    const id = uuidV4()
    const createdAt = new Date()
    const updatedAt = new Date()
    //por ultimo nos falta la categoria pero primero verificamos si existe
    const category = await this.categoriesService.findOne(createProductDto.categorieId)
    //no es necesario verificar si existe la categoria ya que el servicio de categorias se encarga de eso
    //Creamos un nuevo objeto de producto con los datos que nos llegan por el dto y los campos que nos faltan
    const product = {
      ...createProductDto,
      id,
      createdAt,
      updatedAt,
      categorieId: category.id,
    };
    //Guardamos el producto en la base de datos
    const newProduct = await this.prisma.product.create({
      data: product,
    });

    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    //consultamos el producto
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    //si no existe el producto lanzamos una excepción
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    //consultamos el producto
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    //si no existe el producto lanzamos una excepción
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    //verificamos si el usuario envio la categoria y si existe
    if (updateProductDto.categorieId) {
        await this.categoriesService.findOne(updateProductDto.categorieId)
      //no es necesario verificar si existe la categoria ya que el servicio de categorias se encarga de eso
    }

    //actualizamos el producto
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return updatedProduct;
  }

  async remove(id: string) : Promise<Product> {
    //consultamos el producto
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    //si no existe el producto lanzamos una excepción
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    //eliminamos el producto
    const deletedProduct = await this.prisma.product.delete({
      where: { id },
    });
    return deletedProduct;
  }
}
