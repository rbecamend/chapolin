import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update(id: number, nup: string): Promise<Nup> {
    await this.nupRepository.update(id, { nup });
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.nupRepository.delete(id);
  }

  async markAsProcessed(ids: number[]): Promise<void> {
    await this.nupRepository.update(ids, { cadastrado: true });
  }

  async createBatch(nups: string[]): Promise<Nup[]> {
    const entities = nups.map((nup) => this.nupRepository.create({ nup }));
    return this.nupRepository.save(entities);
  }
}
