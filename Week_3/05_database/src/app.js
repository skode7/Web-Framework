import express from 'express';

const app = express();

app.use(express.json());
app.use('/public', express.static('/Week_3/04_middleware/Task_2/src/public'));

export default app;
