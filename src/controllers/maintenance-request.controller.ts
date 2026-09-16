import { Request, Response } from 'express';
import * as service from './../services/equipment.service.js';
import { parseFilterQuery } from '../helpers/filter-params-parser.js';
import { filterEquipmentSchema } from '../validators/schemas/equipment/filter-equipment.schema.js';

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  // console.log(req.query);

  // const parsedQuery = parseFilterQuery(req.query);

  // // if (typeof(req.query) == "Get") {

  // const validationResult = filterEquipmentSchema.safeParse(parsedQuery);
  // // console.log(validationResult);

  //   const result = await service.getEquipments(parsedQuery);
    res.status(200).json();
  // }
};

export const createRequest = async (req: Request, res: Response): Promise<void> => {
  // const { body } = req.body;
  // const equipmentId = await service.addEquipment(req.body);
  // res.status(200).json({ id: equipmentId });
};

export const getRequest = async (req: Request, res: Response): Promise<void> => {
  // const { id } = req.params;
  // if (typeof(id) == "string") {
  //   const result = await service.getEquipment(id);
  //   res.status(200).json(result);
  // }
};

export const updateRequest = async (req: Request, res: Response): Promise<void> => {
  // const { id } = req.params;
  // if (typeof(id) == "string") {
  //   await service.updateEquipment(id, req.body);
  // }
  // res.status(200).json({ ok: true });
};

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  // const { id } = req.params;
  // if (typeof(id) == "string") {
  //   await service.deleteEquipment(id);
  // }
  
  // res.status(200).json({ ok: true });
};


export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  // const { id } = req.params;
  // if (typeof(id) == "string") {
  //   await service.updateEquipment(id, req.body);
  // }
  // res.status(200).json({ ok: true });
};