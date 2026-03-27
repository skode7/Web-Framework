import express from 'express';
import {
  getCats,
  //getCatById,
  addCat,
} from '../controllers/catController.js';

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(addCat);

//catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
