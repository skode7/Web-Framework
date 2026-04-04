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
import fileFilter from '../../middlewares/fileFilter.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares/errorHandlers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catRouter = express.Router();
const upload = multer({
  dest: path.join(__dirname, '..', '..', 'public', 'uploads'),
  fileFilter,
});

catRouter.route('/').get(authenticateToken, getCats);
catRouter
  .route('/')
  .post(
    upload.single('image'),
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').trim().exists().isNumeric(),
    body('owner').trim().exists().isInt(),
    body('birthdate').exists().isDate(),
    validationErrors,
    createThumbnail,
    addCat
  );

catRouter
  .route('/:id')
  .get(param('id').isNumeric(), validationErrors, authenticateToken, getCatByID)
  .put(
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').trim().exists().isNumeric(),
    body('owner').trim().exists().isInt(),
    body('birthdate').exists().isDate(),
    validationErrors,
    authenticateToken,
    isOwnerOrAdmin,
    putCat
  )
  .delete(authenticateToken, isOwnerOrAdmin, deleteCat);

export default catRouter;
