import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PeDePanoService {
  private readonly apiBaseUrl =
    process.env.PE_DE_PANO_URL || 'http://localhost:3010';

  async enviarLote(data: any): Promise<any> {
    console.log('Iniciando envio de lote para a API Pé-de-Pano...');
    console.log('Base URL da API Pé-de-Pano:', this.apiBaseUrl);
    console.log(
      'Dados enviados para /getSoFeh:',
      JSON.stringify(data, null, 2),
    );

    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/pano/getSoFeh`, // Ajustado aqui
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Resposta da API Pé-de-Pano:', {
        status: response.status,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar lote para a API Pé-de-Pano:', {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      throw new Error(
        `Falha na integração com a API Pé-de-Pano: ${error.response?.data?.error || 'Erro desconhecido'}`,
      );
    }
  }
}
