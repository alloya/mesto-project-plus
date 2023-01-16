import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

const bcrypt = require('bcryptjs');

require('dotenv').config();

const { SECRET_KEY } = process.env;

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      SECRET_KEY!,
      { expiresIn: '7d' },
    );
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .end();
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name, about, avatar, password, email,
    });
    res.status(201).send({ _id: user._id, email: user.email });
  } catch (error: any) {
    next(error);
  }
};
