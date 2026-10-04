import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBRequest, loginAs } from '../utils.js';

const PATH = '/api/requests';

describe(`Получение заявок: GET ${PATH}`, () => {

  test('200 — успешное получение сохранённой заявки', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app)
      .get(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      title: savedRequest.title,
      status: savedRequest.status,
      equipmentId: savedRequest.equipmentId,
    });
  });

  test('401 — без токена', async () => {
    // Arrange
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app).get(`${PATH}/${id}`);

    // Assert
    expect(response.status).toBe(401);
  });


  test('404 — заявка не найдена', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const id = faker.string.uuid();

    // Act
    const response = await request(app)
      .get(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        details: expect.anything(),
        requestId: expect.any(String),
      },
    });
  });

  test.each([
    ['фильтрация по несуществующему типу', { type: '123' }],
    ['значение сортировки некорректное', { sort: 'type', sortDirection: 'descending' }],
    ['количество полей сортировки и направления различное', { sort: 'type', sortDirection: ['desc', 'asc'] }],
    ['отрицательная страница пагинации', { page: -1, limit: 100 }],
  ])('400 при невалидном запросе: %s', async (_name, query) => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);

    // Act
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${token}`)
      .query(query);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        details: expect.anything(),
        requestId: expect.any(String),
      },
    });
  });

  test('200 — валидный запрос с фильтрацией, сортировкой и пагинацией', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedRequest = await createDBRequest();
    const query = {
      sort: 'status',
      sortDirection: 'desc',
      status: savedRequest.status,
      page: 1,
      limit: 22,
    };

    // Act
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${token}`)
      .query(query);

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data ?? response.body)).toBe(true);
  });

});