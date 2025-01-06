import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // Importando 'In'
import { Nup } from './entities/nup.entity';

@Injectable()
export class NupsService {
  constructor(
    @InjectRepository(Nup)
    private readonly nupRepository: Repository<Nup>,
  ) {}

  async create(nup: string): Promise<Nup> {
    const newNup = this.nupRepository.create({ nup });
    return this.nupRepository.save(newNup);
  }

  async findAll(pagina: number, tamanho: number): Promise<Nup[]> {
    return this.nupRepository.find({
      skip: (pagina - 1) * tamanho,
      take: tamanho,
    });
  }

  async findOne(id: number): Promise<Nup | null> {
    return this.nupRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.nupRepository.delete(id);
  }

  async createBatch(nups: string[]): Promise<Nup[]> {
    const entities = nups.map((nup) => this.nupRepository.create({ nup }));
    return this.nupRepository.save(entities);
  }

  async markAsProcessed(nups: string[]): Promise<void> {
    if (!nups.length) return;

    const nupsJaProcessados = await this.nupRepository.find({
      where: { nup: In(nups), cadastrado: true },
      select: ['nup'],
    });

    const nupsPendentes = nups.filter(
      (nup) =>
        !nupsJaProcessados.some((jaProcessado) => jaProcessado.nup === nup),
    );

    if (nupsPendentes.length) {
      await this.nupRepository.update(
        { nup: In(nupsPendentes) },
        { cadastrado: true },
      );
      console.log('NUPs atualizados como processados:', nupsPendentes);
    } else {
      console.log('Todos os NUPs já estavam processados:', nups);
    }
  }

}
