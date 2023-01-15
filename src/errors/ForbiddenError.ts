import ExtError from '../models/extendedError';

class ForbiddenError extends Error implements ExtError {
  statusCode;

  constructor(message = 'Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
