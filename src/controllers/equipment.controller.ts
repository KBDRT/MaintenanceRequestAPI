import { Request, Response } from 'express';
import * as service from './../services/equipment.service.js';
import { GetEquipmentsFilteredDto } from '../dto/equipment/get-equipments-filtered.dto.js';
import { GetEquipmentRequestsDto } from '../dto/equipment/get-equipment-requests.dto.js';

export const getEquipments = async (req: Request, res: Response): Promise<void> => {
  const query: GetEquipmentsFilteredDto = res.locals.cleanQuery;
  const result = await service.getEquipments(query);
  res.status(200)
     .json({data: result.equipments, meta: {total: result.total, page: query.page, limit: query.limit}});
};

export const createEquipment = async (req: Request, res: Response): Promise<void> => {
  const newEquipment = await service.addEquipment(req.body);
  res.status(201)
    .location(`/api/equipments/${newEquipment.id}`)
    .json(newEquipment);
};

export const getEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await service.getEquipment(id as string);
  res.status(200).json(result);
};

export const updateEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await service.updateEquipment(id as string, req.body);
  res.status(204).send();
};

export const deleteEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await service.deleteEquipment(id as string);
  res.status(204).send();
};

export const getEquipmentRequests = async (req: Request, res: Response): Promise<void> => {
  const query: GetEquipmentRequestsDto = res.locals.cleanQuery;
  const { id } = req.params;
  const result = await service.getEquipmentsMaintenanceRequests(id as string, res.locals.cleanQuery);
  res.status(200).json({ data: result.requests, meta: {total: result.total, page: query.page, limit: query.limit} });
};

export const getEquipmentWeather = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await service.getEquipmentWeather(id as string);
  res.status(200).json(result);
};