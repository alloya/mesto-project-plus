import express from 'express';
import mongoose from 'mongoose';
import handleError from './middlwares/handleError';
import routes from './routes';

require('dotenv').config();

const { PORT = 3000, MONGO_URL } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
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
