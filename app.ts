import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import { AuthRouter } from './routes';

const app: express.Express = express();

app.use('/api/auth', AuthRouter);

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
