import express from 'express';
import config from 'config';
import mongoose, { Error } from 'mongoose';

const app: express.Express = express();

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}!!`));
  } catch(error) {
    console.log('Server Error', error.message);
  }
}

start();
