import { Request, Response } from 'express';
import * as service from './../services/equipment.service.js';

export const getEquipments = async (req: Request, res: Response): Promise<void> => {
  const result = await service.getEquipments();
  res.status(200).json(result);
};

export const createEquipment = async (req: Request, res: Response): Promise<void> => {
  // const { body } = req.body;
  await service.addEquipment(req.body);
  res.status(200).json({ ok: true });
};

export const getEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    const result = await service.getEquipment(id);
    res.status(200).json(result);
  }
};

export const updateEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};

export const deleteEquipment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (typeof(id) == "string") {
    await service.deleteEquipment(id);
  }
  
  res.status(200).json({ ok: true });
};

export const getEquipmentRequests = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};

export const getEquipmentWeather = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};