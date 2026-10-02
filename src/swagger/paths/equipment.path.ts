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
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
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
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       403:
 *         description: Нет доступа не хватает прав для операции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: ACCESS_ERROR
 *                 message: Нет доступа
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       409:
 *         description: Неуникальный серийный номер
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: CONFLICT_ERROR
 *                 message: Оборудование с указанным серийным номером уже существует!
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       422:
 *         description: Дата установки в будущем
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: BUSINESS_RULE_ERROR
 *                 message: Дата установки оборудования неккоретна
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
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
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       404:
 *         description: Оборудование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: NOT_FOUND
 *                 message: Не найдено
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 * 
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
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       403:
 *         description: Нет доступа не хватает прав для операции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: ACCESS_ERROR
 *                 message: Нет доступа
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       404:
 *         description: Оборудование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: NOT_FOUND
 *                 message: Не найдено
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 * 
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
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       403:
 *         description: Нет доступа не хватает прав для операции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: ACCESS_ERROR
 *                 message: Нет доступа
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       404:
 *         description: Оборудование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: NOT_FOUND
 *                 message: Не найдено
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       409:
 *         description: Есть незакрытые заявки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: CONFLICT_ERROR
 *                 message: Для данного оборудования есть незавершенные заявки
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
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
*       204:
 *         description: Оборудование удалено
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       404:
 *         description: Оборудование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: NOT_FOUND
 *                 message: Не найдено
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
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
*       204:
 *         description: Оборудование удалено
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован (пустой или невалидный acess токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: AUTHENTICATION_ERROR
 *                 message: Токен не предоставлен
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       404:
 *         description: Оборудование не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: NOT_FOUND
 *                 message: Не найдено
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       502:
 *         description: Ошибка внешнего WEATHER API
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: ERROR
 *                 message: Ошибка получения погоды
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 *       504:
 *         description: Таймаут к WEATHER API
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                error:
 *                 code: WEATHER_API_TIMEOUT
 *                 message: Ошибка получения погоды таймаут
 *                 requestId: 457dab4b-cc25-46e1-b071-8481e909111f
 */
export {};