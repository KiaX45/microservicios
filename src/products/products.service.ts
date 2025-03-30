import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidV4 } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {

  private products : Product [] = []

  create(createProductDto: CreateProductDto) {
    let product : Product = {id: uuidV4(), ...createProductDto}
    this.products.push(product)
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product : Product | undefined = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Producto with id: ${id} not found`);
    }
    return product;  
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const index: number = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new NotFoundException(`The product with the id:${id} can not be remove because does not exist`)
    }
    this.products = this.products.map( (product, index) => index == index ? {...product, ...updateProductDto}: product)
    return this.products[index];
  }

  remove(id: string) : Product {
    const index: number = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new NotFoundException(`The product with the id:${id} can not be remove because does not exist`)
    }
    const product : Product = this.products[index]
    this.products.splice(index, 1)
    return product;
  }
}
