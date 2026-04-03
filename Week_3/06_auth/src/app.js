import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(
  '/public',
  express.static(path.join(process.cwd(), '/Week_3/06_auth/src/public'))
);

export default app;
