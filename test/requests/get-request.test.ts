import request from 'supertest';
import app from '../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { createEquipmentBody, createRequestBody } from '../utils.js';

const PATH = process.env.REQUESTS_PATH ?? '/api';
const EQUIPMENT_PATH = process.env.EQUIPMENTS_PATH ?? '/api';

describe(`Получение заявки: GET ${PATH}`, () => {

  test('200 - успех получение сохраненного оборудование', async () => {
    const equipmentBody = createEquipmentBody();

    const createEquipmentResponse = await request(app).post(EQUIPMENT_PATH).send(equipmentBody);
    expect(createEquipmentResponse.status).toBe(201);

    let body = createRequestBody();
    body["equipmentId"] = createEquipmentResponse.body["id"];

    const createRequestResponse = await request(app).post(PATH).send(body);
    expect(createRequestResponse.status).toBe(201);

    const id = createRequestResponse.body.id;

    const getResponse = await request(app).get(`${PATH}/${id}`).send();
    expect(getResponse.status).toBe(200);
  });

  test('404 - не найдено', async () => {
    const id = randomUUID();

    const response = await request(app).get(`${PATH}/${id}`).send();
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
      status: "done",
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
