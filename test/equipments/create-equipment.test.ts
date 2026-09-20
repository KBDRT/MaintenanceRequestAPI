import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { createEquipmentBody } from '../utils.js';

const PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Создание заявки: POST ${PATH}`, () => {
  test('200 - валидные данные', async () => {
    const body = createEquipmentBody();

    const response = await request(app).post(PATH).send(body);
    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: body.name,
      serialNumber: body.serialNumber,
      location: body.location,
      status: body.status,
      installedAt: body.installedAt,
    });
    expect(response.body.id).toBeDefined();
  });

  test.each([
    ["пустое тело", { }],                        
    ["длина поля", {...createEquipmentBody(), "name": "но"}],               
    ["отсутствует поле", {...createEquipmentBody(), "location": {lat: 10}}],              
    ["значение типа некорректное", {...createEquipmentBody(), "type": "ultra"}],       
  ])('400 при невалидном теле запроса: %s', async (_name, body) => {
    const response = await request(app).post(PATH).send(body);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });


  test('422 - дата в будущем', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const body = {...createEquipmentBody(), "installedAt": futureDate.toISOString().substring(0,10)};

    const response = await request(app).post(PATH).send(body);
    expect(response.status).toBe(422);

    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });


  test('409 - неуникальный серийный номер', async () => {
    const serialNumber = 'SerialN';
    const body = {...createEquipmentBody(), "serialNumber": serialNumber};

    const resFirst = await request(app).post(PATH).send(body);
    expect(resFirst.status).toBe(201);

    const resSecond = await request(app).post(PATH).send(body);
    expect(resSecond.status).toBe(409);

    expect(resSecond.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });
});
