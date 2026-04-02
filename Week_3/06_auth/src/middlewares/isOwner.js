import promisePool from '../utils/database.js';

const isOwner = async (req, res, next) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [req.params.id]
  );

  if (rows[0].owner === res.locals.user.user_id) {
    next();
    return;
  }

  res.sendStatus(401);
};

export default isOwner;
