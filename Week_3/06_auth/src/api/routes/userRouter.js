import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';
import {
  getUsers,
  getUser,
  addUser,
  putUser,
  deleteUser,
} from '../controllers/userController.js';

import express from 'express';
import createThumbnail from '../../middlewares/upload.js';
import authenticateToken from '../../middlewares/authentication.js';
//import isOwner from '../../middlewares/isOwner.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userRouter = express.Router();
const upload = multer({
  dest: path.join(__dirname, '..', '..', 'public', 'uploads'),
});

userRouter
  .route('/')
  .get(getUsers)
  .post(upload.single('image'), createThumbnail, addUser);
userRouter
  .route('/:id')
  .get(getUser)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
