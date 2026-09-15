import { Equipment } from "../domains/entities/equipment.entity.js";
import { CreateEquipmentRequest } from "../dto/contracts/create-equipment.request.js";
import { UpdateEquipmentRequest } from "../dto/contracts/update-equipment.request.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { randomUUID } from 'node:crypto';

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();

export const addEquipment = async(equipmentInfo: CreateEquipmentRequest): Promise<void> => {
  let newEquipment: Equipment = new Equipment();
  newEquipment.id = randomUUID();
  newEquipment.name = equipmentInfo.name;
  newEquipment.type = equipmentInfo.type;
  newEquipment.serialNumber = equipmentInfo.serialNumber;
  newEquipment.location = equipmentInfo.location;
  newEquipment.status = equipmentInfo.status;
  newEquipment.installedAt = equipmentInfo.installedAt;

  let result = await repository.add(newEquipment);
};

export const getEquipments = async(): Promise<Equipment[]> => {
  return await repository.get();
};

export const deleteEquipment = async(id: string): Promise<void> => {
  await repository.delete(id);
};

export const getEquipment = async(id: string): Promise<Equipment | undefined> => {
  return await repository.getById(id);
};

export const updateEquipment = async(id: string, equipmentInfo: UpdateEquipmentRequest): Promise<void> => {
  let equipment = await getEquipment(id);
  if (equipment) {
    const updated = { ...equipment, ...equipmentInfo };
    await repository.update(updated);
  }
};