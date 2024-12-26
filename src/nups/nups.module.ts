import { Module } from '@nestjs/common';
import { NupsService } from './nups.service';
import { NupsController } from './nups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nup } from './entities/nup.entity';
import { PeDePanoService } from 'src/services/pe-de-pano.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nup])],
  controllers: [NupsController],
  providers: [NupsService, PeDePanoService],
})
export class NupsModule {}
