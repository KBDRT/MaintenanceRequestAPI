import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";
import { CreateMaintenanceRequest } from './../dto/contracts/maintenance-request/create-maintenance-request.request.js';
import { UpdateMaintenanceRequestRequest } from "../dto/contracts/maintenance-request/update-maintenance-request.request.js";
import { UpdateMaintenanceRequestStatusRequest } from "../dto/contracts/maintenance-request/update-status-maintenance-request.request.js";
import { GetMaintenanceRequestsRequest } from './../dto/contracts/maintenance-request/get-maintenance-requests.request.js';
import { IMaintenanceRequestRepository } from "../repositories/abstractions/maintenance-request.repository.interface.js";
import { MaintenanceRequestRepository } from "../repositories/implementations/in-memory-maintenance-request.repository.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import requestAllowStatusChange from "../config/request-allow-status-change.js";

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
  return await repository.get(request);
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
  const savedRequest = await repository.getById(id);
  if (!savedRequest) {
    throw new Error("Не найден");
  }

  if (savedRequest) {
    const updated = { ...savedRequest, ...updatedRequest, updatedAt: new Date().toISOString()};
    await repository.update(updated);
  }
};


export const updateRequestStatus = async(id: string, request: UpdateMaintenanceRequestStatusRequest): Promise<void> => {
  const savedRequest = await repository.getById(id);
  console.log(id, savedRequest);
  if (!savedRequest) {
    throw new Error("Не найден");
  }

  const validNextStatuses = requestAllowStatusChange[savedRequest.status];
  if (!validNextStatuses) {
    throw new Error("Таблица перехода статусов не найдена");
  }

  if (!validNextStatuses.includes(request.newStatus)) {
    throw new Error("Ошибка со статусом, нельзя так переходить");
  }

  const updated = { ...savedRequest, status: request.newStatus};
  await repository.update(updated);
}