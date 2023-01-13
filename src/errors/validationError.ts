import ExtError from '../models/extendedError';

class ValidationError extends Error implements ExtError {
  statusCode;

  constructor(message = 'Переданы некорректные данные при создании сущности') {
    super(message);
    this.statusCode = 400;
  }
}

export default ValidationError;
