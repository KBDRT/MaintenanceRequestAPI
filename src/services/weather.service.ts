import weatherAPIConfig from "../config/config-weather-api.js";
import { DayWeather } from "../dto/location-weather.js";


export async function getWeatherAsync(latitude: number, longitude: number) : Promise<DayWeather[]> {
  const url = getWeatherURL(latitude, longitude);

  const response = await fetch(url, {
    signal: AbortSignal.timeout(weatherAPIConfig.timeOut),
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (response.ok) {
    return await parseResult(response);
  } else {
    const data = await response.json();
    const reason = data.reason ?? 'Неизвестная причина';
    throw new Error("Ошибка API");
  }
}

function getWeatherURL(latitude: number, longitude: number): URL {
  const url = new URL(weatherAPIConfig.baseURL);
  url.searchParams.append('latitude', String(latitude));
  url.searchParams.append('longitude', String(longitude));
  url.searchParams.append(
    'daily',
    'temperature_2m_max,temperature_2m_min,precipitation_sum'
  );
  url.searchParams.append('forecast_days', weatherAPIConfig.days);
  url.searchParams.append('timezone', 'auto');

  return url;
}

export async function parseResult(response: Response) : Promise<DayWeather[]> {
  let result: DayWeather[] = [];
  const data = await response.json();

  if (!data?.daily?.time) {
    throw new Error("JSON ERROR");
  }

  if (data.daily.time.length === 0) {
    throw new Error('WeatherNotFound');
  }

  let index = 0;
  for (let day of data.daily.time) {
    if (
      data.daily['temperature_2m_max'] &&
      data.daily['temperature_2m_min'] &&
      data.daily['precipitation_sum']
    ) {
      result.push(new DayWeather(
         day,
         data.daily['temperature_2m_max'][index],
         data.daily['temperature_2m_min'][index],
         data.daily['precipitation_sum'][index],
      ));
      index++;
    } else {
      throw new Error("JSON ERROR");
    }
  }
  return result;
}