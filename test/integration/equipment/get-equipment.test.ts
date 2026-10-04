import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBEquipment, loginAs } from '../utils.js';
import { randomUUID } from 'node:crypto';

const PATH = '/api/equipments';

describe(`Получение оборудования: GET ${PATH}`, () => {

  test('200 — успешное получение сохранённого оборудования с ролью admin', async () => {
    // Arrange
    const equipment = await createDBEquipment();
    const id = equipment.id;

    const { token } = await loginAs(UserRole.admin);

    // Act
    const response = await request(app)
      .get(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      name: equipment.name,
      serialNumber: equipment.serialNumber,
      status: equipment.status,
      installedAt: equipment.installedAt,
    });
  });

  test('401 — без токена', async () => {
    // Arrange
    const id = randomUUID();

    // Act
    const response = await request(app).get(`${PATH}/${id}`);

    // Assert
    expect(response.status).toBe(401);
  });

  test('200 — просмотр с ролью viewer', async () => {
    // Arrange
    const { token: viewerToken } = await loginAs(UserRole.viewer);
    const equipment = await createDBEquipment();
    const id = equipment.id;

    // Act
    const response = await request(app)
      .get(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${viewerToken}`);

    // Assert
    expect(response.status).toBe(200);
  });

  test('404 — оборудование не найдено', async () => {
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
    const { token } = await loginAs(UserRole.viewer);
    const equipment = await createDBEquipment();
    const query = {
      sort: 'type',
      sortDirection: 'desc',
      type: equipment.type,
      page: 1,
      limit: 10,
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