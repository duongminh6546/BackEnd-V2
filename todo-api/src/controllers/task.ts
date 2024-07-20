import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export class TaskController {
  private taskRepository = AppDataSource.getRepository(Task);

  public async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskRepository.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving tasks', error });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = this.taskRepository.create(req.body);
      const result = await this.taskRepository.save(task);
      res.status(201).json(result);  // Đảm bảo trả về dữ liệu của task mới được tạo
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskRepository.findOneBy({ id });
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      this.taskRepository.merge(task, req.body);
      const result = await this.taskRepository.save(task);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.taskRepository.delete(id);
      if (result.affected === 0) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}
