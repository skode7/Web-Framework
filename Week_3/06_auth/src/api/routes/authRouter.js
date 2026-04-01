import express from 'express';
//import authController from '../controllers';
import {postLogin} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/').post(postLogin);

export default authRouter;
