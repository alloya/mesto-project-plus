import mongoose, { Model, Schema, Document } from 'mongoose';
import validator from 'validator';
import { NotAuthorizedError } from '../errors';

const bcrypt = require('bcryptjs');

interface IUser {
  name: String,
  about: String,
  avatar: String,
  email: String,
  password: String,
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials(email: string, password: string): Document<unknown, any, IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: (str: string) => validator.isURL(str),
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    validate: (str: string) => validator.isEmail(str),
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line max-len
userSchema.static('findUserByCredentials', async function findUserByCredentials(email: string, password: string) {
  const user: IUser | null = await this.findOne({ email }).select('+password');
  if (!user) return new NotAuthorizedError();
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return user;
  }
  throw new NotAuthorizedError();
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
