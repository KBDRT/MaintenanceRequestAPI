import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { createEquipmentBody } from '../utils.js';

const PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Получение оборудования: GET ${PATH}`, () => {

  test('200 - успех получение сохраненного оборудование', async () => {
    const body = createEquipmentBody();

    const createEquipmentResponse = await request(app).post(PATH).send(body);
    expect(createEquipmentResponse.status).toBe(201);

    const id = createEquipmentResponse.body.id;

    const createRequestResponse = await request(app).get(`${PATH}/${id}`).send();
    expect(createRequestResponse.status).toBe(200);
  });

  test('404 - не найдено', async () => {
    const id = randomUUID();

    const createRequestResponse = await request(app).get(`${PATH}/${id}`).send();
    expect(createRequestResponse.status).toBe(404);

    expect(createRequestResponse.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        details: expect.anything(),
        requestId: expect.anything()
      }
    });
  });

  test.each([
    ["фильтрация по несуществующему типу", {type: "123"}],    
    ["значение сортировки некорректное", {sort: "type", sortDirection: "descending"}],           
    ["количество полей сортировки и направления различное", {sort: "type", sortDirection: ["desc", "asc"]}],   
    ["отрицательная страница пагинации", {page: -1, limit: 100}],          
  ])('400 при невалидном запросе: %s', async (_name, query) => {
    
    const response = await request(app)
    .get(PATH)
    .query(query)
    .send();

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

  test('200 - валидный запрос с фильтрацией, сортировкой и пагинацией', async () => {
    const query = {
      sort: "type",
      sortDirection: "desc",
      type: "turbine",
      page: 1,
      limit: 22
    }

    const response = await request(app)
    .get(PATH)
    .query(query)
    .send();

    expect(response.status).toBe(200);
  });
});
