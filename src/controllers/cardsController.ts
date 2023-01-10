import { NextFunction, Request, Response } from 'express';
import RequestWithUserRole from '../models/request';
import Card from '../models/card';
import handleError from '../utils/utils';
import NotFoundError from '../errors/notFoundError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.status(200).send({ data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const card = await (await Card.create({ name, link, owner: req.user })).populate('owner');
    res.status(200).send({ data: card });
  } catch (error) {
    handleError(error, next);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError();
    }
    await card.delete();
    res.status(200).send({ message: 'Пост удален' });
  } catch (error) {
    next(error);
  }
};

export const putLike = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user && req.user._id } },
      { new: true },
    ).populate('owner').populate('likes');
    if (!card) {
      throw new NotFoundError();
    }
    res.status(200).send(card);
  } catch (error) {
    handleError(error, next);
  }
};

export const deleteLike = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user && req.user._id } },
      { new: true },
    ).populate('owner').populate('likes');
    if (!card) {
      throw new NotFoundError();
    }
    res.status(200).send(card);
  } catch (error) {
    handleError(error, next);
  }
};
