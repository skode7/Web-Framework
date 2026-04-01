const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'john_doe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const getAllUsers = () => {
  return userItems;
};

const getUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addNewUser = (user) => {
  console.log('addNewUser:', user);
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

const deleteU = () => {
  return {message: 'User item deleted.'};
};

const updateUser = () => {
  return {message: 'User item updated.'};
};

export {addNewUser, getAllUsers, getUserById, deleteU, updateUser};
