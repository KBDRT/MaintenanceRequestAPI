import { Equipment } from "../domains/entities/equipment.entity.js";
import { CreateEquipmentRequest } from "../dto/equipment/create-equipment.request.js";
import { GetEquipmentWeatherResponse } from "../dto/equipment/get-equipment-weather.response.js";
import { getEquipmentsRequest } from "../dto/equipment/get-equipments.request.js";
import { UpdateEquipmentRequest } from "../dto/equipment/update-equipment.request.js";
import { ConflictError } from "../errors/conflicts.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { IMaintenanceRequestRepository } from "../repositories/abstractions/maintenance-request.repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { weatherSuitableSchema } from "../validators/schemas/equipment/weather-suitable.schema.js";
import { getWeatherAsync } from "./weather.service.js";
import { MaintenanceRequestRepository } from './../repositories/implementations/in-memory-maintenance-request.repository.js';
import { MaintenanceRequestStatus } from "../domains/enums/maintenance-request-status.enum.js";
import { GetEquipmentsResult } from "../dto/equipment/get-equipments.result.js";
import { getRequests } from "./maintenance-request.service.js";
import { GetEquipmentsRequests } from "../dto/equipment/get-equipment-requests.request.js";
import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";

const repository: IEquipmentRepository = new EquipmentRepositoryMemory();
const requestsRepository: IMaintenanceRequestRepository = new MaintenanceRequestRepository();

export const addEquipment = async(equipmentInfo: CreateEquipmentRequest): Promise<string> => {
  const existing = await repository.getBySerialNumber(equipmentInfo.serialNumber);
  if (existing) {
    throw new ConflictError("Оборудование с указанным серийным номером уже существует!", [{field: "serialNumber", message: "Неуникальный серийный номер"}]);
  }
  
  const equipment = Equipment.create(equipmentInfo);
  await repository.add(equipment);
  return equipment.id;
};

export const getEquipments = async(request: getEquipmentsRequest): Promise<GetEquipmentsResult> => {
  const serviceResult = new GetEquipmentsResult();

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

export const updateEquipment = async(id: string, equipmentInfo: UpdateEquipmentRequest): Promise<void> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  if (equipment) {
    const updated = { ...equipment, ...equipmentInfo };
    await repository.update(updated);
  }
};


export const getEquipmentWeather = async(id: string): Promise<GetEquipmentWeatherResponse> => {
  const response = new GetEquipmentWeatherResponse();
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  response.equipmentId = id;
  response.location = equipment.location;

  const daysWeather = await getWeatherAsync(equipment.location.lat, equipment.location.lon);
  for (const weather of daysWeather) {
    const parsed = weatherSuitableSchema.safeParse(weather);
    weather.suitable = parsed.success;
    response.weather?.push(weather);
  }

  response.isWeatherWindowSuitable = response.weather.every(x => x.suitable);

  return response;
}

export const getEquipmentsMaintenanceRequests = async(id: string, request: GetEquipmentsRequests): Promise<MaintenanceRequest[]> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
     throw new NotFoundError("Оборудование не найдено!", [{field: "id", message: `Оборудования с id = ${id} не существует`}]);
  }

  let maintenanceRequest = {...request, equipmentsId: [id]};
  return await getRequests(maintenanceRequest);
}