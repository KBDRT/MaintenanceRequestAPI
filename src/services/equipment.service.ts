import { Equipment } from "../domains/entities/equipment.entity.js";
import { CreateEquipmentRequest } from "../dto/contracts/equipment/create-equipment.request.js";
import { GetEquipmentWeatherResponse } from "../dto/contracts/equipment/get-equipment-weather.response.js";
import { getEquipmentsRequest } from "../dto/contracts/equipment/get-equipments.request.js";
import { UpdateEquipmentRequest } from "../dto/contracts/equipment/update-equipment.request.js";
import { WeatherRule } from "../dto/weather-rule.js";
import { IEquipmentRepository } from "../repositories/abstractions/equipment-repository.interface.js";
import { EquipmentRepositoryMemory } from "../repositories/implementations/in-memory-equipment-repository.js";
import { weatherSuitableSchema } from "../validators/schemas/equipment/weather-suitable.schema.js";
import { getWeatherAsync } from "./weather.service.js";

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
    throw new Error("Сериал номер уже есть");
  }
  
  const equipment = Equipment.create(equipmentInfo);
  await repository.add(equipment);
  return equipment.id;
};

export const getEquipments = async(request: getEquipmentsRequest): Promise<Equipment[]> => {
  return await repository.get(request);
};

export const deleteEquipment = async(id: string): Promise<void> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new Error("Не найден");
  }

  await repository.delete(id);
};

export const getEquipment = async(id: string): Promise<Equipment | undefined> => {
  const existing = await repository.getById(id);
  if (!existing) {
    throw new Error("Не найден");
  }

  return await repository.getById(id);
};

export const updateEquipment = async(id: string, equipmentInfo: UpdateEquipmentRequest): Promise<void> => {
  const equipment = await repository.getById(id);
  if (!equipment) {
    throw new Error("Не найден");
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
    throw new Error("Не найден");
  }

  response.equipmentId = id;
  response.location = equipment.location;

  const daysWeather = await getWeatherAsync(equipment.location.lat, equipment.location.lon);
  for (const weather of daysWeather) {
    const parsed = weatherSuitableSchema.safeParse(weather);
    console.log(parsed);
    weather.suitable = parsed.success;
    response.weather?.push(weather);
  }

  response.isWeatherWindowSuitable = response.weather.every(x => x.suitable);

  return response;
}