import { DataSource } from 'typeorm';
import Post from '../entities/post.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  entities: [Post],
  logging: true,
  synchronize: true,
  subscribers: [],
  migrations: [],
}); 
 
export default AppDataSource;
