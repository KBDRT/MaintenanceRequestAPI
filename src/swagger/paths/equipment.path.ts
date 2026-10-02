/**
 * @openapi
 * /api/equipments:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Список оборудования
 *     description: Список оборудования с фильтрацией и сортировкой
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/sort'
 *       - $ref: '#/components/parameters/sortDirection'
 *       - $ref: '#/components/parameters/equipmentStatusFilter'
 *       - $ref: '#/components/parameters/equipmentTypeFilter'
 *       - $ref: '#/components/parameters/dateFrom'
 *       - $ref: '#/components/parameters/dateTo'
 *       - $ref: '#/components/parameters/paginationPage'
 *       - $ref: '#/components/parameters/paginationLimit'
 *     responses:
 *       200:
 *         description: Список оборудования
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentListResponse'
 *   post:
 *     tags:
 *       - Оборудование
 *     summary: Создание оборудования
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEquipmentRequest'
 *     responses:
 *       201:
 *         description: Оборудование создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *
 * /api/equipments/{id}:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Получение оборудования по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *     responses:
 *       200:
 *         description: Данные оборудования
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *   patch:
 *     tags:
 *       - Оборудование
 *     summary: Обновление оборудования
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEquipmentRequest'
 *     responses:
 *       204:
 *         description: Оборудование обновлено
 *   delete:
 *     tags:
 *       - Оборудование
 *     summary: Удаление оборудования
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *     responses:
 *       204:
 *         description: Оборудование удалено
 *
 * /api/equipments/{id}/requests:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Заявки по оборудованию
 *     description: Постраничный список заявок, привязанных к оборудованию
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *       - $ref: '#/components/parameters/sort'
 *       - $ref: '#/components/parameters/sortDirection'
 *       - $ref: '#/components/parameters/maintenanceRequestPriorityFilter'
 *       - $ref: '#/components/parameters/maintenanceRequestStatusFilter'
 *       - $ref: '#/components/parameters/dateFrom'
 *       - $ref: '#/components/parameters/dateTo'
 *       - $ref: '#/components/parameters/paginationPage'
 *       - $ref: '#/components/parameters/paginationLimit'
 *     responses:
 *       200:
 *         description: Список заявок по оборудованию
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequestListResponse'
 *
 * /api/equipments/{id}/weather:
 *   get:
 *     tags:
 *       - Оборудование
 *     summary: Погодные условия по оборудованию
 *     description: Правила погодного окна и прогноз погоды для локации оборудования
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *     responses:
 *       200:
 *         description: Погодные данные по оборудованию
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentWeatherResponse'
 */
export {};