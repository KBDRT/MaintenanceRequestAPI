import { test, describe, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app.js';
import setCookie from 'set-cookie-parser';
import { DEFAULT_PATHS } from '../utils/global-setup.js';
import { createDBUser } from '../utils/db-factories/user-factory.js';

describe(`Логин пользователя`, () => {
  test('Ответ 200 + возврат access токена + установка refresh в cookie, при валидных данных пользователя', async () => {
    // Arrange
    const password = "TEST";
    const user = await createDBUser({password: password});
    const body = { login: user.login, password: password };

    // Act
    const response = await request(app).post(`${DEFAULT_PATHS.auth}/login`).send(body);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.anything()
    });

    const cookies = setCookie.parse(response.headers['set-cookie'], { map: true });
    expect(cookies.refreshToken).toBeDefined();
    expect(cookies.refreshToken.value).toBeTruthy();
    expect(cookies.refreshToken.httpOnly).toBe(true);
    expect(cookies.refreshToken.sameSite).toBeDefined();
    expect(cookies.refreshToken.sameSite?.toLowerCase()).toBe('strict');
  });

  test('Ответ 401 + токен не проставляется, неверный пароль', async () => {
    // Arrange
    const password = "TEST";
    const user = await createDBUser({password: password});
    const body = { login: user.login, password: "wrong-password" };

    // Act
    const response = await request(app).post(`${DEFAULT_PATHS.auth}/login`).send(body);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: {
        code: expect.any(String),
        message: expect.any(String),
        requestId: expect.any(String)
      }
    });

    expect(response.headers['set-cookie']).toBeUndefined();
  });

  test('Ответ 401 + токен не проставляется, не найден по логину', async () => {
    // Arrange
    const body = { login: "LOGIN", password: "TEST" };

    // Act
    const response = await request(app).post(`${DEFAULT_PATHS.auth}/login`).send(body);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        requestId: expect.anything()
      }
    });

    expect(response.headers['set-cookie']).toBeUndefined();
  });

  test.each([
    ['пустое тело', {}],
    ['без login', { password: 'secret' }],
    ['без password', { login: 'admin' }],
  ])('Ответ 400 при невалидном теле: %s', async (_name, body) => {
    // Arrange

    // Act
    const response = await request(app).post(`${DEFAULT_PATHS.auth}/login`).send(body);
    
    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { code: expect.any(String), message: expect.any(String) },
    });
  });
})
