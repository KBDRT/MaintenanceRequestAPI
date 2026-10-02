/**
 * @openapi
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - type
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID оборудования
 *         name:
 *           type: string
 *           description: Название оборудования
 *         type:
 *           type: string
 *           enum: [turbine, inverter, sensor, substation]
 *           description: Тип оборудования
 *         status:
 *           type: string
 *           enum: [operational, maintenance, fault, decommissioned]
 *           description: Статус оборудования
 *         installedAt:
 *           type: string
 *           format: date
 *           description: Дата установки
 *
 */
export {};