import { Request } from 'express';

interface IDecode {
  _id: string,
}

interface RequestWithUserRole extends Request {
  user?: IDecode,
}

export default RequestWithUserRole;
