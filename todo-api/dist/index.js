"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const data_source_1 = require("./data-source");
const task_1 = require("./routes/task");
const app = (0, express_1.default)();
const port = process.env.PORT || 3008;
app.use((0, body_parser_1.json)());
data_source_1.AppDataSource.initialize().then(() => {
    app.use('/api/tasks', task_1.taskRouter);
    app.get('/', (req, res) => {
        res.send('Welcome to the API!');
    });
    app.listen(port, () => {
        console.log(`Server chạy tại http://localhost:${port}`);
    });
}).catch((error) => console.log('Error initializing AppDataSource:', error));
exports.default = app;
