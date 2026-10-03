import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { createEquipmentBody, createRequestBody } from '../utils.js';

const PATH = process.env.REQUESTS_PATH ?? '/api';
const EQUIPMENT_PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Удаление заявки: DELETE ${PATH}`, () => {
  test('204 - валидные данные', async () => {
    const equipmentBody = createEquipmentBody();

    const createEquipmentResponse = await request(app).post(EQUIPMENT_PATH).send(equipmentBody);
    expect(createEquipmentResponse.status).toBe(201);

    let body = createRequestBody();
    body["equipmentId"] = createEquipmentResponse.body["id"];

    const createRequestResponse = await request(app).post(PATH).send(body);
    expect(createRequestResponse.status).toBe(201);

    const id = createRequestResponse.body.id;

    const getResponse = await request(app).delete(`${PATH}/${id}`).send();
    expect(getResponse.status).toBe(204);
  });

  test('404 - не найдено оборудование', async () => {
    const id = randomUUID();

    const response = await request(app).delete(`${PATH}/${id}`).send();
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

});