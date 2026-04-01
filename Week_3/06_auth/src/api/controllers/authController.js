import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername} from '../models/userModel.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);

  const user = await findUserByUsername(req.body.username);

  if (!user) {
    res.sendStatus(401);
    return;
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    res.sendStatus(401);
    return;
  }
  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
};

export {postLogin};
