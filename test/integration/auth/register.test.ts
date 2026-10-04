import { test, describe, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app.js';
import { AUTH_PATH } from '../global-setup.js';
import { faker } from "@faker-js/faker";
import { User } from '../../../src/domains/models/user.model.js';
import { UserRole } from '../../../src/domains/enums/user-role.enum.js';
import { createDBUser } from '../utils.js';

describe(`Регистрация пользователя`, () => {
  test('Ответ 201 + сохранение пользователя, при валидном', async () => {
    // Arrange
    const body = { login: faker.internet.username(), password: "Password" };

    // Act
    const response = await request(app).post(`${AUTH_PATH}/register`).send(body);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.result).toBeDefined();
    expect(response.body.result).toMatchObject({
      id: expect.any(String),
      role: UserRole.viewer,
      login: body.login
    });
    expect(response.body.result).not.toHaveProperty('password');

    const saved = await User.findByPk(response.body.result.id);
    expect(saved).not.toBeNull();
    expect(saved!.password).not.toBe(body.password);
    expect(saved!.password).toMatch(/^\$2[aby]\$/);
  });

  test('Ответ 409 + пользователь не сохраняется, т.к. неуникальный логин', async () => {
    // Arrange
    const user = await createDBUser();
    const body = { login: user.login, password: "PASSWORD" };

    // Act
    const response = await request(app).post(`${AUTH_PATH}/register`).send(body);

    // Assert
    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        requestId: expect.anything()
      }
    });

    const count = await User.count({ where: { login: user.login } });
    expect(count).toBe(1)
  });

  test.each([
    ['пустое тело', {}],
    ['без login', { password: 'secret' }],
    ['без password', { login: 'admin' }],
  ])('Ответ 400 при невалидном теле: %s', async (_name, body) => {
    // Arrange

    // Act
    const response = await request(app).post(`${AUTH_PATH}/register`).send(body);
    
    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { code: expect.any(String), message: expect.any(String) },
    });
  });
})
