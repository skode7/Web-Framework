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

import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares/errorHandlers.js';
import express from 'express';
import createThumbnail from '../../middlewares/upload.js';
import authenticateToken from '../../middlewares/authentication.js';
import fileFilter from '../../middlewares/fileFilter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userRouter = express.Router();
const upload = multer({
  dest: path.join(__dirname, '..', '..', 'public', 'uploads'),
  fileFilter,
});

userRouter
  .route('/')
  .get(authenticateToken, getUsers)
  .post(
    upload.single('image'),
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    createThumbnail,
    addUser
  );
userRouter
  .route('/:id')
  .get(param('id').isNumeric(), validationErrors, authenticateToken, getUser)
  .put(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    body('role')
      .trim()
      .custom((value) => value === 'admin' || value === 'guest'),
    validationErrors,
    authenticateToken,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
