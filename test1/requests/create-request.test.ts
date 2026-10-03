import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { createEquipmentBody, createRequestBody } from '../utils.js';

const PATH = process.env.REQUESTS_PATH ?? '/api';
const EQUIPMENT_PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Создание заявки: POST ${PATH}`, () => {

  test('201 - валидные данные', async () => {
    const equipmentBody = createEquipmentBody();

    const createEquipmentResponse = await request(app).post(EQUIPMENT_PATH).send(equipmentBody);
    expect(createEquipmentResponse.status).toBe(201);

    let body = createRequestBody();
    body["equipmentId"] = createEquipmentResponse.body["id"];

    const response = await request(app).post(PATH).send(body);
    expect(response.status).toBe(201);
  });

  test('404 - не найдено оборудование для заявки', async () => {
    const body = createRequestBody();

    const response = await request(app).post(PATH).send(body);
    expect(response.status).toBe(404);

    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });

  test.each([
    ["пустое тело", { }],                        
    ["длина поля", {...createRequestBody(), "title": "но"}],               
    ["отсутствует поле", {...createRequestBody(), "priority": undefined}],              
    ["значение типа некорректное", {...createRequestBody(), "priority": "big"}],       
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
});
