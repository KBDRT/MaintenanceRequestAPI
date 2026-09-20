import { Equipment } from "../domains/entities/equipment.entity.js";
import { CreateEquipmentDto } from "../dto/equipment/create-equipment.dto.js";
import { GetEquipmentWeatherDto } from "../dto/equipment/get-equipment-weather.dto.js";
import { GetEquipmentsFilteredDto } from "../dto/equipment/get-equipments-filtered.dto.js";
import { ConflictError } from "../errors/conflicts.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { IMaintenanceRequestRepository } from "../repositories/abstractions/maintenance-request-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { weatherSuitableSchema } from "../validators/schemas/equipment/weather-suitable.schema.js";
import { getWeatherAsync } from "./weather.service.js";
import { MaintenanceRequestRepository } from './../repositories/implementations/in-memory-maintenance-request.repository.js';
import { MaintenanceRequestStatus } from "../domains/enums/maintenance-request-status.enum.js";
import { getRequests } from "./maintenance-request.service.js";
import { GetEquipmentRequestsDto } from "../dto/equipment/get-equipment-requests.dto.js";
import { GetMaintenanceRequestsDto } from "../dto/maintenance-request/get-maintenance-requests-result.dto.js";
import { BusinessRuleError } from "../errors/business-rule.error.js";
import { GetEquipmentsResultDto } from "../dto/equipment/get-equipments-result.dto.js";
import { UpdateEquipmentDto } from "../dto/equipment/update-equipment.dto.js";

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();
const requestsRepository: IMaintenanceRequestRepository = new MaintenanceRequestRepository();

export const addEquipment = async(equipmentInfo: CreateEquipmentDto): Promise<Equipment> => {
  if (new Date(equipmentInfo.installedAt) > new Date()) {
    throw new BusinessRuleError("Дата установки оборудования неккоретна", [{field: "installedAt", message: "Дата установки оборудования не может быть в будущем"}])
  }

  const existing = await repository.getBySerialNumber(equipmentInfo.serialNumber);
  if (existing) {
    throw new ConflictError("Оборудование с указанным серийным номером уже существует!", [{field: "serialNumber", message: "Неуникальный серийный номер"}]);
  }
  
  const equipment = Equipment.create(equipmentInfo);
  await repository.add(equipment);
  
  return equipment;
};

export const getEquipments = async(request: GetEquipmentsFilteredDto): Promise<GetEquipmentsResultDto> => {
  const serviceResult = new GetEquipmentsResultDto();

  const result = await repository.get(request);
  serviceResult.equipments = result.equipments;
  serviceResult.total = result.total;

  return serviceResult;
};

export const deleteEquipment = async(id: string): Promise<void> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  const hasUnfinishedRequests = await requestsRepository.existWithStatuses(id, [MaintenanceRequestStatus.new, MaintenanceRequestStatus.in_progress]);
  if (hasUnfinishedRequests) {
    throw new ConflictError("Для данного оборудования есть незавершенные заявки", [{field: "id", message: `Оборудования с id = ${id} имеет открытыие заявки`}]);
  }

  await repository.delete(id);
};

export const getEquipment = async(id: string): Promise<Equipment | undefined> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  return await repository.getById(id);
};

export const updateEquipment = async(id: string, equipmentInfo: UpdateEquipmentDto): Promise<void> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  if (equipment) {
    const updated = { ...equipment, ...equipmentInfo };
    await repository.update(updated);
  }
};


export const getEquipmentWeather = async(id: string): Promise<GetEquipmentWeatherDto> => {
  const response = new GetEquipmentWeatherDto();
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  response.equipmentId = id;
  response.location = equipment.location;

  const daysWeather = await getWeatherAsync(equipment.location.lat, equipment.location.lon);
  if (Array.isArray(daysWeather)) {
    for (const weather of daysWeather) {
      const parsed = weatherSuitableSchema.safeParse(weather);
      weather.suitable = parsed.success;
      response.weather?.push(weather);
    }
  }

  response.isWeatherWindowSuitable = response.weather.every(x => x.suitable);

  return response;
}

export const getEquipmentsMaintenanceRequests = async(id: string, request: GetEquipmentRequestsDto): Promise<GetMaintenanceRequestsDto> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  let maintenanceRequest = {...request, equipmentsId: [id]};
  return await getRequests(maintenanceRequest);
}