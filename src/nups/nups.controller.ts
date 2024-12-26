import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NupsService } from './nups.service';
import { PeDePanoService } from 'src/services/pe-de-pano.service';

@Controller('nups')
export class NupsController {
  constructor(
    private readonly nupsService: NupsService,
    private readonly peDePanoService: PeDePanoService,
  ) {}

  @Post()
  async create(@Body('nup') nup: string) {
    if (!nup) {
      throw new Error('O NUP é obrigatório.');
    }
    return await this.nupsService.create(nup);
  }

  @Get()
  async findAll(
    @Query('pagina') pagina: number = 1,
    @Query('tamanho') tamanho: number = 100,
  ) {
    const nups = await this.nupsService.findAll(pagina, tamanho);
    return { pagina, tamanho, nups };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const nup = await this.nupsService.findOne(id);
    if (!nup) {
      throw new Error(`NUP com id ${id} não encontrado.`);
    }
    return nup;
  }

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body('nup') nup: string) {
  //   if (!nup) {
  //     throw new Error('O NUP é obrigatório para atualização.');
  //   }
  //   return await this.nupsService.update(id, nup);
  // }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.nupsService.delete(id);
  }

  @Post('enviar-lote')
  async sendBatch(
    @Body()
    body: {
      login: { cpf: string; senha: string };
      listaNups: string[];
    },
  ) {
    const payload = {
      login: body.login,
      etiqueta: 'ARQUIVAR',
      especieTarefa: '241',
      setorResponsavel: '406',
      listaNups: body.listaNups,
    };

    const response = await this.peDePanoService.enviarLote(payload);

    const successIds = response.result.sucesso.map((item) => item.nup);
    // await this.nupsService.markAsProcessed(successIds);

    return response.result;
  }

  @Post('import')
  async importBatch(@Body('nups') nups: string[]) {
    return await this.nupsService.createBatch(nups);
  }
}