import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { getSiteSummaryReport } from '../controllers/reports.controller.js';

const reportsRouter = Router();

reportsRouter.route('/sites/:id/summary')
  .get(validate({params: idRequestSchema}), getSiteSummaryReport)

export default reportsRouter;

