import mongoose from 'mongoose';
import { validateURL } from '../utils/utils';

interface IUser {
  name: String,
  about: String,
  avatar: String,
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: validateURL,
  },
});

export default mongoose.model<IUser>('user', userSchema);
