import app from './app.js';
/* import catRouter from './api/routes/catRouter.js';

const hostname = '127.0.0.1';
const port = 3000;

app.use('/api/v1/cat', catRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 */

import userRouter from './api/routes/userRouter.js';

const hostname = '127.0.0.1';
const port = 3000;

app.use('/api/v1/user', userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
