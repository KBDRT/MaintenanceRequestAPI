import { Request, Response } from 'express';
import * as service from './../services/maintenance-request.service.js';
import { parseFilterQuery } from '../utils/filter-params-parser.js';
import { filterEquipmentSchema } from '../validators/schemas/equipment/filter-equipment.schema.js';

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  // const parsedQuery = parseFilterQuery(req.query);

  // // if (typeof(req.query) == "Get") {

  // const validationResult = filterEquipmentSchema.safeParse(parsedQuery);
  // // console.log(validationResult);

  const result = await service.getRequests(req.query);
  res.status(200).json(result);
  // }
};

export const createRequest = async (req: Request, res: Response): Promise<void> => {
  // const { body } = req.body;
  const requestId = await service.addRequest(req.body);
  res.status(200).json({ id: requestId });
};

export const getRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    const result = await service.getRequest(id);
    res.status(200).json(result);
  }
};

export const updateRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    await service.updateRequest(id, req.body);
  }
  res.status(200).json({ ok: true });
};

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    await service.deleteRequest(id);
  }
  
  res.status(200).json({ ok: true });
};


export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    await service.updateRequestStatus(id, req.body);
  }
  res.status(200).json({ ok: true });
};