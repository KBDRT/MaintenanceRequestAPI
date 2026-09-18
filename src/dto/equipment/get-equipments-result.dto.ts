import { Equipment } from "../../domains/entities/equipment.entity.js";

export class GetEquipmentsResultDto{
  equipments?: Equipment[];
  total?: number;
}