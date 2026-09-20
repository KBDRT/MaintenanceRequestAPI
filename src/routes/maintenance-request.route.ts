import { Router } from 'express';
import { createRequest, getRequests, getRequest, updateRequest, deleteRequest, updateRequestStatus, createRequestMass } from '../controllers/maintenance-request.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { createRequestSchema } from '../validators/schemas/maintenance-request/create-request.schema.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { updateRequestSchema } from '../validators/schemas/maintenance-request/update-request.schema.js';
import { updateRequestStatusSchema } from '../validators/schemas/maintenance-request/update-request-status.schema.js';
import { parseFilterQuery } from '../middlewares/params-parser.middleware.js';
import { validateCleanQuery } from '../middlewares/clean-query-validator.middleware.js';
import { filterRequestSchema } from '../validators/schemas/maintenance-request/filter-request.schema.js';
import { massImportRequestsSchema } from '../validators/schemas/maintenance-request/mass-import-requests.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const maintenanceRequestRouter = Router();

maintenanceRequestRouter.route('/')
  .get(parseFilterQuery, validateCleanQuery(filterRequestSchema), getRequests)
  .post(authenticate, validate({body: createRequestSchema}), createRequest);

maintenanceRequestRouter.route('/:id')
  .get(validate({params: idRequestSchema}), getRequest)
  .patch(authenticate, validate({params: idRequestSchema, body: updateRequestSchema}), updateRequest)
  .delete(authenticate, validate({params: idRequestSchema}), deleteRequest);

maintenanceRequestRouter.route('/:id/status')
  .patch(authenticate, validate({params: idRequestSchema, body: updateRequestStatusSchema}), updateRequestStatus);

maintenanceRequestRouter.route('/import')
  .post(authenticate, validate({body: massImportRequestsSchema}),createRequestMass);

export default maintenanceRequestRouter;

