import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { createEquipmentBody } from '../utils.js';

const PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Обновление оборудования: PATCH ${PATH}`, () => {

  test('204 - валидные данные', async () => {
    const newName = "ОБНОВЛЕНО";

    let body = createEquipmentBody();

    const createEquipmentResponse = await request(app).post(PATH).send(body);
    expect(createEquipmentResponse.status).toBe(201);

    const id = createEquipmentResponse.body.id;
    body.name = newName;

    const updateResponse = await request(app).patch(`${PATH}/${id}`).send(body);
    expect(updateResponse.status).toBe(204);

    const getResponse = await request(app).get(`${PATH}/${id}`).send();
    expect(getResponse.status).toBe(200);

    expect(getResponse.body).toMatchObject({
      id: id,
      name: newName,
    });
  });

  test('404 - не найдено оборудование', async () => {
    const id = randomUUID();
    const body = createEquipmentBody();

    const response = await request(app).patch(`${PATH}/${id}`).send(body);
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
    ["длина поля", {...createEquipmentBody(), "name": "но"}],               
    ["отсутствует поле", {...createEquipmentBody(), "location": {lat: 10}}],              
    ["значение типа некорректное", {...createEquipmentBody(), "type": "ultra"}],       
  ])('400 при невалидном теле запроса: %s', async (_name, body) => {

    const id = randomUUID();

    const response = await request(app).patch(`${PATH}/${id}`).send(body);
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
