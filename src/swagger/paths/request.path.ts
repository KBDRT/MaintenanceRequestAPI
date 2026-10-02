/**
 * @openapi
 * /api/requests:
 *   get:
 *     tags:
 *       - Заявки
 *     summary: Список заявок
 *     description: Список заявок с фильтрацией и сортировкой
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/sort'
 *       - $ref: '#/components/parameters/sortDirection'
 *       - $ref: '#/components/parameters/equipmentIdsFilter'
 *       - $ref: '#/components/parameters/requestPriorityFilter'
 *       - $ref: '#/components/parameters/requestStatusFilter'
 *       - $ref: '#/components/parameters/dateFrom'
 *       - $ref: '#/components/parameters/dateTo'
 *       - $ref: '#/components/parameters/paginationPage'
 *       - $ref: '#/components/parameters/paginationLimit'
 *     responses:
 *       200:
 *         description: Список заявок
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequestListResponse'
 *   post:
 *     tags:
 *       - Заявки
 *     summary: Создание заявки
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRequestRequest'
 *     responses:
 *       201:
 *         description: Заявка создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *
 * /api/requests/{id}:
 *   get:
 *     tags:
 *       - Заявки
 *     summary: Получение заявки по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     responses:
 *       200:
 *         description: Данные заявки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *   patch:
 *     tags:
 *       - Заявки
 *     summary: Обновление заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRequestRequest'
 *     responses:
 *       204:
 *         description: Заявка обновлена
 *   delete:
 *     tags:
 *       - Заявки
 *     summary: Удаление заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     responses:
 *       204:
 *         description: Заявка удалена
 *
 * /api/requests/{id}/status:
 *   patch:
 *     tags:
 *       - Заявки
 *     summary: Обновление статуса заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRequestStatusRequest'
 *     responses:
 *       204:
 *         description: Статус заявки обновлён
 *
 * /api/requests/import:
 *   post:
 *     tags:
 *       - Заявки
 *     summary: Массовый импорт заявок
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MassImportRequestsRequest'
 *     responses:
 *       200:
 *         description: Результат массового импорта
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MassImportRequestsResponse'
 *
 * /api/requests/{id}/assignees:
 *   post:
 *     tags:
 *       - Заявки
 *     summary: Назначение специалистов на заявку
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetRequestTechniciansRequest'
 *     responses:
 *       204:
 *         description: Специалисты назначены
 *
 * /api/requests/{id}/assignees/{userId}:
 *   delete:
 *     tags:
 *       - Заявки
 *     summary: Снятие специалиста с заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *       - $ref: '#/components/parameters/assigneeUserIdPath'
 *     responses:
 *       204:
 *         description: Специалист снят с заявки
 *
 * /api/requests/{id}/history:
 *   get:
 *     tags:
 *       - Заявки
 *     summary: История изменения статусов заявки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/requestIdPath'
 *     responses:
 *       200:
 *         description: История статусов заявки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequestStatusHistoryListResponse'
 */
export {};