import { Request } from 'express';

interface IUserId {
  _id: string,
}

interface RequestWithUser extends Request {
  user?: IUserId,
  token?: string,
}

export default RequestWithUser;
