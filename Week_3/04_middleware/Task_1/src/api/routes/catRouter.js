import multer from 'multer';
import express from 'express';
import {
  getCats,
  getCatByID,
  addCat,
  putCat,
  deleteCat,
} from '../controllers/catController.js';

const catRouter = express.Router();
const upload = multer({dest: './Week_3/04_middleware/public/uploads/'});

catRouter.route('/').get(getCats);
catRouter.route('/').post(upload.single('image'), addCat);

catRouter.route('/:id').get(getCatByID).put(putCat).delete(deleteCat);

export default catRouter;
