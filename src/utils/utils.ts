import { CustomHelpers } from 'joi';
import validator from 'validator';
import { Request, Response } from 'express';

export const validateURL = (value: string, helpers: CustomHelpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

export const notExistingRoute = (req: Request, res: Response) => {
  res.status(404).send('Запрос не найден');
};
