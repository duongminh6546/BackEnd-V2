"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const data_source_1 = require("../data-source");
const Task_1 = require("../entity/Task");
class TaskController {
    constructor() {
        this.taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
    }
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskRepository.find();
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving tasks', error });
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = this.taskRepository.create(req.body);
                const result = yield this.taskRepository.save(task);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating task', error });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const task = yield this.taskRepository.findOneBy({ id });
                if (!task) {
                    res.status(404).json({ message: 'Task not found' });
                    return;
                }
                this.taskRepository.merge(task, req.body);
                const result = yield this.taskRepository.save(task);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating task', error });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.taskRepository.delete(id);
                if (result.affected === 0) {
                    res.status(404).json({ message: 'Task not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting task', error });
            }
        });
    }
}
exports.TaskController = TaskController;
