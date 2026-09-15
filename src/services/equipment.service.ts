import { IEquipmentRepository } from "../repositories/abstractions/IEquipmentRepository.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/EquipmentRepositoryMemory.js";

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();

export const createEqupment = (): void => {
  
};