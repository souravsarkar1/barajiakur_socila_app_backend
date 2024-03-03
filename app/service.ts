import { Request, Response } from 'express';
import logger from './loaders/logger';
import { StatusCodes } from 'http-status-codes';
import createAPIError from './utils/error';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = { name: 'User', email: 'demo@barajiakur.in' }; // Fetch from DB here

    return res.json({ data: user });
  } catch (error) {
    let errorMsg = error.msg || error;
    logger.error(errorMsg);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMsg });
  }
};

