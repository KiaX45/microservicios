import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('')
  create(@Body() createProductDto: CreateProductDto) {
    
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard) // This guard will protect the route and require a valid JWT token to access it
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  //ParseUUIDPipe: is a pipe that validates that the parameter is a valid UUID. If it is not, it will throw an error.
  //This is useful to ensure that the id parameter is always a valid UUID before passing it to the service.
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
