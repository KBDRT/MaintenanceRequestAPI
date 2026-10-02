/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Аутентификация
 *     summary: Регистрация пользователя
 *     description: Создает новую учетную запись пользователя
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Пользователь уже существует
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Аутентификация
 *     summary: Вход пользователя
 *     description: Аутентификация пользователя, возвращение access токена и заполнение refresh токена в HttpOnly cookie
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: Пользователь успешно авторизирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Неверные данные для входа. Пользователя с комбинацией логин+пароль не существует
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Неверные данные для входа
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Аутентификация
 *     summary: Обновление токенов
 *     description: Обновление access-токена по refresh токену из cookie
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: Успешное обновление токена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Отсутствует refresh токен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Неверные данные для входа
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       403:
 *         description: Невалидный токен для операции refresh
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: ACCESS_ERROR
 *                 message: Невалидный токен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Аутентификация
 *     summary: Выход пользователя
 *     description: Завершение сессии, удаление refresh-cookie
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Успешное удаление токена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       401:
 *         description: Ошибка выхода
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Аутентификация
 *     summary: Текущий пользователь
 *     description: Данные текущего пользователя и его роль
 *     security: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Успешное получение пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Пустой или невалидный access токен 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 */
export {};