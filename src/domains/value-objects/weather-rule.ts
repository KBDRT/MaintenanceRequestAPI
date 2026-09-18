import weatherRulesConfig from "../../config/weather-rule.config.js";

export class WeatherRule {
  readonly minAllowedTemperature = weatherRulesConfig.minTemperature;
  readonly maxAllowedTemperature = weatherRulesConfig.maxTemperature;
  readonly maxAllowedSumPrecipitation = weatherRulesConfig.maxSumPrecipitation;
}