import { Module } from '@nestjs/common';
import { NupsService } from './nups.service';
import { NupsController } from './nups.controller';

@Module({
  controllers: [NupsController],
  providers: [NupsService],
})
export class NupsModule {}
