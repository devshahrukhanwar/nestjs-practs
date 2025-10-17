import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nestjs',
  password: 'nestjs123',
  database: 'nestjs_learning',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Disabled to prevent automatic schema synchronization
});
