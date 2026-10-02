import { Request, Response } from 'express';
import { sequelize } from '../infrastructure/sequelize.js';
import { getLog } from '../lib/context.js';

export const getFullHealth = async (req: Request, res: Response): Promise<void> => {
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

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({status: "ok"});
}

export const monitoringAlert = async (req: Request, res: Response): Promise<void> => {
  getLog().info("MONITORING ALERT");
}

export const response5xx = async (req: Request, res: Response): Promise<void> => {
  res.status(500).send();
}