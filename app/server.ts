import { PORT, PATH_PREFIX } from './config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import logger from './loaders/logger';
import { initDB } from './loaders/db';
import { router } from './routes';
import morgan from 'morgan';
import userRouter from './routes/user';

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter)

export async function init() {
  try {
    logger.info('init');
    initDB();
    initRoutes();
    initServer();
  } catch (error) {
    logger.error(error);
  }
}

function initServer() {
  app.listen(PORT, () => {
    logger.info(`server is running at http://localhost:${PORT}`);
  });
}

function initRoutes() {
  app.get(`/${PATH_PREFIX}/health`, (req, res) => {
    res.send('OK');
  });

  app.use(`/${PATH_PREFIX}`, router);
}

init();
