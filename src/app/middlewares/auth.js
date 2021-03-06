import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { decode } from 'punycode';
import authConfig from '../../config/auth';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
