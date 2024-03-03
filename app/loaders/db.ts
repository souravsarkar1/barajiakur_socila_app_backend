import { MONGODB_URI } from '../config';
import { connect, set } from 'mongoose';

export async function initDB() {
  if (!MONGODB_URI) throw new Error('invalid mongodb URI');

  if (process.env.ENV !== 'production') {
    set('debug', true);
  }

  const db = await connect(MONGODB_URI);
  return db;
}
