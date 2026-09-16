import { Equipment } from "../../domains/entities/equipment.entity.js";
import { getEquipmentsRequest } from "../../dto/contracts/equipment/get-equipments.request.js";

export interface IEquipmentRepository {
  get(request: getEquipmentsRequest): Promise<Equipment[]>,
  add(newEquipment: Equipment): Promise<string>,
  getById(id: string): Promise<Equipment | undefined>;
  update(updatedEquipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
  getBySerialNumber(serialNumber: string): Promise<Equipment | undefined>;
}