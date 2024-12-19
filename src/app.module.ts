import { Module } from '@nestjs/common';
import { NupsModule } from './nups/nups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PeDePanoService } from './services/pe-de-pano.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //nao subir true pra producao
    }),
    NupsModule,
  ],
  controllers: [],
  providers: [PeDePanoService],
  exports: [PeDePanoService],
})
export class AppModule {}
