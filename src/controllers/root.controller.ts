import { Request, Response } from 'express';
import { sequelize } from '../infrastructure/sequelize.js';

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  try {

    await sequelize.authenticate();

    const body = {
      status: "OK",
      timestamp: new Date(),
      uptime: process.uptime(),
      database: "up"
    }

    res.status(200)
      .json(body);
  }
  catch {
    const body = {
      status: "Error",
      timestamp: new Date(),
      uptime: process.uptime(),
      database: "down"
    }

    res.status(503).json(body);
  }
};