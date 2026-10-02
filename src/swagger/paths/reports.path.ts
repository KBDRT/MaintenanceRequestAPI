/**
 * @openapi
 * /api/sites/{id}/summary:
 *   get:
 *     tags:
 *       - Отчёты
 *     summary: Сводный отчёт по площадке
 *     description: Статистика заявок по статусам и приоритетам, среднее время выполнения
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idPath'
 *     responses:
 *       200:
 *         description: Сводный отчёт по площадке
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSiteSummaryResult'
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
 *
 * /api/reports/equipment-load:
 *   get:
 *     tags:
 *       - Отчёты
 *     summary: Аналитический отчёт по загрузке оборудования
 *     description: Список оборудования с показателями загрузки за период
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: dateFrom
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           default: '1970-01-01'
 *         description: Дата начала периода
 *       - in: query
 *         name: dateTo
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           default: '2100-12-31'
 *         description: Дата окончания периода
 *       - in: query
 *         name: minFinishedRequests
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 0
 *           default: 0
 *         description: Минимальное количество завершённых заявок
 *     responses:
 *       200:
 *         description: Список оборудования с показателями загрузки
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EquipmentsLoadResult'
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
 */
export {};