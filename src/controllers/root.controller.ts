import { Request, Response } from 'express';
import { sequelize } from '../infrastructure/sequelize.js';

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

export const who = async (req: Request, res: Response): Promise<void> => {
  res.json({
    ip:            req.ip,
    ips:           req.ips,
    host:          req.headers.host,
    xRealIp:       req.headers['x-real-ip'],
    xForwardedFor: req.headers['x-forwarded-for'],
    xForwardedProto: req.headers['x-forwarded-proto'],
    protocol:      req.protocol,
  });
}