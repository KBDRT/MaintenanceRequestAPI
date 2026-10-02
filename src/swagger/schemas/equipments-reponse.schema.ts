/**
 * @openapi
 * components:
 *   schemas:
 *     EquipmentStatus:
 *       type: string
 *       enum: [operational, maintenance, fault, decommissioned]
 *       description: Статус оборудования
 *
 *     EquipmentType:
 *       type: string
 *       enum: [turbine, inverter, sensor, substation]
 *       description: Тип оборудования
 *
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
 *   parameters:
 *     SortParam:
 *       in: query
 *       name: sort
 *       required: false
 *       schema:
 *         type: string
 *       description: Поле сортировки
 *
 *     SortDirectionParam:
 *       in: query
 *       name: sortDirection
 *       required: false
 *       schema:
 *         type: string
 *         enum: [ASC, DESC]
 *       description: Направление сортировки
 *
 *     EquipmentStatusParam:
 *       in: query
 *       name: status
 *       required: false
 *       schema:
 *         $ref: '#/components/schemas/EquipmentStatus'
 *       description: Статус оборудования
 *
 *     EquipmentTypeParam:
 *       in: query
 *       name: type
 *       required: false
 *       schema:
 *         $ref: '#/components/schemas/EquipmentType'
 *       description: Тип оборудования
 *
 *     DateFromParam:
 *       in: query
 *       name: dateFrom
 *       required: false
 *       schema:
 *         type: string
 *         format: date
 *       description: Дата начала для фильтрации даты установки
 *
 *     DateToParam:
 *       in: query
 *       name: dateTo
 *       required: false
 *       schema:
 *         type: string
 *         format: date
 *       description: Дата окончания для фильтрации даты установки
 *
 *     PageParam:
 *       in: query
 *       name: page
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: Страница для пагинации
 *
 *     LimitParam:
 *       in: query
 *       name: limit
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 20
 *       description: Количество элементов на странице
 *
 */
export {};