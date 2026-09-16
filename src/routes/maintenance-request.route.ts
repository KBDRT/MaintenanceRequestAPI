import { Router } from 'express';
import { createRequest, getRequests, getRequest, updateRequest, deleteRequest, updateRequestStatus } from '../controllers/maintenance-request.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { createRequestSchema } from '../validators/schemas/maintenance-request/create-request.schema.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { updateRequestSchema } from '../validators/schemas/maintenance-request/update-request.schema.js';
import { updateRequestStatusSchema } from '../validators/schemas/maintenance-request/update-request-status.schema.js';

const maintenanceRequestRouter = Router();

maintenanceRequestRouter.route('/')
  .get(getRequests)
  .post(validate({body: createRequestSchema}), createRequest);

maintenanceRequestRouter.route('/:id')
  .get(validate({params: idRequestSchema}), getRequest)
  .patch(validate({params: idRequestSchema, body: updateRequestSchema}), updateRequest)
  .delete(validate({params: idRequestSchema}), deleteRequest);

maintenanceRequestRouter.route('/:id/status')
  .patch(validate({params: idRequestSchema, body: updateRequestStatusSchema}),updateRequestStatus);

export default maintenanceRequestRouter;

