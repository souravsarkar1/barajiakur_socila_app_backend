import dotenv from 'dotenv';

dotenv.config();

// const { MONGODB_URI, LOG_LEVEL, NODE_ENV = 'production', LOG_DIR = './logs' } = process.env;

export const {
  PORT = parseInt(process.env.PORT),
  MONGODB_URI,
  LOG_LEVEL,
  PATH_PREFIX = process.env.PATH_PREFIX.trim(),
  NODE_ENV,
  LOG_DIR = './logs',
  SECRET,
  GOOGLE_PASS
} = process.env;

// export { PORT, PATHENDPOINTEFIX, MONGODB_URI, LOG_LEVEL, NODE_ENV, LOG_DIR };
