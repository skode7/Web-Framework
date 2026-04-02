import promisePool from '../utils/database.js';

const isOwnerOrAdmin = async (req, res, next) => {
  const user = res.locals.user;
  console.log(user);

  if (user.role === 'admin') {
    next();
    return;
  }

  if (user.role === 'user') {
    const [rows] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
      [req.params.id, user.user_id]
    );
    console.log('rows', rows);

    if (rows.affectedRows > 0) {
      console.log(
        'Käyttäjä ei ollut admin, mutta muokkasi vain omistamaansa kissaa!'
      );
      return;
    }
  }

  res.sendStatus(401);
};

export default isOwnerOrAdmin;
