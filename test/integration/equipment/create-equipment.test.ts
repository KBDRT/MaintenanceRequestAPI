import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app.js';
import { test, expect, describe } from '@jest/globals';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBEquipment, createEquipmentBody, loginAs } from '../utils.js';
import { Equipment } from '../../../src/domains/models/equipment.model.js';
import { Response } from 'express';

const PATH = '/api/equipments';

describe(`Создание оборудования: POST ${PATH}`, () => {

  test('201 — валидные данные, оборудование в БД', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const body = createEquipmentBody();

    // Act
    const response = await request(app)
      .post(PATH)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: body.name,
      serialNumber: body.serialNumber,
      location: body.location,
      status: body.status,
      installedAt: body.installedAt,
    });

    const saved = await Equipment.findByPk(response.body.id);
    expect(saved).not.toBeNull();
    expect(saved!.serialNumber).toBe(body.serialNumber);
  });

  test('401 — без токена', async () => {
    // Arrange

    // Act
    const res = await request(app).post(PATH).send(createEquipmentBody());

    // Assert
    expect(res.status).toBe(401);
  });

  test('403 — роль без прав', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.viewer);

    // Act
    const res = await request(app).post(PATH).set('Authorization', `Bearer ${token}`).send(createEquipmentBody());

    // Assert
    expect(res.status).toBe(403);
  });

  test.each([
    ['пустое тело', {}],
    ['длина поля', { ...createEquipmentBody(), name: 'но' }],
    ['отсутствует поле', { ...createEquipmentBody(), location: { lat: 10 } }],
    ['значение типа некорректное', { ...createEquipmentBody(), type: 'ultra' }],
  ])('400 при невалидном теле: %s', async (_name, body) => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);

    // Act
    const response = await request(app)
      .post(PATH)
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

    expect(await Equipment.count()).toBe(0);
  });

  test('422 — дата в будущем, оборудование не создано', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const future = new Date();
    future.setUTCDate(future.getUTCDate() + 2);
    const body = {
      ...createEquipmentBody(),
      installedAt: future.toISOString().substring(0, 10),
    };

    // Act
    const response = await request(app).post(PATH).set('Authorization', `Bearer ${token}`).send(body);

    // Assert
    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        details: expect.anything(),
        requestId: expect.any(String),
      },
    });

    expect(await Equipment.count()).toBe(0);
  });

  test('409 — неуникальный serialNumber, второе оборудование не создано', async () => {
    // Arrange
    const { token } = await loginAs(UserRole.admin);
    const savedEquipment = await createDBEquipment();

    const newEquipment = createEquipmentBody();
    newEquipment.serialNumber = savedEquipment.serialNumber;

    // Act
    const response = await request(app).post(PATH).set('Authorization', `Bearer ${token}`).send(newEquipment);
  
    // Assert
    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        details: expect.anything(),
        requestId: expect.any(String),
      },
    });

    const count = await Equipment.count({ where: { serialNumber: savedEquipment.serialNumber } });
    expect(count).toBe(1);
  });

});