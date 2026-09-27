import { Request, Response } from 'express';
import * as service from './../services/reports.service.js';
import { GetEquipmentsAnalyticsRequest } from '../dto/reports/get-equipments-analytics-request.dto.js';

export const getSiteSummaryReport = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await service.getSiteSummary(id as string);

  res.status(200).json(result);
};


export const getEquipmentAnalyticsReport = async (req: Request, res: Response): Promise<void> => {
  const result = await service.getEquipmentAnalytics(res.locals.query as GetEquipmentsAnalyticsRequest);
  res.status(200).json(result);
};