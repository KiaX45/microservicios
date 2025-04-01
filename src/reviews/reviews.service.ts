import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma.service';
import { Review } from '@prisma/client';
import {v4 as uuidV4 } from 'uuid'




@Injectable()
export class ReviewsService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}


  async create(createReviewDto: CreateReviewDto) : Promise<Review> {
    //los datos que nos faltan son id de la review createdAt y updatedAt
    //comprobamos si el usuario y producto existe
    await this.usersService.findOne(createReviewDto.user_id)
    await this.productsService.findOne(createReviewDto.product_id)
    //si no los encuentra simplemente lanza error automenticamente 

    //creamos el objeto a guardar
    const id = uuidV4()
    const createdAt = new Date()
    const updatedAt = new Date()

    const review = {
      ...createReviewDto,
      id,
      createdAt,
      updatedAt
    }

    const finalReview = await this.prisma.review.create({data: review})

    return finalReview;
  }

  async findAll() : Promise<Review[]> {
    return await this.prisma.review.findMany();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.prisma.review.findUnique({where: {id}})
    if (!review) {
      throw new NotFoundException(`Revire with id${id} not found`)
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.prisma.review.findUnique({where: {id}})
    if (!review) {
      throw new NotFoundException(`Revire with id${id} not found`)
    } 

    //si el usuario envia un id de producto o usuario verificamos que existe
    if(updateReviewDto.user_id) {
      await this.usersService.findOne(updateReviewDto.user_id)
    }
    if(updateReviewDto.product_id) {
      await this.productsService.findOne(updateReviewDto.product_id)
    }
    //actualizamos el objeto
    const updatedReview = await this.prisma.review.update({
      where: {id},
      data: updateReviewDto
    })
    return updatedReview;
  }

  async remove(id: string): Promise<Review> {
    const review = await this.prisma.review.findUnique({where: {id}})
    if (!review) {
      throw new NotFoundException(`Revire with id${id} not found`)
    }
    const deletedReview = await this.prisma.review.delete({where: {id}})
    return deletedReview;
  }
}
