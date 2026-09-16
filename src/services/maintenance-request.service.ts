import { Equipment } from "../domains/entities/equipment.entity.js";
import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";
import { CreateEquipmentRequest } from "../dto/contracts/equipment/create-equipment.request.js";
import { GetEquipmentWeatherResponse } from "../dto/contracts/equipment/get-equipment-weather.response.js";
import { getEquipmentsRequest } from "../dto/contracts/equipment/get-equipments.request.js";
import { UpdateEquipmentRequest } from "../dto/contracts/equipment/update-equipment.request.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { weatherSuitableSchema } from "../validators/schemas/equipment/weather-suitable.schema.js";
import { getWeatherAsync } from "./weather.service.js";
import { CreateMaintenanceRequest } from './../dto/contracts/maintenance-request/create-maintenance-request.request.js';
import { UpdateMaintenanceRequestRequest } from "../dto/contracts/maintenance-request/update-maintenance-request.request.js";
import { UpdateMaintenanceRequestStatusRequest } from "../dto/contracts/maintenance-request/update-status-maintenance-request.request.js";
import { GetMaintenanceRequestsRequest } from './../dto/contracts/maintenance-request/get-maintenance-requests.request.js';

// const repository: IEquipmentRepository = new EquipmentRepositoryMemory();

//todo :rewrite errors
export const addRequest = async(maintenanceRequest: CreateMaintenanceRequest): Promise<string> => {

  console.log(maintenanceRequest);
  return "1";
  // const installedDate = new Date(equipmentInfo.installedAt);
  // const currentDate = new Date();
  // if (installedDate > currentDate) {
  //   throw new Error("Дата в будущем");
  // }

  // const existing = await repository.getBySerialNumber(equipmentInfo.serialNumber);
  // if (existing) {
  //   throw new Error("Сериал номер уже есть");
  // }
  
  // const equipment = Equipment.create(equipmentInfo);
  // await repository.add(equipment);
  // return equipment.id;
};

export const getRequests = async(request: GetMaintenanceRequestsRequest): Promise<MaintenanceRequest[]> => {
  // return await repository.get(request);
  console.log(request);
  return [];
};

export const deleteRequest = async(id: string): Promise<void> => {
  // const existing = await repository.getById(id);
  // if (!existing) {
  //   throw new Error("Не найден");
  // }

  // await repository.delete(id);
};

export const getRequest = async(id: string): Promise<MaintenanceRequest | undefined> => {
  // const existing = await repository.getById(id);
  // if (!existing) {
  //   throw new Error("Не найден");
  // }

  // return await repository.getById(id);
  return undefined;
};

export const updateRequest = async(id: string, updatedRequest: UpdateMaintenanceRequestRequest): Promise<void> => {
  console.log(updatedRequest);
  // const equipment = await repository.getById(id);
  // if (!equipment) {
  //   throw new Error("Не найден");
  // }

  // if (equipment) {
  //   const updated = { ...equipment, ...equipmentInfo };
  //   await repository.update(updated);
  // }
};


export const updateRequestStatus = async(id: string, request: UpdateMaintenanceRequestStatusRequest): Promise<void> => {
  console.log(request);
}