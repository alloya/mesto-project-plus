import ExtError from '../models/extendedError';

class ValidationError extends Error implements ExtError {
  statusCode;

  constructor() {
    super('Переданы некорректные данные при создании сущности');
    this.statusCode = 400;
  }
}

export default ValidationError;
