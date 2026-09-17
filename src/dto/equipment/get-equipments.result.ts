import { Equipment } from "../../domains/entities/equipment.entity.js";

export class GetEquipmentsResult{
  equipments?: Equipment[];
  total?: number;
}