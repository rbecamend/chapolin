import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NupsService } from './nups.service';
import { CreateNupDto } from './dto/create-nup.dto';
import { UpdateNupDto } from './dto/update-nup.dto';

@Controller('nups')
export class NupsController {
  constructor(private readonly nupsService: NupsService) {}

  @Post()
  create(@Body() createNupDto: CreateNupDto) {
    return this.nupsService.create(createNupDto);
  }

  @Get()
  findAll() {
    return this.nupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNupDto: UpdateNupDto) {
    return this.nupsService.update(+id, updateNupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nupsService.remove(+id);
  }
}
