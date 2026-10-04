import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import { test, expect, describe, beforeEach } from '@jest/globals';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBEquipment } from '../utils/db-factories/equipment-factory.js';
import { loginAs } from '../utils/auth.js';
import { createDBSite } from '../utils/db-factories/site-factory.js';

fetchMock.enableMocks();

const PATH = '/api/equipments';

const OPEN_METEO_OK = {
  daily: {
    time: ['2026-10-04', '2026-10-05'],
    temperature_2m_max: [10, 10],
    temperature_2m_min: [-5, -6],
    precipitation_sum: [0, 0],
  },
};

const OPEN_METEO_MIXED = {
  daily: {
    time: ['2026-10-04', '2026-10-05'],
    temperature_2m_max: [20, 100],
    temperature_2m_min: [10, -50],
    precipitation_sum: [0, 99],
  },
};

describe(`Получение погоды: GET ${PATH}/:id/weather`, () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('200 — все дни подходят, isWeatherWindowSuitable = true', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockResponse(() => ({
      body: JSON.stringify(OPEN_METEO_OK),
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      equipmentId: equipment.id,
      isWeatherWindowSuitable: true,
    });
  });

  test('200 — есть неподходящие дни, isWeatherWindowSuitable = false', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockResponse(() => ({
      body: JSON.stringify(OPEN_METEO_MIXED),
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      equipmentId: equipment.id,
      isWeatherWindowSuitable: false,
    });
  });

  test('401 — без токена, погодный API не вызывается', async () => {
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`);

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('404 — оборудование не найдено, погодный API не вызывается', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const id = faker.string.uuid();

    const response = await request(app)
      .get(`${PATH}/${id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        details: expect.anything(),
        requestId: expect.any(String),
      },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('502 — погодный API вернул 5xx', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockResponse(() => ({
      body: JSON.stringify({ reason: 'Server error' }),
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(502);
    expect(response.body).toMatchObject({
      error: { code: 'WEATHER_API_ERROR' },
    });
  });

  test('504 — таймаут погодного API', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockRejectOnce(
      Object.assign(new Error('timeout'), { name: 'TimeoutError' }),
    );

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(504);
    expect(response.body).toMatchObject({
      error: { code: 'WEATHER_API_TIMEOUT' },
    });
  });

  test('400 — погодный API вернул 4xx', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockResponse(() => ({
      body: JSON.stringify({ reason: 'Invalid coordinates' }),
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { code: 'WEATHER_API_REQUEST_ERROR' },
    });
  });

  test('404 — пустой time в ответе погодного API', async () => {
    const { token } = await loginAs(UserRole.viewer);
    const site = await createDBSite();
    const equipment = await createDBEquipment({ siteId: site.id });

    fetchMock.mockResponse(() => ({
      body: JSON.stringify({
        daily: {
          time: [],
          temperature_2m_max: [],
          temperature_2m_min: [],
          precipitation_sum: [],
        },
      }),
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await request(app)
      .get(`${PATH}/${equipment.id}/weather`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

});