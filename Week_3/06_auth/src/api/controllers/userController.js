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

const getUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

// Hash user's password and add user to database
const addUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addNewUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'new user added', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  res.json(await updateUser(req.body, req.params.id));
};

const deleteUser = async (req, res) => {
  const result = await deleteU(req.params.id);
  res.json(result);
  console.log(result);
};

export {deleteUser, putUser, addUser, getUser, getUsers};
