import promisePool from '../../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addNewUser = async (user) => {
  //const {user_id, name, username, role, email, password} = user;
  const rows = await promisePool.query('INSERT INTO wsk_users SET ?', [user]);

  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  console.log('käyttäjä lisätty kantaan!');
  return {user_id: rows[0].insertId};
};

const deleteU = async (userId) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [
      userId,
    ]);

    const result = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {
        message: 'User not deleted',
      };
    }

    await connection.commit();

    return {
      message: 'User deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return {
      message: error.message,
    };
  } finally {
    connection.release();
  }
};

const updateUser = async (user, id) => {
  console.log(user, id);
  const [result] = await promisePool.query(
    'UPDATE wsk_users SET ? WHERE user_id = ?',
    [user, id]
  );
  console.log('rows', result);

  if (result.affectedRows === 0) {
    return false;
  }
  console.log('käyttäjän tietoja päivtetty onnistuneesti!');
  return {message: 'success'};
};

// Get user from db by username
const findUserByUsername = async (user) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM wsk_users WHERE username = ?',
    [user]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  findUserByUsername,
  addNewUser,
  getAllUsers,
  getUserById,
  deleteU,
  updateUser,
};
