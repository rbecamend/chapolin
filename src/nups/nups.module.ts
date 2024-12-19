import { Module } from '@nestjs/common';
import { NupsService } from './nups.service';
import { NupsController } from './nups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nup } from './entities/nup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nup])],
  controllers: [NupsController],
  providers: [NupsService],
})
export class NupsModule {}
