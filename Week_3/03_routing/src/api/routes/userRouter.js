import {
  getUsers,
  getUser,
  addUser,
  putUser,
  deleteUser,
} from '../controllers/userController.js';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(addUser);

userRouter.route('/:id').get(getUser).put(putUser).delete(deleteUser);

export default userRouter;
