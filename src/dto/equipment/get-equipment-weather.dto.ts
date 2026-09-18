import { EquipmentLocation } from "../../domains/values/equipment-location.value.js";
import { DayWeather } from "../../domains/values/location-weather.value.js";
import { WeatherRule } from "../../domains/values/weather-rule.value.js";

export class GetEquipmentWeatherDto {
  equipmentId?: string;
  location?: EquipmentLocation;
  rules: WeatherRule = new WeatherRule();
  isWeatherWindowSuitable: boolean = false;
  weather: DayWeather[] = [];
}