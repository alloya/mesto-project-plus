import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/usersRoutes';
import cardRouter from './routes/cardsRoutes';
import RequestWithUserRole from './models/request';
import ExtError from './models/extendedError';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req: RequestWithUserRole, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63b97409094809568ccc2420',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use((err: ExtError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

connect();
