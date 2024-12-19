import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PeDePanoService {
  private readonly apiBaseUrl =
    process.env.PE_DE_PANO_URL || 'http://localhost:';

  async enviarLote(data: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/tarefa/lote`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao enviar lote para a API Pé-de-Pano:',
        error.message,
      );
      throw new Error('Falha na integração com a API Pé-de-Pano.');
    }
  }
}
