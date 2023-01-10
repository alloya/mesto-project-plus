import { NextFunction, Request, Response } from 'express';
import RequestWithUserRole from '../models/request';
import User from '../models/user';
import NotFoundError from '../errors/notFoundError';
import handleError from '../utils/utils';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).send({ data: user });
  } catch (error) {
    return handleError(error, next);
  }
};

export const editUser = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const _id = req.user && req.user._id;
    const { name, about } = req.body;
    let user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError();
    }
    user.name = name || user.name;
    user.about = about || user.about;
    user = await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return handleError(error, next);
  }
};

export const editAvatar = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const _id = req.user && req.user._id;
    const { avatar } = req.body;
    let user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError();
    }
    user.avatar = avatar || user.avatar;
    user = await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return handleError(error, next);
  }
};
