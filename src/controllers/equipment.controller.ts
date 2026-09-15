import { Request, Response } from 'express';

export const getEquipments = (req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
};

export const createEquipment = (req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
};

export const getEquipment = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.status(200).json({ ok: true, id: id });
};

export const updateEquipment = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};

export const deleteEquipment = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};

export const getEquipmentRequests = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};

export const getEquipmentWeather = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.status(200).json({ ok: true });
};