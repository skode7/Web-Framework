import {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteU,
  updateUser,
} from '../models/userModel.js';

const getUsers = (req, res) => {
  res.json(getAllUsers());
};

const getUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const addUser = (req, res) => {
  console.log(req.body);
  const result = addNewUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'new user added', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  res.json(updateUser(req.body, req.params.id));
};

const deleteUser = (req, res) => {
  const result = deleteU(req.params.id);
  res.json(result);
  console.log(result);
};

export {deleteUser, putUser, addUser, getUser, getUsers};
