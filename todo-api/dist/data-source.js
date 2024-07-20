"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("./entity/Task");
const isTest = process.env.NODE_ENV === 'test';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: isTest ? ':memory:' : 'database.sqlite',
    synchronize: true,
    dropSchema: isTest,
    entities: [Task_1.Task],
});
