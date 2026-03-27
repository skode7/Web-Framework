import express from 'express';
import {
  getCats,
  getCatByID,
  addCat,
  putCat,
  deleteCat,
} from '../controllers/catController.js';

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(addCat);

catRouter.route('/:id').get(getCatByID).put(putCat).delete(deleteCat);

export default catRouter;
