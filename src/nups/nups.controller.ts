import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
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
      throw new HttpException('O NUP é obrigatório.', HttpStatus.BAD_REQUEST);
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
      throw new HttpException(
        `NUP com id ${id} não encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return nup;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.nupsService.delete(id);
    return { mensagem: `NUP com id ${id} deletado com sucesso.` };
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

    console.log(
      'Enviando dados para a API Pé-de-Pano:',
      JSON.stringify(payload, null, 2),
    );

    try {
      const response = await this.peDePanoService.enviarLote(payload);

      console.log(
        'Resposta recebida da API Pé-de-Pano:',
        JSON.stringify(response, null, 2),
      );

      if (Array.isArray(response?.data)) {
        const erros = response.data.filter((msg: string) =>
          msg.includes('não encontrado ou inválido'),
        );
        const sucesso = response.data.filter(
          (msg: string) => !erros.includes(msg),
        );

        // Marcar NUPs processados (se aplicável)
        if (sucesso.length > 0) {
          const nupsProcessados = sucesso.map(
            (msg: string) => msg.split(' ')[1],
          );
          await this.nupsService.markAsProcessed(nupsProcessados);
          console.log('NUPs marcados como processados:', nupsProcessados);
        }

        return {
          mensagem: 'Processamento concluído.',
          sucesso: sucesso.length,
          erros,
        };
      }

      throw new HttpException(
        'A resposta da API Pé-de-Pano não está no formato esperado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      console.error('Erro ao processar lote:', error.message);
      throw new HttpException(
        `Erro ao processar lote: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('import')
  async importBatch(@Body('nups') nups: string[]) {
    if (!nups || !Array.isArray(nups) || nups.length === 0) {
      throw new HttpException(
        'A lista de NUPs é obrigatória e não pode estar vazia.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.nupsService.createBatch(nups);
  }
}
