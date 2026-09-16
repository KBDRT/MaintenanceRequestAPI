export class DayWeather {

  date?: string;
  maxTemperature?: number;
  minTemperature?: number;
  sumPrecipitation?: number;
  suitable: boolean = false;

  constructor(date: string, maxTemp: number, minTemp: number, sumPrec: number) {
    this.date = date;
    this.maxTemperature = maxTemp;
    this.minTemperature = minTemp;
    this.sumPrecipitation = sumPrec;
  }

}