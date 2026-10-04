import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBAssigne, createDBRequest, createDBTechnician, createDBUser, loginAs } from '../utils.js';
import { MaintenanceRequestPriority } from '../../../src/domains/enums/maintenance-request-priotiry.enum.js';
import { MaintenanceRequest } from '../../../src/domains/models/maintenance-request.model.js';
import { createTechnician } from '../../unit/utils.js';

const PATH = '/api/requests';

describe(`Обновление заявки: PATCH ${PATH}/:id`, () => {

  test('204 — админ обновляет заявку, поля сохранены в БД', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    const newTitle = faker.lorem.sentence({ min: 3, max: 5 });
    const newPriority = MaintenanceRequestPriority.high;

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: newTitle, priority: newPriority });

    // Assert
    expect(response.status).toBe(204);

    const updated = await MaintenanceRequest.findByPk(id);
    expect(updated).not.toBeNull();
    expect(updated!.title).toBe(newTitle);
    expect(updated!.priority).toBe(newPriority);
  });

  test('204 — technician, назначенный на заявку, обновляет её', async () => {
    // Arrange
    const technician = await createDBTechnician();
    const savedRequest = await createDBRequest();
    const user = await createDBUser({role: UserRole.technician, technicianId: technician.id, password: "password"});
    const assigne = await createDBAssigne({technicianId: technician.id, requestId: savedRequest.id});

    const id = savedRequest.id;

    const newTitle = faker.lorem.sentence({ min: 3, max: 5 });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ login: user.login, password: 'password' });
    const token = loginResponse.body.token;

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: newTitle });

    // Assert
    expect(response.status).toBe(204);

    const updated = await MaintenanceRequest.findByPk(id);
    expect(updated!.title).toBe(newTitle);
  });

  test('401 — без токена, заявка не изменена', async () => {
    // Arrange
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .send({ title: 'HACKED' });

    // Assert
    expect(response.status).toBe(401);

    const updated = await MaintenanceRequest.findByPk(id);
    expect(updated!.title).toBe(savedRequest.title);
  });

  test('403 — technician не в списке заявки, заявка не изменена', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.technician);
    const savedRequest = await createDBRequest();

    const id = savedRequest.id;

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'HACKED' });

    // Assert
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        requestId: expect.any(String),
      },
    });

    const updated = await MaintenanceRequest.findByPk(id);
    expect(updated!.title).toBe(savedRequest.title);
  });

  test('404 — заявка не найдена', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const id = faker.string.uuid();

    // Act
    const response = await request(app)
      .patch(`${PATH}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: faker.lorem.sentence({ min: 3, max: 5 }) });

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
    ['короткий title', { title: 'но' }],
    ['priority не из enum', { priority: 'ultra' }],
    ['status не из enum', { status: 'garbage' }],
  ])('400 при невалидном теле: %s', async (_name, body) => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedRequest = await createDBRequest();
    const id = savedRequest.id;

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

    const updated = await MaintenanceRequest.findByPk(id);
    expect(updated!.title).toBe(savedRequest.title);
  });

});