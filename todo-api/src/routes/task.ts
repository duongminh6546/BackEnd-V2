import { Router } from 'express';
import { TaskController } from '../controllers/task';

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get('/', taskController.getAllTasks.bind(taskController));
taskRouter.post('/', taskController.createTask.bind(taskController));
taskRouter.put('/:id', taskController.updateTask.bind(taskController));
taskRouter.delete('/:id', taskController.deleteTask.bind(taskController));

export { taskRouter };
