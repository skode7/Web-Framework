import express from 'express';
import {
  getCats,
  getCatByID,
  addCat,
  putCat,
  deleteCat,
} from '../controllers/catController.js';

const catRouter = express.Router();
catRouter.route('/:id').get(getCatByID).put(putCat).delete(deleteCat);
catRouter.route('/').get(getCats).post(addCat);

export default catRouter;
