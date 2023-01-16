import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import handleError from './middlewares/handleError';
import routes from './routes';
import { errorLogger, requestLogger } from './middlewares/logger';

require('dotenv').config();
const helmet = require('helmet');

const { PORT = 3000, MONGO_URL } = process.env;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(handleError);

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL!);
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

connect();
