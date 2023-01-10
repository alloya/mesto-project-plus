import ExtError from '../models/extendedError';

class NotFoundError extends Error implements ExtError {
  statusCode;

  constructor() {
    super('Нет сущности с таким id');
    this.statusCode = 404;
  }
}

export default NotFoundError;
