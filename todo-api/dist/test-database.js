"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataSource = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("./entity/Task");
exports.TestDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: [Task_1.Task],
});
