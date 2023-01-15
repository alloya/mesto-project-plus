import ExtError from '../models/extendedError';

class NotAuthorizedError extends Error implements ExtError {
  statusCode;

  constructor(message = 'Пользователь с введенными данными не найден') {
    super(message);
    this.statusCode = 401;
  }
}

export default NotAuthorizedError;
