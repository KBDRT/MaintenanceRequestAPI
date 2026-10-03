import { test, describe, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app.js';
import { createDBUser } from './utils.js';
import setCookie from 'set-cookie-parser';

const AUTH_PATH = "/api/auth"

describe(`Логин пользователя`, () => {
  test('Ответ 200 + возврат access токена + установка refresh в cookie, при валидных данных пользователя', async () => {
    const password = "TEST";
    const user = await createDBUser({password: password});
    const body = { login: user.login, password: password };

    const response = await request(app).post(`${AUTH_PATH}/login`).send(body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.anything()
    });

    const cookies = setCookie.parse(response.headers['set-cookie'], { map: true });
    expect(cookies.refreshToken).toBeDefined();
    expect(cookies.refreshToken.value).toBeTruthy();
    expect(cookies.refreshToken.httpOnly).toBe(true);
    expect(cookies.refreshToken.sameSite?.toLowerCase()).toBe('strict');
  });

  test('Ответ 401 + токен не проставляется, неверный пароль', async () => {
    const password = "TEST";
    const user = await createDBUser({password: password});
    const body = { login: user.login, password: "TEST1" };

    const response = await request(app).post(`${AUTH_PATH}/login`).send(body);

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
    expect(cookies.refreshToken.value).toBeFalsy();
  });
})
