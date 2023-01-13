import { NextFunction, Request, Response } from 'express';
import RequestWithUserRole from '../models/request';
import User from '../models/user';
import NotFoundError from '../errors/notFoundError';
import handleError from '../middlwares/handleError';

async function getUserById(_id: string | undefined) {
  const user = await User.findById(_id);
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

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
    const user = await getUserById(userId);
    res.send(user);
  } catch (error: any) {
    handleError(error, req, res, next);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).send({ data: user });
  } catch (error: any) {
    handleError(error, req, res, next);
  }
};

export const editUser = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    let user = await getUserById(req.user && req.user._id);
    user.name = name || user.name;
    user.about = about || user.about;
    user = await user.save();
    return res.status(200).send(user);
  } catch (error: any) {
    return handleError(error, req, res, next);
  }
};

export const editAvatar = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    let user = await getUserById(req.user && req.user._id);
    user.avatar = avatar || user.avatar;
    user = await user.save();
    return res.status(200).send(user);
  } catch (error: any) {
    return handleError(error, req, res, next);
  }
};
