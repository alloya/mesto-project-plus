import { NextFunction } from 'express';
import mongoose from 'mongoose';
import ValidationError from '../errors/validationError';

const handleError = (error: any, next: NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const newError = new ValidationError();
    return next(newError);
  }
  return next(error);
};

export default handleError;
