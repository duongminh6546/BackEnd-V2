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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const Task_1 = require("../entity/Task");
const index_1 = __importDefault(require("../index"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.synchronize(true);
}));
describe('Task API', () => {
    it('nên tạo một công việc', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/tasks').send({
            name: 'Test Task',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Task');
    }));
    it('nên lấy tất cả các công việc', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it('nên lấy một công việc theo id', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield data_source_1.AppDataSource.getRepository(Task_1.Task).save({
            name: 'Test Task',
        });
        const response = yield (0, supertest_1.default)(index_1.default).get(`/api/tasks/${task.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Task');
    }));
    it('nên cập nhật một công việc', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield data_source_1.AppDataSource.getRepository(Task_1.Task).save({
            name: 'Test Task',
        });
        const response = yield (0, supertest_1.default)(index_1.default).put(`/api/tasks/${task.id}`).send({
            name: 'Updated Task',
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Task');
    }));
    it('nên xóa một công việc', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield data_source_1.AppDataSource.getRepository(Task_1.Task).save({
            name: 'Test Task',
        });
        const response = yield (0, supertest_1.default)(index_1.default).delete(`/api/tasks/${task.id}`);
        expect(response.status).toBe(204);
    }));
});
