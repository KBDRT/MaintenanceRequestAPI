import { Equipment } from "../../domains/entities/equipment.entity.js";

export interface IEquipmentRepository {
  get(): Promise<Equipment[]>,
  add(newEquipment: Equipment): Promise<string>,
  getById(id: string): Promise<Equipment>;
  update(updatedEquipment: Equipment): Promise<void>;
  delete(id: string): Promise<void>;
}