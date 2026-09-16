import { Equipment } from "../domains/entities/equipment.entity.js";
import { CreateEquipmentRequest } from "../dto/contracts/create-equipment.request.js";
import { getEquipmentsRequest } from "../dto/contracts/get-equipments.request.js";
import { UpdateEquipmentRequest } from "../dto/contracts/update-equipment.request.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();

//todo :rewrite errors
export const addEquipment = async(equipmentInfo: CreateEquipmentRequest): Promise<string> => {

  const installedDate = new Date(equipmentInfo.installedAt);
  const currentDate = new Date();
  if (installedDate > currentDate) {
    throw new Error("Дата в будущем");
  }

  const existing = await repository.getBySerialNumber(equipmentInfo.serialNumber);
  if (existing) {
    throw new Error("Сериалномер уже есть");
  }
  
  const equipment = Equipment.create(equipmentInfo);
  await repository.add(equipment);
  return equipment.id;
};

export const getEquipments = async(request: getEquipmentsRequest): Promise<Equipment[]> => {
  return await repository.get(request);
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