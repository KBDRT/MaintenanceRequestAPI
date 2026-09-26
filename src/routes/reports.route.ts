import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { getSiteSummaryReport, getEquipmentAnalyticsReport } from '../controllers/reports.controller.js';
import { getEquipmentLoadSchema } from '../validators/schemas/reports/get-equipment-load.schema.js';

const reportsRouter = Router();

reportsRouter.route('/sites/:id/summary')
  .get(validate({params: idRequestSchema}), getSiteSummaryReport)

reportsRouter.route('/reports/equipment-load')
  .get(validate({query: getEquipmentLoadSchema}), getEquipmentAnalyticsReport)

export default reportsRouter;

