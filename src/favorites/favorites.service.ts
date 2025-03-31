import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma.service';
import { Favorite } from '@prisma/client'; //importamos el modelo de usuario de prisma
import {v4 as uuidV4 } from 'uuid' //importamos la libreria uuid para generar ids unicos
@Injectable()
export class FavoritesService {

  constructor(private prisma: PrismaService) {} //inicializamos el servicio de prisma en el constructor

  async getFavorites() {
    return this.prisma.favorite.findMany(); //buscamos todos los registros de la tabla favorite
  }


  async create(createFavoriteDto: CreateFavoriteDto) :Promise<Favorite> {
    
    const id = uuidV4()
    const createdAt = new Date()
    const favorite = {
      ...createFavoriteDto,
      id,
      createdAt,
    }
    const newFavorite = await this.prisma.favorite.create({
      data: favorite,
    });
    return newFavorite; //retornamos el nuevo registro creado
  }

  //metodo para buscar un favorito por id
  async getFavorite(id: string): Promise<Favorite> {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });
  
    if (!favorite) {
      throw new NotFoundException(`Favorite con id ${id} no encontrado`);
    }
  
    return favorite;
  }

  //metodo para actualizar un favorito por id
  async update(id: string, updateFavoriteDto: UpdateFavoriteDto): Promise<Favorite> {
    //consultamos si existe el favorito
    const favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });
    //si no existe lanzamos una excepcion
    if (!favorite) {
      throw new NotFoundException(`Favorite con id ${id} no encontrado`);
    }
    //si existe lo actualizamos
    const updatedFavorite = await this.prisma.favorite.update({
      where: { id },
      data: {
        ...favorite,
        ...updateFavoriteDto,
      }
    });
    return updatedFavorite; //retornamos el favorito actualizado
  }

 
  async delete(id: string) :Promise<Favorite> {
    const favorite = await this.prisma.favorite.delete({
      where: { id },
    });
  
    if (!favorite) {
      throw new NotFoundException(`Favorite con id ${id} no encontrado`);
    }
  
    return favorite;
  }
}
