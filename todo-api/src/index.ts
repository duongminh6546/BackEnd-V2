import express from 'express';
import { json } from 'body-parser';
import { AppDataSource } from './data-source';
import { taskRouter } from './routes/task';

const app = express();
const port = process.env.PORT || 3008;

app.use(json());

AppDataSource.initialize().then(() => {
  app.use('/api/tasks', taskRouter);

  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

  app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
  });
}).catch((error) => console.log('Error initializing AppDataSource:', error));

export default app;
