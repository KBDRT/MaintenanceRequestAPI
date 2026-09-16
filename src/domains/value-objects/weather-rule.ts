import weatherRulesConfig from "../../config/weather-rule.config.js";

export class WeatherRule {
  readonly minAllowedTemperature: number = weatherRulesConfig.minTemperature;
  readonly maxAllowedTemperature: number = weatherRulesConfig.maxTemperature;
  readonly maxAllowedSumPrecipitation: number = weatherRulesConfig.maxSumPrecipitation;
}