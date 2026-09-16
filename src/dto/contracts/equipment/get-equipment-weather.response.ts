import { EquipmentLocation } from "../../../domains/value-objects/equipment-location.vo.js";
import { DayWeather } from "../../../domains/value-objects/location-weather.js";
import { WeatherRule } from "../../../domains/value-objects/weather-rule.js";

export class GetEquipmentWeatherResponse {
  equipmentId?: string;
  location?: EquipmentLocation;
  rules: WeatherRule = new WeatherRule();
  isWeatherWindowSuitable: boolean = false;
  weather: DayWeather[] = [];
}