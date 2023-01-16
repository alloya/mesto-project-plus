import ExtError from '../models/extendedError';

class ConflictError extends Error implements ExtError {
  statusCode;

  constructor(message = 'Пользователь с таким email уже существует') {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
