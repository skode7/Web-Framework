import app from './app.js';
import userRouter from './api/routes/userRouter.js';
import catRouter from './api/routes/catRouter.js';
import authRouter from './api/routes/authRouter.js';

const hostname = '127.0.0.1';
const port = 3000;

app.use('/api/v1/user', userRouter);

app.use('/api/v1/cat', catRouter);

app.use('/api/v1/auth', authRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
