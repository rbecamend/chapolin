import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditoriasModule } from './auditorias/auditorias.module';
import { NupsModule } from './nups/nups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditoria } from './auditorias/entities/auditoria.entity';
import { Nup } from './nups/entities/nup.entity';

@Module({
  imports: [
    AuditoriasModule,
    NupsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rebecalinda',
      database: 'chapolindb',
      entities: [Auditoria, Nup],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
