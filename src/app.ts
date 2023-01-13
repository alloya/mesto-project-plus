import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import RequestWithUserRole from './models/request';
import handleError from './middlwares/handleError';
import routes from './routes';

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

app.use(routes);
app.use(handleError);

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
