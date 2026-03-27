import express from 'express';
import cors from 'cors';

import { PORT } from "./config/env.js";
import taskRouter from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});