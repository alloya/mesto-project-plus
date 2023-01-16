import { NextFunction, Request, Response } from 'express';
import RequestWithUser from '../models/request';
import User from '../models/user';
import { NotAuthorizedError, NotFoundError } from '../errors';

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
    res.send({
      name: user.name, about: user.about, avatar: user.avatar,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getCurrentUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new NotAuthorizedError();
    }
    const user = await getUserById(req.user._id);
    res.send({
      name: user.name, about: user.about, avatar: user.avatar,
    });
  } catch (error: any) {
    next(error);
  }
};

export const editUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    let user = await getUserById(req.user && req.user._id);
    user.name = name || user.name;
    user.about = about || user.about;
    user = await user.save();
    res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
};

export const editAvatar = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    let user = await getUserById(req.user && req.user._id);
    user.avatar = avatar || user.avatar;
    user = await user.save();
    res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
};
