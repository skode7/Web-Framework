import path from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';
import express from 'express';
import {
  getCats,
  getCatByID,
  addCat,
  putCat,
  deleteCat,
} from '../controllers/catController.js';
import createThumbnail from '../../middlewares/upload.js';
import authenticateToken from '../../middlewares/authentication.js';
import isOwnerOrAdmin from '../../middlewares/isOwnerOrAdmin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catRouter = express.Router();
const upload = multer({
  dest: path.join(__dirname, '..', '..', 'public', 'uploads'),
});

catRouter.route('/').get(getCats);
catRouter.route('/').post(upload.single('image'), createThumbnail, addCat);

catRouter
  .route('/:id')
  .get(getCatByID)
  .put(authenticateToken, isOwnerOrAdmin, putCat)
  .delete(authenticateToken, isOwnerOrAdmin, deleteCat);

export default catRouter;
