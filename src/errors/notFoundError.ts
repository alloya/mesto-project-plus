import ExtError from '../models/extendedError';

class NotFoundError extends Error implements ExtError {
  statusCode;

  constructor(message = 'Нет сущности с таким id') {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
