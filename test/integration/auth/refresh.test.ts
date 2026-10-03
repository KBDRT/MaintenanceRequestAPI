import { test, describe, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app.js';
import { createDBUser } from './utils.js';
import { AUTH_PATH } from '../global-setup.js';
import setCookie from 'set-cookie-parser';
import jwt from "jsonwebtoken";

describe(`Регистрация пользователя`, () => {
  test('Ответ 200 + обновление токена, при валидных данных', async () => {
    // Arrange
    const user = await createDBUser({password: "password"});
    const body = { login: user.login, password: "password" };
    const agent = request.agent(app);
    const loginResponse = await agent.post(`${AUTH_PATH}/login`).send(body);
    const loginCookies = setCookie.parse(loginResponse.headers['set-cookie'], { map: true });
    const originalRefreshToken = loginCookies.refreshToken.value;

    // Act
    const response = await agent.post(`${AUTH_PATH}/refresh`).send();

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.anything()
    });

    const cookies = setCookie.parse(response.headers['set-cookie'], { map: true });
    expect(cookies.refreshToken).toBeDefined();
    expect(cookies.refreshToken).not.toEqual(originalRefreshToken);
    expect(cookies.refreshToken.value).toBeTruthy();
    expect(cookies.refreshToken.httpOnly).toBe(true);
    expect(cookies.refreshToken.sameSite).toBeDefined();
    expect(cookies.refreshToken.sameSite?.toLowerCase()).toBe('strict');
  });

  test('Ответ 401 , т.к. нет токена', async () => {
    // Arrange

    // Act
    const response = await request(app).post(`${AUTH_PATH}/refresh`).send();

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        requestId: expect.anything()
      }
    });

    const cookies = setCookie.parse(response.headers['set-cookie'], { map: true });
    expect(cookies.refreshToken).toBeUndefined();
  });

  test('Ответ 403 , т.к. невалидный токен', async () => {
    // Arrange
    const badToken = jwt.sign(
      {  type: 'refresh' },
      'wrong-secret',           
      { expiresIn: '7d' },
    );

    // Act
    const response = await request(app).post(`${AUTH_PATH}/refresh`).set('Cookie', `refreshToken=${badToken}`);

    // Assert
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: {
        code: expect.anything(),
        message: expect.anything(),
        requestId: expect.anything()
      }
    });

    const cookies = setCookie.parse(response.headers['set-cookie'], { map: true });
    expect(cookies.refreshToken).toBeUndefined();
  });
})
