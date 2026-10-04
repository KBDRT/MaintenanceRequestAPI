import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBRequest, loginAs } from '../utils.js';
import { MaintenanceRequest } from '../../../src/domains/models/maintenance-request.model.js';

const PATH = '/api/requests';

describe(`Удаление заявки: DELETE ${PATH}/:id`, () => {

  test('204 — валидные данные, заявка удалена из БД', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app)
      .delete(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(204);

    const saved = await MaintenanceRequest.findByPk(id);
    expect(saved).toBeNull();
  });

  test('401 — без токена, заявка не удалена', async () => {
    // Arrange
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app).delete(`${PATH}/${id}`);

    // Assert
    expect(response.status).toBe(401);

    const saved = await MaintenanceRequest.findByPk(id);
    expect(saved).not.toBeNull();
  });

  test('403 — роль без прав, заявка не удалена', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.viewer);
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app)
      .delete(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(403);

    const saved = await MaintenanceRequest.findByPk(id);
    expect(saved).not.toBeNull();
  });

  test('404 — заявка не найдена', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const id = faker.string.uuid();

    // Act
    const response = await request(app)
      .delete(`${PATH}/${id}`)
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

    expect(await MaintenanceRequest.count()).toBe(0);
  });

});