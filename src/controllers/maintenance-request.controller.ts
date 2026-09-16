import { Request, Response } from 'express';
import * as service from './../services/maintenance-request.service.js';

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  const result = await service.getRequests(res.locals.cleanQuery);
  res.status(200).json(result);
};

export const createRequest = async (req: Request, res: Response): Promise<void> => {
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