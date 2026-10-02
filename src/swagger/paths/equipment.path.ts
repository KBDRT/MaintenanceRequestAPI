/**
 * @openapi
 * components:
 *   schemas:
 *     EquipmentsList:
 *       type: object
 *       required:
 *         - data
 *         - meta
 *       properties:
 *         data:
 *           type: array
 *           description: Список оборудований
 *           items:
 *             $ref: '#/components/schemas/Equipment'
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *
 * /api/equipments:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments:
 *   post:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments/{id}:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments/{id}:
 *   patch:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments/{id}:
 *   delete:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments/{id}/requests:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /api/equipments/{id}/weather:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Получение списка оборудования
 *     parameters:
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SortDirectionParam'
 *       - $ref: '#/components/parameters/EquipmentStatusParam'
 *       - $ref: '#/components/parameters/EquipmentTypeParam'
 *       - $ref: '#/components/parameters/DateFromParam'
 *       - $ref: '#/components/parameters/DateToParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Успешное получение списка оборудований
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentsList'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export {};