import { DataSource } from 'typeorm';
import { Task } from './entity/Task';

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [Task],
});