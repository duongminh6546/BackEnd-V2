import request from 'supertest';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';
import app from '../index';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  await AppDataSource.synchronize(true);
});

describe('Task API', () => {
  it('nên tạo một công việc', async () => {
    const response = await request(app).post('/api/tasks').send({
      name: 'Test Task',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Task');
  });

  it('nên lấy tất cả các công việc', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('nên lấy một công việc theo id', async () => {
    const task = await AppDataSource.getRepository(Task).save({
      name: 'Test Task',
    });
    const response = await request(app).get(`/api/tasks/${task.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Task');
  });

  it('nên cập nhật một công việc', async () => {
    const task = await AppDataSource.getRepository(Task).save({
      name: 'Test Task',
    });
    const response = await request(app).put(`/api/tasks/${task.id}`).send({
      name: 'Updated Task',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Task');
  });

  it('nên xóa một công việc', async () => {
    const task = await AppDataSource.getRepository(Task).save({
      name: 'Test Task',
    });
    const response = await request(app).delete(`/api/tasks/${task.id}`);
    expect(response.status).toBe(204);
  });
});
