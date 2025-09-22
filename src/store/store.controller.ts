import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { StoresService } from './store.service';
import { StoreDto } from './store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() storeDto: StoreDto) {
    return this.storesService.create({ store: storeDto });
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() storeDto: Partial<StoreDto>) {
    return this.storesService.update(id, storeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.delete(id);
  }
}
