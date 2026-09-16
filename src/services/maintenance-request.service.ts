import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";
import { CreateMaintenanceRequest } from './../dto/contracts/maintenance-request/create-maintenance-request.request.js';
import { UpdateMaintenanceRequestRequest } from "../dto/contracts/maintenance-request/update-maintenance-request.request.js";
import { UpdateMaintenanceRequestStatusRequest } from "../dto/contracts/maintenance-request/update-status-maintenance-request.request.js";
import { GetMaintenanceRequestsRequest } from './../dto/contracts/maintenance-request/get-maintenance-requests.request.js';
import { IMaintenanceRequestRepository } from "../repositories/abstractions/maintenance-request.repository.interface.js";
import { MaintenanceRequestRepository } from "../repositories/implementations/in-memory-maintenance-request.repository.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";

const repository: IMaintenanceRequestRepository = new MaintenanceRequestRepository();
const equipmentRepostitory: IEquipmentRepository = new EquipmentRepositoryMemory();

//todo :rewrite errors
export const addRequest = async(maintenanceRequest: CreateMaintenanceRequest): Promise<string> => {
  const existingEquipment = await equipmentRepostitory.getById(maintenanceRequest.equipmentId);
  if (!existingEquipment) {
    throw new Error("NOT FOUND EQUIPMENT");
  }

  const newRequest = MaintenanceRequest.create(maintenanceRequest); 
  const id = await repository.add(newRequest);

  return id;
};

export const getRequests = async(request: GetMaintenanceRequestsRequest): Promise<MaintenanceRequest[]> => {
  // return await repository.get(request);
  // console.log(request);
  return [];
};

export const deleteRequest = async(id: string): Promise<void> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new Error("Не найден");
  }

  await repository.delete(id);
};

export const getRequest = async(id: string): Promise<MaintenanceRequest | undefined> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new Error("Не найден");
  }

  return await repository.getById(id);
};

export const updateRequest = async(id: string, updatedRequest: UpdateMaintenanceRequestRequest): Promise<void> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
    throw new Error("Не найден");
  }

  if (equipment) {
    const updated = { ...equipment, ...updatedRequest };
    await repository.update(updated);
  }
};


export const updateRequestStatus = async(id: string, request: UpdateMaintenanceRequestStatusRequest): Promise<void> => {
  // console.log(request);
}