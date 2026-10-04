import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBEquipment, createRequestBody, loginAs } from '../utils.js';
import { MaintenanceRequest } from '../../../src/domains/models/maintenance-request.model.js';
import { MaintenanceRequestStatus } from '../../../src/domains/enums/maintenance-request-status.enum.js';

const PATH = '/api/requests';

describe(`Создание заявки: POST ${PATH}`, () => {

  test('201 — валидные данные, заявка в БД', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const equipment = await createDBEquipment();
    const body = { ...createRequestBody(), equipmentId: equipment.id };

    // Act
    const response = await request(app)
      .post(PATH)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: body.title,
      priority: body.priority,
      status: MaintenanceRequestStatus.new,
      equipmentId: equipment.id,
    });

    const saved = await MaintenanceRequest.findByPk(response.body.id);
    expect(saved).not.toBeNull();
    expect(saved!.equipmentId).toBe(equipment.id);
    expect(saved!.title).toBe(body.title);
  });

  test('401 — без токена, заявка не создана', async () => {
    // Arrange
    const equipment = await createDBEquipment();
    const body = { ...createRequestBody(), equipmentId: equipment.id };

    // Act
    const response = await request(app).post(PATH).send(body);

    // Assert
    expect(response.status).toBe(401);
    expect(await MaintenanceRequest.count()).toBe(0);
  });

  test('403 — роль без прав, заявка не создана', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.viewer);
    const equipment = await createDBEquipment();
    const body = { ...createRequestBody(), equipmentId: equipment.id };

    // Act
    const response = await request(app)
      .post(PATH)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    // Assert
    expect(response.status).toBe(403);
    expect(await MaintenanceRequest.count()).toBe(0);
  });

  test('404 — оборудование не найдено, заявка не создана', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const body = { ...createRequestBody(), equipmentId: faker.string.uuid() };

    // Act
    const response = await request(app)
      .post(PATH)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

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

    expect(await MaintenanceRequest.count()).toBe(0);
  });

  test.each([
    ['пустое тело', {}],
    ['длина поля', { ...createRequestBody(), title: 'но' }],
    ['отсутствует поле', { ...createRequestBody(), priority: undefined }],
    ['значение типа некорректное', { ...createRequestBody(), priority: 'big' }],
  ])('400 при невалидном теле: %s', async (_name, body) => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const equipment = await createDBEquipment();
    const fullBody = { ...body, equipmentId: equipment.id };

    // Act
    const response = await request(app)
      .post(PATH)
      .set('Authorization', `Bearer ${token}`)
      .send(fullBody);

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

    expect(await MaintenanceRequest.count()).toBe(0);
  });

});