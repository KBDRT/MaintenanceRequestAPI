/**
 * @openapi
 * components:
 *   parameters:
 *     equipmentStatusFilter:
 *       in: query
 *       name: status
 *       required: false
 *       description: Фильтр по статусу оборудования
 *       schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/EquipmentStatus'
 *
 *     equipmentTypeFilter:
 *       in: query
 *       name: type
 *       required: false
 *       description: Фильтр по типу оборудования
 *       schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/EquipmentType'
 *
 *     maintenanceRequestPriorityFilter:
 *       in: query
 *       name: priority
 *       required: false
 *       description: Фильтр по приоритету заявки
 *       schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/MaintenanceRequestPriority'
 *
 *     maintenanceRequestStatusFilter:
 *       in: query
 *       name: status
 *       required: false
 *       description: Фильтр по статусу заявки
 *       schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/MaintenanceRequestStatus'
 *
 *   schemas:
 *     EquipmentType:
 *       type: string
 *       description: Тип оборудования
 *       enum:
 *         - turbine
 *         - inverter
 *         - sensor
 *         - substation
 *
 *     EquipmentStatus:
 *       type: string
 *       description: Статус оборудования
 *       enum:
 *         - operational
 *         - maintenance
 *         - fault
 *         - decommissioned
 *
 *     EquipmentLocation:
 *       type: object
 *       required:
 *         - lat
 *         - lon
 *       properties:
 *         lat:
 *           type: number
 *           description: Широта
 *         lon:
 *           type: number
 *           description: Долгота
 *       example:
 *         lat: 55.7558
 *         lon: 37.6173
 *
 *     Technician:
 *       type: object
 *       description: Техник, назначенный на заявку
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         login:
 *           type: string
 *       example:
 *         id: 457dab4b-cc25-46e1-b071-8481e909111f
 *         login: tech1
 *
 *     Equipment:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - type
 *         - serialNumber
 *         - location
 *         - status
 *         - installedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID оборудования
 *         name:
 *           type: string
 *           description: Название оборудования
 *         type:
 *           $ref: '#/components/schemas/EquipmentType'
 *         serialNumber:
 *           type: string
 *           description: Серийный номер
 *         location:
 *           $ref: '#/components/schemas/EquipmentLocation'
 *         status:
 *           $ref: '#/components/schemas/EquipmentStatus'
 *         installedAt:
 *           type: string
 *           format: date
 *           description: Дата установки
 *         passport:
 *           $ref: '#/components/schemas/EquipmentPassport'
 *       example:
 *         id: 457dab4b-cc25-46e1-b071-8481e909111f
 *         name: Насос центробежный
 *         type: turbine
 *         serialNumber: SN-00123
 *         location:
 *           lat: 55.7558
 *           lon: 37.6173
 *         status: operational
 *         installedAt: "2024-01-15"
 *
 *     EquipmentPassport:
 *       type: object
 *       description: Паспорт оборудования
 *       additionalProperties: true
 *
 *     CreateEquipmentRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - serialNumber
 *         - location
 *         - status
 *         - installedAt
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Название оборудования
 *         type:
 *           $ref: '#/components/schemas/EquipmentType'
 *         serialNumber:
 *           type: string
 *           description: Серийный номер
 *         location:
 *           $ref: '#/components/schemas/EquipmentLocation'
 *         status:
 *           $ref: '#/components/schemas/EquipmentStatus'
 *         installedAt:
 *           type: string
 *           format: date
 *           description: Дата установки
 *       example:
 *         name: Насос центробежный
 *         type: turbine
 *         serialNumber: SN-00123
 *         location:
 *           lat: 55.7558
 *           lon: 37.6173
 *         status: operational
 *         installedAt: "2024-01-15"
 *
 *     UpdateEquipmentRequest:
 *       type: object
 *       description: Хотя бы одно поле должно быть заполнено
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         type:
 *           $ref: '#/components/schemas/EquipmentType'
 *         serialNumber:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/EquipmentLocation'
 *         status:
 *           $ref: '#/components/schemas/EquipmentStatus'
 *         installedAt:
 *           type: string
 *           format: date
 *       example:
 *         status: maintenance
 *
 *     EquipmentListResponse:
 *       type: object
 *       required:
 *         - data
 *         - meta
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Equipment'
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *
 *     MaintenanceRequest:
 *       type: object
 *       required:
 *         - id
 *         - equipmentId
 *         - title
 *         - priority
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID заявки
 *         equipmentId:
 *           type: string
 *           format: uuid
 *           description: ID оборудования
 *         title:
 *           type: string
 *           description: Заголовок заявки
 *         description:
 *           type: string
 *           description: Описание заявки
 *         priority:
 *           $ref: '#/components/schemas/MaintenanceRequestPriority'
 *         status:
 *           $ref: '#/components/schemas/MaintenanceRequestStatus'
 *         planntedAt:
 *           type: string
 *           format: date-time
 *           description: Планируемое время выполнения
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         technicians:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Technician'
 *       example:
 *         id: 457dab4b-cc25-46e1-b071-8481e909111f
 *         equipmentId: 8b0f2a71-1234-4a1b-9cde-3f5e6a7b8c90
 *         title: Замена подшипника
 *         description: Износ подшипника привода
 *         priority: high
 *         status: in_progress
 *         planntedAt: "2025-03-20T10:00:00Z"
 *         createdAt: "2025-03-15T08:00:00Z"
 *         updatedAt: "2025-03-16T09:30:00Z"
 *         technicians:
 *           - id: 11111111-1111-1111-1111-111111111111
 *             login: tech1
 *
 *     MaintenanceRequestListResponse:
 *       type: object
 *       required:
 *         - data
 *         - meta
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MaintenanceRequest'
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *
 *     WeatherRule:
 *       type: object
 *       properties:
 *         minAllowedTemperature:
 *           type: number
 *           description: Минимально допустимая температура
 *         maxAllowedTemperature:
 *           type: number
 *           description: Максимально допустимая температура
 *         maxAllowedSumPrecipitation:
 *           type: number
 *           description: Максимально допустимая сумма осадков
 *       example:
 *         minAllowedTemperature: -20
 *         maxAllowedTemperature: 40
 *         maxAllowedSumPrecipitation: 10
 *
 *     DayWeather:
 *       type: object
 *       description: Погода за день
 *       additionalProperties: true
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         temperature:
 *           type: number
 *         precipitation:
 *           type: number
 *       example:
 *         date: "2025-03-20"
 *         temperature: 5.5
 *         precipitation: 0.2
 *
 *     EquipmentWeatherResponse:
 *       type: object
 *       required:
 *         - rules
 *         - isWeatherWindowSuitable
 *         - weather
 *       properties:
 *         equipmentId:
 *           type: string
 *           format: uuid
 *         location:
 *           $ref: '#/components/schemas/EquipmentLocation'
 *         rules:
 *           $ref: '#/components/schemas/WeatherRule'
 *         isWeatherWindowSuitable:
 *           type: boolean
 *           description: Подходит ли погодное окно для работ
 *         weather:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DayWeather'
 */
export {};