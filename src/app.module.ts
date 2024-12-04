import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditoriasModule } from './auditorias/auditorias.module';
import { NupsModule } from './nups/nups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('diboua aq');
console.log(process.env.DATABASE_PASSWORD);

@Module({
  imports: [
    AuditoriasModule,
    NupsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //nao subir true pra producao
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
