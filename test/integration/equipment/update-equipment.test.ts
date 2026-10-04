import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBEquipment, createEquipmentBody, loginAs } from '../utils.js';
import { Equipment } from '../../../src/domains/models/equipment.model.js';

const PATH = '/api/equipments';

describe(`Обновление оборудования: PATCH ${PATH}/:id`, () => {

  test('204 — валидные данные, оборудование обновлено в БД', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedEquipment = await createDBEquipment();
    const id = savedEquipment.id;
    const newName = faker.commerce.productName();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...savedEquipment, name: newName });

    // Assert
    expect(response.status).toBe(204);

    const saved = await Equipment.findByPk(id);
    expect(saved).not.toBeNull();
    expect(saved!.name).toBe(newName);
  });

  test('401 — без токена, оборудование не обновлено', async () => {
    // Arrange
    const savedEquipment = await createDBEquipment();
    const id = savedEquipment.id;
    const newName = faker.commerce.productName();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .send({ ...savedEquipment, name: newName });

    // Assert
    expect(response.status).toBe(401);

    const saved = await Equipment.findByPk(id);
    expect(saved!.name).toBe(savedEquipment.name);
  });

  test('403 — роль без прав, оборудование не обновлено', async () => {
    // Arrange
    const { token: viewerToken } = await loginAs(UserRole.viewer);
    const savedEquipment = await createDBEquipment();
    const id = savedEquipment.id;
    const newName = faker.commerce.productName();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${viewerToken}`)
      .send({ ...savedEquipment, name: newName });

    // Assert
    expect(response.status).toBe(403);

    const saved = await Equipment.findByPk(id);
    expect(saved!.name).toBe(savedEquipment.name);
  });

  test('404 — оборудование не найдено', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const id = faker.string.uuid();
    const body = createEquipmentBody();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
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
  });

  test.each([
    ['пустое тело', {}],
    ['длина поля', { ...createEquipmentBody(), name: 'но' }],
    ['отсутствует поле', { ...createEquipmentBody(), location: { lat: 10 } }],
    ['значение типа некорректное', { ...createEquipmentBody(), type: 'ultra' }],
  ])('400 при невалидном теле: %s', async (_name, body) => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const id = faker.string.uuid();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

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

});