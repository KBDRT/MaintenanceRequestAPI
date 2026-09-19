import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { createEquipmentBody } from '../utils.js';

const PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Удаление оборудования: DELETE ${PATH}`, () => {

  test('204 - валидные данные', async () => {
    let body = createEquipmentBody();

    const createResponse = await request(app).post(PATH).send(body);
    expect(createResponse.status).toBe(201);

    const id = createResponse.body.id;

    const updateResponse = await request(app).delete(`${PATH}/${id}`).send();
    expect(updateResponse.status).toBe(204);

    const getResponse = await request(app).get(`${PATH}/${id}`).send();
    expect(getResponse.status).toBe(404);
  });

  test('404 - не найдено оборудование', async () => {
    const id = randomUUID();

    const updateResponse = await request(app).delete(`${PATH}/${id}`).send();
    expect(updateResponse.status).toBe(404);

    expect(updateResponse.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });

});