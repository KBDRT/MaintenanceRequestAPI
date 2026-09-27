import { Equipment } from "../../domains/entities/equipment.entity.js";
import { GetEquipmentsFilteredDto } from "../../dto/equipment/get-equipments-filtered.dto.js";
import { GetEquipments } from "../../dto/types/get-equipments.type.js";

export interface IEquipmentRepository {
  get(request: GetEquipmentsFilteredDto): Promise<GetEquipments>,
  add(newEquipment: Equipment): Promise<string>,
  getById(id: string): Promise<Equipment | undefined>;
  update(updatedEquipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
  getBySerialNumber(serialNumber: string): Promise<Equipment | undefined>;
}