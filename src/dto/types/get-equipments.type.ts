import { Equipment } from "../../domains/entities/equipment.entity.js";

export interface GetEquipments{
  equipments: Equipment[],
  total: number
}