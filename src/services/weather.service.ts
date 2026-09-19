import weatherAPIConfig from "../config/weather-api.config.js";
import { DayWeather } from "../domains/values/location-weather.value.js";
import { AppError } from "../errors/app.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

export async function getWeatherAsync(latitude: number, longitude: number) : Promise<DayWeather[] | unknown> {
  try {
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

      if (response.status >= 400 && response.status < 500) {
        throw new AppError("Ошибка получения погоды", {status: response.status, code: "WEATHER_API_REQUEST_ERROR", details: [{field: "location", message: reason}]  });
      }
      else {
        throw new AppError("Ошибка получения погоды", {status: 502, code: "WEATHER_API_ERROR" });
      }
    }
  }
  catch (error) {
    if (error instanceof Error) {
      switch (error.name) {
        case 'TimeoutError':
          throw new AppError("Ошибка получения погоды: таймаут", {status: 504, code: "WEATHER_API_TIMEOUT" });
        default:
          throw error;
      }
    }
    else {
      throw error;
    }
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
  url.searchParams.append('forecast_days', String(weatherAPIConfig.days));
  url.searchParams.append('timezone', 'auto');

  return url;
}

export async function parseResult(response: Response) : Promise<DayWeather[]> {
  let result: DayWeather[] = [];
  const data = await response.json();

  if (!data?.daily?.time) {
    throw new AppError("Ошибка получения погоды", {status: 502, code: "WEATHER_API_ERROR" });
  }

  if (data.daily.time.length === 0) {
    throw new NotFoundError("Погода не найдена!", [{field: "location", message: `Погода для оборудования не найдена`}]);
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
      throw new AppError("Ошибка погодного API", {status: 502, code: "WEATHER_API_ERROR" });
    }
  }
  return result;
}