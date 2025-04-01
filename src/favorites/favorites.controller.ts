import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from '@prisma/client'; //importamos el modelo de usuario de prisma

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('createFavorite')
  async create(@Body() createFavoriteDto: CreateFavoriteDto) :Promise<Favorite> {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get('getFavorites')
  async getFavorites(): Promise<Favorite[]> {
    return this.favoritesService.getFavorites();
  }

  @Get('getFavorite/:id')
  async getFavorite(@Param('id') id: string): Promise<Favorite> {
    return this.favoritesService.getFavorite(id);
  }
  @Patch('updateFavorite/:id')
  async update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto): Promise<Favorite> {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete('deleteFavorite/:id')
  remove(@Param('id') id: string) {
    return this.favoritesService.delete(id);
  }
}
