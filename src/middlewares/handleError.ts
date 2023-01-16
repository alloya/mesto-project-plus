import { CelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ConflictError, ValidationError } from '../errors';
import ExtError from '../models/extendedError';

// eslint-disable-next-line no-unused-vars
const handleError = (err: ExtError, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CelebrateError) {
    const message = err.details.get('body')?.details.reduce((str, mes) => str.concat(mes.message), '');
    const newError = new ValidationError(message);
    return res.status(newError.statusCode).send(message);
  } if (err instanceof mongoose.Error.ValidationError) {
    const newError = new ValidationError();
    return res.status(newError.statusCode).send(newError.message);
  } if (err instanceof mongoose.Error.CastError) {
    const newError = new ValidationError('Некорректный id');
    return res.status(newError.statusCode).send(newError.message);
  }
  if (err.name === 'MongoServerError') {
    const newError = new ConflictError();
    return res.status(newError.statusCode).send(newError.message);
  }
  console.log(err);

  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

export default handleError;
