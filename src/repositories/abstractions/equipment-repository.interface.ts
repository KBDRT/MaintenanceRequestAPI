import { Equipment } from "../../domains/entities/equipment.entity.js";
import { getEquipmentsRequest } from "../../dto/equipment/get-equipments.request.js";
import { GetEquipments } from "../../dto/types/get-equipments.type.js";

export interface IEquipmentRepository {
  get(request: getEquipmentsRequest): Promise<GetEquipments>,
  add(newEquipment: Equipment): Promise<string>,
  getById(id: string): Promise<Equipment | undefined>;
  update(updatedEquipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
  getBySerialNumber(serialNumber: string): Promise<Equipment | undefined>;
}