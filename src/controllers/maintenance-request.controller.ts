import { Request, Response } from 'express';
import * as service from './../services/maintenance-request.service.js';
import { GetMaintenanceRequestsRequest } from '../dto/maintenance-request/get-maintenance-requests.request.js';

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  const query: GetMaintenanceRequestsRequest = res.locals.cleanQuery;
  const result = await service.getRequests(query);
  res.status(200)
    .json({data: result.requests, meta: {total: result.total, page: query.page, limit: query.limit}});
};

export const createRequest = async (req: Request, res: Response): Promise<void> => {
  const newRequest = await service.addRequest(req.body);
  res.status(201)
    .location(`/api/requests/${newRequest.id}`)
    .json(newRequest);
};

export const getRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await service.getRequest(id as string);
  res.status(200).json(result);
};

export const updateRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await service.updateRequest(id as string, req.body);
  res.status(204).send();
};

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await service.deleteRequest(id as string);
  res.status(204).send();
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await service.updateRequestStatus(id as string, req.body);
  res.status(204).send();
};