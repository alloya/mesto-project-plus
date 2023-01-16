import { NextFunction, Request, Response } from 'express';
import RequestWithUser from '../models/request';
import Card from '../models/card';
import handleError from '../middlewares/handleError';
import NotFoundError from '../errors/notFoundError';
import { ForbiddenError, NotAuthorizedError } from '../errors';

async function getCardById(_id: string | undefined) {
  const user = await Card.findById(_id);
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.status(200).send({ data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new NotAuthorizedError();
    }
    const { name, link } = req.body;
    const card = await (await Card.create({ name, link, owner: req.user._id })).populate('owner');
    res.status(200).send({ data: card });
  } catch (error: any) {
    handleError(error, req, res, next);
  }
};

export const deleteCard = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new NotAuthorizedError();
    }
    const { cardId } = req.params;
    const card = await getCardById(cardId);
    if (card.owner.toString() !== req.user._id) throw new ForbiddenError();
    await card.delete();
    res.status(200).send({ message: 'Пост удален' });
  } catch (error) {
    next(error);
  }
};

export const putLike = async (req: RequestWithUser, res: Response, next: NextFunction) => {
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
  } catch (error: any) {
    next(error);
  }
};

export const deleteLike = async (req: RequestWithUser, res: Response, next: NextFunction) => {
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
  } catch (error: any) {
    handleError(error, req, res, next);
  }
};
