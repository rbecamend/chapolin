import { Injectable } from '@nestjs/common';
import { CreateNupDto } from './dto/create-nup.dto';
import { UpdateNupDto } from './dto/update-nup.dto';

@Injectable()
export class NupsService {
  create(createNupDto: CreateNupDto) {
    return 'This action adds a new nup';
  }

  findAll() {
    return `This action returns all nups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nup`;
  }

  update(id: number, updateNupDto: UpdateNupDto) {
    return `This action updates a #${id} nup`;
  }

  remove(id: number) {
    return `This action removes a #${id} nup`;
  }
}
