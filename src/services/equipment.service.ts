import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();

export const createEquipment = (): void => {
  
};