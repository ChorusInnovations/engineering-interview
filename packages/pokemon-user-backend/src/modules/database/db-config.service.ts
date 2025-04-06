import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { Pokemon } from './entities/pokemon.entity';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'pokemon',
  entities: [Pokemon],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
};

@Injectable()
export class DbConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...config,
      synchronize: false,
    };
  }
}

// Create and export a DataSource instance for migrations CLI
export default new DataSource(config);
