import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";
import { IMaintenanceRequestRepository } from "../repositories/abstractions/maintenance-request-repository.interface.js";
import { MaintenanceRequestRepository } from "../repositories/implementations/in-memory-maintenance-request.repository.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { CreateMaintenanceRequestDto } from "../dto/maintenance-request/create-maintenance-request.dto.js";
import { GetMaintenanceRequestsFilteredDto } from "../dto/maintenance-request/get-maintenance-requests-filtered.dto.js";
import { UpdateMaintenanceRequestDto } from "../dto/maintenance-request/update-maintenance-request.dto.js";
import { UpdateMaintenanceRequestStatusDto } from "../dto/maintenance-request/update-maintenance-request-status.dto.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { ConflictError } from "../errors/conflicts.error.js";
import { GetMaintenanceRequestsDto } from "../dto/maintenance-request/get-maintenance-requests-result.dto.js";
import requestAllowStatusChange from "../config/request-allow-status-change.config.js";
import { createRequestSchema } from "../validators/schemas/maintenance-request/create-request.schema.js";
import { GetEquipmentsFilteredDto } from "../dto/equipment/get-equipments-filtered.dto.js";
import { CreateMaintenanceRequestMassDto } from "../dto/maintenance-request/create-maintenance-request-mass.dto.js";
import { ValidationError } from "../errors/validation.error.js";
import { ErrorResponse } from "../dto/common/error.response.js";
import { MassImportRequestsResult } from "../dto/types/mass-import-requests-result.type.js";

const repository: IMaintenanceRequestRepository = new MaintenanceRequestRepository();
const equipmentRepostitory: IEquipmentRepository = new EquipmentRepositoryMemory();

export const addRequest = async(maintenanceRequest: CreateMaintenanceRequestDto): Promise<MaintenanceRequest> => {
  const existingEquipment = await equipmentRepostitory.getById(maintenanceRequest.equipmentId);
  if (!existingEquipment) {
    throw new NotFoundError("Оборудование не найдено", [{field: "equipmentId", message: `Оборудования с id = ${maintenanceRequest.equipmentId} не существует`}]);
  }

  const newRequest = MaintenanceRequest.create(maintenanceRequest); 
  await repository.add(newRequest);

  return newRequest;
};

export const getRequests = async(request: GetMaintenanceRequestsFilteredDto): Promise<GetMaintenanceRequestsDto> => {
 const serviceResult = new GetMaintenanceRequestsDto();

  const result = await repository.get(request);
  serviceResult.requests = result.requests;
  serviceResult.total = result.total;

  return serviceResult;
};

export const deleteRequest = async(id: string): Promise<void> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new NotFoundError("Заявки не найдено", [{field: "id", message: `Заявки с id = ${id} не существует`}]);
  }

  await repository.delete(id);
};

export const getRequest = async(id: string): Promise<MaintenanceRequest | undefined> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new NotFoundError("Заявки не найдено", [{field: "id", message: `Заявки с id = ${id} не существует`}]);
  }

  return await repository.getById(id);
};

export const updateRequest = async(id: string, updatedRequest: UpdateMaintenanceRequestDto): Promise<void> => {
  const savedRequest = await repository.getById(id);
  if (!savedRequest) {
    throw new NotFoundError("Заявки не найдено", [{field: "id", message: `Заявки с id = ${id} не существует`}]);
  }

  if (savedRequest) {
    const updated = { ...savedRequest, ...updatedRequest, updatedAt: new Date().toISOString()};
    await repository.update(updated);
  }
};

export const updateRequestStatus = async(id: string, request: UpdateMaintenanceRequestStatusDto): Promise<void> => {
  const savedRequest = await repository.getById(id);
  if (!savedRequest) {
    throw new NotFoundError("Заявки не найдено", [{field: "id", message: `Заявки с id = ${id} не существует`}]);
  }

  const validNextStatuses = requestAllowStatusChange[savedRequest.status];
  if (!validNextStatuses.includes(request.newStatus)) {
    throw new ConflictError("Изменение статуса запрещено", [{field: "newStatus", message: `Текущий статус ${savedRequest.status} не может быть изменен на ${request.newStatus}`}]);
  }

  const updated = { ...savedRequest, status: request.newStatus};
  await repository.update(updated);
}

export const createRequestsMass = async(requests: CreateMaintenanceRequestDto[]): Promise<MassImportRequestsResult> => {
  let importsResult: CreateMaintenanceRequestMassDto[] = [];
  let totalError = 0;
  let totalSuccess = 0;

  // валидация
  let uniqueEquipmentsId: string[] = [];
  for (let requestInfo of requests) {
    let importResult = new CreateMaintenanceRequestMassDto();
    importResult.importData = {...requestInfo};

    const validateResult = createRequestSchema.safeParse(requestInfo);

    if (validateResult.success) {
      if (!uniqueEquipmentsId.includes(requestInfo.equipmentId)) {
        uniqueEquipmentsId.push(requestInfo.equipmentId);
      }
      importResult.success = true;
    }
    else {
      importResult.success = false;
      importResult.error = ErrorResponse.create(new ValidationError(validateResult.error));
      totalError++;
    }

    importsResult.push(importResult);
  }

  // проверка по оборудованию
  let equipmentFilter = new GetEquipmentsFilteredDto();
  equipmentFilter.id = uniqueEquipmentsId;
  const repositoryResult = await equipmentRepostitory.get(equipmentFilter);

  const newRequests: MaintenanceRequest[] = [];
  for (let requestInfo of importsResult.filter(x => x.success)) {
    if (repositoryResult.equipments.some(x => x.id == requestInfo.importData?.equipmentId) && requestInfo.importData) {
      let newRequest = MaintenanceRequest.create(requestInfo.importData)
      newRequests.push(newRequest);
      requestInfo.resultData = newRequest;
      totalSuccess++;
    } 
    else {
      requestInfo.success = false;
      totalError++;
      requestInfo.error = ErrorResponse.create(new NotFoundError("Оборудование не найдено", [{field: "equipmentId", message: `Оборудования с id = ${requestInfo.importData?.equipmentId} не существует`}]));
    }
  }

  // добавление валидных
  await repository.addMass(newRequests);
  return {imports: importsResult, totalError: totalError, totalSuccess: totalSuccess};
};