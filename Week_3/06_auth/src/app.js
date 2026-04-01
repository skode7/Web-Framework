import express from 'express';

const app = express();

app.use(express.json());
app.use('/public', express.static('/Week_3/06_auth/src/public'));

export default app;
