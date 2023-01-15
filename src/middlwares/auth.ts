import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors';

require('dotenv').config();

const { SECRET_KEY } = process.env;

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const auth = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Требуется авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY!);
  } catch (error) {
    const newErr = new NotAuthorizedError('Требуется авторизация');
    next(newErr);
  }
  req.user = payload;
  next();
};

export default auth;
