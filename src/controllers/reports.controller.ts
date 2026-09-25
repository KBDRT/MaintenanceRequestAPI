import { Request, Response } from 'express';
import * as service from './../services/reports.service.js';

export const getSiteSummaryReport = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await service.getSiteSummary(id as string);

  res.status(200).json(result);
};