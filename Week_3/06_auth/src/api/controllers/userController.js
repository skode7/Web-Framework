import {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteU,
  updateUser,
} from '../models/userModel.js';

import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await getAllUsers());
};

const getUser = async (req, res, next) => {
  const user = await getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    const error = new Error('not found!');
    error.status = 404;
    next(error);
  }
};

// Hash user's password and add user to database
const addUser = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addNewUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'new user added', result});
  } else {
    const error = new Error('Bad request!');
    error.status = 400;
    next(error);
  }
};

const putUser = async (req, res, next) => {
  if (isRights(res.locals.user, req.params.id)) {
    const error = new Error('No rights!');
    error.status = 403;
    console.log('erroriin mennään putUserissa!');
    return next(error);
  }
  res.json(await updateUser(req.body, req.params.id));
};

const deleteUser = async (req, res, next) => {
  if (isRights(res.locals.user, req.params.id)) {
    const error = new Error('No rights!');
    error.status = 403;
    return next(error);
  }

  const result = await deleteU(req.params.id);
  res.json(result);
  console.log(result);
};

// Helper function to check if user has needed rights to continue
const isRights = (user, paramsId) => {
  return user.user_id != paramsId && user.role !== 'admin';
};

export {deleteUser, putUser, addUser, getUser, getUsers};
