import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  synchronize: configService.getOrThrow('POSTGRES_SYNCHRONISE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
});
