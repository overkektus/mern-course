import express from 'express';

const app: express.Express = express();

app.listen(5000, () => console.log(`App has been started!!`));
